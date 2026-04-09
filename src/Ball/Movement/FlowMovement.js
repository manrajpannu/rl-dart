import * as THREE from 'three';

export class FlowMovement {
    static _members = new Set();

    constructor({
        bounds = 9,
        minSpeed = 1,
        maxSpeed = 10,
        turnRate = 2,
        minSeparation = 2.2,
        separationStrength = 16,
    } = {}) {
        this.bounds = bounds;
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.turnRate = turnRate;
        this.minSeparation = minSeparation;
        this.separationStrength = separationStrength;
        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().multiplyScalar(this._randomSpeed());
        this.target = this._randomTarget();
        this.timer = 0;
        this.changeInterval = 1.5 + Math.random() * 2;
        this._registeredBall = null;

        this._tmpDelta = new THREE.Vector3();
        this._tmpAvoid = new THREE.Vector3();
        this._tmpOtherDir = new THREE.Vector3();
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

    _registerBall(ball) {
        if (this._registeredBall === ball) return;
        FlowMovement._members.add(ball);
        this._registeredBall = ball;
    }

    _cleanupMembers() {
        for (const member of FlowMovement._members) {
            if (!member || !member.parent) {
                FlowMovement._members.delete(member);
            }
        }
    }

    _computeAvoidance(ball, basePos, dt) {
        this._tmpAvoid.set(0, 0, 0);

        for (const other of FlowMovement._members) {
            if (!other || other === ball) continue;

            this._tmpDelta.copy(basePos).sub(other.position);
            const dist = this._tmpDelta.length();

            const otherRadius = other.hitBox?.radius ?? 1;
            const selfRadius = ball.hitBox?.radius ?? 1;
            const requiredSpacing = Math.max(this.minSeparation, selfRadius + otherRadius + 0.15);

            if (dist <= 0 || dist >= requiredSpacing) continue;

            const strength = (requiredSpacing - dist) / requiredSpacing;
            this._tmpDelta.normalize().multiplyScalar(strength * this.separationStrength * dt);
            this._tmpAvoid.add(this._tmpDelta);
        }

        return this._tmpAvoid;
    }

    reset(ball) {
        this._registerBall(ball);
        this._cleanupMembers();

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
        this._registerBall(ball);
        this._cleanupMembers();

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

        // Apply local avoidance against nearby FlowMovement balls.
        const avoidance = this._computeAvoidance(ball, newPos, dt);
        newPos.add(avoidance);

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

    /**
     * Strong overlap resolver called by BallManager collision pass.
     */
    handleCollision(otherBall, selfBall) {
        if (!otherBall || !selfBall) return;

        this._tmpOtherDir.copy(selfBall.position).sub(otherBall.position);
        let distance = this._tmpOtherDir.length();
        if (distance <= 1e-6) {
            this._tmpOtherDir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            distance = 1e-6;
        } else {
            this._tmpOtherDir.multiplyScalar(1 / distance);
        }

        const selfRadius = selfBall.hitBox?.radius ?? 1;
        const otherRadius = otherBall.hitBox?.radius ?? 1;
        const targetDistance = selfRadius + otherRadius + 0.05;
        const overlap = targetDistance - distance;

        if (overlap > 0) {
            const push = overlap * 0.55;
            const pos = selfBall.position.clone().addScaledVector(this._tmpOtherDir, push);
            if (typeof selfBall.setPosition === 'function') {
                selfBall.setPosition(pos);
            } else {
                selfBall.position.copy(pos);
            }

            // Add a quick velocity impulse away from the overlap to reduce re-collisions.
            this.velocity.addScaledVector(this._tmpOtherDir, Math.min(2.5, overlap * 6));
            const speed = this.velocity.length();
            if (speed > this.maxSpeed * 1.25) this.velocity.setLength(this.maxSpeed * 1.25);
        }
    }
}
