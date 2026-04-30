import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { withAssetBase } from '../assetBase.js';
import { HealthBar } from './HealthBar/HealthBar.js';
import { playConfettiExplosionEffect } from './effects/confettiExplosionEffect.js';
import { playBubblePopEffect } from './effects/bubblePopEffect.js';
import { playNullExplosionEffect } from './effects/nullExplosionEffect.js';
import { playRainbowBubblePopEffect } from './effects/rainbowBubblePopEffect.js';
import { playNeonStarburstEffect } from './effects/neonStarburstEffect.js';
import { playPlasmaRingEffect } from './effects/plasmaRingEffect.js';
import { playHoloShockwaveEffect } from './effects/holoShockwaveEffect.js';
import { playWhiteGlitterExplosionEffect } from './effects/whiteGlitterExplosionEffect.js';
import { playRainbowGlitterExplosionEffect } from './effects/rainbowGlitterExplosionEffect.js';
import { RETICLE_SHADERS, RETICLE_VERTEX_SHADER } from './reticles/index.js';
import { HOVER_EFFECTS } from './onHoverEffects/index.js';
import { soundManager } from '../SoundManager.js';

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


    positive = new THREE.Color('rgba(255,255,255,1.0)');
    negative = new THREE.Color('rgba(0,0,0,1.0)');
    idleGlowColor = new THREE.Color('rgba(45,102,255,1.0)');
    activeGlowColor = new THREE.Color('rgba(122,248,255,1.0)');


    /**
     * @param {THREE.Vector3} position Initial world position.
     * @param {number} radius Ball collision radius.
     * @param {{ update?: (ball: Ball, dt: number) => void, reset?: (ball: Ball) => void } | null} movement
     * Movement strategy object.
    * @param {{ maxHealth?: number, health?: number, damageAmount?: number, dps?: number, holdSliderEnabled?: boolean, sliderDrainRate?: number, holdDurationSeconds?: number, killEffect?: 'confetti' | 'bubble' | 'rainbowBubblePop' | 'neonStarburst' | 'plasmaRing' | 'holoShockwave' | 'whiteGlitterExplosion' | 'whiteGlitter' | 'rainbowGlitterExplosion' | 'rainbowGlitter' | 'glitterExplosion' | 'glitter' | 'shockwave' | null } | null} health
     * Optional health config.
     * @param {{ type?: 'cross' | 'x' | 'ring' | 'box', enabled?: boolean, color?: import('three').ColorRepresentation, effect?: 'none' | 'glitter' | 'pulse' | 'scanline' | 'shimmer' } | null} reticle
     * Optional reticle config.
    * @param {{ onHoverEffect?: 'shimmer' | 'glitter' | 'stroke' | 'outerGlow' | 'none' } | null} appearance
     * Optional appearance config.
     */
    constructor(position = new THREE.Vector3(0, 3, -3), radius = 0.9125, movement = null, health = null, reticle = null, appearance = null) {
        super();

        this.modelUrl = withAssetBase('models/ball/scene.gltf');
        this.baseRadius = radius;
        this.radius = radius;

        this.intersecting = false;
        this.alive = true;
        this.justHit = false;
        this.targetTimer = 0;

        this.movement = movement;

        // health object: { maxHealth, health, damageAmount, dps }
        const hasHealth = health && typeof health === 'object';
        this.healthBarEnabled = !!hasHealth;
        this.holdSliderEnabled = Boolean(hasHealth && health.holdSliderEnabled);
        const defaultMaxHealth = this.holdSliderEnabled ? 100 : 5;
        this.maxHealth = hasHealth && health.maxHealth !== undefined ? health.maxHealth : defaultMaxHealth;
        this.health = hasHealth && health.health !== undefined ? health.health : this.maxHealth;
        this.damageAmount = hasHealth && health.damageAmount !== undefined ? health.damageAmount : 1;
        this.dps = hasHealth && health.dps !== undefined ? health.dps : 5;
        this.sliderDrainRate = hasHealth && health.sliderDrainRate !== undefined ? health.sliderDrainRate : 40;
        const derivedHoldSeconds = this.maxHealth / Math.max(1e-6, this.sliderDrainRate);
        this.holdDurationSeconds = hasHealth && health.holdDurationSeconds !== undefined
            ? Math.max(0.05, health.holdDurationSeconds)
            : Math.max(0.05, derivedHoldSeconds);
        this.killEffectType = hasHealth && Object.prototype.hasOwnProperty.call(health, 'killEffect')
            ? health.killEffect
            : 'confetti';
        this._killEffect = this._resolveKillEffect(this.killEffectType);
        this.healthBar = new HealthBar(1, 0.085, 0.05, this.maxHealth, this.health);
        this.healthBar.position.set(0, radius + 0.5, 0);
        this.add(this.healthBar);
        this.healthBar.visible = false;

        // SFX: Preload via SoundManager for zero-latency Web Audio playback
        soundManager.loadSound('kill', 'sounds/new sounds/death.mp3');
        soundManager.loadSound('hit', 'sounds/hit.ogg');

        this.hitAccumulator = 0;

        // Outer transparent indicatorSphere for visual effect
        const geometry = new THREE.SphereGeometry(radius + 0.01, 48, 48);
        const material = new THREE.MeshBasicMaterial({
            color: this.idleGlowColor,
            transparent: true,
            opacity: 0.05,
            toneMapped: false,
            fog: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        this.indicatorSphere = new THREE.Mesh(geometry, material);
        this.indicatorSphere.castShadow = false;
        this.indicatorSphere.receiveShadow = false;
        this.indicatorSphere.renderOrder = 10;
        this.add(this.indicatorSphere);

        // ball model
        // this.loader = new GLTFLoader();
        // this.loader.load(this.modelUrl, (gltf) => {
        //     this.ball.scale.set(1,1,1);
        //     this.ball.position.set(0, 0, 0);
        //     this.add(this.ball);    
        // });

        // Use a simple blue sphere as the ball
        const ballGeometry = new THREE.SphereGeometry(this.radius, 48, 48);
        // Default material
        this.defaultBallMaterial = new THREE.MeshStandardMaterial({
            color: 0x049ef4,
            roughness: 0.7,
            metalness: 0.3,
            emissive: 0x172238,
            emissiveIntensity: 0.2,
            opacity: 1,
        });
        this.ball = new THREE.Mesh(ballGeometry, this.defaultBallMaterial);
        this.ball.castShadow = true;
        this.ball.receiveShadow = true;
        this.ball.position.set(0, 0, 0);
        this.add(this.ball);



        // hitBox for intersection tests
        this.position.copy(position);
        this.hitBox = new THREE.Sphere(this.position.clone(), this.radius);

        const reticleConfig = reticle && typeof reticle === 'object' ? reticle : {};
        this.reticleEnabled = reticleConfig.enabled !== undefined ? Boolean(reticleConfig.enabled) : true;
        this.reticleType = this._resolveReticleType(reticleConfig.type);
        this.reticleEffect = this._resolveReticleEffect(reticleConfig.effect);
        this.reticleColor = new THREE.Color(reticleConfig.color ?? 0xff2222);

        const appearanceConfig = appearance && typeof appearance === 'object' ? appearance : {};
        this.onHoverEffectType = this._resolveHoverEffect(appearanceConfig.onHoverEffect);

        // crosshair (curved shader over the sphere surface)
        const crossGeom = new THREE.SphereGeometry(this.radius + 0.02, 72, 72);
        this.crosshairUniforms = {
            color: { value: this.reticleColor },
            barThickness: { value: 0.022 },
            gapRadius: { value: 0.085 },
            crossSize: { value: 0.12 },
            edgeSoftness: { value: 0.001 },
            centerDir: { value: new THREE.Vector3(0, 0, 1) },
            basisX: { value: new THREE.Vector3(1, 0, 0) },
            basisY: { value: new THREE.Vector3(0, 1, 0) },
            effectType: { value: this.reticleEffect },
            effectIntensity: { value: 0.6 },
            effectScale: { value: 38.0 },
            time: { value: 0 },
        };
        const crossMat = this._createReticleMaterial(this.reticleType);
        this.crosshair = new THREE.Mesh(crossGeom, crossMat);
        this.crosshair.renderOrder = 11;
        this.crosshair.visible = false;
        this.add(this.crosshair);

        this._reticleBase = {
            barThickness: this.crosshairUniforms.barThickness.value,
            gapRadius: this.crosshairUniforms.gapRadius.value,
            crossSize: this.crosshairUniforms.crossSize.value,
            edgeSoftness: this.crosshairUniforms.edgeSoftness.value,
        };

        this._hoverMaterial = null;
        this._hoverUniforms = null;
        this._hoverApplyTo = 'material';
        this._hoverOverlayScale = 1.05;
        this._hoverOverlayMesh = null;
        this._initHoverEffect();

        this.negativeColor();

        // Pre-allocated scratch vectors to avoid per-frame GC pressure
        this._scratchVec3A = new THREE.Vector3();
        this._scratchVec3B = new THREE.Vector3();
        this._scratchVec3C = new THREE.Vector3();
        this._scratchVec3D = new THREE.Vector3();
        this._scratchQuat = new THREE.Quaternion();
    }

    /**
     * Per-frame update.
     *
     * @param {THREE.Ray} ray Current aiming ray.
     * @param {boolean} boost Whether damage input is currently active.
     * @param {number} dt Delta time in seconds.
     * @param {THREE.Vector3|null} collisionContext Optional car position for exclusion radius.
        * @param {boolean} canBeHit
        * If false, this ball may still move but it is excluded from hit/damage logic.
        * BallManager uses this to enforce first-intersection-only damage each frame.
          * @param {THREE.Vector3|null} upDir Optional car up direction for crosshair rotation.
          * @param {boolean} [bulletsEnabled=false] When true, non-slider balls should only be damaged by bullets.
     */
    update(ray, boost, dt, collisionContext = null, canBeHit = true, upDir = null, bulletsEnabled = false) {
        if (this.movement) {
            this.movement.update(this, dt);
        }

        if (this.crosshairUniforms?.time) {
            this.crosshairUniforms.time.value += dt;
        }

        if (this._hoverUniforms?.time) {
            this._hoverUniforms.time.value += dt;
        }

        // Prevent ball from entering collision sphere (car)
        if (collisionContext) {
            const boundaryRadius = 3;
            this._scratchVec3A.subVectors(this.position, collisionContext);
            if (this._scratchVec3A.length() < boundaryRadius) {
                this._scratchVec3A.setLength(boundaryRadius);
                this.setPosition(this._scratchVec3B.addVectors(collisionContext, this._scratchVec3A));
            }
        }

        const intersection = canBeHit ? this.findIntersection(ray, this.hitBox) : null;
        this.updateCrosshairLocation(intersection, ray, upDir);
        this.updateCrosshairSize(ray);
        this.updateHealthBarVisibility(!!intersection);

        this._handleHoverAppearance(intersection);
        const appearanceAllowsDamage = this._canApplyDamage(intersection, collisionContext, upDir);

        if (this.holdSliderEnabled) {
            if (canBeHit && intersection && boost && appearanceAllowsDamage) {
                this.intersecting = true;
                this.targetTimer += dt;

                if (this.hitAccumulator > 0) {
                    this.hitAccumulator -= dt;
                }

                const progress = Math.min(1, this.targetTimer / this.holdDurationSeconds);
                const isFinalHit = progress >= 1;

                if (this.hitAccumulator <= 0 && !isFinalHit) {
                    this.playHitSoundOnce();
                    this.hitAccumulator = 1 / this.dps;
                }

                const previous = this.health;
                this.health = this.maxHealth * (1 - progress);
                if (this.health !== previous) {
                    this.healthBar.setHealth(this.health);
                }
                this.justHit = false;
                this.positiveColor();

                if (progress >= 1 && this.alive) {
                    this.justHit = true;
                }
            } else {
                this.intersecting = false;
                this.targetTimer = 0;
                this.hitAccumulator = 0;
                if (this.health < this.maxHealth) {
                    this.health = this.maxHealth;
                    this.healthBar.setHealth(this.health);
                }
                this.justHit = false;
                if (intersection) {
                    this.positiveColor();
                } else {
                    this.negativeColor();
                }
            }

            return;
        }

        // Non-slider balls are now damaged by the gun system (bullets),
        // while this ray branch remains only for slider-style hold targets.
        const allowBeamDamage = false;

        if (canBeHit && intersection && boost && allowBeamDamage && appearanceAllowsDamage) {
            this.intersecting = true;
            this.targetTimer += dt;
            if (this.hitAccumulator > 0) {
                this.justHit = false;
                this.hitAccumulator -= dt;
            }
            if (this.hitAccumulator <= 0) {
                const willKill = this.health <= this.damageAmount;
                this.justHit = true;
                if (!willKill) {
                    this.playHitSoundOnce();
                }
                this.damage();
                this.hitAccumulator = 1 / this.dps;
            }
            this.positiveColor();
        } else if (canBeHit && intersection) {
            this.intersecting = false;
            this.justHit = false;
            this.hitAccumulator = 0;
            this.positiveColor();
        } else {
            this.intersecting = false;
            this.justHit = false;
            if (this.indicatorSphere?.material) {
                this.indicatorSphere.material.color.set(this.negative);
            }
            this.targetTimer = 0;
            this.hitAccumulator = 0;
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

    updateCrosshairLocation(intersection, ray, upDir) {
        if (!this.reticleEnabled) {
            if (this.crosshair) this.crosshair.visible = false;
            return;
        }
        if (intersection && this.ball && this.crosshairUniforms) {
            // Reuse scratch vectors — no allocations
            const localPoint = this.ball.worldToLocal(this._scratchVec3A.copy(intersection));
            const centerDir = this._scratchVec3B.copy(localPoint).normalize();
            this.crosshairUniforms.centerDir.value.copy(centerDir);

            if (ray) {
                const worldUp = upDir ? this._scratchVec3C.copy(upDir).normalize() : this._scratchVec3C.set(0, 1, 0);
                const camRight = this._scratchVec3D.crossVectors(ray.direction, worldUp);
                if (camRight.lengthSq() < 1e-6) {
                    camRight.set(1, 0, 0);
                } else {
                    camRight.normalize();
                }
                // camUp can reuse worldUp slot — worldUp not needed beyond here
                const camUp = worldUp.crossVectors(camRight, ray.direction).normalize();

                this.ball.getWorldQuaternion(this._scratchQuat);
                this._scratchQuat.invert();
                camRight.applyQuaternion(this._scratchQuat).normalize();
                camUp.applyQuaternion(this._scratchQuat).normalize();

                // basisX = camRight projected onto the plane perpendicular to centerDir
                const basisX = camRight.sub(this._scratchVec3A.copy(centerDir).multiplyScalar(camRight.dot(centerDir)));
                const basisY = camUp.sub(this._scratchVec3A.copy(centerDir).multiplyScalar(camUp.dot(centerDir)));

                if (basisX.lengthSq() < 1e-6 || basisY.lengthSq() < 1e-6) {
                    const fallbackUp = Math.abs(centerDir.y) > 0.9
                        ? this._scratchVec3A.set(1, 0, 0)
                        : this._scratchVec3A.set(0, 1, 0);
                    basisX.crossVectors(fallbackUp, centerDir).normalize();
                    basisY.crossVectors(centerDir, basisX).normalize();
                } else {
                    basisX.normalize();
                    basisY.normalize();
                }

                this.crosshairUniforms.basisX.value.copy(basisX);
                this.crosshairUniforms.basisY.value.copy(basisY);
                this.crosshairUniforms.centerDir.value.copy(centerDir);
            }

            this.crosshair.visible = true;
        } else if (this.crosshair) {
            this.crosshair.visible = false;
        }
    }

    updateCrosshairSize(ray) {
        if (this.crosshair && this.crosshairUniforms && ray) {
            const dist = this.position.distanceTo(ray.origin);
            const radiusScale = this.baseRadius > 0
                ? Math.pow(this.baseRadius / Math.max(0.001, this.radius), 0.85)
                : 1;
            const distScale = 0.02 + Math.pow(dist, 1.3) * 0.006;
            const size = THREE.MathUtils.clamp(distScale * radiusScale, 0.01, 0.35);
            const sizeScale = this._reticleBase.crossSize > 0
                ? size / this._reticleBase.crossSize
                : 1;
            this.crosshairUniforms.crossSize.value = size;
            this.crosshairUniforms.barThickness.value = this._reticleBase.barThickness * sizeScale;
            this.crosshairUniforms.gapRadius.value = this._reticleBase.gapRadius * sizeScale / 2;
            this.crosshairUniforms.edgeSoftness.value = this._reticleBase.edgeSoftness * sizeScale;
        }
    }

    isHit() {
        return this.justHit;
    }

    /**
     * Returns true exactly once when this ball transitions to killed state.
     * @returns {boolean|undefined}
     */
    isKilled() {
        if (this.healthBarEnabled && this.alive && this.justHit && this.health <= 0) {
            this.alive = false;
            // Play sound BEFORE effects to ensure zero-latency audio feedback
            soundManager.playSound('kill', 0.25);
            this._playKillEffect();
            return true;
        }
    }

    _resolveKillEffect(type) {
        if (type === null || type === undefined) return playNullExplosionEffect;

        switch (String(type).toLowerCase()) {
            case 'bubble':
            case 'bubble-pop':
            case 'bubblepop':
            case 'classic':
                return playBubblePopEffect;
            case 'rainbowbubblepop':
            case 'rainbow-bubble-pop':
            case 'rainbowbubble':
                return playRainbowBubblePopEffect;
            case 'neonstarburst':
            case 'neon-starburst':
            case 'starburst':
                return playNeonStarburstEffect;
            case 'plasmaring':
            case 'plasma-ring':
                return playPlasmaRingEffect;
            case 'holoshockwave':
            case 'holo-shockwave':
            case 'shockwave':
                return playHoloShockwaveEffect;
            case 'whiteglitterexplosion':
            case 'white-glitter-explosion':
            case 'whiteglitter':
            case 'glitterexplosion':
            case 'glitter-explosion':
            case 'glitter':
                return playWhiteGlitterExplosionEffect;
            case 'rainbowglitterexplosion':
            case 'rainbow-glitter-explosion':
            case 'rainbowglitter':
            case 'rainbow glitter':
                return playRainbowGlitterExplosionEffect;
            case 'confetti':
                return playConfettiExplosionEffect;
            default:
                return playNullExplosionEffect;
        }
    }

    _playKillEffect() {
        if (typeof this._killEffect !== 'function') return;
        this._killEffect(this);
    }

    playHitSoundOnce() {
        soundManager.playSound('hit', 0.1);
    }

    playHitSound(dt) {
        if (this.hitAccumulator > 0) {
            this.hitAccumulator -= dt;
        }
        if (this.hitAccumulator <= 0) {
            this.playHitSoundOnce();
            this.damage();
            this.hitAccumulator = 1 / this.dps;
        }
    }

    rainbowColor() {
        const rainbowColor = new THREE.Color();
        const hue = (performance.now() * 0.1 % 360) / 360;
        rainbowColor.setHSL(hue, 1, 0.5);
        if (this.indicatorSphere?.material) {
            this.indicatorSphere.material.opacity = 0.05;
            this.indicatorSphere.material.color.set(rainbowColor);
        }
    }

    _setBallEmissive(color, intensity) {
        const material = this.ball?.material;
        if (!material) return;

        if (Array.isArray(material)) {
            material.forEach(mat => {
                if (mat?.emissive?.set) {
                    mat.emissive.set(color);
                    mat.emissiveIntensity = intensity;
                }
            });
            return;
        }

        if (material.emissive?.set) {
            material.emissive.set(color);
            material.emissiveIntensity = intensity;
        }
    }

    positiveColor() {
        // On hover, either swap ball material or enable an outer overlay effect.
        if (this._hoverApplyTo === 'overlay') {
            if (this.ball.material !== this.defaultBallMaterial) {
                this.ball.material = this.defaultBallMaterial;
            }
            if (this._hoverOverlayMesh) {
                this._hoverOverlayMesh.visible = true;
            }
        } else if (this._hoverMaterial && this.ball.material !== this._hoverMaterial) {
            this.ball.material = this._hoverMaterial;
        }
        if (this.indicatorSphere?.material) {
            this.indicatorSphere.material.opacity = 0.22;
            this.indicatorSphere.material.color.set(this.activeGlowColor);
        }
    }

    negativeColor() {
        // When not intersected: swap to default material
        if (this.ball.material !== this.defaultBallMaterial) {
            this.ball.material = this.defaultBallMaterial;
        }
        if (this._hoverOverlayMesh) {
            this._hoverOverlayMesh.visible = false;
        }
        if (this.indicatorSphere?.material) {
            this.indicatorSphere.material.color.set(this.idleGlowColor);
            this.indicatorSphere.material.opacity = 0.05;
        }
    }

    toggleHealthBar() {
        this.healthBarEnabled = !this.healthBarEnabled;
        this.updateHealthBarVisibility(false);
    }

    enableHealthBar() {
        this.healthBarEnabled = true;
        this.updateHealthBarVisibility(false);
    }

    disableHealthBar() {
        this.healthBarEnabled = false;
        this.healthBar.visible = false;
    }

    updateHealthBarVisibility(isLookedAt) {
        if (!this.healthBar) return;
        if (!this.healthBarEnabled) {
            this.healthBar.visible = false;
            return;
        }

        this.healthBar.visible = !!isLookedAt || this.health < this.maxHealth;
    }

    getRadius() {
        return this.radius;
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
            this.indicatorSphere.geometry = new THREE.SphereGeometry(newRadius + 0.1, 48, 48);
        }
        // Update crosshair geometry
        if (this.crosshair) {
            this.crosshair.geometry.dispose();
            this.crosshair.geometry = new THREE.SphereGeometry(newRadius + 0.02, 72, 72);
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
        if (this._hoverOverlayMesh) {
            this._hoverOverlayMesh.geometry.dispose();
            this._hoverOverlayMesh.geometry = new THREE.SphereGeometry(newRadius * this._hoverOverlayScale, 128, 128);
        }
    }

    updateHealthBar(camera) {
        if (!this.healthBar || !this.healthBar.visible) return;

        // Reuse scratch vectors to avoid per-frame allocations
        const camZ = this._scratchVec3A.set(0, 0, 1).applyQuaternion(camera.quaternion).normalize();
        const camX = this._scratchVec3B.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
        const cross = this._scratchVec3C.crossVectors(camZ, camX).normalize();
        cross.multiplyScalar(this.hitBox.radius * 1.5);

        this.healthBar.position.copy(cross);
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
        this.justHit = false;
        this.intersecting = false;
        this.targetTimer = 0;
        this.hitAccumulator = 0;
        if (this.stripedAngleMode === 'random') {
            this.stripedAngle = Math.random() * 360;
        }
        this.healthBar.setMaxHealth(this.maxHealth);
        this.healthBar.setHealth(this.maxHealth);
        this.updateHealthBarVisibility(false);
    }

    setHealth(health) {
        this.health = health;
        this.healthBar.setHealth(this.health);
        this.updateHealthBarVisibility(false);
    }

    getHealth() {
        return this.health;
    }

    setMaxHealth(maxHealth) {
        this.maxHealth = maxHealth;
        this.healthBar.setMaxHealth(this.maxHealth);
        this.updateHealthBarVisibility(false);
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

    setBallColor(color) {
        if (!this.ball || !this.ball.material) return;

        if (Array.isArray(this.ball.material)) {
            this.ball.material.forEach(material => {
                if (material?.color?.set) {
                    material.color.set(color);
                }
            });
            return;
        }

        if (this.ball.material.color?.set) {
            this.ball.material.color.set(color);
        }

        if (this._hoverUniforms?.baseColor?.value?.set) {
            this._hoverUniforms.baseColor.value.set(color);
        }
    }

    _handleHoverAppearance(intersection) {
        void intersection;
    }

    _canApplyDamage(intersection, collisionContext, upDir) {
        void intersection;
        void collisionContext;
        void upDir;
        return true;
    }

    _resolveReticleType(type) {
        const key = typeof type === 'string' ? type.toLowerCase() : 'cross';
        return Object.prototype.hasOwnProperty.call(RETICLE_SHADERS, key) ? key : 'cross';
    }

    _resolveReticleEffect(effect) {
        const key = typeof effect === 'string' ? effect.toLowerCase() : 'none';
        switch (key) {
            case 'glitter':
                return 1;
            case 'pulse':
                return 2;
            case 'scanline':
                return 3;
            case 'shimmer':
                return 4;
            default:
                return 0;
        }
    }

    _resolveHoverEffect(effect) {
        if (effect === null || effect === undefined) return 'shimmer';
        const key = typeof effect === 'string' ? effect.toLowerCase() : 'shimmer';
        if (key === 'none') return 'none';
        if (Object.prototype.hasOwnProperty.call(HOVER_EFFECTS, key)) return key;
        const matched = Object.keys(HOVER_EFFECTS).find(name => name.toLowerCase() === key);
        if (matched) return matched;
        return 'shimmer';
    }

    _createReticleMaterial(type) {
        const shaderKey = this._resolveReticleType(type);
        const crossMat = new THREE.ShaderMaterial({
            vertexShader: RETICLE_VERTEX_SHADER,
            fragmentShader: RETICLE_SHADERS[shaderKey],
            uniforms: this.crosshairUniforms,
            transparent: true,
            depthWrite: false,
        });
        crossMat.alphaTest = 0.15;
        return crossMat;
    }

    _initHoverEffect() {
        if (this.onHoverEffectType === 'none') return;
        const effectFactory = HOVER_EFFECTS[this.onHoverEffectType];
        if (!effectFactory) return;

        const { material, uniforms, applyTo = 'material', overlayScale = 1.05 } = effectFactory(this.defaultBallMaterial?.color ?? 0x049ef4);
        this._hoverMaterial = material;
        this._hoverUniforms = uniforms;
        this._hoverApplyTo = applyTo;
        this._hoverOverlayScale = overlayScale;

        if (applyTo === 'overlay') {
            this._hoverOverlayMesh = new THREE.Mesh(
                new THREE.SphereGeometry(this.radius * this._hoverOverlayScale, 24, 24),
                material,
            );
            this._hoverOverlayMesh.visible = false;
            this._hoverOverlayMesh.renderOrder = 12;
            this._hoverOverlayMesh.position.set(0, 0, 0);
            this.add(this._hoverOverlayMesh);
            this._hoverMaterial = null;
        }
    }

}