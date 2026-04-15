import * as THREE from 'three';
import FreeplayMode from './Freeplay.js';

/**
 * Timed score-attack mode.
 *
 * Extends freeplay scoring/spawn behavior while adding a countdown gate and
 * a visible timer that ends the run when time reaches zero.
 */
class ChallengeMode extends FreeplayMode {
    static _activeInstance = null;

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

    static _showPaused(time) {
        const overlay = ChallengeMode._ensureOverlay();
        if (!overlay) return;
        overlay.classList.add('challenge-overlay--interactive');
        overlay.innerHTML = `
            <div class="challenge-overlay__center">
                <div class="freeplay-panel challenge-panel challenge-panel--countdown">
                    <div class="freeplay-panel__accent"></div>
                    <div class="freeplay-panel__header challenge-panel__header">
                        <div class="freeplay-panel__title">challenge</div>
                        <div class="freeplay-panel__subtitle">paused</div>
                    </div>
                    <div class="challenge-countdown-value challenge-countdown-value--paused">paused</div>
                    <div class="challenge-paused-chip">time left: ${Math.max(0, Math.ceil(time))}s</div>
                    <div class="challenge-pause-actions">
                        <button type="button" data-action="resume" class="challenge-action challenge-action--resume">resume</button>
                        <button type="button" data-action="settings" class="challenge-action challenge-action--settings">settings</button>
                        <button type="button" data-action="leave" class="challenge-action challenge-action--leave">leave to play</button>
                    </div>
                </div>
            </div>`;

        const resumeButton = overlay.querySelector('[data-action="resume"]');
        const settingsButton = overlay.querySelector('[data-action="settings"]');
        const leaveButton = overlay.querySelector('[data-action="leave"]');

        if (resumeButton) {
            resumeButton.addEventListener('click', () => {
                ChallengeMode._activeInstance?._resumeFromPause();
            });
        }
        if (settingsButton) {
            settingsButton.addEventListener('click', () => {
                window.location.href = '/settings';
            });
        }
        if (leaveButton) {
            leaveButton.addEventListener('click', () => {
                window.location.href = '/play';
            });
        }
    }

    static _showTimer(time) {
        const overlay = ChallengeMode._ensureOverlay();
        if (!overlay) return;
        overlay.classList.remove('challenge-overlay--interactive');
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
        if (!overlay) return;
        overlay.classList.remove('challenge-overlay--interactive');
        overlay.innerHTML = '';
    }

    static _showSummary(stats) {
        const overlay = ChallengeMode._ensureOverlay();
        if (!overlay) return;
        overlay.classList.add('challenge-overlay--interactive');
        overlay.innerHTML = `
            <div class="challenge-overlay__center">
                <div class="freeplay-panel challenge-panel challenge-panel--summary">
                    <div class="freeplay-panel__accent"></div>
                    <div class="freeplay-panel__header challenge-panel__header">
                        <div class="freeplay-panel__title">challenge complete</div>
                        <div class="freeplay-panel__subtitle">results</div>
                    </div>
                    <div class="freeplay-stats">
                        <div class="freeplay-stat"><span class="freeplay-stat__label">score</span><span class="freeplay-stat__value">${stats.score}</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">hits</span><span class="freeplay-stat__value">${stats.hits}</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">kills</span><span class="freeplay-stat__value">${stats.kills}</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">accuracy</span><span class="freeplay-stat__value">${stats.accuracy}</span></div>
                        <div class="freeplay-stat"><span class="freeplay-stat__label">time</span><span class="freeplay-stat__value">${stats.time}s</span></div>
                    </div>
                </div>
            </div>`;
    }
    /**
     * @param {Object} options
     * @param {number} [options.numBalls=1]
     * @param {number} [options.health=3]
     * @param {any} [options.movement=null]
    * @param {number | number[]} [options.size=1.5]
     * @param {boolean} [options.spawnOverlapping=true]
    * @param {boolean} [options.showHud=false]
     * @param {boolean} [options.holdSliderEnabled=false]
     * @param {number} [options.holdSliderSeconds=2.5]
     * @param {number} [options.missSampleRate=5]
    * @param {'confetti' | 'bubble' | 'rainbowBubblePop' | 'neonStarburst' | 'plasmaRing' | 'holoShockwave' | 'whiteGlitterExplosion' | 'whiteGlitter' | 'rainbowGlitterExplosion' | 'rainbowGlitter' | 'glitterExplosion' | 'glitter' | 'shockwave' | null} [options.killEffect='confetti']
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
            showHud,
            ...freeplayOptions,
        });
        this.timeElapsed = timeLimit;
        this.timeLimit = timeLimit;
        this._countdownActive = false;
        this._paused = false;
        this._completed = false;
        this.completed = false;
        this._keydownHandler = null;
        this._car = null;
        ChallengeMode._activeInstance = this;
    }

    shouldPauseGameplay() {
        return (this._countdownActive || this._paused) && !this.active;
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
            this._completed = true;
            this.completed = true;
            this.stop();
        }
        return dt;
    }

    _bindPauseHotkey() {
        if (typeof window === 'undefined' || this._keydownHandler) return;
        this._keydownHandler = (event) => {
            if (event.code !== 'Escape' || this._countdownActive || this._completed) return;
            event.preventDefault();
            if (this.active) {
                this.active = false;
                this._paused = true;
                if (this._car && typeof this._car.setNeutralState === 'function') {
                    this._car.setNeutralState();
                }
                ChallengeMode._showPaused(this.timeElapsed);
                return;
            }

            if (this._paused) {
                this._resumeFromPause();
            }
        };
        window.addEventListener('keydown', this._keydownHandler);
    }

    _resumeFromPause() {
        if (!this._paused) return;
        this._paused = false;
        this.active = true;
        ChallengeMode._clearOverlay();
        ChallengeMode._showTimer(Math.ceil(this.timeElapsed));
    }

    _unbindPauseHotkey() {
        if (typeof window === 'undefined' || !this._keydownHandler) return;
        window.removeEventListener('keydown', this._keydownHandler);
        this._keydownHandler = null;
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
        this._paused = false;
        this._completed = false;
        this.completed = false;
        this._bindPauseHotkey();
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
        // Show timer immediately on start
        if (typeof window !== 'undefined') {
            ChallengeMode._showTimer(Math.ceil(this.timeElapsed));
        }
        console.log("Challenge started!");
    }

    stop() {
        this._countdownActive = false;
        this._paused = false;
        this._car = null;
        this._unbindPauseHotkey();
        ChallengeMode._clearOverlay();
        ChallengeMode._activeInstance = null;
        if (!this._completed) {
            this.completed = false;
        }
        super.stop();
        console.log(`Challenge Over! Score: ${this.score}, Hits: ${this.hits}, Kills: ${this.kills}`);
    }

    onHit(ball) {
        super.onHit(ball);
        if (!this.active) return;
        // Optionally, update challenge-specific HUD here
        console.log(`Hit! Total: ${this.hits}, Score: ${this.score}`);
    }

    onKill(ball) {
        super.onKill(ball);
        if (!this.active) return;
        // Optionally, update challenge-specific HUD here
        console.log(`Kill! Total: ${this.kills}, Score: ${this.score}`);
    }
}
export default ChallengeMode;

