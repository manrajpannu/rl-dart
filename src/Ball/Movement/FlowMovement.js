import * as THREE from 'three';

export class FlowMovement {
    constructor({
        bounds = 9,
        minSpeed = 5,
        maxSpeed = 10,
        turnRate = 2
    } = {}) {
        this.bounds = bounds;
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.turnRate = turnRate;
        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().multiplyScalar(this._randomSpeed());
        this.target = this._randomTarget();
        this.timer = 0;
        this.changeInterval = 1.5 + Math.random() * 2;
    }

    _randomSpeed() {
        return this.minSpeed + Math.random() * (this.maxSpeed - this.minSpeed);
    }

    _randomTarget() {
        return new THREE.Vector3(
            (Math.random() - 0.5) * this.bounds * 2,
            1 + Math.random() * this.bounds,
            (Math.random() - 0.5) * this.bounds * 2
        );
    }

    reset(ball) {
        const pos = new THREE.Vector3(
            (Math.random() - 0.5) * 2 * this.bounds,
            2 + Math.random() * 6,
            (Math.random() - 0.5) * 2 * this.bounds
        );
        if (typeof ball.setPosition === 'function') {
            ball.setPosition(pos);
        } else {
            ball.position.copy(pos);
        }
        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().multiplyScalar(this._randomSpeed());
        this.target = this._randomTarget();
        this.timer = 0;
        this.changeInterval = 1.5 + Math.random() * 2;
    }

    update(ball, dt) {
        this.timer += dt;
        // Change target every few seconds
        if (this.timer > this.changeInterval) {
            this.target = this._randomTarget();
            this.timer = 0;
            this.changeInterval = 1.5 + Math.random() * 2;
        }

        // Steer toward the target
        const toTarget = this.target.clone().sub(ball.position);
        const desired = toTarget.clone().normalize().multiplyScalar(this._randomSpeed());
        const steer = desired.sub(this.velocity).clampLength(0, this.turnRate * dt);
        this.velocity.add(steer);

        // Clamp speed
        const speed = this.velocity.length();
        if (speed > this.maxSpeed) {
            this.velocity.setLength(this.maxSpeed);
        } else if (speed < this.minSpeed) {
            this.velocity.setLength(this.minSpeed);
        }

        // Compute new position
        const newPos = ball.position.clone().addScaledVector(this.velocity, dt);

        // Soft bounds
        ["x", "y", "z"].forEach(axis => {
            if (Math.abs(newPos[axis]) > this.bounds) {
                this.velocity[axis] *= -1;
                newPos[axis] = Math.sign(newPos[axis]) * this.bounds;
            }
        });

        if (typeof ball.setPosition === 'function') {
            ball.setPosition(newPos);
        } else {
            ball.position.copy(newPos);
        }
    }
}
