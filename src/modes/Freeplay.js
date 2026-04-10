
import * as THREE from 'three';

/**
 * Endless sandbox mode.
 *
 * Freeplay keeps spawning/tracking a configurable ball set and updates score
 * counters from BallManager hit/kill events without any time limit.
 */
class FreeplayMode {
    /**
     * @param {Object} options
     * @param {number} [options.numBalls=1]
     * @param {number} [options.health=3]
     * @param {any} [options.movement=null]
     * @param {number} [options.size=1.5]
     * @param {boolean} [options.spawnOverlapping=true]
    * @param {boolean} [options.showHud=true]
    * @param {boolean} [options.holdSliderEnabled=false]
    * @param {number} [options.holdSliderSeconds=2.5]
    * @param {number} [options.missSampleRate=5]
    * @param {Array<import('three').ColorRepresentation>} [options.colors=[]]
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
        showHud = true,
        holdSliderEnabled = false,
        holdSliderSeconds = 2.5,
        missSampleRate = 5,
        colors = [],
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
        this.showHud = showHud;
        this.holdSliderEnabled = holdSliderEnabled;
        this.holdSliderSeconds = holdSliderSeconds;
        this.missSampleRate = missSampleRate;
        this.colors = Array.isArray(colors) ? colors.slice() : [];
        this.boundary = boundary;
        this.boundaryOrigin = boundaryOrigin;
        this.maxSpawnAttempts = 40;
        this.cameraOrbitCenter = new THREE.Vector3(0, 0, 0);
        this.cameraOrbitRadius = 5;

        this._ballManager = null;
        this._car = null;
        this._hudRoot = null;
        this._hudFields = null;
        this._elapsedSeconds = 0;
        this._shots = 0;
        this._misses = 0;
        this._kills = 0;
        this._damageDealt = 0;
        this._damagePossible = 0;
        this._totalKillTime = 0;
        this._killSamples = 0;
        this._wasBoostHeld = false;
        this._missAccumulator = 0;
    }

    static _clearOverlay() {
        if (typeof document === 'undefined') return;
        const overlay = document.getElementById('freeplay-overlay');
        if (overlay) overlay.remove();
    }

    static _ensureOverlay() {
        if (typeof document === 'undefined') return null;

        let overlay = document.getElementById('freeplay-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'freeplay-overlay';
            overlay.className = 'freeplay-overlay';
            overlay.innerHTML = `
                <div class="freeplay-panel">
                    <div class="freeplay-panel__accent"></div>
                    <div class="freeplay-panel__header">
                        <div class="freeplay-panel__title">freeplay</div>
                        <div class="freeplay-panel__subtitle">session stats</div>
                    </div>
                    <div class="freeplay-stats">
                        <div class="freeplay-stat"><span class="freeplay-stat__label">session</span><span class="freeplay-stat__value" data-stat="session">00:00:00</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">kills</span><span class="freeplay-stat__value" data-stat="kills">0</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">kps</span><span class="freeplay-stat__value" data-stat="kps">0.00</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">accuracy</span><span class="freeplay-stat__value" data-stat="accuracy">0/0 (0.0%)</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">damage</span><span class="freeplay-stat__value" data-stat="damage">0/0 (0.0%)</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">spm</span><span class="freeplay-stat__value" data-stat="spm">0</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">avg ttk</span><span class="freeplay-stat__value" data-stat="ttk">0.00s</span></div>
                    </div>
                </div>`;
            document.body.appendChild(overlay);
        }

        return overlay;
    }

    _formatSessionTime(totalSeconds) {
        const wholeSeconds = Math.max(0, Math.floor(totalSeconds));
        const hours = Math.floor(wholeSeconds / 3600);
        const minutes = Math.floor((wholeSeconds % 3600) / 60);
        const seconds = wholeSeconds % 60;
        return [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');
    }

    _syncHud() {
        if (!this._hudFields) return;

        const elapsed = Math.max(0, this._elapsedSeconds);
        const kps = elapsed > 0 ? this._kills / elapsed : 0;
        const accuracyPercent = this._shots > 0 ? (this.hits / this._shots) * 100 : 0;
        const damagePercent = this._damagePossible > 0 ? (this._damageDealt / this._damagePossible) * 100 : 0;
        const spm = elapsed > 0 ? Math.round((this.score / elapsed) * 60) : 0;
        const avgTtk = this._killSamples > 0 ? this._totalKillTime / this._killSamples : 0;

        this._hudFields.session.textContent = this._formatSessionTime(elapsed);
        this._hudFields.kills.textContent = String(this._kills);
        this._hudFields.kps.textContent = kps.toFixed(2);
        this._hudFields.accuracy.textContent = `${this.hits}/${this._shots} (${accuracyPercent.toFixed(1)}%)`;
        this._hudFields.damage.textContent = `${Math.round(this._damageDealt)}/${Math.round(this._damagePossible)} (${damagePercent.toFixed(1)}%)`;
        this._hudFields.spm.textContent = String(spm);
        this._hudFields.ttk.textContent = `${avgTtk.toFixed(2)}s`;
    }

    _trackSpawn(ball) {
        if (!ball) return;
        ball.userData = ball.userData || {};
        ball.userData.freeplaySpawnSeconds = this._elapsedSeconds;
    }

    _registerMiss() {
        this._shots += 1;
        this._misses += 1;
        this._damagePossible += 1;
    }

    _pickRandomColor(colors) {
        if (!Array.isArray(colors) || colors.length === 0) return null;
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    _applyBallColor(ball, color) {
        if (!ball || color === null || color === undefined) return;
        if (typeof ball.setBallColor === 'function') {
            ball.setBallColor(color);
            return;
        }
        if (ball.ball?.material?.color?.set) {
            ball.ball.material.color.set(color);
        }
    }

    setCarVisuals(car) {
        if (!car) return;
        car.setForwardAxisVisible(true);
        car.setHelperDonutVisible(true);
        car.setAxisOfRotationVisible(true);
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
            const ballHoldSliderEnabled = cfg.holdSliderEnabled !== undefined ? cfg.holdSliderEnabled : this.holdSliderEnabled;
            const ballHoldSliderSeconds = cfg.holdSliderSeconds !== undefined ? cfg.holdSliderSeconds : this.holdSliderSeconds;
            const colorList = Array.isArray(cfg.colors) ? cfg.colors : this.colors;
            const selectedColor = cfg.color !== undefined ? cfg.color : this._pickRandomColor(colorList);

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

            const healthObj = {
                maxHealth: ballHoldSliderEnabled ? 100 : ballHealth,
                health: ballHoldSliderEnabled ? 100 : ballHealth,
                holdSliderEnabled: ballHoldSliderEnabled,
                holdDurationSeconds: ballHoldSliderSeconds,
            };
            const ball = BallManager.createBall(pos, ballSize, ballMovement, healthObj);
            ball.userData = ball.userData || {};
            ball.userData.freeplayFixedColor = cfg.color;
            ball.userData.freeplayColorList = Array.isArray(colorList) ? colorList.slice() : [];
            this._applyBallColor(ball, selectedColor);
            this.balls.push(ball);
            placed.push({ position: pos, radius: ballSize });
            this._trackSpawn(ball);
        }
    }

    update(dt, context = {}) {
        if (!this.active) return dt;

        this._elapsedSeconds += dt;

        const boostHeld = Boolean(context.boostHeld);
        const hasTarget = this._ballManager?.lastFirstIntersectedBall !== null;
        if (boostHeld && !hasTarget) {
            this._missAccumulator += dt;
            const missStep = 1 / Math.max(0.1, this.missSampleRate);
            while (this._missAccumulator >= missStep) {
                this._registerMiss();
                this._missAccumulator -= missStep;
            }
        } else {
            this._missAccumulator = 0;
        }
        this._wasBoostHeld = boostHeld;

        this._syncHud();
        return dt;
    }

    /**
     * (Re)initializes freeplay session state and recreates balls.
     * @param {import('../Ball/BallManager').BallManager} BallManager
     */
    start(BallManager, context = {}) {
        this._ballManager = BallManager;
        this._car = context.car || null;
        this._elapsedSeconds = 0;
        this.hits = 0;
        this.kills = 0;
        this.score = 0;
        this.active = true;
        this._shots = 0;
        this._misses = 0;
        this._kills = 0;
        this._damageDealt = 0;
        this._damagePossible = 0;
        this._totalKillTime = 0;
        this._killSamples = 0;
        this._wasBoostHeld = false;
        this._missAccumulator = 0;

        if (this.showHud) {
            const overlay = FreeplayMode._ensureOverlay();
            if (overlay) {
                this._hudRoot = overlay;
                this._hudFields = {
                    session: overlay.querySelector('[data-stat="session"]'),
                    kills: overlay.querySelector('[data-stat="kills"]'),
                    kps: overlay.querySelector('[data-stat="kps"]'),
                    accuracy: overlay.querySelector('[data-stat="accuracy"]'),
                    damage: overlay.querySelector('[data-stat="damage"]'),
                    spm: overlay.querySelector('[data-stat="spm"]'),
                    ttk: overlay.querySelector('[data-stat="ttk"]'),
                };
            }
        } else {
            this._hudRoot = null;
            this._hudFields = null;
        }

        this.setCarVisuals(this._car);

        this.createBalls(BallManager);
        this._syncHud();
    }

    stop() {
        this.active = false;
        this._ballManager = null;
        if (this._car) {
            this._car.setForwardAxisVisible(false);
            this._car.setHelperDonutVisible(false);
            this._car.setAxisOfRotationVisible(false);
        }
        this._car = null;
        this._hudRoot = null;
        this._hudFields = null;
        if (this.showHud) {
            FreeplayMode._clearOverlay();
        }
    }

    onHit(ball) {
        if (!this.active) return;
        this.hits += 1;
        this._shots += 1;
        const damageStep = ball?.damageAmount ?? 1;
        this._damageDealt += damageStep;
        this._damagePossible += damageStep;
        this.score += 10;
        this._syncHud();
    }

    /**
     * Handles kill scoring and immediate ball respawn in freeplay.
     * @param {import('../Ball/Ball').Ball | undefined} ball
     */
    onKill(ball) {
        if (!this.active) return;
        this.kills += 1;
        this._kills += 1;
        this.score += 50;
        if (ball) {
            const spawnSeconds = Number(ball.userData?.freeplaySpawnSeconds ?? this._elapsedSeconds);
            const killDuration = Math.max(0, this._elapsedSeconds - spawnSeconds);
            if (Number.isFinite(killDuration)) {
                this._totalKillTime += killDuration;
                this._killSamples += 1;
            }

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
                const nextColor = ball.userData?.freeplayFixedColor !== undefined
                    ? ball.userData.freeplayFixedColor
                    : this._pickRandomColor(ball.userData?.freeplayColorList);
                this._applyBallColor(ball, nextColor);
                this._trackSpawn(ball);
            }
        }

        this._syncHud();
    }
}

export default FreeplayMode;

