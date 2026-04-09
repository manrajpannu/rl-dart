import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('public/images/grid.png');
const planeMat = new THREE.MeshBasicMaterial( {
    map: texture,
    side: THREE.DoubleSide,
} );

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

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;

        const repeats = this.planeSize / 2;
        texture.repeat.set( repeats, repeats );

        const planeGeo = new THREE.PlaneGeometry( this.planeSize, this.planeSize );

        const mesh = new THREE.Mesh( planeGeo, planeMat );
        mesh.rotation.x = Math.PI * - .5;
        this.add( mesh );
    }
}

 