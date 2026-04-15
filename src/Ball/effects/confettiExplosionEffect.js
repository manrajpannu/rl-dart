import * as THREE from 'three';

const CONFETTI_CONFIG = {
    particleCount: 100,
    durationSeconds: 0.78,
    gravity: 7.8,

    // Initial radial spawn offset from explosion center.
    startOffsetMin: 0.01,
    startOffsetMax: 0.08,

    // Initial velocity magnitude.
    speedMin: 7.2,
    speedMax: 10.2,

    // Per-particle sprite sizing.
    sizeMin: 0.25,
    sizeMax: 1,

    // Flake shape controls.
    halfHeightMin: 0.09,
    halfHeightMax: 0.2,
    halfWidth: 0.8,

    // Rotation controls.
    spinMaxAbs: 22.0,

    // Color range in HSL.
    hueMin: 0.0,
    hueMax: 1.0,
    saturation: 1.0,
    lightness: 0.68,

    // Perspective scaling for point size.
    pointScale: 300.0,
};

const VERT_SHADER = `
attribute vec3 aVelocity;
attribute vec3 aColor;
attribute float aSize;
attribute float aAngle;
attribute float aSpin;
attribute float aHalfHeight;
uniform float uTime;
uniform float uGravity;
uniform float uDuration;
uniform float uPointScale;
varying vec3 vColor;
varying float vFade;
varying float vAngle;
varying float vHalfHeight;

void main() {
    float t = max(0.0, uTime);
    vec3 p = position + aVelocity * t + vec3(0.0, -0.5 * uGravity * t * t, 0.0);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * (uPointScale / -mvPosition.z);
    vFade = max(0.0, 1.0 - t / max(0.0001, uDuration));
    vColor = aColor;
    vAngle = aAngle + aSpin * t;
    vHalfHeight = aHalfHeight;
}
`;

const FRAG_SHADER = `
varying vec3 vColor;
varying float vFade;
varying float vAngle;
varying float vHalfHeight;
uniform float uHalfWidth;

void main() {
    // Rotate UV, then keep only a tiny rectangle so it reads like confetti paper.
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float c = cos(vAngle);
    float s = sin(vAngle);
    vec2 ruv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

    float halfWidth = uHalfWidth;
    float halfHeight = clamp(vHalfHeight, 0.08, 0.28);
    if (abs(ruv.x) > halfWidth || abs(ruv.y) > halfHeight) discard;

    float alpha = vFade;
    gl_FragColor = vec4(vColor, alpha);
}
`;

/**
 * GPU confetti burst with rectangular flakes.
 * CPU work per-frame is only one time uniform update.
 * @param {import('../Ball').Ball} ball
 */
export function playConfettiExplosionEffect(ball) {
    if (!ball || !ball.parent) return;
    const radius = ball.getRadius()
    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const particleCount = CONFETTI_CONFIG.particleCount;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const spins = new Float32Array(particleCount);
    const halfHeights = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        const len = Math.hypot(x, y, z) || 1;

        const nx = x / len;
        const ny = y / len;
        const nz = z / len;

        const startOffset = CONFETTI_CONFIG.startOffsetMin + Math.random() * (CONFETTI_CONFIG.startOffsetMax - CONFETTI_CONFIG.startOffsetMin);
        positions[i3] = nx * startOffset;
        positions[i3 + 1] = ny * startOffset;
        positions[i3 + 2] = nz * startOffset;

        const speed = CONFETTI_CONFIG.speedMin + Math.random() * (CONFETTI_CONFIG.speedMax - CONFETTI_CONFIG.speedMin);
        velocities[i3] = nx * speed * radius * 0.4;
        velocities[i3 + 1] = ny * speed * radius * 0.4;
        velocities[i3 + 2] = nz * speed * radius * 0.4;

        const hue = CONFETTI_CONFIG.hueMin + Math.random() * (CONFETTI_CONFIG.hueMax - CONFETTI_CONFIG.hueMin);
        const c = new THREE.Color().setHSL(hue, CONFETTI_CONFIG.saturation, CONFETTI_CONFIG.lightness);
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = CONFETTI_CONFIG.sizeMin + Math.random() * (CONFETTI_CONFIG.sizeMax - CONFETTI_CONFIG.sizeMin);
        angles[i] = Math.random() * 6.283185307;
        spins[i] = (Math.random() - 0.5) * (2 * CONFETTI_CONFIG.spinMaxAbs);
        halfHeights[i] = CONFETTI_CONFIG.halfHeightMin + Math.random() * (CONFETTI_CONFIG.halfHeightMax - CONFETTI_CONFIG.halfHeightMin);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute('aSpin', new THREE.BufferAttribute(spins, 1));
    geometry.setAttribute('aHalfHeight', new THREE.BufferAttribute(halfHeights, 1));

    const duration = CONFETTI_CONFIG.durationSeconds;

    const material = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
            uTime: { value: 0 },
            uGravity: { value: CONFETTI_CONFIG.gravity },
            uDuration: { value: duration },
            uPointScale: { value: CONFETTI_CONFIG.pointScale },
            uHalfWidth: { value: CONFETTI_CONFIG.halfWidth },
        },
    });

    const points = new THREE.Points(geometry, material);
    points.position.copy(origin);
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
        if (!points.parent) {
            cleanup();
            return;
        }

        const elapsed = (performance.now() - start) / 1000;
        material.uniforms.uTime.value = elapsed;

        if (elapsed >= duration) {
            cleanup();
            return;
        }

        rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
}
