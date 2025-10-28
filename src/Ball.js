import * as THREE from 'three';
import { physics } from './physicsConfig.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Ball extends THREE.Group {
    Positive = new THREE.Color(0x55ff55);
    Negative = new THREE.Color(0xff5555);

    constructor(position = new THREE.Vector3(0, 3, -3), radius = 0.9125) {
        super();
        this.modelUrl = 'resources/models/ball/scene.gltf';
        this.radius = radius;
        this.intersecting = false;
        this.cumDt = 0;
        const geometry = new THREE.SphereGeometry(radius*(1.1), 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xff5555, transparent: true, opacity: 0.2 });
        this.sphere = new THREE.Mesh(geometry, material);
        this.add(this.sphere);

        this.loader = new GLTFLoader();
        this.loader.load(this.modelUrl, (gltf) => {
            this.ball = gltf.scene;
            this.ball.scale.set(1,1,1);
            this.ball.position.set(0, 0, 0);
            this.add(this.ball);
        });

        this.add(this.sphere);

        this.position.copy(position);
        this.boundingSphere = new THREE.Sphere(this.position.clone(), this.radius);
    }

    updateBallPos(newPosition) {
        this.position.copy(newPosition);
        this.boundingSphere.center.copy(newPosition);
    }

    updateBallScale(newScale) {
        this.ball.scale.set(newScale, newScale, newScale);
        this.boundingSphere.radius = newScale;
        this.sphere.scale.set(newScale + 0.05, newScale + 0.05, newScale + 0.05);
    }

    intersectsLine(ray, dt) {
        if (ray.intersectsSphere(this.boundingSphere)) {
            this.intersecting = true;
            this.cumDt += dt;
            const mixedColor = new THREE.Color();
            mixedColor.lerpColors(this.Negative, this.Positive, this.cumDt / physics.ball.timeLimit);
            this.sphere.material.color.set(mixedColor);
            if (this.cumDt > physics.ball.timeLimit) {
                this.updateBallPos(new THREE.Vector3(Math.random() * 10 - 5, 2, Math.random() * 10 - 5));
                this.cumDt = 0;
            }

            return true;
        } else {
            this.intersecting = false;
            this.sphere.material.color.set(this.Negative);
            this.cumDt = 0;
            return false;
        }
    }
}