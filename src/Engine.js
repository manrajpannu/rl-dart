import { Ball } from './Ball/Ball';
import { Map } from './Map';
import { Car } from './Car/Car';
import { createUI } from './Ui';
import { Controller } from './Controller';
import { BallManager } from './Ball/BallManager';
import { OrbitingMovement } from './Ball/Movement/OribalMovement';

import * as THREE from 'three';
import { ProceduralMovement } from './Ball/Movement/ProceduralMovement';
import { NaturalMovement } from './Ball/Movement/NaturalMovement';
import { FlowMovement } from './Ball/Movement/FlowMovement';
import ChallengeMode from './modes/ChallengeMode';
import { CurvyMovement } from './Ball/Movement/CurvyMovement';
import { CoolMovement } from './Ball/Movement/CoolMovement';
import FreeplayMode from './modes/Freeplay';

const canvas = document.getElementById('hud');
const ctx = canvas.getContext('2d');
const R = 40; // radius of circle
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function drawDot(yawDiff, pitchDiff) {
  yawDiff = -yawDiff * 100;
  pitchDiff = -pitchDiff * 100;
  const angle = Math.atan2(pitchDiff, yawDiff); // angle in radians
  const length = Math.min(Math.sqrt(yawDiff * yawDiff + pitchDiff * pitchDiff), R-5); // clamp to circle radius

  const dotX = centerX + length * Math.cos(angle);
  const dotY = centerY + length * Math.sin(angle);

  ctx.beginPath();
  ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
  ctx.fillStyle = 'grey';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
}

// Deadzone dot history
const deadzoneCanvas = document.getElementById('deadzone');
const deadzoneCtx = deadzoneCanvas.getContext('2d');
const DEADZONE_RADIUS = 250;
const DEADZONE_CENTER_X = deadzoneCanvas.width / 2;
const DEADZONE_CENTER_Y = deadzoneCanvas.height / 2;
const deadzoneHistory = [];

function drawDeadzone(yaw, pitch) {
  // Add new dot, interpolate if movement is large
  let movementSpeed = 0;
  if (deadzoneHistory.length > 0) {
    const prev = deadzoneHistory[deadzoneHistory.length - 1];
    const dx = yaw - prev.yaw;
    const dy = pitch - prev.pitch;
    movementSpeed = Math.sqrt(dx * dx + dy * dy);
  }
  deadzoneHistory.push({ yaw, pitch, time: performance.now() });
  // Dynamically adjust history length: faster movement = shorter trail
  const minLen = 25;
  const maxLen = 75;
  // Map movementSpeed [0, 0.2] to history length [maxLen, minLen]
  let histLen = Math.round(maxLen - Math.min(movementSpeed, 0.2) / 0.2 * (maxLen - minLen));
  if (deadzoneHistory.length > histLen) deadzoneHistory.shift();

  // Clear canvas
  deadzoneCtx.clearRect(0, 0, deadzoneCanvas.width, deadzoneCanvas.height);

  // Draw yaw/pitch text above the box on the left
  deadzoneCtx.save();
  deadzoneCtx.font = '9px monospace';
  deadzoneCtx.fillStyle = 'white';
  deadzoneCtx.textAlign = 'left';
  deadzoneCtx.textBaseline = 'top';
  deadzoneCtx.fillText(`(${(-yaw).toFixed(4)}, ${pitch.toFixed(4)})`, 10, 10);
  deadzoneCtx.restore();

  // Draw dots and lines at full opacity
  deadzoneHistory.forEach((dot, i) => {
    // Convert yaw/pitch to canvas coordinates
    const x = DEADZONE_CENTER_X + (-dot.yaw) * DEADZONE_RADIUS;
    const y = DEADZONE_CENTER_Y + (-dot.pitch) * DEADZONE_RADIUS;

    deadzoneCtx.save();
    deadzoneCtx.globalAlpha = 1.0;
    deadzoneCtx.fillStyle = '#ffffffff';
    deadzoneCtx.beginPath();
    deadzoneCtx.arc(x, y, 1, 0, Math.PI * 2);
    deadzoneCtx.fill();
    deadzoneCtx.restore();
  });
}

/**
 * Root gameplay coordinator.
 *
 * Engine owns the major gameplay domains (car, balls, map, controller, mode)
 * and defines the per-frame execution order used by the simulation.
 */
export class Engine extends THREE.Group {
  /**
   * @param {THREE.WebGLRenderer} renderer Active renderer instance used by UI wiring.
   */
  constructor(renderer) {
    super();
    {
      const ambientLight = new THREE.AmbientLight(0x000000);
      this.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
      keyLight.position.set(0, 200, 0);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 400;
      keyLight.shadow.camera.left = -120;
      keyLight.shadow.camera.right = 120;
      keyLight.shadow.camera.top = 120;
      keyLight.shadow.camera.bottom = -120;
      keyLight.shadow.bias = -0.00008;
      this.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.95);
      fillLight.position.set(100, 200, 100);
      this.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
      rimLight.position.set(-100, -200, -100);
      this.add(rimLight);
    }

    this.car = new Car(this);
    this.add(this.car);

    this.BallManager = new BallManager();
    this.add(this.BallManager);

    this.map = new Map();
    this.map.gen();
    this.map.position.y = -15;
    this.add(this.map);

    this.controller = new Controller();

    this.currentMode = new FreeplayMode({
      numBalls: 1,
      health: 6,
      movement: null,
      size: 2,
      boundary: 15,
    });
    this.currentMode.start(this.BallManager);
    this._onHit = () => this.currentMode.onHit();
    this._onKill = (ball) => {
      if (ball === this.currentClosestBall) {
        // Force retarget on next update using fresh closest-ball data.
        this.currentClosestBall = null;
      }
      this.currentMode.onKill(ball);
    };
    this.BallManager.on('hit', this._onHit);
    this.BallManager.on('killed', this._onKill);


    createUI(this.car, this.controller, this.ball, this.map, renderer);

    window.addEventListener("gamepadconnected", (e) => {
      const gp = navigator.getGamepads()[e.gamepad.index];
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        gp.index,
        gp.id,
        gp.buttons.length,
        gp.axes.length,
      );
    });
  }


  /**
   * Advances one fixed simulation step.
   *
   * Update order is intentional:
   * 1) read player/controller input
   * 2) update balls and targeting state
   * 3) apply car rotation/boost
   * 4) resolve camera target and camera smoothing
   * 5) advance mode state and debug deadzone visualization
   *
   * @param {number} dt Fixed simulation delta time in seconds.
   */
  update(dt) {
    const { yaw, pitch, roll, boostHeld, ballCam } = this.controller.handleController();
    this.BallManager.update(this.car.getForwardVector(), boostHeld, dt);
    this.BallManager.updateHealthBar(this.car.getCamera());
    if (!this.BallManager.isIntersecting() && boostHeld) {
      this.car.playShootSound(dt);
    }
    this.car.rotate(yaw, pitch, roll, dt);
    this.car.boost(boostHeld, dt);
    // Ballcam logic: stick to currentClosestBall unless killed
    if (!this.currentClosestBall) {
      this.currentClosestBall = this.BallManager.getClosestBall();
    }
    this.car.updateCamera(this.currentClosestBall ? this.currentClosestBall.position : null, ballCam, dt);
    this.currentMode.update(dt);
    drawDeadzone(yaw, -pitch);
  }

  /**
   * @returns {THREE.Camera}
   */
  getCamera() {
    return this.car.getCamera();
  }

  /**
   * Swap active gameplay mode while preserving shared world entities.
   * Rebinds BallManager events so hit/kill callbacks route to the new mode.
   *
   * @param {{ start: (ballManager: BallManager) => void, onHit: () => void, onKill: (ball?: any) => void }} newMode
   */
  setMode(newMode) {
    if (this.car && this.car.Boost && typeof this.car.Boost.reset === 'function') {
      this.car.Boost.reset();
    }

    // Unsubscribe old mode
    if (this._onHit) this.BallManager.off('hit', this._onHit);
    if (this._onKill) this.BallManager.off('killed', this._onKill);

    this.currentMode = newMode;

    // Update handlers to use the new mode
    this._onHit = () => this.currentMode.onHit();
    this._onKill = (ball) => {
      if (ball === this.currentClosestBall) {
        this.currentClosestBall = null;
      }
      this.currentMode.onKill(ball);
    };
    this.BallManager.on('hit', this._onHit);
    this.BallManager.on('killed', this._onKill);

    // Reinitialize mode state and force camera retarget.
    this.currentMode.start(this.BallManager);
    this.currentClosestBall = null;
  }

}