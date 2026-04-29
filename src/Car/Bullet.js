import * as THREE from 'three';
import { playSparkBurstEffect } from './effects/sparkBurstEffect.js';

const BULLET_COLOR = 0xffcf6b;
const BULLET_TRAIL_COLOR = 0xff8f2f;
const LASER_VERT_SHADER = `
varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const LASER_FRAG_SHADER = `
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float width = abs(uv.x - 0.5) * 2.0;
    float core = smoothstep(0.18, 0.0, width);
    float glow = smoothstep(1.0, 0.0, width);
    float tailFade = smoothstep(0.0, 0.08, uv.y) * smoothstep(0.0, 0.24, 1.0 - uv.y);
    float streak = exp(-24.0 * width) * smoothstep(1.0, 0.15, uv.y);
    float tipPulse = smoothstep(0.7, 1.0, uv.y) * smoothstep(0.22, 0.0, width);
    float endFade = tailFade;
    float alpha = clamp((0.95 * core + 0.5 * glow) * endFade, 0.0, 1.0);
    alpha = clamp(alpha + 0.35 * streak + 0.28 * tipPulse, 0.0, 1.0);
    vec3 color = mix(vec3(1.0, 0.68, 0.04), vec3(1.0, 0.95, 0.28), clamp(core + tipPulse * 0.5, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha);
}
`;

export class Bullet {
    constructor({ root, origin, direction, speed = 72, range = 180, damage = 1, showVisuals = true, sourcePosition = null, sourceUp = null, hitDetectionEnabled = true }) {
        this.root = root;
        this.speed = speed;
        this.range = range;
        this.damage = damage;
        this.showVisuals = Boolean(showVisuals);
        this.hitDetectionEnabled = Boolean(hitDetectionEnabled);
        this.sourcePosition = sourcePosition ? sourcePosition.clone() : null;
        this.sourceUp = sourceUp ? sourceUp.clone() : null;
        this.distanceTravelled = 0;
        this.alive = true;
        this.position = origin.clone();
        this.direction = direction.clone().normalize();
        this.previousPosition = origin.clone();

        this.group = this.showVisuals ? new THREE.Group() : null;
        if (this.group) {
            this.group.position.copy(origin);
        }

        this._laserMeshes = [];
        this._laserDirectionQuat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          this.direction.clone().normalize(),
        );

        const createLaserPlane = (rotationY = 0) => {
            const geometry = new THREE.PlaneGeometry(0.11, 1.18, 1, 1);
            const material = new THREE.ShaderMaterial({
                vertexShader: LASER_VERT_SHADER,
                fragmentShader: LASER_FRAG_SHADER,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.quaternion.copy(this._laserDirectionQuat);
            mesh.rotateY(rotationY);
            mesh.position.copy(this.direction).multiplyScalar(-0.45);
            this.group.add(mesh);
            this._laserMeshes.push(mesh);
        };

        if (this.group) {
            createLaserPlane(0);
            createLaserPlane(Math.PI / 2);
            this.root.add(this.group);
        }
    }

    dispose() {
        if (this.group?.parent) {
          this.group.parent.remove(this.group);
        }
        for (const mesh of this._laserMeshes) {
            mesh.geometry.dispose();
            mesh.material.dispose();
        }
        this._laserMeshes = [];
    }

    _findImpact(ballManager, startPosition, travelDistance) {
        if (!ballManager || !Array.isArray(ballManager.balls)) return null;

        const ray = new THREE.Ray(startPosition.clone(), this.direction.clone());
        let closest = null;
        let closestDistance = Infinity;

        for (const ball of ballManager.balls) {
            if (!ball || !ball.hitBox) continue;
            const hitPoint = ball.findIntersection(ray, ball.hitBox);
            if (!hitPoint) continue;

            const distance = hitPoint.distanceTo(startPosition);
            if (distance <= travelDistance && distance < closestDistance) {
                closestDistance = distance;
                closest = { ball, hitPoint };
            }
        }

        return closest;
    }

    _impact(ballManager, hitPoint, ball = null) {
        if (this.showVisuals) {
            playSparkBurstEffect(this.root, hitPoint, {
                count: 10,
                duration: 0.1,
                speed: 6.2,
                spread: 0.02,
                sizeMin: 1.1,
                sizeMax: 2.1,
                color: 0xffd94a,
            });
        }

        if (!ballManager || !ball) return;

        const canApplyDamage = typeof ball._canApplyDamage === 'function'
            ? ball._canApplyDamage(hitPoint, this.sourcePosition, this.sourceUp)
            : true;
        if (!canApplyDamage) {
            return;
        }

        if (typeof ball.setHealth === 'function' && typeof ball.getHealth === 'function') {
            ball.setHealth(Math.max(0, ball.getHealth() - this.damage));
        } else if (typeof ball.damage === 'function') {
            ball.damage();
        }

        const shouldPlayImpactHitSound = !ball.holdSliderEnabled;
        if (shouldPlayImpactHitSound && typeof ball.playHitSoundOnce === 'function') {
            ball.playHitSoundOnce();
        }

        ball.justHit = true;
        ballManager.emit('hit', ball);

        if (typeof ball.isKilled === 'function' && ball.isKilled()) {
            ballManager.respawnBall(ball);
            ballManager.emit('killed', ball);
        }
    }

    update(dt, ballManager) {
        if (!this.alive) return false;

        const travelDistance = this.speed * dt;
        const nextPosition = this.position.clone().addScaledVector(this.direction, travelDistance);
        const impact = this.hitDetectionEnabled
            ? this._findImpact(ballManager, this.position, travelDistance)
            : null;

        if (impact) {
            if (this.group) {
                this.group.position.copy(impact.hitPoint);
            }
            this._impact(ballManager, impact.hitPoint, impact.ball);
            this.alive = false;
            this.dispose();
            return false;
        }

        this.previousPosition.copy(this.position);
        this.position.copy(nextPosition);
        if (this.group) {
            this.group.position.copy(this.position);
        }
        this.distanceTravelled += travelDistance;

        if (this.distanceTravelled >= this.range) {
            if (this.showVisuals) {
                playSparkBurstEffect(this.root, this.position, {
                    count: 8,
                    duration: 0.08,
                    speed: 4.5,
                    spread: 0.015,
                    sizeMin: 0.9,
                    sizeMax: 1.8,
                    color: 0xffd94a,
                });
            }
            this.alive = false;
            this.dispose();
            return false;
        }

        return true;
    }
}