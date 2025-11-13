import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import {physics} from './physicsConfig.js'
import { CAR_MODELS } from './carModel.js';

function loadPreset(gui) {
        const presetString = localStorage.getItem('gui-preset');
        if (presetString) {
            const preset = JSON.parse(presetString);
            gui.load(preset);
        }
        console.log('Preset loaded from localStorage');
}


function youtuberMode(mode, ball, map, renderer)
{
    if (mode) {
        renderer.setClearColor(0x00ff00);
        ball.visible = false;
        map.visible = false;
    } else {
        renderer.setClearColor("darkgrey");
        ball.visible = true;
        map.visible = true;
    }

}


export function createUI(car, ball, map, renderer) {
    const gui = new GUI();

    // World Folder
    const worldFolder = gui.addFolder('World');
    worldFolder.add(physics.world, 'gameSpeed', 0, 1).name("Game Speed")
    worldFolder.add( { youtuberMode: false }, 'youtuberMode' ).name('Youtuber Mode').onChange( (mode) => {
        youtuberMode(mode, ball, map, renderer);
    } );

    // Car Folder
    const carFolder = gui.addFolder('Car');
    carFolder.add(car, 'airRollLeft').name('Air Roll Left');
    
    // Visuals Folder
    const visualsFolder = carFolder.addFolder('Visuals');
    visualsFolder.add( car, 'showLine').name('Show Forward Axis').onChange( () => car.updateVisibility());
    visualsFolder.add( car, 'showAxisOfRotationLine').name('Show Axis of Rotation');
    
        //  Helper Donut Folder
        const helperDonutFolder = visualsFolder.addFolder('Helper Donut');
        helperDonutFolder.add( car, 'showTorus').name('Show Helper Donut')
        helperDonutFolder.add( car, 'torusDrawOnTop').name('Always On Top').onChange((value) => car.setTorusDrawOnTop(value));
        helperDonutFolder.add( physics.car, 'torusBaseScale', 0, 2 ).name('Donut Scale');

    visualsFolder.add(physics.car, 'body', Object.keys(CAR_MODELS)).name('Car Body').onChange( (modelKey) => console.log(car.switchCarModel(modelKey)));
    
    // Physics Folder
    const physicsFolder = carFolder.addFolder('Physics');
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
    physicsFolder.close();

    // Ball Folder
    const ballFolder = gui.addFolder('Ball');
    ballFolder.add(physics.ball, 'randomizerPreset', ['default', 'vertical']).name("Randomizer Preset")
    ballFolder.add(physics.ball, 'scale', 0, 5).name('Ball Scale').onChange( (value) => ball.updateBallScale(value));
    ballFolder.add( physics.ball, 'hitWindowDuration', 0.1, 5 ).name('Hit Window Duration (s)');
    const timeOutFolder = ballFolder.addFolder('Timeout');
    timeOutFolder.add( physics.ball, 'timeout' ).name('Timeout');
    timeOutFolder.add( physics.ball, 'chaseTimeout', 0.1, 5 ).name('Chase Timeout (s)');


    // Camera Folder
    const camFolder = gui.addFolder('Camera');
    camFolder.add( car, 'ballCam').name('Ball Camera');
    camFolder.add( physics.camera, 'fov', 0, 180 ).name('Field of View').onChange(() => car.updateFov());
    camFolder.add( physics.camera, 'distance', 0, 10 ).name('Distance');
    camFolder.add( physics.camera, 'height', 0, 10 ).name('Height');
    camFolder.close();

    const presetControls = {
    savePreset: () => {
        const preset = gui.save();
        localStorage.setItem('gui-preset', JSON.stringify(preset));
        console.log('Preset saved to localStorage');
    },
    resetPreset: () => {gui.reset()
        localStorage.removeItem('gui-preset');
    }
    };

    gui.add(presetControls, 'savePreset').name("Save Parameters")
    gui.add(presetControls, 'resetPreset').name("Reset Parameters")

    window.onload = loadPreset(gui);

}
