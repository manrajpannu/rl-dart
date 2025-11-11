import * as THREE from 'three';
import { physics } from './physicsConfig.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Ball extends THREE.Group {
    green = new THREE.Color(0x55ff55);
    black = new THREE.Color(0x000000);
    red = new THREE.Color(0xff5555);

    constructor(position = new THREE.Vector3(0, 3, -3), radius = 0.9125) {
        super();
        this.modelUrl = 'resources/models/ball/scene.gltf';
        this.radius = radius;
        this.intersecting = false;
        this.targetTimer = 0;
        this.chaseTimer = 0;
        this.hits = 0;
        const geometry = new THREE.SphereGeometry(radius+0.1, 32, 32);
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

    processHit() {
        this.chaseTimer = 0
        this.targetTimer = 0;
        console.log(++this.hits)
    }

    staticScenarioDefault() {
        this.processHit()
        this.updateBallPos(new THREE.Vector3(Math.random() * 10 - 5, 2, Math.random() * 10 - 5));
    }

    staticScenarioHigh() {
        this.processHit()
        this.updateBallPos(new THREE.Vector3((Math.random() * 2) - 1, 3, (Math.random() * 2) - 1));
    }
    
    updateBallScale(newScale) {
        if (!this.ball) return;
        this.ball.scale.set(newScale, newScale, newScale);
        this.boundingSphere.radius = newScale;
        this.sphere.scale.set(newScale + 0.05, newScale + 0.05, newScale + 0.05);
    }

    intersectsLine(ray, dt) {
        this.chaseTimer += dt
        if (physics.ball.timeout && this.chaseTimer > physics.ball.chaseTimeout)
        {
            this.staticScenarioHigh()
            this.chaseTimer = 0
        }
        if (ray.intersectsSphere(this.boundingSphere)) {
            this.intersecting = true;
            this.targetTimer += dt;
            const mixedColor = new THREE.Color();
            mixedColor.lerpColors(this.red, this.green, this.targetTimer / physics.ball.hitWindowDuration);
            this.sphere.material.color.set(mixedColor);
            if (this.targetTimer > physics.ball.hitWindowDuration) {
                switch (physics.ball.randomizerPreset) {
                    case 'default':
                        this.staticScenarioDefault()
                        break;
                    case 'vertical':
                        this.staticScenarioHigh()
                        break;
                    default:
                        this.staticScenarioDefault
                        break;
                }
            }
            return true;
        } else {
            this.intersecting = false;
            this.sphere.material.color.set(this.red);
            this.targetTimer = 0;
            return false;
        }
    }
}