export const X_RETICLE_FRAGMENT_SHADER = `
varying vec3 vNormal;
uniform vec3 color;
uniform float barThickness;
uniform float gapRadius;
uniform float crossSize;
uniform float edgeSoftness;
uniform vec3 centerDir;
uniform vec3 basisX;
uniform vec3 basisY;
uniform float effectType;
uniform float effectIntensity;
uniform float effectScale;
uniform float time;

void main() {
    vec3 n = normalize(vNormal);
    float facing = dot(n, centerDir);
    if (facing <= 0.0) discard;

    float u = dot(n, basisX);
    float v = dot(n, basisY);
    float absU = abs(u);
    float absV = abs(v);

    float sizeMask = smoothstep(crossSize, crossSize - edgeSoftness, max(absU, absV));
    float diag1 = smoothstep(barThickness, barThickness - edgeSoftness, abs(u - v));
    float diag2 = smoothstep(barThickness, barThickness - edgeSoftness, abs(u + v));
    float cross = max(diag1, diag2);
    float gapMask = smoothstep(gapRadius, gapRadius - edgeSoftness, max(absU, absV));

    float alpha = cross * sizeMask * (1.0 - gapMask);
    if (alpha <= 0.0) discard;

    vec3 outColor = color;
    if (effectType > 0.5 && effectType < 1.5) {
        float noise = fract(sin(dot(vec2(u, v) * effectScale + time, vec2(12.9898, 78.233))) * 43758.5453);
        float sparkle = smoothstep(0.92, 1.0, noise) * effectIntensity;
        outColor = mix(outColor, vec3(1.0), sparkle);
    } else if (effectType > 1.5 && effectType < 2.5) {
        float pulse = (sin(time * 6.0) * 0.5 + 0.5) * effectIntensity;
        outColor *= 1.0 + pulse;
        alpha *= 0.85 + pulse;
    } else if (effectType > 2.5 && effectType < 3.5) {
        float scan = abs(sin(v * effectScale + time * 8.0));
        outColor *= 0.7 + 0.3 * scan;
        alpha *= 0.7 + 0.3 * scan;
    } else if (effectType > 3.5) {
        float shimmer = smoothstep(0.0, 0.6, abs(sin((u + time * 0.8) * effectScale)));
        outColor *= 0.8 + 0.4 * shimmer;
        alpha *= 0.8 + 0.4 * shimmer;
    }

    gl_FragColor = vec4(outColor, alpha);
}`;
