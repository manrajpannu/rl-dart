import { Boost, BOOST_DEFAULTS } from "./Boost.js";

/**
 * PulseBoost exaggerates brightness pulsing for a staccato energy look.
 */
export class PulseBoost extends Boost {
  /**
   * @param {import('three').Object3D} scene
   * @param {Partial<typeof BOOST_DEFAULTS>} [options]
   */
  constructor(scene, options = {}) {
    super(scene, {
      boostColour: 0xffffff,
      particlesPerSecond: 500,
      particleLife: 1.9,
      particleSpread: 0.5,
      particleRandomness: 0,
      particleFadeInTime: 0.09,
      particleFadeOutTime: 2.2,
      particleScaleFactor: 2.0,
      particleMaxScale: 8.0,
      ...options,
    });
    this._pulseClock = 0;
  }

  _spawnParticle(offset, quaternion) {
    super._spawnParticle(offset, quaternion);
    const particle = this._activeParticles[this._activeParticles.length - 1];
    if (!particle) return;
    particle.userData.pulsePhase = Math.random() * Math.PI * 2;
    particle.userData.baseSize *= 1.25;
  }

  updateParticles(dt) {
    this._pulseClock += dt;
    super.updateParticles(dt);
    for (const particle of this._activeParticles) {
      const pulse = 0.75 + 0.25 * Math.sin(this._pulseClock * 20 + (particle.userData.pulsePhase || 0));
      particle.material.opacity *= pulse;
    }
  }
}
