import * as THREE from 'three';
import { Ball } from './Ball';
import { StripedBall } from './StripedBall.js';
import { CollisionSystem } from './CollisionSystem';
import { MovementRegistry } from './Movement/index.js';

/**
 * Manages all Ball instances in the scene.
 *
 * Responsibilities:
 * - Own the active ball collection
 * - Update balls each frame
 * - Emit gameplay events (hit/killed)
 * - Resolve ball-to-ball collisions
 * - Track targeting helpers (closest and first ray-intersected ball)
 */
export class BallManager extends THREE.Group {
    constructor() {
        super();
        /** @type {import('./Ball').Ball[]} */
        this.balls = [];
        this.selectedIndex = 0;
        this.listeners = {};
        // Pre-allocated scratch vector to avoid per-frame GC in findClosestBall
        this._scratchVec3 = new THREE.Vector3();
    }
    
    /**
     * Subscribe to manager events.
     * @param {string} event Event name.
     * @param {(data?: any) => void} callback Event handler.
     */
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    
    /**
     * Unsubscribe from manager events.
     * @param {string} event Event name.
     * @param {(data?: any) => void} callback Event handler to remove.
     */
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
    
    /**
     * Emit an event to all listeners.
     * @param {string} event Event name.
     * @param {any} data Optional payload.
     */
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }

    /**
     * Returns the ball most aligned with the ray direction.
     * Alignment is measured with a direction dot product.
     *
     * @param {THREE.Ray} ray
     * @returns {Ball|null}
     */
    findClosestBall(ray) {
        let closestBall = null;
        let highestDot = -Infinity;
        if (!this.balls || this.balls.length === 0) {
            console.warn('BallManager: No balls to find closest.');
            return null;
        }
        this.balls.forEach(ball => {
            const toBall = this._scratchVec3.subVectors(ball.position, ray.origin).normalize();
            const dot = ray.direction.dot(toBall);
            if (dot > highestDot) {
                highestDot = dot;
                closestBall = ball;
            }
        });
        return closestBall;
    }

    /**
     * Returns the first ball hit by the ray in world space.
     * This is based on the nearest valid ray-sphere intersection distance.
     *
     * @param {THREE.Ray} ray
     * @returns {Ball|null}
     */
    findFirstIntersectedBall(ray) {
        if (!ray || !this.balls || this.balls.length === 0) return null;

        let firstBall = null;
        let closestDistance = Infinity;

        this.balls.forEach(ball => {
            if (!ball || !ball.hitBox) return;
            const intersection = ball.findIntersection(ray, ball.hitBox);
            if (!intersection) return;

            const distance = intersection.distanceTo(ray.origin);
            if (distance < closestDistance) {
                closestDistance = distance;
                firstBall = ball;
            }
        });

        return firstBall;
    }
    
    isIntersecting() {
        for (const ball of this.balls) {
            if (ball.isIntersecting()) {
                return true;
            }
        }
        return false;
    }

    getBall(index) {
        return this.balls[index];
    }

    isHit() {
        for (const ball of this.balls) {
            if (ball.isHit()) {
                return true;
            }
        }
        return false;
    }

    isKilled() {
        let killedBall = null;
        for (const ball of this.balls) {
            if (ball.isKilled()) {
                killedBall = ball;
                break;
            }
        }
        if (killedBall) {
            this.respawnBall(killedBall);
            return killedBall;
        }
        return false;
    }

    addBall(ball) {
        this.balls.push(ball);
        this.add(ball);
   }

    /**
     * Create and add a ball to the manager
     * @param {THREE.Vector3} position
     * @param {number} size
     * @param {any} movementClass
     * @param {Object} healthObj
     * @param {Object} reticleObj
     */
    createBall(position, size, movementClass, healthObj, reticleObj = null, appearanceObj = null) {
        // Resolve movement class if it's a string name
        let actualMovementClass = movementClass;
        if (typeof movementClass === 'string') {
            actualMovementClass = MovementRegistry[movementClass] || null;
        }

        const movementInstance = actualMovementClass ? new actualMovementClass() : null;
        const BallType = appearanceObj?.isStriped ? StripedBall : Ball;
        const ball = new BallType(position, size, movementInstance, healthObj, reticleObj, appearanceObj);
        this.balls.push(ball);
        this.add(ball);
        return ball;
    }

    removeBall(index) {
        const ball = this.balls[index];
        if (ball) {
            this.remove(ball);
            this.balls.splice(index, 1);
        }
    }

    respawnBall(ball, boundary = 20) {
        if (ball.movement && typeof ball.movement.reset === 'function') {
            ball.movement.reset(ball);
            ball.respawn();
            return
        }
        const pos = new THREE.Vector3(
            (Math.random() - 0.5) * 2 * boundary,
            2 + Math.random() * 6,
            (Math.random() - 0.5) * 2 * boundary
        );
        ball.setPosition(pos);
        if (typeof ball.respawn === 'function') ball.respawn();
    }

    update(forwardVector, boostHeld, dt, upDir = null, options = {}) {
        const bulletsEnabled = Boolean(options?.bulletsEnabled);
        const carPosition = options?.carPosition ?? null;
        let hit = false;
        let killedBall = null;

        // Core targeting rule: only the first ray intersection can receive
        // hit/damage processing during this frame.
        const firstIntersectedBall = this.findFirstIntersectedBall(forwardVector);
        this.lastFirstIntersectedBall = firstIntersectedBall;

        this.balls.forEach(ball => {
            ball.update(forwardVector, boostHeld, dt, carPosition, ball === firstIntersectedBall, upDir, bulletsEnabled);
            if (ball.isHit()) hit = true;
            if (!killedBall && ball.isKilled()) killedBall = ball;
        });
        if (hit) this.emit('hit', firstIntersectedBall);
        if (killedBall) {
            this.respawnBall(killedBall);
            this.emit('killed', killedBall);
        }

        // Handle ball-to-ball collisions via movement class
        const collisions = this.getBallCollisions();
        collisions.forEach(({ ballA, ballB }) => {
            if (ballA.movement && typeof ballA.movement.handleCollision === 'function') {
                ballA.movement.handleCollision(ballB, ballA);
            }
            if (ballB.movement && typeof ballB.movement.handleCollision === 'function') {
                ballB.movement.handleCollision(ballA, ballB);
            }
        });

        // Compute closest ball after positions/respawns are finalized this frame.
        this.closestBall = this.findClosestBall(forwardVector);
    }

    getClosestBall() {
        return  this.balls.length > 0 ? this.closestBall : null;
    }

    updateHealthBar(camera) {
        this.balls.forEach(ball => ball.updateHealthBar(camera));
    }

    clear() {
        // Remove all balls from the manager and the scene
        if (this.balls && Array.isArray(this.balls)) {
            for (const ball of this.balls) {
                if (ball.parent) ball.parent.remove(ball);
            }
            this.balls.length = 0;
        }

        return this;
    }

    /**
     * Returns an array of ball-to-ball collision events using CollisionSystem
     * Each event: { type: 'ball-ball', ballA, ballB }
     */
    getBallCollisions() {
        return CollisionSystem.detect({ balls: this.balls, car: null, ray: null })
            .filter(e => e.type === 'ball-ball');
    }
}
