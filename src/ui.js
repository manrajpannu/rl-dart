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


function youtuberMode(mode, map, renderer)
{
    if (mode) {
        renderer.setClearColor(0x00ff00);
        map.visible = false;
    } else {
        renderer.setClearColor("darkgrey");
        map.visible = true;
    }

}


export function createUI(car, ball, map, renderer) {
    const gui = new GUI();

    // World Folder
    const worldFolder = gui.addFolder('World');
    worldFolder.add(physics.world, 'gameSpeed', 0, 1).name("Game Speed");
    worldFolder.add({ youtuberMode: false }, 'youtuberMode').name('Youtuber Mode').onChange((mode) => {
        youtuberMode(mode, map, renderer);
    });

    // Controller Folder
    const controllerFolder = gui.addFolder('Controller');
    // Deadzone Canvas Toggle
   
    controllerFolder.add(car, 'airRollLeftButton', { 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LB': 4, 'RB': 5, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Air Roll Left Button');
    controllerFolder.add(car, 'airRollRightButton', { 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LB': 4, 'RB': 5, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Air Roll Right Button');
    controllerFolder.add(car, 'airRollFreeButton', { 'LB': 4, 'RB': 5, 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Free Air Roll Button');
    const deadzoneCanvas = document.getElementById('deadzone');
    deadzoneCanvas.style.display = 'none';
    const deadzoneState = { showDeadzone: false };
    controllerFolder.add(deadzoneState, 'showDeadzone').name('Show Deadzone').onChange((show) => {
        deadzoneCanvas.style.display = show ? 'block' : 'none';
    });
    controllerFolder.add(car, 'controllerDeadzone', 0, 1).name('Deadzone Size');
    controllerFolder.add(car, 'controllerDeadzoneType', ['cross', 'square', 'circle']).name('Deadzone Type');
    controllerFolder.add(car, 'controllerSensitivity', 0.1, 5).name('Sensitivity');


    // Car Folder
    const carFolder = gui.addFolder('Car');

    carFolder.add(physics.car, 'body', Object.keys(CAR_MODELS)).name('Car Body').onChange( (modelKey) => console.log(car.switchCarModel(modelKey)));
    // Visuals Folder
    const visualsFolder = carFolder.addFolder('Visuals');
    visualsFolder.add( car, 'showLine').name('Show Forward Axis').onChange( () => car.updateVisibility());
    visualsFolder.add( car, 'showAxisOfRotationLine').name('Show Axis of Rotation');
    
        //  Helper Donut Folder
        const helperDonutFolder = visualsFolder.addFolder('Helper Donut');
        helperDonutFolder.add( car, 'showTorus').name('Show Helper Donut')
        helperDonutFolder.add( car, 'torusDrawOnTop').name('Always On Top').onChange((value) => car.setTorusDrawOnTop(value));
        helperDonutFolder.add( physics.car, 'torusBaseScale', 0, 2 ).name('Donut Scale');

        // Color picker for helper donut
        const donutColorObj = { color: '#ff00ff' };
        helperDonutFolder.addColor(donutColorObj, 'color').name('Donut Color').onChange((value) => {
            if (car._torusMaterial) {
                car._torusMaterial.color.set(value);
            }
        });

    
    // Physics Folder
    const physicsFolder = carFolder.addFolder('Physics');

    // Pitch subfolder
    const pitchFolder = physicsFolder.addFolder('Pitch');
    pitchFolder.add(car.rotationSpeed, 'x', 0, 100).name('Pitch Rotation Speed');
    pitchFolder.add(car.airDragCoefficient, 'x', 0.95, 1).name('Pitch Drag');
    pitchFolder.add(car.maxRotationSpeed, 'x', 0, 100).name('Pitch Max Speed');

    // Yaw subfolder
    const yawFolder = physicsFolder.addFolder('Yaw');
    yawFolder.add(car.rotationSpeed, 'y', 0, 100).name('Yaw Rotation Speed');
    yawFolder.add(car.airDragCoefficient, 'y', 0.95, 1).name('Yaw Drag');
    yawFolder.add(car.maxRotationSpeed, 'y', 0, 100).name('Yaw Max Speed');

    // Roll subfolder
    const rollFolder = physicsFolder.addFolder('Roll');
    rollFolder.add(car.rotationSpeed, 'z', 0, 100).name('Roll Rotation Speed');
    rollFolder.add(car.airDragCoefficient, 'z', 0.95, 1).name('Roll Drag');
    rollFolder.add(car.maxRotationSpeed, 'z', 0, 100).name('Roll Max Speed');

    physicsFolder.close();


    // Ball Folder
    const ballFolder = gui.addFolder('Ball');

    // Show/Hide Ball button
    const ballVisibility = { visible: true };
    ballFolder.add(ballVisibility, 'visible').name('Show Ball').onChange((v) => {
        ball.visible = v;
    });

    
    ballFolder.add(physics.ball, 'randomizerPreset', ['default', 'vertical']).name("Randomizer Preset")
    ballFolder.add(physics.ball, 'scale', 0, 5).name('Ball Scale').onChange( (value) => ball.updateBallScale(value));
    ballFolder.add( physics.ball, 'hitWindowDuration', 0.01, 5 ).name('Hit Window Duration (s)');
    // Movement subfolder
    const movementFolder = ballFolder.addFolder('Movement');
    // Button for random movement
    movementFolder.add(ball, '_randomMoveEnabled').name('Random Ball Movement');
    // Slider for flowySpeed
    movementFolder.add(ball, 'flowySpeed', 0.1, 10).name('Flowy Speed');
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
