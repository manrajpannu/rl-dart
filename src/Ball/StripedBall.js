import * as THREE from 'three';
import { Ball } from './Ball.js';

const STRIPE_VERTEX_SHADER = `
varying vec3 vWorldNormal;
void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const STRIPE_FRAGMENT_SHADER = `
varying vec3 vWorldNormal;
uniform vec3 stripeAxis;
uniform float stripeCount;
uniform float stripeWidth;
uniform float stripeSoftness;
uniform float stripeOpacity;
uniform float time;
uniform float stripeScrollSpeed;

void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 axis = normalize(stripeAxis);
    float axisDot = dot(n, axis);
    float angle = acos(clamp(axisDot, -1.0, 1.0));
    
    float v = angle * stripeCount + time * stripeScrollSpeed;
    float wave = abs(sin(v));
    
    // Anti-aliasing: use fwidth to determine the transition width in screen space.
    // This removes jaggies without making the edges look "feathered" or blurry at a distance.
    float grad = fwidth(wave);
    float edge = 1.0 - stripeWidth;
    float stripe = smoothstep(edge - grad, edge + grad, wave);
    
    if (stripe <= 0.001) discard;
    gl_FragColor = vec4(vec3(1.0), stripe * stripeOpacity);
}`;

export class StripedBall extends Ball {
    constructor(position = new THREE.Vector3(0, 3, -3), radius = 0.9125, movement = null, health = null, reticle = null, appearance = null) {
        const normalizedRadius = Number.isFinite(Number(radius)) && Number(radius) > 0 ? Number(radius) : 0.9125;
        super(position, normalizedRadius, movement, health, reticle, appearance);

        const appearanceConfig = appearance && typeof appearance === 'object' ? appearance : {};
        this.stripedAngleMode = appearanceConfig.stripedAngle === 'random' ? 'random' : 'fixed';
        this.stripedAngle = this.stripedAngleMode === 'random'
            ? Math.random() * 360
            : Number(appearanceConfig.stripedAngle ?? 0);
        this.stripeTolerance = Number.isFinite(Number(appearanceConfig.stripeTolerance))
            ? Math.max(0, Number(appearanceConfig.stripeTolerance))
            : 5;

        this._stripeAlignmentAngleDeg = 90;
        this._stripeAlignedForDamage = false;
        this._baseBallColor = new THREE.Color(this.defaultBallMaterial.color);

        this.stripeUniforms = {
            stripeAxis: { value: new THREE.Vector3(1, 0, 0) },
            stripeCount: { value: 13.0 },
            stripeWidth: { value: 0.14 },
            stripeSoftness: { value: 0.004 },
            stripeOpacity: { value: 1.0 },
            time: { value: 0 },
            stripeScrollSpeed: { value: 0.9 },
        };

        const stripeMaterial = new THREE.ShaderMaterial({
            vertexShader: STRIPE_VERTEX_SHADER,
            fragmentShader: STRIPE_FRAGMENT_SHADER,
            uniforms: this.stripeUniforms,
            transparent: true,
            depthWrite: false,
            extensions: {
                derivatives: true
            }
        });

        this.stripeMesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius + 0.002, 128, 128),
            stripeMaterial,
        );
        this.stripeMesh.renderOrder = 9;
        this.stripeMesh.visible = true;
        this.add(this.stripeMesh);
        
        // Remove the default indicator sphere for a cleaner striped appearance
        if (this.indicatorSphere) {
            this.remove(this.indicatorSphere);
            this.indicatorSphere.geometry.dispose();
            if (this.indicatorSphere.material) {
                this.indicatorSphere.material.dispose();
            }
            this.indicatorSphere = null;
        }

        // Ensure all striped/base geometries and hitbox are synchronized to the requested size.
        this.setRadius(normalizedRadius);
    }

    update(ray, boost, dt, collisionContext = null, canBeHit = true, upDir = null, bulletsEnabled = false) {
        if (this.stripeUniforms?.time) {
            this.stripeUniforms.time.value += dt;
        }
        return super.update(ray, boost, dt, collisionContext, canBeHit, upDir, bulletsEnabled);
    }

    _handleHoverAppearance(intersection) {
        if (intersection) {
            this._applyStripeAlignmentColor();
        } else {
            this._clearStripeAlignmentColor();
        }
    }

    _canApplyDamage(intersection, collisionContext, upDir) {
        this._updateStripeAxis(collisionContext, upDir);
        return Boolean(intersection && this._stripeAlignedForDamage);
    }

    setRadius(newRadius) {
        super.setRadius(newRadius);
        if (this.stripeMesh) {
            this.stripeMesh.geometry.dispose();
            this.stripeMesh.geometry = new THREE.SphereGeometry(newRadius + 0.002, 128, 128);
        }
    }

    setBallColor(color) {
        super.setBallColor(color);
        this._baseBallColor.set(color);
    }

    _applyStripeAlignmentColor() {
        const color = this._stripeAlignedForDamage
            ? new THREE.Color(0x2dff7a)
            : new THREE.Color(0xff2d2d);

        if (this.defaultBallMaterial?.color?.set) {
            this.defaultBallMaterial.color.set(color);
        }
        if (this._hoverUniforms?.baseColor?.value?.set) {
            this._hoverUniforms.baseColor.value.set(color);
        }
    }

    _clearStripeAlignmentColor() {
        if (this.defaultBallMaterial?.color?.set) {
            this.defaultBallMaterial.color.set(this._baseBallColor);
        }
        if (this._hoverUniforms?.baseColor?.value?.set) {
            this._hoverUniforms.baseColor.value.set(this._baseBallColor);
        }
    }

    _updateStripeAxis(carPos, upDir) {
        if (!this.stripeUniforms || !carPos) {
            this._stripeAlignmentAngleDeg = 90;
            this._stripeAlignedForDamage = false;
            return;
        }

        const forward = this.position.clone().sub(carPos);
        if (forward.lengthSq() < 1e-6) {
            this._stripeAlignmentAngleDeg = 90;
            this._stripeAlignedForDamage = false;
            return;
        }
        forward.normalize();

        const refUp = new THREE.Vector3(0, 1, 0);
        let right = new THREE.Vector3().crossVectors(refUp, forward);
        if (right.lengthSq() < 1e-6) {
            const fallbackUp = Math.abs(forward.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);
            right = new THREE.Vector3().crossVectors(fallbackUp, forward);
        }
        right.normalize();

        const north = new THREE.Vector3().crossVectors(forward, right).normalize();
        const angleRad = THREE.MathUtils.degToRad(this.stripedAngle);
        const stripeDirection = north.clone().applyAxisAngle(forward, angleRad).normalize();
        const stripeAxis = new THREE.Vector3().crossVectors(stripeDirection, forward).normalize();
        this.stripeUniforms.stripeAxis.value.copy(stripeAxis);

        const carUp = upDir ? upDir.clone().normalize() : new THREE.Vector3(0, 1, 0);
        const upProjected = carUp.sub(forward.clone().multiplyScalar(carUp.dot(forward)));
        if (upProjected.lengthSq() < 1e-6) {
            this._stripeAlignmentAngleDeg = 90;
            this._stripeAlignedForDamage = false;
            return;
        }
        upProjected.normalize();

        // Alignment is intentionally rotated by +90deg relative to stripeDirection.
        const alignmentDir = stripeAxis;
        const dot = Math.abs(THREE.MathUtils.clamp(upProjected.dot(alignmentDir), -1, 1));
        const angleDeg = THREE.MathUtils.radToDeg(Math.acos(dot));
        this._stripeAlignmentAngleDeg = angleDeg;
        this._stripeAlignedForDamage = angleDeg <= this.stripeTolerance;
    }
}
