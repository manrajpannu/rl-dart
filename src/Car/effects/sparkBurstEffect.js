import * as THREE from 'three';

const VERT_SHADER = `
attribute vec3 aVelocity;
attribute vec3 aColor;
attribute float aSize;
attribute float aSpin;
uniform float uTime;
uniform float uDuration;
uniform float uGravity;
uniform float uPointScale;
varying vec3 vColor;
varying float vLife;
varying float vSpin;

void main() {
    float t = max(0.0, uTime);
    vec3 p = position + aVelocity * t + vec3(0.0, -0.5 * uGravity * t * t, 0.0);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (uPointScale / -mvPosition.z);
    vLife = max(0.0, 1.0 - t / max(0.0001, uDuration));
    vColor = aColor;
  vSpin = aSpin;
}
`;

const FRAG_SHADER = `
varying vec3 vColor;
varying float vLife;
varying float vSpin;

void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float c = cos(vSpin);
  float s = sin(vSpin);
  uv = mat2(c, -s, s, c) * uv;

    float r = length(uv);
    if (r > 1.0) discard;

  float core = exp(-28.0 * dot(uv, uv));
  float streak = exp(-42.0 * abs(uv.x)) * exp(-4.0 * abs(uv.y));
  float tail = exp(-18.0 * max(0.0, uv.y + 0.25));
  float alpha = clamp((0.5 * core + 0.95 * streak * tail) * vLife, 0.0, 1.0);
    gl_FragColor = vec4(vColor, alpha);
}
`;

function createSparkColors(baseColor, count) {
    const colors = new Float32Array(count * 3);
    const base = new THREE.Color(baseColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const tint = base.clone().lerp(new THREE.Color(0xfff08a), 0.35 + Math.random() * 0.25);
      colors[i3] = tint.r;
      colors[i3 + 1] = tint.g;
      colors[i3 + 2] = tint.b;
    }

    return colors;
}

export function playSparkBurstEffect(root, position, options = {}) {
    if (!root || !position) return;

    const count = options.count ?? 18;
    const duration = options.duration ?? 0.18;
    const speed = options.speed ?? 7.5;
    const spread = options.spread ?? 0.06;
    const sizeMin = options.sizeMin ?? 1.8;
    const sizeMax = options.sizeMax ?? 3.6;
    const baseColor = options.color ?? 0xffd94a;

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = createSparkColors(baseColor, count);
    const sizes = new Float32Array(count);
    const spins = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ).normalize();

      positions[i3] = direction.x * spread;
      positions[i3 + 1] = direction.y * spread;
      positions[i3 + 2] = direction.z * spread;

      const jitteredSpeed = speed * (0.6 + Math.random() * 0.7);
      velocities[i3] = direction.x * jitteredSpeed;
      velocities[i3 + 1] = direction.y * jitteredSpeed;
      velocities[i3 + 2] = direction.z * jitteredSpeed;

      sizes[i] = sizeMin + Math.random() * Math.max(0.01, sizeMax - sizeMin);
      spins[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSpin', new THREE.BufferAttribute(spins, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT_SHADER,
      fragmentShader: FRAG_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uDuration: { value: duration },
        uGravity: { value: 9.5 },
        uPointScale: { value: 390.0 },
      },
    });

    const points = new THREE.Points(geometry, material);
    points.position.copy(position);
    points.frustumCulled = false;
    root.add(points);

    const start = performance.now();
    let rafId = 0;

    const cleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      root.remove(points);
      geometry.dispose();
      material.dispose();
    };

    const tick = () => {
      if (!points.parent) return cleanup();
      const elapsed = (performance.now() - start) / 1000;
      material.uniforms.uTime.value = elapsed;
      if (elapsed >= duration) return cleanup();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
}