import { Boost, BOOST_DEFAULTS } from "./Boost.js";
import { SpiralBoost } from "./SpiralBoost.js";
import { PulseBoost } from "./PulseBoost.js";

export const BOOST_TYPES = {
  Classic: Boost,
  Spiral: SpiralBoost,
  Pulse: PulseBoost,
};

/**
 * @param {import('three').Object3D} scene
 * @param {keyof typeof BOOST_TYPES} type
 * @param {Partial<typeof BOOST_DEFAULTS>} [options]
 * @returns {Boost}
 */
export function createBoost(scene, type = "Classic", options = {}) {
  const BoostCtor = BOOST_TYPES[type] || Boost;
  return new BoostCtor(scene, options);
}
