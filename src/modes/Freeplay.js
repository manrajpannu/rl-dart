
import * as THREE from 'three';

/**
 * @typedef {Object} FreeplayOptions
 * @property {number} [numBalls=1]
 * @property {number} [health=3]
 * @property {any} [movement=null]
 * @property {number | number[]} [size=1.5]
 * @property {boolean} [spawnOverlapping=true]
 * @property {boolean} [holdSliderEnabled=false]
 * @property {number} [holdSliderSeconds=2.5]
 * @property {number} [missSampleRate=5]
 * @property {'confetti' | 'bubble' | 'rainbowBubblePop' | 'neonStarburst' | 'plasmaRing' | 'holoShockwave' | 'whiteGlitterExplosion' | 'whiteGlitter' | 'rainbowGlitterExplosion' | 'rainbowGlitter' | 'glitterExplosion' | 'glitter' | 'shockwave' | null} [killEffect='confetti']
 * @property {Array<import('three').ColorRepresentation>} [colors=[]]
 * @property {number} [boundary=20]
 * @property {THREE.Vector3} [boundaryOrigin=new THREE.Vector3(0,0,0)]
 * @property {Array} [ballConfigs=[]]
 * @property {'cross' | 'x' | 'ring' | 'box'} [reticleType='cross']
 * @property {boolean} [reticleEnabled=true]
 * @property {import('three').ColorRepresentation} [reticleColor='#ff2222']
 * @property {'none' | 'glitter' | 'pulse' | 'scanline' | 'shimmer'} [reticleEffect='none']
 * @property {boolean} [isStriped=false]
 * @property {number | 'random'} [stripedAngle=0]
 * @property {number} [stripeTolerance=5]
 * @property {'shimmer' | 'glitter' | 'stroke' | 'outerGlow' | 'none'} [onHoverEffect='outerGlow']
 * @property {boolean} [bulletsEnabled=false] Controls bullet visuals only (gun is still active).
 * @property {number | 'infinite'} [bulletAmmo='infinite']
 * @property {number} [bulletCooldownSeconds=0.18]
 * @property {number} [bulletReloadSeconds=1.25]
 * @property {boolean} [autoBulletReload=false]
 * @property {number} [bulletSpeed=78]
 * @property {number} [bulletRange=190]
 * @property {number} [bulletDamage=1]
 * @property {number} [pointsPerKill=50]
 * @property {number} [pointsPerHit=10]
 * @property {number} [pointsPerMiss=0]
 */

/**
 * Endless sandbox mode.
 *
 * Freeplay keeps spawning/tracking a configurable ball set and updates score
 * counters from BallManager hit/kill events without any time limit.
 */
class FreeplayMode {
    /**
     * @param {FreeplayOptions} options
     */
    constructor({
        numBalls = 1,
        health = 3,
        movement = null,
        size = 1.5,
        spawnOverlapping = false,
        holdSliderEnabled = false,
        holdSliderSeconds = 2.5,
        missSampleRate = 5,
        killEffect = 'confetti',
        colors = [],
        boundary = 20,
        boundaryOrigin = new THREE.Vector3(0, 0, 0),
        ballConfigs = [],
        bulletsEnabled = false,
        reticleType = 'cross',
        reticleEnabled = true,
        reticleColor = '#ff2222',
        reticleEffect = 'none',
        isStriped = false,
        stripedAngle = 0,
        stripeTolerance = 12,
        onHoverEffect = 'outerGlow',
        bulletAmmo = 'infinite',
        bulletCooldownSeconds = 0.18,
        bulletReloadSeconds = 1.25,
        autoBulletReload = false,
        bulletSpeed = 78,
        bulletRange = 190,
        bulletDamage = 1,
        pointsPerKill = 50,
        pointsPerHit = 10,
        pointsPerMiss = 0,
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
        this.holdSliderEnabled = holdSliderEnabled;
        this.holdSliderSeconds = holdSliderSeconds;
        this.missSampleRate = missSampleRate;
        this.killEffect = killEffect;
        this.colors = Array.isArray(colors) ? colors.slice() : [];
        this.boundary = boundary;
        this.boundaryOrigin = boundaryOrigin;
        this.maxSpawnAttempts = 40;
        this.cameraOrbitCenter = new THREE.Vector3(0, 0, 0);
        this.cameraOrbitRadius = 5;
        this.bulletsEnabled = Boolean(bulletsEnabled);
        const requestedAmmo = typeof bulletAmmo === 'string' && bulletAmmo.toLowerCase() === 'infinite'
            ? Infinity
            : Number(bulletAmmo);
        const ammoValue = this.bulletsEnabled ? requestedAmmo : Infinity;
        this.reticleType = reticleType;
        this.reticleEnabled = Boolean(reticleEnabled);
        this.reticleColor = reticleColor;
        this.reticleEffect = reticleEffect;
        this.isStriped = Boolean(isStriped);
        this.stripedAngle = stripedAngle;
        this.stripeTolerance = Number.isFinite(Number(stripeTolerance)) ? Math.max(0, Number(stripeTolerance)) : 5;
        this.onHoverEffect = onHoverEffect;
        this.bulletConfig = {
            ammo: Number.isFinite(ammoValue) ? Math.max(0, Math.floor(ammoValue)) : Infinity,
            cooldownSeconds: Number.isFinite(Number(bulletCooldownSeconds)) ? Math.max(0, Number(bulletCooldownSeconds)) : 0.18,
            reloadSeconds: Number.isFinite(Number(bulletReloadSeconds)) ? Math.max(0, Number(bulletReloadSeconds)) : 1.25,
            speed: Number.isFinite(Number(bulletSpeed)) ? Math.max(1, Number(bulletSpeed)) : 78,
            range: Number.isFinite(Number(bulletRange)) ? Math.max(1, Number(bulletRange)) : 190,
            damage: Number.isFinite(Number(bulletDamage)) ? Math.max(1, Number(bulletDamage)) : 1,
        };
        this.autoBulletReload = Boolean(autoBulletReload);
        this.pointsPerKill = pointsPerKill;
        this.pointsPerHit = pointsPerHit;
        this.pointsPerMiss = pointsPerMiss;

        this._ballManager = null;
        this._car = null;
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
        this._ammoHudFields = null;
    }

    static _ensureAmmoHud() {
        if (typeof document === 'undefined') return null;
        let overlay = document.getElementById('ammo-hud');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'ammo-hud';
            overlay.className = 'pointer-events-none fixed inset-0 z-[10050] font-sans font-bold uppercase text-center text-white';
            overlay.innerHTML = `
                <div class="challenge-hud__ammo is-hidden absolute inset-x-0 bottom-10 mx-auto inline-flex w-fit min-w-[220px] items-center justify-center gap-3 bg-[rgba(0,0,0,0.3)] px-5 py-3 text-center text-[20px] font-bold uppercase tracking-[0.12em] rounded-xl" data-challenge="ammo">
                    <span class="challenge-hud__ammo-icon inline-block size-4 rounded-full bg-white" aria-hidden="true"></span>
                    <span class="challenge-hud__ammo-text font-bold uppercase" data-challenge="ammo-value">0</span>
                </div>
            `;
            const mount = document.getElementById('three-container') || document.body;
            mount.appendChild(overlay);
        }
        return overlay;
    }

    static _clearAmmoHud() {
        if (typeof document === 'undefined') return;
        const overlay = document.getElementById('ammo-hud');
        if (overlay) overlay.remove();
    }

    _initAmmoHud() {
        const overlay = FreeplayMode._ensureAmmoHud();
        if (!overlay) return;
        this._ammoHudFields = {
            ammo: overlay.querySelector('[data-challenge="ammo"]'),
            ammoValue: overlay.querySelector('[data-challenge="ammo-value"]'),
        };
    }

    _syncAmmoHud() {
        if (!this._ammoHudFields) {
            this._initAmmoHud();
        }
        if (!this._ammoHudFields) return;
        
        const bulletState = this._car?.getBulletState ? this._car.getBulletState() : null;
        const ammoEnabled = Boolean(bulletState?.enabled);
        const hasFiniteAmmo = Number.isFinite(Number(bulletState?.maxAmmo));
        const showAmmoHud = ammoEnabled && hasFiniteAmmo;
        
        const fields = this._ammoHudFields;
        if (fields.ammo) {
            fields.ammo.classList.toggle('is-hidden', !showAmmoHud);
            fields.ammo.style.display = showAmmoHud ? '' : 'none';
        }
        if (showAmmoHud && fields.ammoValue) {
            fields.ammoValue.textContent = `${Math.max(0, Math.floor(bulletState?.ammo ?? 0))}`;
        }
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
        this.score += this.pointsPerMiss;
        if (this.score < 0) this.score = 0;
    }

    _pickRandomColor(colors) {
        if (!Array.isArray(colors) || colors.length === 0) return null;
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    _normalizeBallSize(sizeValue) {
        const n = Number(sizeValue);
        if (!Number.isFinite(n) || n <= 0) return 1.5;
        return n;
    }

    _resolveBallSize(sizeOption) {
        if (Array.isArray(sizeOption)) {
            const candidates = sizeOption
                .map(value => Number(value))
                .filter(value => Number.isFinite(value) && value > 0);
            if (candidates.length === 0) return 1.5;
            const index = Math.floor(Math.random() * candidates.length);
            return candidates[index];
        }

        return this._normalizeBallSize(sizeOption);
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
            const baseSizeOption = cfg.size !== undefined ? cfg.size : this.defaultSize;
            const ballSize = this._resolveBallSize(baseSizeOption);
            const ballHoldSliderEnabled = cfg.holdSliderEnabled !== undefined ? cfg.holdSliderEnabled : this.holdSliderEnabled;
            const ballHoldSliderSeconds = cfg.holdSliderSeconds !== undefined ? cfg.holdSliderSeconds : this.holdSliderSeconds;
            const ballKillEffect = Object.prototype.hasOwnProperty.call(cfg, 'killEffect') ? cfg.killEffect : this.killEffect;
            const colorList = Array.isArray(cfg.colors) ? cfg.colors : this.colors;
            const hasFixedColor = cfg.color !== undefined && cfg.color !== null && cfg.color !== '';
            const selectedColor = hasFixedColor ? cfg.color : this._pickRandomColor(colorList);
            const ballReticleType = cfg.reticleType !== undefined ? cfg.reticleType : this.reticleType;
            const ballReticleEnabled = cfg.reticleEnabled !== undefined ? cfg.reticleEnabled : this.reticleEnabled;
            const ballReticleColor = cfg.reticleColor !== undefined ? cfg.reticleColor : this.reticleColor;
            const ballReticleEffect = cfg.reticleEffect !== undefined ? cfg.reticleEffect : this.reticleEffect;
            const ballIsStriped = cfg.isStriped !== undefined ? cfg.isStriped : this.isStriped;
            const ballStripedAngle = cfg.stripedAngle !== undefined ? cfg.stripedAngle : this.stripedAngle;
            const ballStripeTolerance = cfg.stripeTolerance !== undefined ? cfg.stripeTolerance : this.stripeTolerance;
            const ballHoverEffect = cfg.onHoverEffect !== undefined ? cfg.onHoverEffect : this.onHoverEffect;

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
                continue;
            }

            const healthObj = {
                maxHealth: ballHoldSliderEnabled ? 100 : ballHealth,
                health: ballHoldSliderEnabled ? 100 : ballHealth,
                holdSliderEnabled: ballHoldSliderEnabled,
                holdDurationSeconds: ballHoldSliderSeconds,
                killEffect: ballKillEffect,
            };
            const reticleObj = {
                type: ballReticleType,
                enabled: ballReticleEnabled,
                color: ballReticleColor,
                effect: ballReticleEffect,
            };
            const appearanceObj = {
                isStriped: ballIsStriped,
                stripedAngle: ballStripedAngle,
                stripeTolerance: ballStripeTolerance,
                onHoverEffect: ballHoverEffect,
            };
            const ball = BallManager.createBall(pos, ballSize, ballMovement, healthObj, reticleObj, appearanceObj);
            ball.userData = ball.userData || {};
            ball.userData.freeplayFixedColor = hasFixedColor ? cfg.color : undefined;
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

        this._syncAmmoHud();

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

        this.setCarVisuals(this._car);

        if (this._car) {
            if (typeof this._car.enableBullets === 'function') {
                this._car.enableBullets(this.bulletConfig);
            }
            if (typeof this._car.setBulletVisualsEnabled === 'function') {
                this._car.setBulletVisualsEnabled(this.bulletsEnabled);
            }
        }

        this._initAmmoHud();
        this._syncAmmoHud();

        this.createBalls(BallManager);
    }

    stop() {
        this.active = false;
        this._ballManager = null;
        if (this._car) {
            this._car.setForwardAxisVisible(false);
            this._car.setHelperDonutVisible(false);
            this._car.setAxisOfRotationVisible(false);
            if (typeof this._car.disableBullets === 'function') {
                this._car.disableBullets();
            }
        }
        this._car = null;
        this._ammoHudFields = null;
        FreeplayMode._clearAmmoHud();
    }

    onMiss() {
        if (!this.active) return;
        this._registerMiss();
    }

    onHit(ball) {
        if (!this.active) return;
        this.hits += 1;
        this._shots += 1;
        const damageStep = ball?.damageAmount ?? 1;
        this._damageDealt += damageStep;
        this._damagePossible += damageStep;
        this.score += this.pointsPerHit;
        if (this.autoBulletReload && !ball?.holdSliderEnabled && this._car && typeof this._car.reloadBullets === 'function') {
            this._car.reloadBullets(false);
        }
    }

    /**
     * Handles kill scoring and immediate ball respawn in freeplay.
     * @param {import('../Ball/Ball').Ball | undefined} ball
     */
    onKill(ball) {
        if (!this.active) return;
        this.kills += 1;
        this._kills += 1;
        this.score += this.pointsPerKill;
        if (this.autoBulletReload && ball?.holdSliderEnabled && this._car && typeof this._car.reloadBullets === 'function') {
            this._car.reloadBullets(false);
        }
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
                const hasFixedRespawnColor = ball.userData?.freeplayFixedColor !== undefined
                    && ball.userData?.freeplayFixedColor !== null
                    && ball.userData?.freeplayFixedColor !== '';
                const nextColor = hasFixedRespawnColor
                    ? ball.userData.freeplayFixedColor
                    : this._pickRandomColor(ball.userData?.freeplayColorList);
                this._applyBallColor(ball, nextColor);
                this._trackSpawn(ball);
            }
        }
    }
}

export default FreeplayMode;
