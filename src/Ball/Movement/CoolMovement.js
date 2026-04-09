import * as THREE from 'three';

// CoolMovement coordinates balls in shared groups so they keep spacing,
// avoid each other, and avoid a center keep-out radius.
export class CoolMovement {
    static _groups = new Map();

    /**
     * @param {Object} options
     * @param {string} [options.groupId]
     * @param {number} [options.maxGroupSize]
     * @param {number} [options.orbitRadius]
     * @param {number} [options.orbitSpeed]
     * @param {number} [options.verticalAmplitude]
     * @param {number} [options.verticalFrequency]
     * @param {Object} [options.centerBounds]
     * @param {number} [options.centerDriftSpeed]
     * @param {number} [options.minSeparation]
     * @param {number} [options.separationStrength]
     * @param {number} [options.centerAvoidRadius]
     * @param {number} [options.centerAvoidStrength]
     * @param {THREE.Vector3} [options.boundaryOrigin]
     */
    constructor({
        groupId = 'default',
        maxGroupSize = 12,
        orbitRadius = 6,
        orbitSpeed = 1.2,
        verticalAmplitude = 2.5,
        verticalFrequency = 1.5,
        centerBounds = { x: 8, y: 2, z: 8 },
        centerDriftSpeed = 0.5,
        minSeparation = 2.2,
        separationStrength = 6.5,
        centerAvoidRadius = 2.5,
        centerAvoidStrength = 8.5,
        boundaryOrigin = new THREE.Vector3(0, 0, 0)
    } = {}) {
        this.groupId = groupId;
        this.maxGroupSize = Math.max(1, Math.floor(maxGroupSize));
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.verticalAmplitude = verticalAmplitude;
        this.verticalFrequency = verticalFrequency;
        this.centerBounds = centerBounds;
        this.centerDriftSpeed = centerDriftSpeed;
        this.minSeparation = minSeparation;
        this.separationStrength = separationStrength;
        this.centerAvoidRadius = centerAvoidRadius;
        this.centerAvoidStrength = centerAvoidStrength;
        this.boundaryOrigin = boundaryOrigin.clone ? boundaryOrigin.clone() : new THREE.Vector3(0, 0, 0);
        this._bounceDamping = 0.85;
        this._angle = Math.random() * Math.PI * 2;
        this._registeredBall = null;
        this._groupSlot = -1;

        this._tempRepel = new THREE.Vector3();
        this._tempCenterPush = new THREE.Vector3();

        this._ensureGroup();
    }

    _ensureGroup() {
        if (CoolMovement._groups.has(this.groupId)) {
            return CoolMovement._groups.get(this.groupId);
        }

        const group = {
            members: new Set(),
            center: this.boundaryOrigin.clone().add(new THREE.Vector3(0, 4, 0)),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                0,
                (Math.random() - 0.5) * 4
            ),
            time: 0,
            bounds: { ...this.centerBounds },
            boundaryOrigin: this.boundaryOrigin.clone(),
        };

        CoolMovement._groups.set(this.groupId, group);
        return group;
    }

    _registerBall(ball) {
        if (this._registeredBall === ball) return;

        const group = this._ensureGroup();
        group.members.add(ball);
        this._registeredBall = ball;
    }

    _getOrderedMembers(group) {
        return Array.from(group.members).filter(member => member && member.parent);
    }

    _getSlot(members, ball) {
        const index = members.indexOf(ball);
        if (index < 0) return 0;
        return index % this.maxGroupSize;
    }

    _updateGroupCenter(group, dt) {
        group.time += dt;
        group.velocity.multiplyScalar(0.995);
        group.center.addScaledVector(group.velocity, dt * this.centerDriftSpeed);

        const b = group.bounds;
        const min = group.boundaryOrigin.clone().add(new THREE.Vector3(-b.x, b.y, -b.z));
        const max = group.boundaryOrigin.clone().add(new THREE.Vector3(b.x, b.y + 4, b.z));

        if (group.center.x <= min.x || group.center.x >= max.x) {
            group.velocity.x *= -this._bounceDamping;
        }
        if (group.center.z <= min.z || group.center.z >= max.z) {
            group.velocity.z *= -this._bounceDamping;
        }

        group.center.x = Math.max(min.x, Math.min(max.x, group.center.x));
        group.center.y = Math.max(min.y, Math.min(max.y, group.center.y));
        group.center.z = Math.max(min.z, Math.min(max.z, group.center.z));
    }

    _computeDesiredPosition(group, slot, activeSlots) {
        const slotAngle = (Math.PI * 2 * slot) / Math.max(1, activeSlots);
        const angle = group.time * this.orbitSpeed + slotAngle + this._angle;

        const x = Math.cos(angle) * this.orbitRadius;
        const z = Math.sin(angle) * this.orbitRadius;
        const y = group.center.y + Math.sin(angle * this.verticalFrequency) * this.verticalAmplitude;

        return new THREE.Vector3(group.center.x + x, y, group.center.z + z);
    }

    _applyAvoidance(ball, members, group, dt, desiredPos) {
        this._tempRepel.set(0, 0, 0);

        for (const other of members) {
            if (other === ball) continue;
            const delta = desiredPos.clone().sub(other.position);
            const dist = delta.length();
            if (dist <= 0 || dist >= this.minSeparation) continue;

            const strength = (this.minSeparation - dist) / this.minSeparation;
            delta.normalize().multiplyScalar(strength * this.separationStrength * dt);
            this._tempRepel.add(delta);
        }

        this._tempCenterPush.copy(desiredPos).sub(group.center);
        const centerDist = this._tempCenterPush.length();
        if (centerDist > 0 && centerDist < this.centerAvoidRadius) {
            const pushStrength = ((this.centerAvoidRadius - centerDist) / this.centerAvoidRadius) * this.centerAvoidStrength * dt;
            this._tempCenterPush.normalize().multiplyScalar(pushStrength);
            this._tempRepel.add(this._tempCenterPush);
        }

        desiredPos.add(this._tempRepel);

        const b = group.bounds;
        const min = group.boundaryOrigin.clone().add(new THREE.Vector3(-b.x, b.y, -b.z));
        const max = group.boundaryOrigin.clone().add(new THREE.Vector3(b.x, b.y + 4, b.z));
        desiredPos.x = Math.max(min.x, Math.min(max.x, desiredPos.x));
        desiredPos.y = Math.max(min.y, Math.min(max.y, desiredPos.y));
        desiredPos.z = Math.max(min.z, Math.min(max.z, desiredPos.z));
    }

    _cleanupGroup(group) {
        for (const member of group.members) {
            if (!member || !member.parent) {
                group.members.delete(member);
            }
        }
    }

    _randomCenterTarget() {
        const b = this.centerBounds;
        // Kept for backwards compatibility if external code calls it.
        return this.boundaryOrigin.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * 2 * b.x,
            b.y + Math.random() * 4,
            (Math.random() - 0.5) * 2 * b.z
        ));
    }

    _reseedGroupCenter(group) {
        const b = group.bounds;
        group.center.copy(group.boundaryOrigin).add(new THREE.Vector3(
            (Math.random() - 0.5) * 2 * b.x,
            b.y + Math.random() * 4,
            (Math.random() - 0.5) * 2 * b.z
        ));
        group.velocity.set(
            (Math.random() - 0.5) * 4,
            0,
            (Math.random() - 0.5) * 4,
        );
    }

    update(ball, dt = 0.016) {
        this._registerBall(ball);
        const group = this._ensureGroup();
        this._cleanupGroup(group);

        const members = this._getOrderedMembers(group);
        if (members.length === 0) return;

        if (members[0] === ball) {
            this._updateGroupCenter(group, dt);
        }

        this._groupSlot = this._getSlot(members, ball);
        const activeSlots = Math.min(this.maxGroupSize, members.length);
        const pos = this._computeDesiredPosition(group, this._groupSlot, activeSlots);
        this._applyAvoidance(ball, members, group, dt, pos);

        if (typeof ball.setPosition === 'function') {
            ball.setPosition(pos);
        } else {
            ball.position.copy(pos);
        }
    }

    reset(ball, boundary = 20) {
        this._registerBall(ball);
        const group = this._ensureGroup();
        group.bounds = {
            x: boundary,
            y: this.centerBounds.y,
            z: boundary,
        };

        this._reseedGroupCenter(group);

        // Reset this ball near group center within boundary
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

        ball.userData.coolMovementGroupId = this.groupId;
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
