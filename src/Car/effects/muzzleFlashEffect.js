import * as THREE from 'three';

const VERT_SHADER = `
varying vec2 vUv;
uniform float uScale;

void main() {
    vUv = uv;
    vec3 p = position;
    p.x *= uScale;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAG_SHADER = `
varying vec2 vUv;
uniform float uAlpha;

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float core = exp(-32.0 * r * r); // white hot core
    float mid = exp(-8.0 * r * r);
    float outer = smoothstep(0.5, 1.0, r);

    // Color stops: white (center), orange, red (outer)
    vec3 color = vec3(1.0); // white core
    color = mix(color, vec3(1.0, 0.55, 0.0), mid * 0.8); // orange mid
    color = mix(color, vec3(0.9, 0.1, 0.05), outer); // red outer

    float alpha = (core * 1.1 + mid * 0.7 + outer * 0.4) * uAlpha;
    alpha *= 1.0 - smoothstep(0.98, 1.05, r); // fade edge
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
}
`;

export function playMuzzleFlashEffect(root, position, direction) {
    if (!root || !position || !direction) return;

    const flashGroup = new THREE.Group();
    flashGroup.position.copy(position);
    flashGroup.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );

    const createFlashPlane = (rotationY = 0) => {
      const geometry = new THREE.PlaneGeometry(0.34, 0.5, 1, 1);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uAlpha: { value: 1.0 },
          uScale: { value: 1.0 },
        },
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = rotationY;
      flashGroup.add(mesh);
      return mesh;
    };

    const flashA = createFlashPlane(0);
    const flashB = createFlashPlane(Math.PI / 2);
    root.add(flashGroup);

    const start = performance.now();
    const duration = 0.09;
    let rafId = 0;

    const cleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      root.remove(flashGroup);
      [flashA, flashB].forEach((flash) => {
        flash.geometry.dispose();
        flash.material.dispose();
      });
    };

    const tick = () => {
      if (!flashGroup.parent) return cleanup();
      const elapsed = (performance.now() - start) / 1000;
      const t = Math.min(1, elapsed / duration);
      const alpha = 1 - t;
      const scale = 1 + t * 0.9;

      const matA = flashA.material;
      const matB = flashB.material;
      matA.uniforms.uAlpha.value = alpha;
      matA.uniforms.uScale.value = scale;
      matB.uniforms.uAlpha.value = alpha;
      matB.uniforms.uScale.value = scale;

      if (t >= 1) return cleanup();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
}