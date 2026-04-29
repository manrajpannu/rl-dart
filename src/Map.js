import * as THREE from 'three';

const planeMat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: false,
    uniforms: {
        uColorA: { value: new THREE.Color('rgb(255, 255, 255)') },
        uColorB: { value: new THREE.Color('rgb(255, 191, 223)') },
        uChecks: { value: 25.0 },
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
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
    `,
});

/**
 * Training ground map plane.
 * Generates a textured ground mesh used as the visual play area.
 */
export class Map extends THREE.Group {

    constructor(planeSize = 160) {
        super();
        this.planeSize = planeSize;
    }

    /**
     * Builds the ground plane and texture tiling based on configured plane size.
     */
    gen() {
        const planeGeo = new THREE.PlaneGeometry( this.planeSize, this.planeSize );

        const mesh = new THREE.Mesh( planeGeo, planeMat );
        mesh.rotation.x = Math.PI * - .5;
        mesh.receiveShadow = true;
        this.add( mesh );
    }
}

 