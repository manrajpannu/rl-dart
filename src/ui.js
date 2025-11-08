import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import {physics} from './physicsConfig.js'


function loadPreset(gui) {
        const presetString = localStorage.getItem('gui-preset');
        if (presetString) {
            const preset = JSON.parse(presetString);
            gui.load(preset);
        }
        console.log('Preset loaded from localStorage');
}

export function createUI(car, ball) {
    const gui = new GUI();
    const worldFolder = gui.addFolder('World');
    worldFolder.add(physics.world, 'gameSpeed', 0, 1).name("Game Speed")

    const carFolder = gui.addFolder('Car');
    const visualsFolder = carFolder.addFolder('Visuals');
    const physicsFolder = carFolder.addFolder('Physics');

    visualsFolder.add( car, 'showLine').name('Show Forward Axis').onChange( () => {
        car.updateVisibility();
    }   );
    visualsFolder.add( car, 'showAxisOfRotationLine').name('Show Axis of Rotation');
    visualsFolder.add( car, 'showTorus').name('Show Helper Donut');

    physicsFolder.add( car, 'rotationPreset', [ 'default', 'snappy' ] ).name('Rotation Preset').onChange((preset) => {
        switch (preset) {
            case 'default':
                car.rotationSpeed = 21
                car.airDragCoefficient = 0.975
                break;
            case 'snappy':
                car.rotationSpeed = 100
                car.airDragCoefficient = 0.88
            default:
                break;
        }
    })
    physicsFolder.add( car, 'rotationSpeed', 0, 100).name('Rotation Speed')
    physicsFolder.add( car, 'airDragCoefficient', 0, 1).name('Air Drag Coefficient')
    physicsFolder.add( car, 'maxRotationSpeed', 0, 100).name('Max Rotation Speed')
    const ballFolder = gui.addFolder('Ball');
    ballFolder.add(physics.ball, 'randomizerPreset', ['default', 'vertical']).name("Randomizer Preset")
    ballFolder.add(physics.ball, 'scale', 0, 5).name('Ball Scale').onChange( (value) => {
        ball.updateBallScale(value);
    });
    ballFolder.add( physics.ball, 'hitWindowDuration', 0.1, 5 ).name('Hit Window Duration (s)');
    const timeOutFolder = ballFolder.addFolder('Timeout');
    timeOutFolder.add( physics.ball, 'timeout' ).name('Timeout');
    timeOutFolder.add( physics.ball, 'chaseTimeout', 0.1, 5 ).name('Chase Timeout (s)');

    const camFolder = gui.addFolder('Camera');

    camFolder.add( car, 'ballCam').name('Ball Camera');
    camFolder.add( physics.camera, 'fov', 0, 180 ).name('Field of View').onChange(() => car.updateFov());
    camFolder.add( physics.camera, 'distance', 0, 10 ).name('Distance');
    camFolder.add( physics.camera, 'height', 0, 10 ).name('Height');

    const presetControls = {
    savePreset: () => {
        const preset = gui.save();
        localStorage.setItem('gui-preset', JSON.stringify(preset));
        console.log('Preset saved to localStorage');
    },
    loadPreset: () => {
        const presetString = localStorage.getItem('gui-preset');
        if (presetString) {
            const preset = JSON.parse(presetString);
            gui.load(preset);
        }
        console.log('Preset loaded from localStorage');
    },
    resetPreset: () => {gui.reset()
        localStorage.removeItem('gui-preset');
    }
    };

    gui.add(presetControls, 'savePreset').name("Save Parameters")
    gui.add(presetControls, 'resetPreset').name("Reset Parameters")

    window.onload = loadPreset(gui);

}
