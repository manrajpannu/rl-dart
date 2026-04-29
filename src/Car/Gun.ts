import * as THREE from 'three';
import { withAssetBase } from '../assetBase.js';
import { Bullet } from './Bullet.js';
import { playMuzzleFlashEffect } from './effects/muzzleFlashEffect.js';
import { playSparkBurstEffect } from './effects/sparkBurstEffect.js';
import { soundManager } from '../SoundManager.js';

type GunOptions = {
  ammo?: number | 'infinite';
  cooldownSeconds?: number;
  reloadSeconds?: number;
  speed?: number;
  range?: number;
  damage?: number;
};

type GunOwner = THREE.Object3D & {
  getForwardVector?: () => THREE.Ray;
};

export type GunState = {
  enabled: boolean;
  ammo: number;
  maxAmmo: number;
};

export class Gun extends THREE.Group {
  private hostScene: THREE.Object3D;
  private owner: GunOwner;
  private _shootSounds: HTMLAudioElement[];
  private _hitSounds: HTMLAudioElement[];
  private _reloadSounds: HTMLAudioElement[];
  private _shootSoundIndex: number;
  private _hitSoundIndex: number;
  private _reloadSoundIndex: number;
  private _shootAccumulator: number;
  private _defaultShootRate: number;
  private _enabled: boolean;
  private _visualsEnabled: boolean;
  private _ammo: number;
  private _maxAmmo: number;
  private _cooldownSeconds: number;
  private _reloadSeconds: number;
  private _cooldownTimer: number;
  private _reloadTimer: number;
  private _activeBullets: Bullet[];
  private _bulletSpeed: number;
  private _bulletRange: number;
  private _bulletDamage: number;
  private _reloadSoundDelayMs: number;
  private _reloadSoundTimer: ReturnType<typeof setTimeout> | null;

  constructor(scene: THREE.Object3D, owner: GunOwner, dps = 5) {
    super();
    this.hostScene = scene;
    this.owner = owner;
    
    // Load sounds via SoundManager
    soundManager.loadSound('shoot', 'sounds/shoot.ogg');
    soundManager.loadSound('hit', 'sounds/hit.ogg');
    soundManager.loadSound('reload', 'sounds/new sounds/reload_1.mp3');
    
    this._shootAccumulator = 0;
    this._defaultShootRate = dps;

    this._enabled = false;
    this._visualsEnabled = false;
    this._ammo = Infinity;
    this._maxAmmo = Infinity;
    this._cooldownSeconds = 0.2;
    this._reloadSeconds = 1.5;
    this._cooldownTimer = 0;
    this._reloadTimer = 0;
    this._activeBullets = [];
    this._bulletSpeed = 72;
    this._bulletRange = 180;
    this._bulletDamage = 1;
    this._reloadSoundDelayMs = 512;
    this._reloadSoundTimer = null;

    this.configure({ cooldownSeconds: 1 / Math.max(0.1, dps) });
  }

  configure(options: GunOptions = {}): void {
    const hasAmmoOverride = options.ammo !== undefined;
    const ammo = hasAmmoOverride ? Number(options.ammo) : this._maxAmmo;
    this._maxAmmo = Number.isFinite(ammo) && ammo >= 0 ? Math.floor(ammo) : Infinity;
    this._cooldownSeconds = Number.isFinite(Number(options.cooldownSeconds)) && Number(options.cooldownSeconds) >= 0
      ? Number(options.cooldownSeconds)
      : this._cooldownSeconds;
    this._reloadSeconds = Number.isFinite(Number(options.reloadSeconds)) && Number(options.reloadSeconds) >= 0
      ? Number(options.reloadSeconds)
      : this._reloadSeconds;
    this._bulletSpeed = Number.isFinite(Number(options.speed)) && Number(options.speed) > 0
      ? Number(options.speed)
      : this._bulletSpeed;
    this._bulletRange = Number.isFinite(Number(options.range)) && Number(options.range) > 0
      ? Number(options.range)
      : this._bulletRange;
    this._bulletDamage = Number.isFinite(Number(options.damage)) && Number(options.damage) > 0
      ? Number(options.damage)
      : this._bulletDamage;
    this._reloadSoundDelayMs = Math.max(0, Math.round(this._reloadSeconds * 1000));

    if (hasAmmoOverride) {
      this._ammo = this._maxAmmo;
    } else if (!Number.isFinite(this._ammo) || this._ammo > this._maxAmmo) {
      this._ammo = this._maxAmmo;
    } else if (this._ammo === Infinity && this._maxAmmo !== Infinity) {
      this._ammo = this._maxAmmo;
    }
  }

  enable(options: GunOptions = {}): void {
    this.configure(options);
    this._enabled = true;
    if (this._ammo !== Infinity && (!Number.isFinite(this._ammo) || this._ammo <= 0)) {
      this._ammo = this._maxAmmo;
    }
  }

  disable(): void {
    this._enabled = false;
  }

  setEnabled(enabled: boolean): void {
    if (enabled) {
      this._enabled = true;
      return;
    }
    this.disable();
  }

  getState(): GunState {
    return {
      enabled: this._enabled,
      ammo: this._ammo,
      maxAmmo: this._maxAmmo,
    };
  }

  setVisualsEnabled(enabled: boolean): void {
    this._visualsEnabled = Boolean(enabled);
  }

  clearBullets(): void {
    for (const bullet of this._activeBullets) {
      bullet.dispose();
    }
    this._activeBullets = [];
  }

  reloadNow(playSound = false): void {
    if (this._reloadSoundTimer) {
      clearTimeout(this._reloadSoundTimer);
      this._reloadSoundTimer = null;
    }

    this._reloadTimer = 0;
    if (this._maxAmmo !== Infinity) {
      this._ammo = this._maxAmmo;
    }

    if (playSound) {
      this._playReloadSound();
    }
  }

  update(dt: number, ballManager: any, fireHeld: boolean): { fired: boolean; miss: boolean } {
    let fired = false;
    let miss = false;

    if (this._cooldownTimer > 0) {
      this._cooldownTimer = Math.max(0, this._cooldownTimer - dt);
    }

    if (this._reloadTimer > 0) {
      this._reloadTimer = Math.max(0, this._reloadTimer - dt);
      if (this._reloadTimer === 0 && this._maxAmmo !== Infinity) {
        this._ammo = this._maxAmmo;
      }
    }

    if (fireHeld && this._canShoot()) {
      const ray = this._getForwardRay();
      miss = this._spawnBullet(ray, ballManager);
      this._playShotSound('shoot');
      fired = true;
    }

    if (this._activeBullets.length > 0) {
      const nextBullets: Bullet[] = [];
      for (const bullet of this._activeBullets) {
        const stillAlive = bullet.update(dt, ballManager);
        if (stillAlive) {
          nextBullets.push(bullet);
        }
      }
      this._activeBullets = nextBullets;
    }

    return { fired, miss };
  }

  playDefaultShootSound(dt: number): void {
    if (this._shootAccumulator > 0) {
      this._shootAccumulator -= dt;
    }
    if (this._shootAccumulator <= 0) {
      this._playShotSound('shoot');
      this._shootAccumulator = 1 / Math.max(0.1, this._defaultShootRate);
    }
  }

  playDefaultShootSoundOnce(): void {
    this._playShotSound('shoot');
  }

  private _canShoot(): boolean {
    if (!this._enabled) return false;
    if (this._reloadTimer > 0) return false;
    if (this._cooldownTimer > 0) return false;
    return this._ammo === Infinity || this._ammo > 0;
  }

  private _getForwardRay(): THREE.Ray {
    if (typeof this.owner.getForwardVector === 'function') {
      return this.owner.getForwardVector();
    }

    const origin = new THREE.Vector3();
    const direction = new THREE.Vector3(0, 0, -1);
    this.owner.getWorldPosition(origin);
    direction.applyQuaternion(this.owner.quaternion).normalize();
    return new THREE.Ray(origin, direction);
  }

  private _findImpact(ballManager: any, ray: THREE.Ray, maxDistance: number): { ball: any; hitPoint: THREE.Vector3 } | null {
    if (!ballManager || !Array.isArray(ballManager.balls)) return null;

    let closest: { ball: any; hitPoint: THREE.Vector3 } | null = null;
    let closestDistance = Infinity;

    for (const ball of ballManager.balls) {
      if (!ball || !ball.hitBox || typeof ball.findIntersection !== 'function') continue;
      const hitPoint = ball.findIntersection(ray, ball.hitBox);
      if (!hitPoint) continue;

      const distance = hitPoint.distanceTo(ray.origin);
      if (distance <= maxDistance && distance < closestDistance) {
        closestDistance = distance;
        closest = { ball, hitPoint };
      }
    }

    return closest;
  }

  private _applyImpact(ballManager: any, impact: { ball: any; hitPoint: THREE.Vector3 }, sourcePosition: THREE.Vector3, sourceUp: THREE.Vector3): void {
    const { ball, hitPoint } = impact;
    if (!ballManager || !ball) return;

    const canApplyDamage = typeof ball._canApplyDamage === 'function'
      ? ball._canApplyDamage(hitPoint, sourcePosition, sourceUp)
      : true;
    if (!canApplyDamage) {
      return;
    }

    if (this._visualsEnabled) {
      playSparkBurstEffect(this.hostScene, hitPoint, {
        count: 10,
        duration: 0.1,
        speed: 6.2,
        spread: 0.02,
        sizeMin: 1.1,
        sizeMax: 2.1,
        color: 0xffd94a,
      });
    }

    const willBeKilled = typeof ball.getHealth === 'function' && ball.getHealth() <= this._bulletDamage;
    const isSlider = Boolean(ball.holdSliderEnabled);

    if (typeof ball.setHealth === 'function' && typeof ball.getHealth === 'function') {
      ball.setHealth(Math.max(0, ball.getHealth() - this._bulletDamage));
    } else if (typeof ball.damage === 'function') {
      ball.damage();
    }

    // Skip hit sound if it's a kill (kill sound will play) or if it's a slider (slider plays its own sounds)
    if (!willBeKilled && !isSlider) {
      this._playShotSound('hit');
    }

    ball.justHit = true;
    ballManager.emit('hit', ball);

    if (typeof ball.isKilled === 'function' && ball.isKilled()) {
      ballManager.respawnBall(ball);
      ballManager.emit('killed', ball);
    }
  }

  private _spawnBullet(ray: THREE.Ray, ballManager: any): boolean {
    this.owner.updateMatrixWorld?.();

    const origin = new THREE.Vector3();
    this.owner.getWorldPosition(origin);
    const upDir = new THREE.Vector3(0, 1, 0).applyQuaternion(this.owner.quaternion).normalize();
    const start = origin.clone()
      .addScaledVector(ray.direction, 0.9)
      .addScaledVector(upDir, 0);

    if (this._visualsEnabled) {
      playMuzzleFlashEffect(this.hostScene, start, ray.direction);
      const bullet = new Bullet({
        root: this.hostScene,
        origin: start,
        direction: ray.direction,
        speed: this._bulletSpeed,
        range: this._bulletRange,
        damage: this._bulletDamage,
        showVisuals: this._visualsEnabled,
        sourcePosition: null,
        sourceUp: null,
        hitDetectionEnabled: false,
      });
      this._activeBullets.push(bullet);
    }

    const impact = this._findImpact(ballManager, new THREE.Ray(start.clone(), ray.direction.clone()), this._bulletRange);
    let miss = true;
    if (impact) {
      this._applyImpact(ballManager, impact, origin, upDir);
      miss = false;
    }

    this._cooldownTimer = this._cooldownSeconds;

    if (this._ammo !== Infinity) {
      this._ammo = Math.max(0, this._ammo - 1);
      if (this._ammo === 0) {
        this._reloadTimer = Math.max(0, this._reloadSeconds);
        this._playReloadSound();
      }
    }

    return miss;
  }

  private _playShotSound(type: 'hit' | 'shoot'): void {
    if (type === 'hit') {
      soundManager.playSound('hit', 0.1);
    } else {
      soundManager.playSound('shoot', 0.04);
    }
  }

  private _playReloadSound(): void {
    if (this._reloadSoundTimer) {
      clearTimeout(this._reloadSoundTimer);
    }

    this._reloadSoundTimer = setTimeout(() => {
      soundManager.playSound('reload', 0.18);
      this._reloadSoundTimer = null;
    }, this._reloadSoundDelayMs);
  }
}

export default Gun;