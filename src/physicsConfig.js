export const physics = {

    gravity: 650,
    friction: 0.5,
    airDensity: 1.225,
    dragCoefficient: 0.47,
    rollingResistance: 0.015,
    car: {
        body: 'octane',
        mass: 1500,
        maxSpeed: 2300,
        acceleration: 20,
        brakingForce: 50,
        acceleration: 20.0,
        rotationSpeed: 21.0,
        pitchRotationSpeed: 40.0,
        airDragCoefficient: 0.975,
        maxRotationSpeed: 10.0,
        maxRollSpeed: 10.0,
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
    world:{gameSpeed:1.0}


}
