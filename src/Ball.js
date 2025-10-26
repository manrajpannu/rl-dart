import * as THREE from 'three';
const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } ); 

export class Ball extends THREE.Group {
    constructor(radius) {
        super();
        this.radius = radius;
        

    }

    gen() {
        const geometry = new THREE.SphereGeometry( this.radius, 32, 16 );
        const sphere = new THREE.Mesh( geometry, material ); 
        this.add(sphere);
    }

    getArea() {
        return 4 * Math.PI * Math.pow(this.radius, 2);
    }

    getVolume() {
        return (4/3) * Math.PI * Math.pow(this.radius, 3);
    }
}
