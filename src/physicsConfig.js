import { max } from "three/tsl";

export const physics = {
    car: {
        body: 'octane',
        rotationSpeed: {
            x: 21.0,
            y: 21.0,
            z: 30.0
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

        torusBaseScale: 1.0,
    },
    camera: {
        fov: 75,
        distance: 6,
        height: 4,
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
