import { createShimmerHoverMaterial } from './shimmerHoverEffect.js';
import { createGlitterHoverMaterial } from './glitterHoverEffect.js';
import { createStrokeHoverMaterial } from './strokeHoverEffect.js';
import { createOuterGlowHoverMaterial } from './outerGlowHoverEffect.js';

export const HOVER_EFFECTS = {
    shimmer: createShimmerHoverMaterial,
    glitter: createGlitterHoverMaterial,
    stroke: createStrokeHoverMaterial,
    outerGlow: createOuterGlowHoverMaterial,
};
