import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HealthBar } from './HealthBar/HealthBar.js';

/**
 * Ball entity used as a target in gameplay.
 *
 * Responsibilities:
 * - Maintain hitbox, health, and alive state
 * - Handle ray intersection and hit timing
 * - Apply movement strategy updates
 * - Drive visual helpers such as crosshair and health bar
 * - Trigger hit and kill sound effects
 */
export class Ball extends THREE.Group {


    positive = new THREE.Color(0xffffff);
    negative = new THREE.Color(0x000000);


    /**
     * @param {THREE.Vector3} position Initial world position.
     * @param {number} radius Ball collision radius.
     * @param {{ update?: (ball: Ball, dt: number) => void, reset?: (ball: Ball) => void } | null} movement
     * Movement strategy object.
     * @param {{ maxHealth?: number, health?: number, damageAmount?: number, dps?: number } | null} health
     * Optional health config.
     */
    constructor(position = new THREE.Vector3(0, 3, -3), radius = 0.9125, movement = null, health = null) {
        super();

        this.modelUrl = `${import.meta.env.BASE_URL}models/ball/scene.gltf`;
        this.baseRadius = radius;
        this.radius = radius;

        this.intersecting = false;
        this.alive = true;
        this.justHit = false;

        this.movement = movement;

        // health object: { maxHealth, health, damageAmount, dps }
        const hasHealth = health && typeof health === 'object';
        this.healthBarEnabled = !!hasHealth;
        this.maxHealth = hasHealth && health.maxHealth !== undefined ? health.maxHealth : 5;
        this.health = hasHealth && health.health !== undefined ? health.health : 5;
        this.damageAmount = hasHealth && health.damageAmount !== undefined ? health.damageAmount : 1;
        this.dps = hasHealth && health.dps !== undefined ? health.dps : 5;
        this.healthBar = new HealthBar(1, 0.085, 0.05, this.maxHealth, this.health);
        this.healthBar.position.set(0, radius + 0.5, 0);
        this.add(this.healthBar);

        if (!this.healthBarEnabled) {
            this.healthBar.visible = false;
        }
        
        // SFX
        // Use a pool of Audio objects for overlapping playback
        this._killSounds = Array.from({length: 3}, () => {
            const a = new Audio('/rl-dart/sounds/kill.ogg');
            a.volume = 0.1;
            return a;
        });
        this._hitSounds = Array.from({length: 3}, () => {
            const a = new Audio('/rl-dart/sounds/hit.ogg');
            a.volume = 0.1;
            return a;
        });
        this._killSoundIndex = 0;
        this._hitSoundIndex = 0;
        this.hitAccumulator = 0;

        // Outer transparent indicatorSphere for visual effect
        const geometry = new THREE.SphereGeometry(radius+0.01, 64, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff5555,
            transparent: true,
            opacity: 0.05,
            toneMapped: false,
            fog: false,
            depthWrite: false,
        });
        this.indicatorSphere = new THREE.Mesh(geometry, material);
        this.indicatorSphere.castShadow = false;
        this.indicatorSphere.receiveShadow = false;
        this.indicatorSphere.renderOrder = 10;
        this.add(this.indicatorSphere);

        // ball model
        // this.loader = new GLTFLoader();
        // this.loader.load(this.modelUrl, (gltf) => {
        //     this.ball = gltf.scene;
        //     this.ball.scale.set(1,1,1);
        //     this.ball.position.set(0, 0, 0);
        //     this.add(this.ball);    
        // });

        // Use a simple blue sphere as the ball
        const ballGeometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const ballMaterial = new THREE.MeshStandardMaterial({ color: 0x0049ef4, roughness: 1, metalness: 0.0, opacity: 1 });
        this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
        this.ball.castShadow = true;
        this.ball.receiveShadow = true;
        this.ball.position.set(0, 0, 0);
        this.add(this.ball);



        // hitBox for intersection tests
        this.position.copy(position);
        this.hitBox = new THREE.Sphere(this.position.clone(), this.radius);

        // crosshair
        const dotSize = 0.06 * this.radius;
        const dotGeom = new THREE.SphereGeometry(dotSize, 16, 16);
        const dotMat =  new THREE.MeshBasicMaterial({ color: 0xff2222 });
        const dot =     new THREE.Mesh(dotGeom, dotMat);
        this.crosshair = dot;
        this.add(this.crosshair);


    }
    
    /**
     * Per-frame update.
     *
     * @param {THREE.Ray} ray Current aiming ray.
     * @param {boolean} boost Whether damage input is currently active.
     * @param {number} dt Delta time in seconds.
     * @param {THREE.Vector3|null} collisionContext Optional car position for exclusion radius.
     * @param {boolean} canBeHit If false, this ball is ignored by hit logic for this frame.
     */
    update(ray, boost, dt, collisionContext = null, canBeHit = true) {
        if (this.movement) {
            this.movement.update(this, dt);
        }

        // Prevent ball from entering collision sphere (car)
        if (collisionContext) {
            const carPos = collisionContext;
            const boundaryRadius = 3;
            const toBall = this.position.clone().sub(carPos);
            if (toBall.length() < boundaryRadius) {
                toBall.setLength(boundaryRadius);
                this.setPosition(carPos.clone().add(toBall));
            }
        }

        const intersection = canBeHit ? this.findIntersection(ray, this.hitBox) : null;
        this.updateCrosshairLocation(intersection);
        this.updateCrosshairSize(ray);
        
        if (canBeHit && intersection && boost) {
            this.intersecting = true;
            this.targetTimer += dt;
            if (this.hitAccumulator > 0) {
                this.justHit = false;
                this.hitAccumulator -= dt;
            }
            if (this.hitAccumulator <= 0) {
                this.justHit = true;
                // Play hit sound from pool
                const hitSound = this._hitSounds[this._hitSoundIndex];
                hitSound.currentTime = 0;
                hitSound.play();
                this._hitSoundIndex = (this._hitSoundIndex + 1) % this._hitSounds.length;
                this.damage();
                this.hitAccumulator = 1 / this.dps;
            }
            this.positiveColor();
        } else if (canBeHit && intersection && !boost) {
            this.positiveColor();
        } else {
            this.intersecting = false;
            this.justHit = false;
            this.indicatorSphere.material.color.set(this.negative);
            this.targetTimer = 0;
            this.negativeColor();
            return false;
        }


    }

    /**
     * Computes world-space intersection point between the ray and this ball sphere.
     * Returns null if there is no forward intersection.
     *
     * @param {THREE.Ray} ray
     * @param {THREE.Sphere} sphere
     * @returns {THREE.Vector3|null}
     */
    findIntersection(ray, sphere) {
        let intersection = null;

        if (!sphere) return null;
        if (ray.intersectsSphere(sphere)) {
            const originToCenter = new THREE.Vector3().subVectors(this.position, ray.origin);
            const tca = originToCenter.dot(ray.direction);
            const d2 = originToCenter.lengthSq() - tca * tca;
            if (d2 <= sphere.radius * sphere.radius) {
                const thc = Math.sqrt(sphere.radius * sphere.radius - d2);
                const t1 = tca - thc;
                const t2 = tca + thc;
                let t = null;
                if (t1 >= 0 && t2 >= 0) {
                    t = Math.min(t1, t2);
                } else if (t1 >= 0) {
                    t = t1;
                } else if (t2 >= 0) {
                    t = t2;
                }
                if (t !== null) {
                    intersection = new THREE.Vector3().copy(ray.origin).add(ray.direction.clone().multiplyScalar(t));
                }
            }
        }
        return intersection;
    }
    
    updateCrosshairLocation(intersection) {
        if (intersection && this.ball) {
            this.crosshair.position.copy(this.ball.worldToLocal(intersection.clone()));
            this.crosshair.visible = true;
        } else if (this.crosshair) {
            this.crosshair.visible = false;
        }
    }

    updateCrosshairSize(ray) {
        if (this.crosshair && this.ball) {
            const dist = this.position.distanceTo(ray.origin);
            // Use fixed min/max size, not dependent on ball radius
            const maxSize = 2.0;
            const minSize = 0.3;
            let size = Math.min(maxSize, Math.max(minSize, 0.1 * dist));
            this.crosshair.scale.set(size, size, size);
        }
    }
    
    isHit () {
        return this.justHit;
    }
    
    /**
     * Returns true exactly once when this ball transitions to killed state.
     * @returns {boolean|undefined}
     */
    isKilled () {
        if (this.healthBarEnabled && this.alive && this.justHit && this.health <= 0) {
            this.alive = false;
            // Play kill sound from pool
            const killSound = this._killSounds[this._killSoundIndex];
            killSound.currentTime = 0;
            killSound.play();
            this._killSoundIndex = (this._killSoundIndex + 1) % this._killSounds.length;
            return true;
        }
    }
    
    playHitSound(dt) {
        if (this.hitAccumulator > 0) {
            this.hitAccumulator -= dt;
        }
        if (this.hitAccumulator <= 0) {
            const hitSound = this._hitSounds[this._hitSoundIndex];
            hitSound.currentTime = 0;
            hitSound.play();
            this._hitSoundIndex = (this._hitSoundIndex + 1) % this._hitSounds.length;
            this.damage();
            this.hitAccumulator = 1 / this.dps;
        }
    }   
    
    rainbowColor() {
        const rainbowColor = new THREE.Color();
        const hue = (performance.now() * 0.1 % 360) / 360;
        rainbowColor.setHSL(hue, 1, 0.5);
        this.indicatorSphere.material.opacity = 0.05;
        this.indicatorSphere.material.color.set(rainbowColor);
    }
    
    positiveColor() {
        this.indicatorSphere.material.opacity = 0;
        this.indicatorSphere.material.color.set(this.positive);
    }
    
    negativeColor() {
        this.indicatorSphere.material.color.set(this.negative);
        this.indicatorSphere.material.opacity = 0.1;
    }
    
    toggleHealthBar() {
        this.healthBarEnabled = !this.healthBarEnabled;
        this.healthBar.visible = this.healthBarEnabled;
    }
    
    enableHealthBar() {
        this.healthBarEnabled = true;
        this.healthBar.visible = true;
    }
    
    disableHealthBar() {
        this.healthBarEnabled = false;
        this.healthBar.visible = false;
    }
    
    setRadius(newRadius) {
        this.radius = newRadius;
        // Update hitbox
        if (this.hitBox) {
            this.hitBox.radius = newRadius;
        }
        // Update indicatorSphere geometry
        if (this.indicatorSphere) {
            this.indicatorSphere.geometry.dispose();
            this.indicatorSphere.geometry = new THREE.SphereGeometry(newRadius + 0.1, 32, 32);
        }
        // Update healthBar position
        if (this.healthBar) {
            this.healthBar.position.set(0, newRadius + 0.5, 0);
        }
        // Update ball geometry
        if (this.ball) {
            this.ball.geometry.dispose();
            this.ball.geometry = new THREE.SphereGeometry(newRadius, 32, 32);
        }
    }
    
    updateHealthBar(camera) {
        if (!this.healthBar) return;
        
        this.healthBar.position.set(0, 0, 0);
        
        const camZ = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion).normalize();
        const camX = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
        const cross = new THREE.Vector3().crossVectors(camZ, camX).normalize();
        const offsetDistance = this.hitBox.radius * 1.5; 
        const offset = cross.multiplyScalar(offsetDistance);

        this.healthBar.position.copy(offset);
        this.healthBar.updateScale(this.hitBox.radius);
        
        this.healthBar.lookAt(camera.position);
    }
    
    damage() {
        if (this.health <= 0) return;
        this.health -= this.damageAmount;
        this.healthBar.setHealth(this.health);
    }
    
    /**
     * Resets state after a kill/respawn cycle.
     */
    respawn() {
        this.alive = true;
        this.health = this.maxHealth;
        this.healthBar.setMaxHealth(this.maxHealth);
        this.healthBar.setHealth(this.maxHealth);
    }
    
    setHealth(health) {
        this.health = health;
        this.healthBar.setHealth(this.health);
    }
    
    getHealth() {
        return this.health;
    }

    setMaxHealth(maxHealth) {
        this.maxHealth = maxHealth;
        this.healthBar.setMaxHealth(this.maxHealth);
    }

    isIntersecting() {
        return this.intersecting;
    }

    setPosition(vec3) {
        this.position.copy(vec3);
        if (this.hitBox) {
            this.hitBox.center.copy(this.position);
        }
    }

}