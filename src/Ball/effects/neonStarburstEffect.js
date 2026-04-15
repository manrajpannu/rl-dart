import * as THREE from 'three';

const VERT_SHADER = `
attribute vec3 aVelocity;
attribute vec3 aColor;
attribute float aSize;
uniform float uTime;
uniform float uGravity;
uniform float uDuration;
uniform float uPointScale;
varying vec3 vColor;
varying float vLife;

void main() {
    float t = max(0.0, uTime);
    vec3 p = position + aVelocity * t + vec3(0.0, -0.5 * uGravity * t * t, 0.0);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (uPointScale / -mvPosition.z);
    vLife = max(0.0, 1.0 - t / max(0.0001, uDuration));
    vColor = aColor;
}
`;

const FRAG_SHADER = `
varying vec3 vColor;
varying float vLife;

void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r = length(uv);
    if (r > 1.0) discard;

    // Neon cross/star shape using axis-aligned spikes.
    float star = max(
        exp(-18.0 * abs(uv.x)) + exp(-18.0 * abs(uv.y)),
        0.35 * exp(-7.0 * r)
    );
    float alpha = clamp(star * vLife, 0.0, 1.0);
    gl_FragColor = vec4(vColor, alpha);
}
`;

export function playNeonStarburstEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const count = 72;
    const duration = 0.42;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const dir = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
        ).normalize();

        positions[i3] = dir.x * (0.01 + Math.random() * 0.06);
        positions[i3 + 1] = dir.y * (0.01 + Math.random() * 0.06);
        positions[i3 + 2] = dir.z * (0.01 + Math.random() * 0.06);

        const speed = 4.0 + Math.random() * 3.8;
        velocities[i3] = dir.x * speed;
        velocities[i3 + 1] = dir.y * speed;
        velocities[i3 + 2] = dir.z * speed;

        const c = new THREE.Color().setHSL(0.5 + Math.random() * 0.35, 1.0, 0.62);
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = 5.5 + Math.random() * 4.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uGravity: { value: 8.2 },
            uDuration: { value: duration },
            uPointScale: { value: 320.0 },
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
        if (!points.parent) return cleanup();
        const elapsed = (performance.now() - start) / 1000;
        material.uniforms.uTime.value = elapsed;
        if (elapsed >= duration) return cleanup();
        rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
}
