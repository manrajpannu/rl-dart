import * as THREE from 'three';
import { physics } from './physicsConfig.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Ball extends THREE.Group {
        // Flowy movement speed (can be set externally)
        flowySpeed = 2.5;

        // Internal state for Bezier curve movement
        _bezierT = 0;
        _bezierDuration = 2.0;
        _bezierPoints = null;

        // Helper to generate a random point within bounds
        _randomPointInBounds() {
            const bounds = { x: 10, y: 0.5, z: 10 };
            return new THREE.Vector3(
                (Math.random() - 0.5) * 2 * bounds.x,
                bounds.y + Math.random() * 7.5, // y in [0.5, 8]
                (Math.random() - 0.5) * 2 * bounds.z
            );
        }

        // Helper to start a new Bezier segment from current position
        _startNewBezier() {
            const p0 = this.position.clone();
            const p3 = this._randomPointInBounds();
            // Control points: random directions from p0 and p3
            const dir0 = new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            );
            const dir1 = new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            );
            const p1 = p0.clone().add(dir0);
            const p2 = p3.clone().add(dir1);
            this._bezierPoints = [p0, p1, p2, p3];
            // Duration based on distance and speed
            const dist = p0.distanceTo(p3);
            this._bezierDuration = dist / this.flowySpeed;
            this._bezierT = 0;
        }
    green = new THREE.Color(0x55ff55);
    black = new THREE.Color(0x000000);
    red = new THREE.Color(0xff5555);

    constructor(position = new THREE.Vector3(0, 3, -3), radius = 0.9125) {
    super();
    this.modelUrl = `${import.meta.env.BASE_URL}models/ball/scene.gltf`;
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
        this._randomVelocity = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        this._randomMoveEnabled = false;
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
        this.updateBallPos(new THREE.Vector3(
            Math.round(Math.random() * 10 - 5),
            Math.round(Math.random() * 10 - 5),
            Math.round(Math.random() * 10 - 5)
        ));
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
            if (this._randomMoveEnabled) {
                // Set sphere color to rainbow, changing every frame
                const rainbowColor = new THREE.Color();
                // Use time to cycle hue
                const hue = (performance.now() * 0.1 % 360) / 360;
                rainbowColor.setHSL(hue, 1, 0.5);
                this.sphere.material.color.set(rainbowColor);
            } else {
                // Normal color logic
                const mixedColor = new THREE.Color();
                mixedColor.lerpColors(this.red, this.green, this.targetTimer / physics.ball.hitWindowDuration);
                this.sphere.material.color.set(mixedColor);
                if (this.targetTimer > physics.ball.hitWindowDuration) {
                    switch (physics.ball.randomizerPreset) {
                        case 'default':
                            this.staticScenarioDefault();
                            break;
                        case 'vertical':
                            this.staticScenarioHigh();
                            break;
                        default:
                            this.staticScenarioDefault();
                            break;
                    }
                }
                return true;
            }
        } else {
            this.intersecting = false;
            this.sphere.material.color.set(this.red);
            this.targetTimer = 0;
            return false;
        }
    }

    updateRandomMovement(dt = 0.016) {
        if (!this._randomMoveEnabled) return;
        // If no bezier, start one
        if (!this._bezierPoints) {
            this._startNewBezier();
        }
        // Advance t
        this._bezierT += dt / this._bezierDuration;
        if (this._bezierT > 1) {
            // Snap to end, start new curve
            this._startNewBezier(this._bezierPoints[3]);
            return;
        }
        // Cubic Bezier interpolation
        const [p0, p1, p2, p3] = this._bezierPoints;
        const t = this._bezierT;
        // De Casteljau's algorithm for cubic Bezier
        const a = p0.clone().lerp(p1, t);
        const b = p1.clone().lerp(p2, t);
        const c = p2.clone().lerp(p3, t);
        const d = a.lerp(b, t);
        const e = b.lerp(c, t);
        const pos = d.lerp(e, t);
        this.updateBallPos(pos);
    }

    // Call this in your main update loop to animate the ball
    update(dt) {
        this.updateRandomMovement(dt);
    }
}