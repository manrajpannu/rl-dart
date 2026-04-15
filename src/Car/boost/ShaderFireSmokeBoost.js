import * as THREE from "three";
import { Boost, BOOST_DEFAULTS } from "./Boost.js";
import { withAssetBase } from "../../assetBase.js";

const VERTEX_SHADER = `
attribute float aLife;
attribute float aType;
attribute float aSize;
attribute float aSeed;

uniform float uPointScale;

varying float vLife;
varying float vType;
varying float vSeed;

void main() {
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  float size = mix(1.0, 0.2, aLife) * aSize;

  // Keep apparent size roughly stable with distance.
  gl_PointSize = uPointScale * size / max(0.1, -mvPos.z);

  vLife = aLife;
  vType = aType;
  vSeed = aSeed;
  gl_Position = projectionMatrix * mvPos;
}
`;

const FRAGMENT_SHADER = `
uniform float uTime;
uniform vec3 uFireColor;
uniform vec3 uSmokeColor;
uniform sampler2D uFireSprite;
uniform sampler2D uSmokeSprite;

varying float vLife;
varying float vType;
varying float vSeed;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(p, p);
  if (r2 > 1.0) discard;

  float life = clamp(vLife, 0.0, 1.0);
  float edge = smoothstep(1.0, 0.0, r2);
  float noise = sin((p.x + vSeed) * 7.0 + uTime * 9.0) * 0.5 + 0.5;
  float noise2 = sin((p.y + vSeed * 0.7) * 11.0 + uTime * 5.0) * 0.5 + 0.5;
  float flicker = 0.6 + 0.4 * noise;

  // Each particle starts as fire and gradually becomes smoke.
  float smokePhase = smoothstep(0.35, 0.95, life);
  float turbulence = mix(0.85, 1.15, vType);

  vec3 hot = mix(vec3(1.0, 0.84, 0.45), uFireColor, life * 0.6) * turbulence;
  vec3 smoke = mix(uSmokeColor, vec3(0.12), life * 0.9);
  vec3 color = mix(hot, smoke, smokePhase);

  float alphaFire = (1.0 - life) * edge * (0.5 + 0.5 * flicker);
  float alphaSmoke = (1.0 - life * 0.6) * edge * (0.35 + 0.65 * noise2) * (0.85 + 0.15 * turbulence);
  vec4 fireSprite = texture2D(uFireSprite, gl_PointCoord);
  vec4 smokeSprite = texture2D(uSmokeSprite, gl_PointCoord);

  vec3 fireCol = hot * fireSprite.rgb;
  vec3 smokeCol = smoke * smokeSprite.rgb;
  vec3 finalColor = mix(fireCol, smokeCol, smokePhase);
  float finalAlpha = mix(alphaFire * fireSprite.a, alphaSmoke * smokeSprite.a, smokePhase);

  gl_FragColor = vec4(finalColor, finalAlpha * 0.55);
}
`;

/**
 * Shader-based fire and smoke boost style.
 */
export class ShaderFireSmokeBoost extends Boost {
  /**
   * @param {THREE.Object3D} scene
   * @param {Partial<typeof BOOST_DEFAULTS>} [options]
   */
  constructor(scene, options = {}) {
    super(scene, {
      boostColour: 0xff6a00,
      particlesPerSecond: 65,
      particleLife: 1.15,
      particleSpread: 0.18,
      particleRandomness: 0.08,
      particleScaleFactor: 1.15,
      particleMaxScale: 1.9,
      ...options,
    });

    this._cursor = 0;
    this._velocities = new Float32Array(this._poolSize * 3);
    this._lifeSeconds = new Float32Array(this._poolSize);
    this._lifeTotal = new Float32Array(this._poolSize);

    const loader = new THREE.TextureLoader();
    this._fireSprite = loader.load(withAssetBase('images/boost/fire-sprite.svg'));
    this._smokeSprite = loader.load(withAssetBase('images/boost/smoke-sprite.svg'));
    [this._fireSprite, this._smokeSprite].forEach(tex => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    });
  }

  _initPool() {
    const positions = new Float32Array(this._poolSize * 3);
    const life = new Float32Array(this._poolSize);
    const type = new Float32Array(this._poolSize);
    const size = new Float32Array(this._poolSize);
    const seed = new Float32Array(this._poolSize);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aLife", new THREE.BufferAttribute(life, 1));
    geometry.setAttribute("aType", new THREE.BufferAttribute(type, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    this._material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointScale: { value: 720 },
        uFireColor: { value: new THREE.Color(0xff6a00) },
        uSmokeColor: { value: new THREE.Color(0x484848) },
        uFireSprite: { value: this._fireSprite },
        uSmokeSprite: { value: this._smokeSprite },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this._points = new THREE.Points(geometry, this._material);
    // Positions are recycled in a large buffer, so static frustum bounds are unreliable.
    this._points.frustumCulled = false;
    this._points.renderOrder = 20;
    this.particleGroup.add(this._points);

    this._positions = positions;
    this._aLife = life;
    this._aType = type;
    this._aSize = size;
    this._aSeed = seed;

    for (let i = 0; i < this._poolSize; i++) {
      this._aLife[i] = 1;
      this._aType[i] = 0;
      this._aSize[i] = 0;
      this._aSeed[i] = Math.random() * 1000;
      this._positions[i * 3 + 0] = 0;
      this._positions[i * 3 + 1] = -9999;
      this._positions[i * 3 + 2] = 0;
    }
  }

  _spawnOne(type, position, velocity) {
    const i = this._cursor;
    this._cursor = (this._cursor + 1) % this._poolSize;

    this._positions[i * 3 + 0] = position.x;
    this._positions[i * 3 + 1] = position.y;
    this._positions[i * 3 + 2] = position.z;

    this._velocities[i * 3 + 0] = velocity.x;
    this._velocities[i * 3 + 1] = velocity.y;
    this._velocities[i * 3 + 2] = velocity.z;

    const lifeTotal = this.particleLife + Math.random() * this.particleRandomness;
    this._lifeSeconds[i] = lifeTotal;
    this._lifeTotal[i] = lifeTotal;
    this._aLife[i] = 0;
    this._aType[i] = type;
    this._aSize[i] = type < 0.5
      ? (0.9 + Math.random() * 0.6)
      : (1.3 + Math.random() * 0.9);
    this._aSeed[i] = Math.random() * 1000;
  }

  emitParticles(position, quaternion, dt) {
    this._emitAccumulator += dt * this.particlesPerSecond;
    const numToEmit = Math.floor(this._emitAccumulator);
    if (numToEmit <= 0) return;
    this._emitAccumulator -= numToEmit;

    // Push spawn farther behind the car to avoid particles appearing inside the body.
    const backOffset = new THREE.Vector3(0, 0.04, 1.25).applyQuaternion(quaternion);
    const emitBase = new THREE.Vector3().copy(position).add(backOffset);
    const left = new THREE.Vector3(-this.boostGap * 0.8, 0, 0).applyQuaternion(quaternion);
    const right = new THREE.Vector3(this.boostGap * 0.8, 0, 0).applyQuaternion(quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(quaternion);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion);

    for (let i = 0; i < numToEmit; i++) {
      const side = i % 2 === 0 ? left : right;
      const origin = new THREE.Vector3().copy(emitBase).add(side);

      // Start as fire particle and let shader/physics morph it into smoke.
      const fireVel = new THREE.Vector3()
        .copy(forward)
        .multiplyScalar(1.15 + Math.random() * 0.35)
        .addScaledVector(up, -0.05 + Math.random() * 0.12)
        .add(new THREE.Vector3(
          (Math.random() - 0.5) * this.particleSpread,
          (Math.random() - 0.5) * (this.particleSpread * 0.75),
          (Math.random() - 0.5) * this.particleSpread
        ));
      this._spawnOne(Math.random(), origin, fireVel);
    }
  }

  updateParticles(dt) {
    this._material.uniforms.uTime.value += dt;

    for (let i = 0; i < this._poolSize; i++) {
      let life = this._lifeSeconds[i];
      if (life <= 0) continue;

      life -= dt;
      this._lifeSeconds[i] = life;

      const vxIndex = i * 3;
      const vyIndex = vxIndex + 1;
      const vzIndex = vxIndex + 2;
      const lifeProgress = 1 - (life / Math.max(this._lifeTotal[i], 1e-6));

      // As particles age, they slow down and rise like smoke.
      const drag = 0.985 - 0.015 * lifeProgress;
      this._velocities[vxIndex] *= drag;
      this._velocities[vyIndex] = this._velocities[vyIndex] * drag + (0.006 + 0.02 * lifeProgress);
      this._velocities[vzIndex] *= drag;

      this._positions[vxIndex] += this._velocities[vxIndex] * dt * 2.0;
      this._positions[vyIndex] += this._velocities[vyIndex] * dt * 2.0;
      this._positions[vzIndex] += this._velocities[vzIndex] * dt * 2.0;

      if (life <= 0) {
        this._aLife[i] = 1;
        this._aSize[i] = 0;
        this._positions[vyIndex] = -9999;
      } else {
        const total = Math.max(this._lifeTotal[i], 1e-6);
        this._aLife[i] = 1 - life / total;
      }
    }

    this._points.geometry.attributes.position.needsUpdate = true;
    this._points.geometry.attributes.aLife.needsUpdate = true;
    this._points.geometry.attributes.aType.needsUpdate = true;
    this._points.geometry.attributes.aSize.needsUpdate = true;
    this._points.geometry.attributes.aSeed.needsUpdate = true;
  }

  reset() {
    this._emitAccumulator = 0;
    this._cursor = 0;
    for (let i = 0; i < this._poolSize; i++) {
      this._lifeSeconds[i] = 0;
      this._lifeTotal[i] = 0;
      this._aLife[i] = 1;
      this._aSize[i] = 0;
      this._positions[i * 3 + 1] = -9999;
      this._velocities[i * 3 + 0] = 0;
      this._velocities[i * 3 + 1] = 0;
      this._velocities[i * 3 + 2] = 0;
    }
    this._points.geometry.attributes.position.needsUpdate = true;
    this._points.geometry.attributes.aLife.needsUpdate = true;
    this._points.geometry.attributes.aType.needsUpdate = true;
    this._points.geometry.attributes.aSize.needsUpdate = true;
    this._points.geometry.attributes.aSeed.needsUpdate = true;
  }

  dispose() {
    this.reset();
    if (this.particleGroup.parent) {
      this.particleGroup.parent.remove(this.particleGroup);
    }
    if (this._points) {
      this._points.geometry.dispose();
    }
    if (this._material) {
      this._material.dispose();
    }
    if (this._materialTemplate) {
      this._materialTemplate.dispose();
    }
    if (this._particleGeometry) {
      this._particleGeometry.dispose();
    }
    if (this._fireSprite) {
      this._fireSprite.dispose();
    }
    if (this._smokeSprite) {
      this._smokeSprite.dispose();
    }
  }
}
