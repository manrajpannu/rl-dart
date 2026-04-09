import { Map as GameMap } from './Map';
import { Car } from './Car/Car';
import { createUI } from './Ui';
import { Controller } from './Controller';
import { BallManager } from './Ball/BallManager';

import * as THREE from 'three';
import ChallengeMode from './modes/ChallengeMode';
import FreeplayMode from './modes/Freeplay';
import { Ball } from './Ball/Ball';
import { FlowMovement } from './Ball/Movement/FlowMovement'; 

interface ModeLike {
  name?: string;
  active?: boolean;
  hits?: number;
  kills?: number;
  score?: number;
  timeElapsed?: number;
  timeLimit?: number;
  start: (ballManager: BallManager) => void | Promise<void>;
  stop: () => void;
  update: (dt: number) => void;
  onHit: () => void;
  onKill: (ball?: Ball) => void;
}

interface ModeState {
  modeName: string;
  active: boolean;
  isChallenge: boolean;
  hits: number;
  kills: number;
  score: number;
  timeLeft: number | null;
  timeLimit: number | null;
}

interface ChallengePreset {
  numBalls: number;
  health: number;
  movement: any;
  size: number;
  boundary: number;
  timeLimit: number;
}

// const canvas = document.getElementById('hud') as HTMLCanvasElement | null;
// const ctx = canvas?.getContext('2d') ?? null;
// const R = 40;

// function drawDot(yawDiff: number, pitchDiff: number): void {
//   if (!ctx || !canvas) return;

//   yawDiff = -yawDiff * 100;
//   pitchDiff = -pitchDiff * 100;
//   const angle = Math.atan2(pitchDiff, yawDiff);
//   const length = Math.min(Math.sqrt(yawDiff * yawDiff + pitchDiff * pitchDiff), R - 5);

//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const dotX = centerX + length * Math.cos(angle);
//   const dotY = centerY + length * Math.sin(angle);

//   ctx.beginPath();
//   ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
//   ctx.fillStyle = 'grey';
//   ctx.fill();
//   ctx.lineWidth = 2;
//   ctx.strokeStyle = 'black';
//   ctx.stroke();

//   ctx.beginPath();
//   ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
//   ctx.fillStyle = 'white';
//   ctx.fill();
// }

// const deadzoneCanvas = document.getElementById('deadzone') as HTMLCanvasElement | null;
// const deadzoneCtx = deadzoneCanvas?.getContext('2d') ?? null;
// const DEADZONE_RADIUS = deadzoneCanvas ? deadzoneCanvas.width / 2 : 250;
// const DEADZONE_CENTER_X = deadzoneCanvas ? deadzoneCanvas.width / 2 : 250;
// const DEADZONE_CENTER_Y = deadzoneCanvas ? deadzoneCanvas.height / 2 : 250;
// const deadzoneHistory: Array<{ yaw: number; pitch: number; time: number }> = [];

// function drawDeadzone(yaw: number, pitch: number): void {
//   if (!deadzoneCanvas || !deadzoneCtx) return;

//   let movementSpeed = 0;
//   if (deadzoneHistory.length > 0) {
//     const prev = deadzoneHistory[deadzoneHistory.length - 1];
//     const dx = yaw - prev.yaw;
//     const dy = pitch - prev.pitch;
//     movementSpeed = Math.sqrt(dx * dx + dy * dy);
//   }
//   deadzoneHistory.push({ yaw, pitch, time: performance.now() });

//   const minLen = 25;
//   const maxLen = 75;
//   const histLen = Math.round(maxLen - Math.min(movementSpeed, 0.2) / 0.2 * (maxLen - minLen));
//   if (deadzoneHistory.length > histLen) deadzoneHistory.shift();

//   deadzoneCtx.clearRect(0, 0, deadzoneCanvas.width, deadzoneCanvas.height);

//   deadzoneCtx.save();
//   deadzoneCtx.font = '9px monospace';
//   deadzoneCtx.fillStyle = 'white';
//   deadzoneCtx.textAlign = 'left';
//   deadzoneCtx.textBaseline = 'top';
//   deadzoneCtx.fillText(`(${(-yaw).toFixed(4)}, ${pitch.toFixed(4)})`, 10, 10);
//   deadzoneCtx.restore();

//   deadzoneHistory.forEach(dot => {
//     const x = DEADZONE_CENTER_X + (-dot.yaw) * DEADZONE_RADIUS;
//     const y = DEADZONE_CENTER_Y + (-dot.pitch) * DEADZONE_RADIUS;

//     deadzoneCtx.save();
//     deadzoneCtx.globalAlpha = 1.0;
//     deadzoneCtx.fillStyle = '#ffffffff';
//     deadzoneCtx.beginPath();
//     deadzoneCtx.arc(x, y, 1, 0, Math.PI * 2);
//     deadzoneCtx.fill();
//     deadzoneCtx.restore();
//   });
// }

/**
 * Root gameplay coordinator.
 *
 * Engine owns the major gameplay domains (car, balls, map, controller, mode)
 * and defines the per-frame execution order used by the simulation.
 */
export class Engine extends THREE.Group {
  car: Car;
  BallManager: BallManager;
  map: GameMap;
  controller: Controller;
  currentMode: ModeLike;
  currentClosestBall: Ball | null;
  private _onHit: () => void;
  private _onKill: (ball?: Ball) => void;
  private _modeStateListeners: Set<(state: ModeState) => void>;
  private _challengePresets: Record<string, ChallengePreset>;

  /**
   * @param renderer Active renderer instance used by UI wiring.
   */
  constructor(renderer: THREE.WebGLRenderer) {
    super();

    this._modeStateListeners = new Set();
    this.currentClosestBall = null;
    this._challengePresets = {
      Warmup: {
        numBalls: 1,
        health: 4,
        movement: null,
        size: 2,
        boundary: 15,
        timeLimit: 30,
      },
      Accuracy: {
        numBalls: 2,
        health: 5,
        movement: null,
        size: 1.8,
        boundary: 18,
        timeLimit: 45,
      },
      Endurance: {
        numBalls: 4,
        health: 6,
        movement: null,
        size: 2,
        boundary: 22,
        timeLimit: 90,
      },
    };

    {
      const ambientLight = new THREE.AmbientLight(0x000000);
      this.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
      (keyLight as any).position.set(0, 200, 0);
      (keyLight as any).castShadow = true;
      (keyLight as any).shadow.mapSize.set(2048, 2048);
      (keyLight as any).shadow.camera.near = 1;
      (keyLight as any).shadow.camera.far = 400;
      (keyLight as any).shadow.camera.left = -120;
      (keyLight as any).shadow.camera.right = 120;
      (keyLight as any).shadow.camera.top = 120;
      (keyLight as any).shadow.camera.bottom = -120;
      // Normal bias is important on curved meshes to prevent shadow acne/banding.
      (keyLight as any).shadow.bias = -0.00002;
      (keyLight as any).shadow.normalBias = 0.02;
      this.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.95);
      (fillLight as any).position.set(100, 200, 100);
      this.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
      (rimLight as any).position.set(-100, -200, -100);
      this.add(rimLight);
    }

    this.car = new Car(this as unknown as THREE.Object3D);
    this.add(this.car as unknown as THREE.Object3D);

    this.BallManager = new BallManager();
    this.add(this.BallManager as unknown as THREE.Object3D);

    this.map = new GameMap();
    this.map.gen();
    (this.map as any).position.y = -15;
    this.add(this.map as unknown as THREE.Object3D);

    this.controller = new Controller();

    this.currentMode = new FreeplayMode({
      numBalls: 6,
      health: 3,
      movement: FlowMovement,
      size: 1,
      boundary: 20,
    });
    this.currentMode.start(this.BallManager);

    this._onHit = () => {
      this.currentMode.onHit();
      this._emitModeState();
    };

    this._onKill = (ball?: Ball) => {
      if (ball === this.currentClosestBall) {
        this.currentClosestBall = null;
      }
      this.currentMode.onKill(ball);
      this._emitModeState();
    };

    this.BallManager.on('hit', this._onHit);
    this.BallManager.on('killed', this._onKill);

    createUI(this.car, this.controller, undefined, this.map, renderer, this);

    window.addEventListener('gamepadconnected', e => {
      const gp = navigator.getGamepads()[e.gamepad.index];
      if (!gp) return;
      console.log(
        'Gamepad connected at index %d: %s. %d buttons, %d axes.',
        gp.index,
        gp.id,
        gp.buttons.length,
        gp.axes.length,
      );
    });

    this._emitModeState();
  }

  /**
   * Advances one fixed simulation step.
   * @param dt Fixed simulation delta time in seconds.
   */
  update(dt: number): void {
    const { yaw, pitch, roll, boostHeld, ballCam } = this.controller.handleController();
    this.BallManager.update(this.car.getForwardVector(), boostHeld, dt);
    this.BallManager.updateHealthBar(this.car.getCamera());

    if (!this.BallManager.isIntersecting() && boostHeld) {
      this.car.playShootSound(dt);
    }

    this.car.rotate(yaw, pitch, roll, dt);
    this.car.boost(boostHeld, dt);

    if (!this.currentClosestBall) {
      this.currentClosestBall = this.BallManager.getClosestBall() ?? null;
    }

    this.car.updateCamera((this.currentClosestBall ? this.currentClosestBall.position : null) as any, ballCam, dt);
    this.currentMode.update(dt);

    // drawDot(yaw, -pitch);
    // drawDeadzone(yaw, -pitch);
    this._emitModeState();
  }

  getCamera(): THREE.Camera {
    return this.car.getCamera() as unknown as THREE.Camera;
  }

  setMode(newMode: ModeLike): void {
    if (this.car?.Boost && typeof this.car.Boost.reset === 'function') {
      this.car.Boost.reset();
    }

    if (this._onHit) this.BallManager.off('hit', this._onHit);
    if (this._onKill) this.BallManager.off('killed', this._onKill);

    this.currentMode = newMode;

    this._onHit = () => {
      this.currentMode.onHit();
      this._emitModeState();
    };
    this._onKill = (ball?: Ball) => {
      if (ball === this.currentClosestBall) {
        this.currentClosestBall = null;
      }
      this.currentMode.onKill(ball);
      this._emitModeState();
    };

    this.BallManager.on('hit', this._onHit);
    this.BallManager.on('killed', this._onKill);

    this.currentMode.start(this.BallManager);
    this.currentClosestBall = null;
    this._emitModeState();
  }

  getAvailableModes(): string[] {
    return ['Freeplay', 'Challenge'];
  }

  setModeByName(modeName: string, options: Record<string, any> = {}): void {
    if (modeName === 'Challenge') {
      this.setMode(new ChallengeMode({ ...this._challengePresets.Warmup, ...options }));
      return;
    }

    this.setMode(new FreeplayMode({
      numBalls: 1,
      health: 6,
      movement: null,
      size: 2,
      boundary: 15,
      ...options,
    }));
  }

  getChallengePresetNames(): string[] {
    return Object.keys(this._challengePresets);
  }

  startChallengePreset(name: string): void {
    const preset = this._challengePresets[name] || this._challengePresets.Warmup;
    this.setMode(new ChallengeMode({ ...preset }));
  }

  restartCurrentMode(): void {
    this.currentMode.start(this.BallManager);
    this.currentClosestBall = null;
    this._emitModeState();
  }

  stopCurrentMode(): void {
    this.currentMode.stop();
    this._emitModeState();
  }

  getModeState(): ModeState {
    const mode = this.currentMode as any;
    const modeName = mode?.constructor?.name?.replace('Mode', '') || 'Unknown';
    const isChallenge = modeName.toLowerCase().includes('challenge');

    return {
      modeName,
      active: Boolean(mode?.active),
      isChallenge,
      hits: Number(mode?.hits ?? 0),
      kills: Number(mode?.kills ?? 0),
      score: Number(mode?.score ?? 0),
      timeLeft: isChallenge ? Number(mode?.timeElapsed ?? 0) : null,
      timeLimit: isChallenge ? Number(mode?.timeLimit ?? 0) : null,
    };
  }

  onModeStateChange(listener: (state: ModeState) => void): void {
    this._modeStateListeners.add(listener);
    listener(this.getModeState());
  }

  offModeStateChange(listener: (state: ModeState) => void): void {
    this._modeStateListeners.delete(listener);
  }

  private _emitModeState(): void {
    const state = this.getModeState();
    this._modeStateListeners.forEach(listener => listener(state));
  }
}

