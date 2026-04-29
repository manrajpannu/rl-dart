import * as THREE from 'three';

const STROKE_VERTEX_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const STROKE_FRAGMENT_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
uniform vec3 baseColor;
uniform float edgeThickness;

void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float rim = 1.0 - clamp(dot(n, viewDir), 0.0, 1.0);
    float edge = smoothstep(1.0 - edgeThickness, 1.0, rim);

    vec3 outColor = mix(baseColor, vec3(0.0), edge);
    gl_FragColor = vec4(outColor, 1.0);
}`;

export const createStrokeHoverMaterial = (color) => {
    const uniforms = {
        baseColor: { value: new THREE.Color(color ?? 0x049ef4) },
        edgeThickness: { value: 0.28 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader: STROKE_VERTEX_SHADER,
        fragmentShader: STROKE_FRAGMENT_SHADER,
        uniforms,
        transparent: false,
        depthWrite: true,
    });

    return { material, uniforms };
};
