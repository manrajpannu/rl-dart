import * as THREE from 'three';

const VERT_SHADER = `
attribute vec3 aVelocity;
attribute vec3 aColor;
attribute float aSize;
attribute float aTwinkle;
uniform float uTime;
uniform float uDuration;
uniform float uGravity;
uniform float uPointScale;
varying vec3 vColor;
varying float vLife;
varying float vTwinkle;

void main() {
    float t = max(0.0, uTime);
    vec3 v = aVelocity * max(0.0, 1.0 - 0.65 * t / max(0.0001, uDuration));
    vec3 p = position + v * t + vec3(0.0, -0.5 * uGravity * t * t, 0.0);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float life = max(0.0, 1.0 - t / max(0.0001, uDuration));
    float pulse = 0.65 + 0.35 * sin(t * 36.0 + aTwinkle * 12.0);
    gl_PointSize = aSize * pulse * (uPointScale / -mvPosition.z);

    vColor = aColor;
    vLife = life;
    vTwinkle = aTwinkle;
}
`;

const FRAG_SHADER = `
varying vec3 vColor;
varying float vLife;
varying float vTwinkle;

void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r = length(uv);
    if (r > 1.0) discard;

    float core = exp(-15.0 * r * r);
    float streakA = exp(-34.0 * abs(uv.x)) + exp(-34.0 * abs(uv.y));
    float streakB = exp(-26.0 * abs(uv.x + uv.y)) + exp(-26.0 * abs(uv.x - uv.y));
    float rim = pow(clamp(1.0 - r, 0.0, 1.0), 5.0);
    float sparkle = 0.72 * core + 0.44 * streakA + 0.34 * streakB + 0.52 * rim;

    float flicker = 0.82 + 0.18 * sin(vTwinkle * 21.0 + r * 14.0);
    float alpha = clamp(sparkle * flicker * vLife, 0.0, 1.0);

    vec3 reflected = mix(vColor, vec3(1.0), clamp(0.72 * sparkle + 0.18 * rim, 0.0, 1.0));
    reflected += vec3(0.18, 0.18, 0.18) * rim;
    gl_FragColor = vec4(reflected, alpha);
}
`;

export function playWhiteGlitterExplosionEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const count = 64;
    const duration = 0.78;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkles = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const dir = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
        ).normalize();

        const spread = 0.03 + Math.random() * 0.11;
        positions[i3] = dir.x * spread;
        positions[i3 + 1] = dir.y * spread;
        positions[i3 + 2] = dir.z * spread;

        const speed = 4.8 + Math.random() * 5.4;
        velocities[i3] = dir.x * speed;
        velocities[i3 + 1] = dir.y * speed;
        velocities[i3 + 2] = dir.z * speed;

        const light = 0.88 + Math.random() * 0.12;
        const c = new THREE.Color().setHSL(0, 0, Math.min(1.0, light));
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = 0.55 + Math.random() * 0.7;
        twinkles[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkles, 1));

    const material = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uDuration: { value: duration },
            uGravity: { value: 7.5 },
            uPointScale: { value: 420.0 },
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
