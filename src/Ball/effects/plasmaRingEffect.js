import * as THREE from 'three';

const VERT_SHADER = `
uniform float uScale;
void main() {
    vec3 p = position * uScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const FRAG_SHADER = `
uniform vec3 uColor;
uniform float uAlpha;
varying vec2 vUv;

void main() {
    // Ring brightness is handled by geometry + alpha over time.
    gl_FragColor = vec4(uColor, uAlpha);
}
`;

export function playPlasmaRingEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const geometry = new THREE.TorusGeometry(0.32, 0.06, 24, 72);
    const material = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uScale: { value: 1.0 },
            uColor: { value: new THREE.Color(0x56d5ff) },
            uAlpha: { value: 0.95 },
        },
    });

    const ring = new THREE.Mesh(geometry, material);
    ring.position.copy(origin);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    ring.rotation.z = Math.random() * Math.PI;
    root.add(ring);

    const duration = 0.34;
    const start = performance.now();
    let rafId = 0;

    const cleanup = () => {
        if (rafId) cancelAnimationFrame(rafId);
        root.remove(ring);
        geometry.dispose();
        material.dispose();
    };

    const tick = () => {
        if (!ring.parent) return cleanup();

        const t = Math.min(1, (performance.now() - start) / 1000 / duration);
        material.uniforms.uScale.value = 1.0 + t * 3.4;
        material.uniforms.uAlpha.value = (1.0 - t) * 0.95;
        ring.rotation.z += 0.14;

        if (t >= 1) return cleanup();
        rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
}
