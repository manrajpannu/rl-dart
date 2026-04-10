import * as THREE from 'three';
import FreeplayMode from './Freeplay.js';

/**
 * Timed score-attack mode.
 *
 * Extends freeplay scoring/spawn behavior while adding a countdown gate and
 * a visible timer that ends the run when time reaches zero.
 */
class ChallengeMode extends FreeplayMode {
    setCarVisuals(car) {
        if (!car) return;
        car.setForwardAxisVisible(false);
        car.setHelperDonutVisible(false);
        car.setAxisOfRotationVisible(false);
    }

    static _ensureOverlay() {
        if (typeof document === 'undefined') return null;
        let overlay = document.getElementById('challenge-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'challenge-overlay';
            overlay.className = 'challenge-overlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    static _showCountdown(text) {
        const overlay = ChallengeMode._ensureOverlay();
        if (!overlay) return;
        overlay.innerHTML = `
            <div class="challenge-overlay__center">
                <div class="freeplay-panel challenge-panel challenge-panel--countdown">
                    <div class="freeplay-panel__accent"></div>
                    <div class="freeplay-panel__header challenge-panel__header">
                        <div class="freeplay-panel__title">challenge</div>
                        <div class="freeplay-panel__subtitle">countdown</div>
                    </div>
                    <div class="challenge-countdown-value">${text}</div>
                </div>
            </div>`;
    }

    static _showTimer(time) {
        const overlay = ChallengeMode._ensureOverlay();
        if (!overlay) return;
        let timerDiv = overlay.querySelector('.challenge-timer');
        if (!timerDiv) {
            timerDiv = document.createElement('div');
            timerDiv.className = 'challenge-timer';
            timerDiv.innerHTML = `
                <div class="freeplay-panel challenge-panel challenge-panel--timer">
                    <div class="freeplay-panel__accent"></div>
                    <div class="freeplay-panel__header challenge-panel__header">
                        <div class="freeplay-panel__title">challenge</div>
                        <div class="freeplay-panel__subtitle">time left</div>
                    </div>
                    <div class="freeplay-stats">
                        <div class="freeplay-stat challenge-timer__stat">
                            <span class="freeplay-stat__label">timer</span>
                            <span class="freeplay-stat__value" data-challenge-timer>0</span>
                        </div>
                    </div>
                </div>`;
            overlay.appendChild(timerDiv);
        }
        const timerValue = timerDiv.querySelector('[data-challenge-timer]');
        if (timerValue) {
            timerValue.textContent = String(time);
        }
    }

    static _clearOverlay() {
        const overlay = document.getElementById('challenge-overlay');
        if (overlay) overlay.innerHTML = '';
    }
    /**
     * @param {Object} options
     * @param {number} [options.numBalls=1]
     * @param {number} [options.health=3]
     * @param {any} [options.movement=null]
     * @param {number} [options.size=1.5]
     * @param {boolean} [options.spawnOverlapping=true]
    * @param {boolean} [options.showHud=false]
     * @param {boolean} [options.holdSliderEnabled=false]
     * @param {number} [options.holdSliderSeconds=2.5]
     * @param {number} [options.missSampleRate=5]
     * @param {Array<import('three').ColorRepresentation>} [options.colors=[]]
     * @param {number} [options.timeLimit=60]
     * @param {number} [options.boundary=20]
     * @param {THREE.Vector3} [options.boundaryOrigin=new THREE.Vector3(0,0,0)]
     * @param {Array} [options.ballConfigs=[]]
     */
    constructor({
        timeLimit = 60,
        showHud = false,
        ...freeplayOptions
    } = {}) {
        super({
            spawnOverlapping: true,
            showHud,
            ...freeplayOptions,
        });
        this.timeElapsed = 0;
        this.timeLimit = timeLimit; // seconds
        this._countdownActive = false;
        this._car = null;
    }

    shouldPauseGameplay() {
        return this._countdownActive && !this.active;
    }

    update(dt, context = {}) {
        if (!this.active) return;
        super.update(dt, context);
        this.timeElapsed -= dt;
        if (typeof window !== 'undefined') {
            ChallengeMode._showTimer(Math.ceil(this.timeElapsed));
        }
        if (this.timeElapsed <= 0) {
            this.timeElapsed = 0;
            ChallengeMode._clearOverlay();
            this.stop();
        }
    }

    /**
     * Starts challenge state, then runs a short countdown before activation.
     * @param {import('../Ball/BallManager').BallManager} BallManager
     */
    async start(BallManager, context = {}) {
        super.start(BallManager, context);
        this._car = context.car || null;
        this.timeElapsed = this.timeLimit;
        this.active = false;
        this._countdownActive = true;
        if (this._car && typeof this._car.setNeutralState === 'function') {
            this._car.setNeutralState();
        }
        // Countdown logic
        const countdown = async (n) => {
            for (let i = n; i > 0; i--) {
                if (typeof window !== 'undefined') {
                    ChallengeMode._showCountdown(i);
                }
                await new Promise(res => setTimeout(res, 1000));
            }
        };
        await countdown(3);
        if (typeof window !== 'undefined') {
            ChallengeMode._showCountdown('GO');
            setTimeout(() => ChallengeMode._clearOverlay(), 1000);
        }
        this._countdownActive = false;
        this.active = true;
        console.log("Challenge started!");
    }

    stop() {
        this._countdownActive = false;
        this._car = null;
        ChallengeMode._clearOverlay();
        super.stop();
        console.log(`Challenge Over! Score: ${this.score}, Hits: ${this.hits}, Kills: ${this.kills}`);
    }

    onHit(ball) {
        super.onHit(ball);
        if (!this.active) return;
        console.log(`Hit! Total: ${this.hits}, Score: ${this.score}`);
    }

    onKill(ball) {
        super.onKill(ball);
        if (!this.active) return;
        console.log(`Kill! Total: ${this.kills}, Score: ${this.score}`);
    }
}
export default ChallengeMode;

