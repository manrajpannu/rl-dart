export const RETICLE_VERTEX_SHADER = `
varying vec3 vNormal;
void main() {
    vNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
