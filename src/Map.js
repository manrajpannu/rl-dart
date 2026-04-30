import * as THREE from 'three';

const VERTEX_SHADER = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const FRAGMENT_SHADER = `
    varying vec2 vUv;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uChecks;

    void main() {
        vec2 gridUv = vUv * uChecks;
        vec2 cell = floor(gridUv);
        float checker = mod(cell.x + cell.y, 2.0);
        vec3 color = mix(uColorA, uColorB, checker);

        gl_FragColor = vec4(color, 1.0);
    }
`;

/**
 * Training ground map plane.
 * Generates a textured ground mesh used as the visual play area.
 */
export class Map extends THREE.Group {

    constructor(planeSize = 160) {
        super();
        this.planeSize = planeSize;
        this._isDark = false;
        
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: false,
            uniforms: {
                uColorA: { value: new THREE.Color(0xffffff) },
                uColorB: { value: new THREE.Color(0xffbfdf) },
                uChecks: { value: 25.0 },
            },
            vertexShader: VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
        });
    }

    /**
     * Builds the ground plane and texture tiling based on configured plane size.
     */
    gen() {
        const planeGeo = new THREE.PlaneGeometry( this.planeSize, this.planeSize );
        const mesh = new THREE.Mesh( planeGeo, this.material );
        mesh.rotation.x = Math.PI * - .5;
        mesh.receiveShadow = true;
        this.add( mesh );
    }

    setDarkMode(isDark) {
        this._isDark = isDark;
        if (isDark) {
            this.material.uniforms.uColorA.value.set(0x0a0a0a);
            this.material.uniforms.uColorB.value.set(0x1a1a1a);
        } else {
            this.material.uniforms.uColorA.value.set(0xffffff);
            this.material.uniforms.uColorB.value.set(0xffbfdf);
        }
    }
}