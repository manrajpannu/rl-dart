import { max } from "three/tsl";

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
    ball: {
        hitWindowDuration: 1.0,
        chaseTimeout: 2.0,
        scale: 1,
        timeout: false,
        randomizerPreset: 'default'
    },
    world: { gameSpeed: 1.0 }
}
