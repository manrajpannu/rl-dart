import * as THREE from "three";
import { Boost, BOOST_DEFAULTS } from "./Boost.js";

/**
 * SpiralBoost adds a lateral swirl component, creating a corkscrew trail.
 */
export class SpiralBoost extends Boost {
  /**
   * @param {THREE.Object3D} scene
   * @param {Partial<typeof BOOST_DEFAULTS> & { spiralStrength?: number }} [options]
   */
  constructor(scene, options = {}) {
    super(scene, {
      boostColour: 0x4ef5ff,
      particlesPerSecond: 175,
      particleLife: 1.1,
      particleSpread: 0.12,
      particleRandomness: 0.08,
      particleScaleFactor: 1.8,
      particleMaxScale: 2.4,
      ...options,
    });
    this.spiralStrength = options.spiralStrength ?? 1.0;
  }

  _spawnParticle(offset, quaternion) {
    super._spawnParticle(offset, quaternion);
    const particle = this._activeParticles[this._activeParticles.length - 1];
    if (!particle) return;

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion).normalize();
    const tangent = new THREE.Vector3(forward.y, -forward.x, 0);
    if (tangent.lengthSq() < 1e-6) tangent.set(1, 0, 0);
    tangent.normalize();

    const dir = Math.random() > 0.5 ? 1 : -1;
    particle.userData.velocity.addScaledVector(tangent, this.spiralStrength * dir);
  }
}
