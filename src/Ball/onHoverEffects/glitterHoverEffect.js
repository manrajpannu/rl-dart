import * as THREE from 'three';

const GLITTER_VERTEX_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const GLITTER_FRAGMENT_SHADER = `
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
uniform vec3 baseColor;
uniform float time;
uniform float sparkleStrength;
uniform float sparkleScale;
uniform float glitterDensity;

float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float glitterLayer(vec3 worldPos, float scale, float density, float t, float phaseOffset) {
    vec3 p = worldPos * scale + vec3(phaseOffset, phaseOffset * 0.7, phaseOffset * 1.3);
    vec3 cell = floor(p);
    vec3 local = fract(p) - 0.5;

    float seed = hash(cell + vec3(17.0, 31.0, 47.0));
    float present = step(density, hash(cell + vec3(71.0, 29.0, 11.0)));

    vec3 jitter = vec3(
        hash(cell + vec3(1.0, 0.0, 0.0)),
        hash(cell + vec3(0.0, 1.0, 0.0)),
        hash(cell + vec3(0.0, 0.0, 1.0))
    ) - 0.5;

    float distToFlake = length(local - jitter * 0.45);
    float flake = smoothstep(0.34, 0.06, distToFlake);

    float twinkle = sin(t * (4.0 + seed * 8.0) + seed * 6.2831) * 0.5 + 0.5;
    float twinkleMask = smoothstep(0.35, 1.0, twinkle);

    return present * flake * twinkleMask;
}

void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 lightDir = normalize(vec3(0.25, 0.9, 0.35));

    float sparkleA = glitterLayer(vWorldPos, sparkleScale, glitterDensity, time, 0.0);
    float sparkleB = glitterLayer(vWorldPos + vec3(13.2, 7.1, 5.3), sparkleScale * 1.22, glitterDensity + 0.01, time, 2.3);
    float sparkleC = glitterLayer(vWorldPos + vec3(5.7, 11.4, 2.1), sparkleScale * 0.72, glitterDensity + 0.03, time, 1.1);
    float sparkle = max(max(sparkleA, sparkleB * 0.95), sparkleC * 1.2);

    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(n, halfDir), 0.0), 30.0);
    float rim = pow(1.0 - clamp(dot(n, viewDir), 0.0, 1.0), 2.0);
    sparkle *= spec * mix(0.55, 1.25, rim);

    float colorNoise = hash(floor(vWorldPos * sparkleScale * 0.7) + vec3(9.0, 3.0, 5.0));
    vec3 sparkleColor = mix(vec3(0.85, 0.93, 1.0), vec3(1.0, 0.9, 0.55), colorNoise);
    float lambert = max(dot(n, lightDir), 0.0);
    vec3 litBase = baseColor * (0.9 + lambert * 0.35);
    vec3 outColor = litBase + sparkleColor * sparkleStrength * sparkle;
    gl_FragColor = vec4(outColor, 1.0);
}`;

export const createGlitterHoverMaterial = (color) => {
    const uniforms = {
        baseColor: { value: new THREE.Color(color ?? 0x049ef4) },
        time: { value: 0 },
        sparkleStrength: { value: 0.68 },
        sparkleScale: { value: 20.5 },
        glitterDensity: { value: 0.9 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader: GLITTER_VERTEX_SHADER,
        fragmentShader: GLITTER_FRAGMENT_SHADER,
        uniforms,
        transparent: false,
        depthWrite: true,
    });

    return { material, uniforms };
};
