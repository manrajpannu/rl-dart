import FreeplayMode from './Freeplay.js';

const LAST_BEST_SCORE = 2000;
const BAR_MAX_SCORE = LAST_BEST_SCORE;
const CURSOR_AHEAD_COLOR = '#ff0000';
const CURSOR_BEHIND_COLOR = '#d3d3d3';

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

        const overlayClassName = 'challenge-hud pointer-events-none fixed inset-0 z-[10050] font-sans font-bold uppercase text-center text-white';
        const overlayMarkup = `
            <style>
                @-webkit-keyframes cursor-rainbow {
                    0%{background-position:0% 82%}
                    50%{background-position:100% 19%}
                    100%{background-position:0% 82%}
                }
                @-moz-keyframes cursor-rainbow {
                    0%{background-position:0% 82%}
                    50%{background-position:100% 19%}
                    100%{background-position:0% 82%}
                }
                @-o-keyframes cursor-rainbow {
                    0%{background-position:0% 82%}
                    50%{background-position:100% 19%}
                    100%{background-position:0% 82%}
                }
                @keyframes cursor-rainbow { 
                    0%{background-position:0% 82%}
                    50%{background-position:100% 19%}
                    100%{background-position:0% 82%}
                }
                .cursor-rainbow {
                    background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
                    background-size: 1800% 1800%;
                    -webkit-animation: cursor-rainbow 18s ease infinite;
                    -moz-animation: cursor-rainbow 18s ease infinite;
                    -o-animation: cursor-rainbow 18s ease infinite;
                    animation: cursor-rainbow 18s ease infinite;
                }
            </style>
            <div class="challenge-hud__top-stack absolute inset-x-0 top-[50px] mx-auto grid w-[min(520px,calc(100vw-24px))] gap-1">
                    <div class="challenge-hud__top grid grid-cols-[1fr_minmax(160px,1.1fr)_1fr] items-center gap-2.5">
                        <div class="challenge-hud__item challenge-hud__item--left bg-[rgba(0,0,0,0.3)] px-3 py-2 text-center text-[16px] font-bold tabular-nums whitespace-nowrap uppercase tracking-[0.12em] rounded-l-lg" data-challenge="kills">Kills 0</div>
                        <div class="challenge-hud__item challenge-hud__item--center bg-[rgba(0,0,0,0.3)] px-5 py-3 text-center text-[clamp(44px,7vw,78px)] leading-none font-bold tabular-nums whitespace-nowrap tracking-[0.03em] uppercase" data-challenge="time">0:00</div>
                        <div class="challenge-hud__item challenge-hud__item--right bg-[rgba(0,0,0,0.3)] px-3 py-2 text-center text-[16px] font-bold tabular-nums whitespace-nowrap uppercase tracking-[0.12em] rounded-r-lg" data-challenge="percent">0%</div>
                    </div>
                    <div class="challenge-hud__bar relative h-4 overflow-hidden bg-[rgba(0,0,0,0.3)] rounded-full" aria-hidden="true">
                        <div class="challenge-hud__bar-fill absolute inset-y-0 left-0 w-0 bg-white" data-challenge="bar-fill"></div>
                        <div class="challenge-hud__bar-cursor absolute left-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-white transition-[left] duration-100 linear" data-challenge="bar-cursor"></div>
                    </div>
                </div>`;

        let overlay = document.getElementById('challenge-hud');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'challenge-hud';
        }

        if (overlay.dataset.hudSkinVersion !== 'v6') {
            overlay.className = overlayClassName;
            overlay.innerHTML = overlayMarkup;
            overlay.dataset.hudSkinVersion = 'v6';
        } else {
            overlay.className = overlayClassName;
        }

        const mount = document.getElementById('three-container') || document.body;
        if (overlay.parentElement !== mount) {
            mount.appendChild(overlay);
        }

        return overlay;
    }

    static _clearOverlay() {
        if (typeof document === 'undefined') return;
        const overlay = document.getElementById('challenge-hud');
        if (overlay) overlay.remove();
    }
    /**
     * @param {import('./Freeplay.js').FreeplayOptions & { timeLimit?: number }} options
     */
    constructor({
        timeLimit = 60,
        showHud = false,
        pointsPerKill = 50,
        pointsPerHit = 10,
        pointsPerMiss = 0,
        ...freeplayOptions
    } = {}) {
        super({
            showHud,
            pointsPerKill,
            pointsPerHit,
            pointsPerMiss,
            ...freeplayOptions,
        });
        this.timeElapsed = timeLimit;
        this.timeLimit = timeLimit;
        this._paused = false;
        this._completed = false;
        this.completed = false;
        this._keydownHandler = null;
        this._car = null;
        this._challengeHudFields = null;
        this._cursorProgress = 0;
        this._lastHudTime = null;
    }

    shouldPauseGameplay() {
        return this._paused && !this.active;
    }

    restart() {
        if (this._ballManager) {
            this.start(this._ballManager, { car: this._car });
        }
    }

    update(dt, context = {}) {
        if (!this.active) return;
        super.update(dt, context);
        this.timeElapsed -= dt;
        if (this.timeElapsed <= 0) {
            this.timeElapsed = 0;
            this._completed = true;
            this.completed = true;
            this.stop();
        }
        this._syncChallengeHud();
        return dt;
    }

    _bindPauseHotkey() {
        if (typeof window === 'undefined' || this._keydownHandler) return;
        this._keydownHandler = (event) => {
            if (event.code !== 'Escape' || this._completed) return;
            event.preventDefault();
            if (this.active) {
                this.active = false;
                this._paused = true;
                if (this._car && typeof this._car.setNeutralState === 'function') {
                    this._car.setNeutralState();
                }
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
        this.active = true;
        this._paused = false;
        this._completed = false;
        this.completed = false;
        this._cursorProgress = 0;
        this._lastHudTime = null;
        this._bindPauseHotkey();
        if (this._car && typeof this._car.setNeutralState === 'function') {
            this._car.setNeutralState();
        }
        this._initChallengeHud();
        this._syncChallengeHud();
        console.log("Challenge started!");
    }

    stop() {
        this._paused = false;
        this._car = null;
        this._challengeHudFields = null;
        ChallengeMode._clearOverlay();
        this._unbindPauseHotkey();
        if (!this._completed) {
            this.completed = false;
        }
        super.stop();
        console.log(`Challenge Over! Score: ${this.score}, Hits: ${this.hits}, Kills: ${this.kills}`);
    }

    onMiss() {
        super.onMiss();
        if (!this.active) return;
        this._syncChallengeHud();
    }

    onHit(ball) {
        super.onHit(ball);
        if (!this.active) return;
        this._syncChallengeHud();
        console.log(`Hit! Total: ${this.hits}, Score: ${this.score}`);
    }

    onKill(ball) {
        super.onKill(ball);
        if (!this.active) return;
        this._syncChallengeHud();
        console.log(`Kill! Total: ${this.kills}, Score: ${this.score}`);
    }

    _initChallengeHud() {
        const overlay = ChallengeMode._ensureOverlay();
        if (!overlay) return;

        const query = (selector) => overlay.querySelector(selector);
        this._challengeHudFields = {
            kills: query('[data-challenge="kills"]'),
            time: query('[data-challenge="time"]'),
            percent: query('[data-challenge="percent"]'),
            barFill: query('[data-challenge="bar-fill"]'),
            barCursor: query('[data-challenge="bar-cursor"]'),
        };
    }

    _formatTimeRemaining(seconds) {
        const total = Math.max(0, Math.ceil(seconds));
        const minutes = Math.floor(total / 60);
        const remaining = total % 60;
        return `${minutes}:${String(remaining).padStart(2, '0')}`;
    }

    _syncChallengeHud() {
        if (!this._challengeHudFields) {
            this._initChallengeHud();
        }
        if (!this._challengeHudFields) return;

        const fields = this._challengeHudFields;
        const shots = Math.max(0, Number(this._shots ?? 0));
        const percentValue = shots > 0 ? (this.hits / shots) * 100 : 0;
        const bestScore = LAST_BEST_SCORE;
        const timeLimit = Math.max(1, Number(this.timeLimit || 0));
        const elapsedSeconds = Math.max(0, timeLimit - Math.max(0, this.timeElapsed));
        const barMax = Math.max(1, BAR_MAX_SCORE, bestScore);
        const fillRatio = Math.min(1, Math.max(0, this.score / barMax));
        const cursorScore = (bestScore / timeLimit) * elapsedSeconds;
        const cursorRatio = Math.min(1, Math.max(0, cursorScore / barMax));
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        const deltaSeconds = this._lastHudTime ? Math.max(0, (now - this._lastHudTime) / 1000) : 0;
        this._lastHudTime = now;
        const smoothing = 1 - Math.exp(-10 * deltaSeconds);
        this._cursorProgress += (cursorRatio - this._cursorProgress) * smoothing;

        if (fields.kills) fields.kills.textContent = `Kills ${this.kills}`;
        if (fields.time) fields.time.textContent = this._formatTimeRemaining(this.timeElapsed);
        if (fields.percent) fields.percent.textContent = `${percentValue.toFixed(0)}%`;
        if (fields.barFill) {
            fields.barFill.style.width = `${(fillRatio * 100).toFixed(2)}%`;
        }
        if (fields.barCursor) {
            fields.barCursor.style.left = `${(this._cursorProgress * 100).toFixed(2)}%`;
            const cursorAheadOfCurrent = this._cursorProgress > (fillRatio + 0.002);
            if (cursorAheadOfCurrent) {
                fields.barCursor.classList.add('cursor-rainbow');
                fields.barCursor.style.backgroundColor = '';
            } else {
                fields.barCursor.classList.remove('cursor-rainbow');
                fields.barCursor.style.backgroundColor = CURSOR_BEHIND_COLOR;
            }
        }
    }
}
export default ChallengeMode;

