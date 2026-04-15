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

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

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
uniform float uTime;
varying vec3 vColor;
varying float vLife;
varying float vTwinkle;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r = length(uv);
    if (r > 1.0) discard;

    float core = exp(-18.0 * r * r);
    float streakA = exp(-42.0 * abs(uv.x)) + exp(-42.0 * abs(uv.y));
    float streakB = exp(-30.0 * abs(uv.x + uv.y)) + exp(-30.0 * abs(uv.x - uv.y));
    float rim = pow(clamp(1.0 - r, 0.0, 1.0), 4.0);
    float sparkle = 0.52 * core + 0.34 * streakA + 0.24 * streakB + 0.34 * rim;

    float flicker = 0.78 + 0.22 * sin(vTwinkle * 27.0 + uTime * 8.0 + r * 14.0);
    float alpha = clamp(sparkle * flicker * vLife * 0.72, 0.0, 0.88);

    float hue = fract(vTwinkle + uTime * 0.28 + r * 0.2);
    vec3 rainbow = hsv2rgb(vec3(hue, 1.0, 1.0));
    vec3 reflected = mix(vColor, rainbow, 0.9);
    reflected *= (0.72 + 0.4 * sparkle);
    reflected += reflected * (0.1 * core + 0.06 * rim);
    gl_FragColor = vec4(reflected, alpha);
}
`;

export function playRainbowGlitterExplosionEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const count = 150;
    const duration = 0.82;
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

        const speed = 2 * ball.getRadius() + Math.random() * 10.8;
        velocities[i3] = dir.x * speed;
        velocities[i3 + 1] = dir.y * speed;
        velocities[i3 + 2] = dir.z * speed;

        const hue = Math.random();
        const c = new THREE.Color().setHSL(hue, 1.0, 0.52 + Math.random() * 0.16);
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = 0.6 + Math.random() * 0.8;
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
            uGravity: { value: 7.0 },
            uPointScale: { value: 430.0 },
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
