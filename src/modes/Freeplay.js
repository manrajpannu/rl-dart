
import * as THREE from 'three';

class FreeplayMode {
    /**
     * @param {Object} options
     * @param {number} [options.numBalls=1]
     * @param {number} [options.health=3]
     * @param {any} [options.movement=null]
     * @param {number} [options.size=1.5]
     * @param {boolean} [options.spawnOverlapping=true]
     * @param {number} [options.boundary=20]
     * @param {THREE.Vector3} [options.boundaryOrigin=new THREE.Vector3(0,0,0)]
     * @param {Array} [options.ballConfigs=[]]
     */
    constructor({
        numBalls = 1,
        health = 3,
        movement = null,
        size = 1.5,
        spawnOverlapping = false,
        boundary = 20,
        boundaryOrigin = new THREE.Vector3(0, 0, 0),
        ballConfigs = []
    } = {}) {
        this.hits = 0;
        this.kills = 0;
        this.score = 0;
        this.active = true;
        this.numBalls = numBalls;
        this.balls = [];
        this.ballConfigs = ballConfigs;
        this.defaultHealth = health;
        this.defaultMovement = movement;
        this.defaultSize = size;
        this.spawnOverlapping = spawnOverlapping;
        this.boundary = boundary;
        this.boundaryOrigin = boundaryOrigin;
        this.maxSpawnAttempts = 40;
        this.cameraOrbitCenter = new THREE.Vector3(0, 0, 0);
        this.cameraOrbitRadius = 5;
    }

    static _clearOverlay() {
        const overlay = document.getElementById('challenge-overlay');
        if (overlay) overlay.innerHTML = '';
    }

    _createRandomPosition(ballSize) {
        return this.boundaryOrigin.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * 2 * this.boundary,
            Math.max((Math.random() - 0.5) * 2 * this.boundary, ballSize),
            (Math.random() - 0.5) * 2 * this.boundary
        ));
    }

    _overlapsAny(pos, radius, placed) {
        for (const placedBall of placed) {
            const minDist = radius + placedBall.radius;
            if (pos.distanceToSquared(placedBall.position) < minDist * minDist) {
                return true;
            }
        }
        return false;
    }

    _isInsideCameraOrbitRegion(pos, radius) {
        const minDist = this.cameraOrbitRadius + radius;
        return pos.distanceToSquared(this.cameraOrbitCenter) < minDist * minDist;
    }

    createBalls(BallManager) {
        BallManager.clear && BallManager.clear();
        this.balls = [];
        const placed = [];

        for (let i = 0; i < this.numBalls; i++) {
            const cfg = this.ballConfigs[i] || {};
            const ballHealth = cfg.health !== undefined ? cfg.health : this.defaultHealth;
            const ballMovement = cfg.movement !== undefined ? cfg.movement : this.defaultMovement;
            const ballSize = cfg.size !== undefined ? cfg.size : this.defaultSize;

            let pos = null;
            if (this.spawnOverlapping) {
                for (let attempt = 0; attempt < this.maxSpawnAttempts; attempt++) {
                    const candidate = this._createRandomPosition(ballSize);
                    if (!this._isInsideCameraOrbitRegion(candidate, ballSize)) {
                        pos = candidate;
                        break;
                    }
                }
            } else {
                for (let attempt = 0; attempt < this.maxSpawnAttempts; attempt++) {
                    const candidate = this._createRandomPosition(ballSize);
                    if (!this._isInsideCameraOrbitRegion(candidate, ballSize) && !this._overlapsAny(candidate, ballSize, placed)) {
                        pos = candidate;
                        break;
                    }
                }
            }

            if (!pos) {
                // If no valid spawn spot exists, skip this ball.
                continue;
            }

            const healthObj = { maxHealth: ballHealth, health: ballHealth };
            const ball = BallManager.createBall(pos, ballSize, ballMovement, healthObj);
            this.balls.push(ball);
            placed.push({ position: pos, radius: ballSize });
        }
    }

    update(dt) {
        return dt;
    }

    start(BallManager) {
        this.hits = 0;
        this.kills = 0;
        this.score = 0;
        this.active = true;
        this.createBalls(BallManager);
    }

    stop() {
        this.active = false;
    }

    onHit() {
        if (!this.active) return;
        this.hits += 1;
        this.score += 10;
    }

    onKill(ball) {
        if (!this.active) return;
        this.kills += 1;
        this.score += 50;
        if (ball) {
            let pos = null;
            for (let attempt = 0; attempt < this.maxSpawnAttempts; attempt++) {
                const candidate = this.boundaryOrigin.clone().add(new THREE.Vector3(
                    (Math.random() - 0.5) * 2 * this.boundary,
                    2 + Math.random() * 6,
                    (Math.random() - 0.5) * 2 * this.boundary
                ));
                const radius = ball.radius || this.defaultSize;
                if (!this._isInsideCameraOrbitRegion(candidate, radius)) {
                    pos = candidate;
                    break;
                }
            }

            if (pos) {
                ball.setPosition(pos);
                if (typeof ball.respawn === 'function') ball.respawn();
            }
        }
    }
}

export default FreeplayMode;

