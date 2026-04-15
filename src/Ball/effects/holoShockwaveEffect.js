import * as THREE from 'three';

const VERT_SHADER = `
attribute float aAngle;
attribute float aOffset;
uniform float uProgress;
uniform float uRadius;
uniform float uPointScale;
varying float vFade;

void main() {
    float spread = uRadius * (0.25 + 0.75 * uProgress) + aOffset;
    vec3 p = vec3(cos(aAngle) * spread, (aOffset - 0.02) * 2.0, sin(aAngle) * spread);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (4.0 + 8.0 * (1.0 - abs(aOffset) * 10.0)) * (uPointScale / -mvPosition.z);
    vFade = 1.0 - uProgress;
}
`;

const FRAG_SHADER = `
varying float vFade;

void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d = length(uv);
    if (d > 1.0) discard;
    float core = exp(-8.0 * d * d);
    float rim = smoothstep(0.92, 0.28, d);
    float a = clamp((0.55 * core + 0.7 * rim) * vFade, 0.0, 1.0);
    gl_FragColor = vec4(0.34, 0.98, 0.92, a);
}
`;

export function playHoloShockwaveEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const count = 140;
    const duration = 0.38;
    const angles = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        angles[i] = (i / count) * Math.PI * 2;
        offsets[i] = (Math.random() - 0.5) * 0.06;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

    const material = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uProgress: { value: 0 },
            uRadius: { value: 2.9 },
            uPointScale: { value: 320 },
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
        const t = Math.min(1, (performance.now() - start) / 1000 / duration);
        material.uniforms.uProgress.value = t;
        if (t >= 1) return cleanup();
        rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
}
