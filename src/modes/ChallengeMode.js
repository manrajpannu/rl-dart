import * as THREE from 'three';
import FreeplayMode from './Freeplay.js';

class ChallengeMode extends FreeplayMode {
    static _ensureOverlay() {
        if (!document.getElementById('challenge-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'challenge-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.pointerEvents = 'none';
            overlay.style.zIndex = '9999';
            document.body.appendChild(overlay);
        }
    }

    static _showCountdown(text) {
        ChallengeMode._ensureOverlay();
        const overlay = document.getElementById('challenge-overlay');
        overlay.innerHTML = `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:min(9vw, 120px);font-weight:900;letter-spacing:0.14em;text-transform:uppercase;color:#f5f7fa;font-family:'Arial Black','Impact',sans-serif;text-shadow:0 0 2px rgba(0,0,0,0.95),0 0 10px rgba(0,0,0,0.65),0 0 22px rgba(29,77,125,0.35);padding:0.08em 0.35em;border:1px solid rgba(255,255,255,0.18);background:rgba(10,12,14,0.28);backdrop-filter:blur(4px);border-radius:12px;">${text}</div>`;
    }

    static _showTimer(time) {
        ChallengeMode._ensureOverlay();
        const overlay = document.getElementById('challenge-overlay');
        let timerDiv = overlay.querySelector('.challenge-timer');
        if (!timerDiv) {
            timerDiv = document.createElement('div');
            timerDiv.className = 'challenge-timer';
            timerDiv.style.position = 'absolute';
            timerDiv.style.top = '2vw';
            timerDiv.style.left = '50%';
            timerDiv.style.transform = 'translateX(-50%)';
            timerDiv.style.padding = '0.15em 0.6em';
            timerDiv.style.borderRadius = '999px';
            timerDiv.style.fontSize = 'clamp(18px, 2.1vw, 34px)';
            timerDiv.style.fontWeight = '900';
            timerDiv.style.letterSpacing = '0.12em';
            timerDiv.style.textTransform = 'uppercase';
            timerDiv.style.color = '#f7f9fc';
            timerDiv.style.fontFamily = '"Arial Black", "Impact", sans-serif';
            timerDiv.style.textShadow = '0 0 2px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.6), 0 0 16px rgba(29,77,125,0.28)';
            timerDiv.style.background = 'linear-gradient(180deg, rgba(7,9,11,0.42), rgba(7,9,11,0.18))';
            timerDiv.style.border = '1px solid rgba(255,255,255,0.12)';
            timerDiv.style.backdropFilter = 'blur(4px)';
            overlay.appendChild(timerDiv);
        }
        timerDiv.textContent = `${time}`;
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
     * @param {number} [options.timeLimit=60]
     * @param {THREE.Vector3} [options.boundaryOrigin=new THREE.Vector3(0,0,0)]
     * @param {Array} [options.ballConfigs=[]]
     */
    constructor({
        numBalls = 1,
        health = 3,
        movement = null,
        size = 1.5,
        spawnOverlapping = true,
        timeLimit = 60,
        boundary = 20,
        boundaryOrigin = new THREE.Vector3(0, 0, 0),
        ballConfigs = [] // [{health, movement, size} ...]
    } = {}) {
        super({
            numBalls,
            health,
            movement,
            size,
            spawnOverlapping,
            boundary,
            boundaryOrigin,
            ballConfigs,
        });
        this.timeElapsed = 0;
        this.timeLimit = timeLimit; // seconds
    }

    update(dt) {
        if (!this.active) return;
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

    async start(BallManager) {
        super.start(BallManager);
        this.timeElapsed = this.timeLimit;
        this.active = false;
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
        this.active = true;
        console.log("Challenge started!");
    }

    stop() {
        super.stop();
        console.log(`Challenge Over! Score: ${this.score}, Hits: ${this.hits}, Kills: ${this.kills}`);
    }

    onHit() {
        super.onHit();
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

