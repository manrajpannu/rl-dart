import * as THREE from 'three';

/**
 * Spawns a brief expanding bubble shell effect at kill position.
 * @param {import('../Ball').Ball} ball
 */
export function playBubblePopEffect(ball) {
    if (!ball || !ball.parent) return;

    const root = ball.parent;
    const origin = new THREE.Vector3();
    ball.getWorldPosition(origin);

    const radius = Math.max(0.25, ball.radius || 0.5);
    const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 0.6, 24, 24),
        new THREE.MeshBasicMaterial({
            color: 0xb9e9ff,
            transparent: true,
            opacity: 0.65,
            depthWrite: false,
        }),
    );
    bubble.position.copy(origin);
    root.add(bubble);

    let elapsed = 0;
    const duration = 0.22;
    let lastTime = performance.now();

    bubble.onBeforeRender = () => {
        const now = performance.now();
        const dt = Math.min(0.04, (now - lastTime) / 1000);
        lastTime = now;
        elapsed += dt;

        const t = Math.min(1, elapsed / duration);
        const scale = 1 + t * 1.8;
        bubble.scale.setScalar(scale);
        bubble.material.opacity = 0.65 * (1 - t);

        if (elapsed >= duration) {
            bubble.onBeforeRender = null;
            bubble.geometry.dispose();
            bubble.material.dispose();
            root.remove(bubble);
        }
    };
}
