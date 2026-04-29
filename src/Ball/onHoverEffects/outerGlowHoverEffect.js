import * as THREE from 'three';

const OUTER_GLOW_VERTEX_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const OUTER_GLOW_FRAGMENT_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
uniform float time;
uniform float glowStrength;
uniform float pulseSpeed;
uniform float pulseAmount;

void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);

    float rim = pow(1.0 - clamp(dot(n, viewDir), 0.0, 1.0), 2.5);
    float pulse = 1.0 + sin(time * pulseSpeed) * pulseAmount;
    float alpha = clamp(rim * glowStrength * pulse, 0.0, 1.0);

    if (alpha <= 0.001) discard;
    gl_FragColor = vec4(vec3(0.0), alpha);
}`;

export const createOuterGlowHoverMaterial = () => {
    const uniforms = {
        time: { value: 0 },
        glowStrength: { value: 0.9 },
        pulseSpeed: { value: 2.2 },
        pulseAmount: { value: 0.18 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader: OUTER_GLOW_VERTEX_SHADER,
        fragmentShader: OUTER_GLOW_FRAGMENT_SHADER,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    });

    return {
        material,
        uniforms,
        applyTo: 'overlay',
        overlayScale: 1.08,
    };
};
