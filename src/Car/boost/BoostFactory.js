import { Boost, BOOST_DEFAULTS } from "./Boost.js";
import { SpiralBoost } from "./SpiralBoost.js";
import { PulseBoost } from "./PulseBoost.js";
import { ShaderFireSmokeBoost } from "./ShaderFireSmokeBoost.js";
import { ShaderPlasmaBoost } from "./ShaderPlasmaBoost.js";
import { ShaderAuroraBoost } from "./ShaderAuroraBoost.js";

export const BOOST_TYPES = {
  Classic: Boost,
  Spiral: SpiralBoost,
  Pulse: PulseBoost,
  ShaderFireSmoke: ShaderFireSmokeBoost,
  ShaderPlasma: ShaderPlasmaBoost,
  ShaderAurora: ShaderAuroraBoost,
};

/**
 * @param {import('three').Object3D} scene
 * @param {keyof typeof BOOST_TYPES} type
 * @param {Partial<typeof BOOST_DEFAULTS>} [options]
 * @returns {Boost}
 */
export function createBoost(scene, type = "Spiral", options = {}) {
  const BoostCtor = BOOST_TYPES[type] || Boost;
  return new BoostCtor(scene, options);
}
