import { max } from "three/tsl";

/**
 * Central gameplay tuning values.
 *
 * Domains:
 * - car: rotational response, damping, and helper visuals
 * - camera: chase camera framing and FOV
 * - ball: trainer targeting/chase behavior toggles
 * - world: global simulation speed multiplier
 */
export const physics = {
    car: {
        body: 'fennec',
        rotationSpeed: {
            x: 19.0,
            y: 19.0,
            z: 32.0
        },
        airDragCoefficient: {
            x: 0.975,
            y: 0.975,
            z: 0.962
        },
        maxRotationSpeed: {
            x: 5.55,
            y: 5.55,
            z: 5.55
        },
        rampSpeed: {
            x: 2.0,
            y: 2.0,
            z: 50.0
        },

        torusBaseScale: 1.0,
    },
    camera: {
        fov: 90,
        distance: 3.8,
        height: 2.0,
    },
    world: { gameSpeed: 1.0 }
}
