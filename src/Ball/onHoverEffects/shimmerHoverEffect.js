import * as THREE from 'three';

const SHIMMER_VERTEX_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const SHIMMER_FRAGMENT_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
uniform vec3 baseColor;
uniform float time;
uniform float shimmerStrength;

void main() {
    float shimmerWave = sin(vWorldPos.y * 6.0 + vWorldPos.x * 3.0 + time * 4.0);
    float shimmerMask = smoothstep(0.2, 1.0, shimmerWave * 0.5 + 0.5);

    vec3 shimmerColor = vec3(0.6, 0.85, 1.0) * shimmerMask * shimmerStrength;
    vec3 outColor = baseColor + shimmerColor;

    gl_FragColor = vec4(outColor, 1.0);
}`;

export const createShimmerHoverMaterial = (color) => {
    const uniforms = {
        baseColor: { value: new THREE.Color(color ?? 0x049ef4) },
        time: { value: 0 },
        shimmerStrength: { value: 0.45 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader: SHIMMER_VERTEX_SHADER,
        fragmentShader: SHIMMER_FRAGMENT_SHADER,
        uniforms,
        transparent: false,
        depthWrite: true,
    });

    return { material, uniforms };
};
