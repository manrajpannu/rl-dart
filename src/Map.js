import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
const planeMat = new THREE.MeshPhongMaterial( {
    map: texture,
    side: THREE.DoubleSide,
} );

export class Map extends THREE.Group {

    constructor(planeSize = 40) {
        super();
        this.planeSize = planeSize;

    }

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
        
        
        const innerGeometry = new THREE.BoxGeometry(40, 40, 40);
        // const innerGeometry = new THREE.SphereGeometry(50, 100, 100);
        const innerMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.BackSide });
        const innerCube = new THREE.Mesh(innerGeometry, planeMat);
        // this.add(innerCube);
    }


}

 