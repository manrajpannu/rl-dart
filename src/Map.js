import * as THREE from 'three';

const planeMat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: false,
    uniforms: {
        uBaseA: { value: new THREE.Color(0x183a5f) },
        uBaseB: { value: new THREE.Color(0x2f75aa) },
        uGridA: { value: new THREE.Color(0x8ed9ff) },
        uGridB: { value: new THREE.Color(0x4cb6f3) },
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
        uniform vec3 uBaseA;
        uniform vec3 uBaseB;
        uniform vec3 uGridA;
        uniform vec3 uGridB;

        float gridMask(vec2 uv, float scale, float thickness) {
            vec2 g = abs(fract(uv * scale) - 0.5);
            float line = min(g.x, g.y);
            return 1.0 - smoothstep(0.0, thickness, line);
        }

        void main() {
            vec2 uv = vUv;

            // Depth-like gradient from near edge to far edge.
            float horizon = smoothstep(0.05, 0.95, uv.y);
            vec3 base = mix(uBaseA, uBaseB, horizon);

            // Two grid frequencies to keep detail crisp at multiple distances.
            float majorGrid = gridMask(uv, 18.0, 0.014);
            float minorGrid = gridMask(uv, 72.0, 0.006) * 0.45;
            float grid = clamp(majorGrid + minorGrid, 0.0, 1.0);

            // Center glow for visual focus.
            vec2 centered = uv - 0.5;
            float radial = length(centered);
            float centerGlow = 1.0 - smoothstep(0.0, 0.65, radial);

            // Slight darkening near edges to frame the arena.
            float vignette = smoothstep(0.92, 0.35, radial);

            vec3 gridColor = mix(uGridB, uGridA, horizon);
            vec3 color = base;
            color += gridColor * grid * 0.32;
            color += vec3(0.08, 0.15, 0.22) * centerGlow * 0.35;
            color *= vignette;

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

 