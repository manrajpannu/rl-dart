import * as THREE from "three";
import { Boost, BOOST_DEFAULTS } from "./Boost.js";

const VERTEX_SHADER = `
varying vec3 vPos;
void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform float uTime;
uniform float uLife;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uSeed;

varying vec3 vPos;

void main() {
  float life = clamp(uLife, 0.0, 1.0);
  float t1 = sin(uTime * 7.0 + vPos.y * 4.0 + uSeed) * 0.5 + 0.5;
  float t2 = sin(uTime * 4.0 + vPos.x * 3.0 + uSeed * 0.7) * 0.5 + 0.5;

  vec3 col = mix(uColorA, uColorB, t1);
  col = mix(col, uColorC, t2 * 0.55);

  float shimmer = 0.65 + 0.35 * sin(uTime * 14.0 + uSeed);
  float alpha = (1.0 - life) * shimmer * 0.8;

  gl_FragColor = vec4(col, alpha);
}
`;

/**
 * Shader-based aurora boost style.
 */
export class ShaderAuroraBoost extends Boost {
  /**
   * @param {THREE.Object3D} scene
   * @param {Partial<typeof BOOST_DEFAULTS>} [options]
   */
  constructor(scene, options = {}) {
    super(scene, {
      boostColour: 0x66ffd5,
      particlesPerSecond: 85,
      particleLife: 1.55,
      particleSpread: 0.2,
      particleRandomness: 0.04,
      particleScaleFactor: 1.55,
      particleMaxScale: 3.2,
      ...options,
    });
  }

  _createShaderMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uLife: { value: 1 },
        uSeed: { value: Math.random() * 1000 },
        uColorA: { value: new THREE.Color(0x5dff7a) },
        uColorB: { value: new THREE.Color(0x35d6ff) },
        uColorC: { value: new THREE.Color(0x6b73ff) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }

  _initPool() {
    for (let i = 0; i < this._poolSize; i++) {
      const mesh = new THREE.Mesh(this._particleGeometry, this._createShaderMaterial());
      mesh.visible = false;
      mesh.userData.velocity = new THREE.Vector3();
      mesh.userData.life = 0;
      mesh.userData.totalLife = 0;
      mesh.userData.baseOpacity = 0;
      mesh.userData.baseSize = 0.04;
      this.particleGroup.add(mesh);
      this._particles.push(mesh);
      this._availableParticles.push(mesh);
    }
  }

  _spawnParticle(offset, quaternion) {
    super._spawnParticle(offset, quaternion);
    const particle = this._activeParticles[this._activeParticles.length - 1];
    if (!particle || !particle.material?.uniforms) return;

    particle.material.uniforms.uTime.value = 0;
    particle.material.uniforms.uLife.value = 1;
    particle.material.uniforms.uSeed.value = Math.random() * 1000;
  }

  updateParticles(dt) {
    super.updateParticles(dt);
    for (const p of this._activeParticles) {
      if (!p.material?.uniforms) continue;
      const totalLife = Math.max(p.userData.totalLife || 1, 1e-6);
      p.material.uniforms.uTime.value += dt;
      p.material.uniforms.uLife.value = THREE.MathUtils.clamp(p.userData.life / totalLife, 0, 1);
    }
  }
}
