
import * as THREE from 'three';

/**
 * @typedef {Object} FreeplayOptions
 * @property {number} [numBalls=1]
 * @property {number} [health=3]
 * @property {any} [movement=null]
 * @property {number | number[]} [size=1.5]
 * @property {boolean} [spawnOverlapping=true]
 * @property {boolean} [showHud=true]
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
        showHud = true,
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
        this.showHud = Boolean(showHud);
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

        const overlayClassName = 'freeplay-overlay pointer-events-none fixed inset-x-0 top-[calc(var(--header-height)+10px)] z-[10020] mx-auto w-fit';
        const overlayMarkup = `
                <div class="freeplay-panel relative w-[min(320px,calc(100vw-20px))] max-sm:w-[min(290px,calc(100vw-14px))] overflow-hidden bg-[rgba(0,0,0,0.3)] p-[10px]">
                    <div class="freeplay-panel__header relative z-[1] mb-2 grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-3 py-2 text-center">
                        <div class="freeplay-panel__title font-sans text-[13px] font-bold tracking-[0.14em] uppercase text-white">freeplay</div>
                        <div class="freeplay-panel__subtitle bg-[rgba(0,0,0,0.3)] px-2 py-1 font-sans text-[8px] font-bold tracking-[0.16em] uppercase text-white">session stats</div>
                    </div>
                    <div class="freeplay-stats relative z-[1] grid gap-[5px]">
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">session</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="session">00:00:00</span></div>
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">kills</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="kills">0</span></div>
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">kps</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="kps">0.00</span></div>
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">accuracy</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="accuracy">0/0 (0.0%)</span></div>
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">damage</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="damage">0/0 (0.0%)</span></div>
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">spm</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="spm">0</span></div>
                        <div class="freeplay-stat grid justify-items-center gap-1 bg-[rgba(0,0,0,0.3)] px-2 py-[6px] text-center"><span class="freeplay-stat__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">avg ttk</span><span class="freeplay-stat__value px-1 py-[1px] font-sans text-[12px] font-bold tracking-[0.04em] uppercase text-white" data-stat="ttk">0.00s</span></div>
                        <div class="freeplay-ammo is-hidden grid gap-[6px] bg-[rgba(0,0,0,0.3)] p-[6px] text-center" data-stat="ammo">
                            <div class="freeplay-ammo__row grid justify-items-center gap-1">
                                <span class="freeplay-ammo__label font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-white">ammo</span>
                                <span class="freeplay-ammo__value px-[6px] py-[1px] font-sans text-[12px] font-bold tracking-[0.08em] uppercase text-white" data-stat="ammo-value">0</span>
                            </div>
                            <div class="freeplay-ammo__bar relative h-2 overflow-hidden bg-[rgba(0,0,0,0.3)]">
                                <div class="freeplay-ammo__bar-fill absolute inset-y-0 left-0 w-0 bg-[var(--secondary)] transition-[width] duration-100 ease-out" data-stat="ammo-fill"></div>
                            </div>
                        </div>
                    </div>
                </div>`;

        let overlay = document.getElementById('freeplay-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'freeplay-overlay';
        }

        if (overlay.dataset.hudSkinVersion !== 'v3') {
            overlay.className = overlayClassName;
            overlay.innerHTML = overlayMarkup;
            overlay.dataset.hudSkinVersion = 'v3';
        } else {
            overlay.className = overlayClassName;
        }

        if (!overlay.parentElement) {
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
        if (!this.showHud) return;
        if (!this._hudFields) {
            this._initHud();
        }
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

        const bulletState = this._car?.getBulletState ? this._car.getBulletState() : null;
        const ammoEnabled = Boolean(bulletState?.enabled);
        const ammoMax = Number(bulletState?.maxAmmo ?? 0);
        const ammoValue = Number(bulletState?.ammo ?? 0);
        const ammoVisible = ammoEnabled && Number.isFinite(ammoMax) && ammoMax > 0;

        if (this._hudFields.ammo) {
            this._hudFields.ammo.classList.toggle('is-hidden', !ammoVisible);
            this._hudFields.ammo.style.display = ammoVisible ? '' : 'none';
        }

        if (ammoVisible && this._hudFields.ammoValue && this._hudFields.ammoFill) {
            this._hudFields.ammoValue.textContent = String(Math.max(0, Math.floor(ammoValue)));
            if (ammoValue <= 0) {
                this._hudFields.ammoFill.classList.add('is-reloading');
                this._hudFields.ammoFill.classList.add('animate-pulse');
                this._hudFields.ammoFill.style.width = '100%';
                this._hudFields.ammoFill.style.background = 'repeating-linear-gradient(90deg, var(--secondary) 0 8px, var(--accent) 8px 16px)';
            } else {
                this._hudFields.ammoFill.classList.remove('is-reloading');
                this._hudFields.ammoFill.classList.remove('animate-pulse');
                const ratio = Math.min(1, Math.max(0, ammoValue / ammoMax));
                this._hudFields.ammoFill.style.width = `${(ratio * 100).toFixed(2)}%`;
                this._hudFields.ammoFill.style.background = 'var(--secondary)';
            }
        }
    }

    _initHud() {
        if (!this.showHud) return;
        const overlay = FreeplayMode._ensureOverlay();
        if (!overlay) return;

        const query = (selector) => overlay.querySelector(selector);
        this._hudRoot = overlay;
        this._hudFields = {
            session: query('[data-stat="session"]'),
            kills: query('[data-stat="kills"]'),
            kps: query('[data-stat="kps"]'),
            accuracy: query('[data-stat="accuracy"]'),
            damage: query('[data-stat="damage"]'),
            spm: query('[data-stat="spm"]'),
            ttk: query('[data-stat="ttk"]'),
            ammo: query('[data-stat="ammo"]'),
            ammoValue: query('[data-stat="ammo-value"]'),
            ammoFill: query('[data-stat="ammo-fill"]'),
        };
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
        // Optionally cap score at 0 if we don't want negative scores
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
                // If no valid spawn spot exists, skip this ball.
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

        this._hudRoot = null;
        this._hudFields = null;

        this.setCarVisuals(this._car);

        if (this._car) {
            if (typeof this._car.enableBullets === 'function') {
                this._car.enableBullets(this.bulletConfig);
            }
            if (typeof this._car.setBulletVisualsEnabled === 'function') {
                this._car.setBulletVisualsEnabled(this.bulletsEnabled);
            }
        }

        this.createBalls(BallManager);
        if (this.showHud) {
            this._initHud();
            this._syncHud();
        } else {
            FreeplayMode._clearOverlay();
        }
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
        this._hudRoot = null;
        this._hudFields = null;
    }

    onMiss() {
        if (!this.active) return;
        this._registerMiss();
        this._syncHud();
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

        this._syncHud();
    }
}

export default FreeplayMode;

