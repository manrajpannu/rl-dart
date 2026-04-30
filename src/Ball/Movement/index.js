import { CoolMovement } from './CoolMovement.js';
import { CurvyMovement } from './CurvyMovement.js';
import { FlowMovement } from './FlowMovement.js';
import { NaturalMovement } from './NaturalMovement.js';
import { OrbitingMovement } from './OrbitingMovement.js';
import { ProceduralMovement } from './ProceduralMovement.js';
import { SinusoidalMovement } from './SinusoidalMovement.js';

export const MovementRegistry = {
    CoolMovement,
    CurvyMovement,
    FlowMovement,
    NaturalMovement,
    OrbitingMovement,
    ProceduralMovement,
    SinusoidalMovement,
    None: null
};

export {
    CoolMovement,
    CurvyMovement,
    FlowMovement,
    NaturalMovement,
    OrbitingMovement,
    ProceduralMovement,
    SinusoidalMovement
};
