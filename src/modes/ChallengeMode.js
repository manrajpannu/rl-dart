import * as THREE from 'three';
import { Ball } from '../Ball/Ball';
import { CoolMovement } from '../Ball/Movement/CoolMovement';

class ChallengeMode {
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
        overlay.innerHTML = `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:7vw;color:white;font-family:sans-serif;text-shadow:0 0 20px #000;">${text}</div>`;
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
            timerDiv.style.fontSize = '3vw';
            timerDiv.style.color = 'white';
            timerDiv.style.fontFamily = 'sans-serif';
            timerDiv.style.textShadow = '0 0 10px #000';
            overlay.appendChild(timerDiv);
        }
        timerDiv.textContent = time;
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
        timeLimit = 60,
        boundary = 20,
        boundaryOrigin = new THREE.Vector3(0, 0, 0),
        ballConfigs = [] // [{health, movement, size} ...]
    } = {}) {
        this.hits = 0;
        this.kills = 0;
        this.score = 0;
        this.timeElapsed = 0;
        this.timeLimit = timeLimit; // seconds
        this.active = true;
        this.numBalls = numBalls;
        this.balls = [];
        this.ballConfigs = ballConfigs;
        this.defaultHealth = health;
        this.defaultMovement = movement;
        this.defaultSize = size;
        this.boundary = boundary;
        this.boundaryOrigin = boundaryOrigin;
    }

    createBalls(BallManager) {
        BallManager.clear && BallManager.clear();
        this.balls = [];
        for (let i = 0; i < this.numBalls; i++) {
            const cfg = this.ballConfigs[i] || {};
            const ballHealth = cfg.health !== undefined ? cfg.health : this.defaultHealth;
            const ballMovement = cfg.movement !== undefined ? cfg.movement : this.defaultMovement;
            const ballSize = cfg.size !== undefined ? cfg.size : this.defaultSize;
            const pos = this.boundaryOrigin.clone().add(new THREE.Vector3(
                (Math.random() - 0.5) * 2 * this.boundary,
                Math.max((Math.random() - 0.5) * 2 * this.boundary, ballSize),
                (Math.random() - 0.5) * 2 * this.boundary
            ));
            const healthObj = { maxHealth: ballHealth, health: ballHealth };
            const ball = BallManager.createBall(pos, ballSize, ballMovement, healthObj);
            this.balls.push(ball);
        }
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
        this.hits = 0;
        this.kills = 0;
        this.score = 0;
        this.timeElapsed = this.timeLimit;
        this.active = false;
        this.createBalls(BallManager);
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
        this.active = false;
        console.log(`Challenge Over! Score: ${this.score}, Hits: ${this.hits}, Kills: ${this.kills}`);
    }

    onHit() {
        if (!this.active) return;
        this.hits += 1;
        this.score += 10; // Points per hit
        console.log(`Hit! Total: ${this.hits}, Score: ${this.score}`);
    }

    onKill(ball) {
        if (!this.active) return;
        this.kills += 1;
        this.score += 50; // Points per kill
        // Respawn the ball at a random position within boundary
        if (ball) {
            const pos = this.boundaryOrigin.clone().add(new THREE.Vector3(
                (Math.random() - 0.5) * 2 * this.boundary,
                2 + Math.random() * 6,
                (Math.random() - 0.5) * 2 * this.boundary
            ));
            ball.setPosition(pos);
            if (typeof ball.respawn === 'function') ball.respawn();
        }
        console.log(`Kill! Total: ${this.kills}, Score: ${this.score}`);
    }
}
export default ChallengeMode;

