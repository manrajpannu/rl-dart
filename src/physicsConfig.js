export const physics = {
    car: {
        body: 'octane',
        rotationSpeed: 21.0,
        airDragCoefficient: 0.975,
        airRollRotationSpeed: 30,
        airRollDragCoefficient: 0.962,
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
