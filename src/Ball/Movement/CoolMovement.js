import * as THREE from 'three';

// CoolMovement: Ball orbits a moving center, with a vertical sine wave and random center drift
export class CoolMovement {
    /**
     * @param {Object} options
     * @param {number} [options.orbitRadius]
     * @param {number} [options.orbitSpeed]
     * @param {number} [options.verticalAmplitude]
     * @param {number} [options.verticalFrequency]
     * @param {Object} [options.centerBounds]
     * @param {number} [options.centerDriftSpeed]
     * @param {THREE.Vector3} [options.boundaryOrigin]
     */
    constructor({
        orbitRadius = 6,
        orbitSpeed = 1.2,
        verticalAmplitude = 2.5,
        verticalFrequency = 1.5,
        centerBounds = { x: 8, y: 2, z: 8 },
        centerDriftSpeed = 0.5,
        boundaryOrigin = new THREE.Vector3(0, 0, 0)
    } = {}) {
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.verticalAmplitude = verticalAmplitude;
        this.verticalFrequency = verticalFrequency;
        this.centerBounds = centerBounds;
        this.centerDriftSpeed = centerDriftSpeed;
        this.boundaryOrigin = boundaryOrigin.clone ? boundaryOrigin.clone() : new THREE.Vector3(0, 0, 0);
        this._center = this.boundaryOrigin.clone().add(new THREE.Vector3(0, 4, 0));
        this._angle = Math.random() * Math.PI * 2;
        this._centerTarget = this._randomCenterTarget();
        // Add a velocity vector for bouncing
        this._velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 4,
            0,
            (Math.random() - 0.5) * 4
        );
        this._bounceDamping = 0.85;
    }

    _randomCenterTarget() {
        const b = this.centerBounds;
        // Target is relative to boundaryOrigin
        return this.boundaryOrigin.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * 2 * b.x,
            b.y + Math.random() * 4,
            (Math.random() - 0.5) * 2 * b.z
        ));
    }

    update(ball, dt = 0.016) {
        // Physics-like update for center
        // Apply velocity to center
        this._center.addScaledVector(this._velocity, dt);
        // Dampen velocity slightly
        this._velocity.multiplyScalar(0.995);

        // Keep center within bounds relative to boundaryOrigin
        const b = this.centerBounds;
        const min = this.boundaryOrigin.clone().add(new THREE.Vector3(-b.x, b.y, -b.z));
        const max = this.boundaryOrigin.clone().add(new THREE.Vector3(b.x, b.y + 4, b.z));
        this._center.x = Math.max(min.x, Math.min(max.x, this._center.x));
        this._center.y = Math.max(min.y, Math.min(max.y, this._center.y));
        this._center.z = Math.max(min.z, Math.min(max.z, this._center.z));

        // Orbit horizontally
        this._angle += this.orbitSpeed * dt;
        const x = Math.cos(this._angle) * this.orbitRadius;
        const z = Math.sin(this._angle) * this.orbitRadius;
        // Vertical sine wave
        const y = this._center.y + Math.sin(this._angle * this.verticalFrequency) * this.verticalAmplitude;
        const pos = new THREE.Vector3(this._center.x + x, y, this._center.z + z);
        if (typeof ball.setPosition === 'function') {
            ball.setPosition(pos);
        } else {
            ball.position.copy(pos);
        }
    }

    reset(ball, boundary = 20) {
        // Reset position within boundary relative to origin
        const pos = this.boundaryOrigin.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * 2 * boundary,
            2 + Math.random() * 6,
            (Math.random() - 0.5) * 2 * boundary
        ));
        if (typeof ball.setPosition === 'function') {
            ball.setPosition(pos);
        } else {
            ball.position.copy(pos);
        }
        this._center = pos.clone();
        this._centerTarget = this._randomCenterTarget();
        this._angle = Math.random() * Math.PI * 2;
    }

    /**
     * Called when this ball collides with another ball
     * @param {Ball} otherBall
     * @param {Ball} selfBall
     */
    handleCollision(otherBall, selfBall) {

    }
}
