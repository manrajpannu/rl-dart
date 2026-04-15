import * as THREE from 'three';

const VERT_SHADER = `
attribute vec3 aVelocity;
attribute vec3 aColor;
attribute float aSize;
uniform float uTime;
uniform float uGravity;
varying vec3 vColor;
varying float vFade;

void main() {
    float t = max(0.0, uTime);
    vec3 p = position + aVelocity * t + vec3(0.0, -0.5 * uGravity * t * t, 0.0);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    vFade = max(0.0, 1.0 - t * 2.8);
    vColor = aColor;
}
`;

const FRAG_SHADER = `
varying vec3 vColor;
varying float vFade;

void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r2 = dot(uv, uv);
    if (r2 > 1.0) discard;

    float alpha = (1.0 - smoothstep(0.0, 1.0, r2)) * vFade;
    gl_FragColor = vec4(vColor, alpha);
}
`;

/**
 * Rainbow bubble pop burst.
 * @param {import('../Ball').Ball} ball
 */
export function playRainbowBubblePopEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const particleCount = 28;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const x = (Math.random() - 0.5) * 2;
        const y = 0.45 + Math.random() * 1.25;
        const z = (Math.random() - 0.5) * 2;
        const len = Math.hypot(x, y, z) || 1;

        const nx = x / len;
        const ny = y / len;
        const nz = z / len;

        const startOffset = 0.02 + Math.random() * 0.08;
        positions[i3] = nx * startOffset;
        positions[i3 + 1] = ny * startOffset;
        positions[i3 + 2] = nz * startOffset;

        const speed = 2.6 + Math.random() * 3.4;
        velocities[i3] = nx * speed;
        velocities[i3 + 1] = ny * speed;
        velocities[i3 + 2] = nz * speed;

        const c = new THREE.Color().setHSL(Math.random(), 0.85, 0.62);
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = 3.0 + Math.random() * 3.5;
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
        blending: THREE.NormalBlending,
        uniforms: {
            uTime: { value: 0 },
            uGravity: { value: 9.8 },
        },
    });

    const points = new THREE.Points(geometry, material);
    points.position.copy(origin);
    points.frustumCulled = false;
    root.add(points);

    const duration = 0.33;
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
