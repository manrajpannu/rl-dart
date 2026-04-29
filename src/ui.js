import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import {physics} from './physicsConfig.js'
import { CAR_MODELS } from './Car/CarModel.js';
import { Car } from './Car/Car';
import { Ball } from './Ball/Ball.js';
import { BOOST_TYPES } from './Car/boost/BoostFactory.js';

/**
 * Restores previously saved GUI preset (if present) from localStorage.
 * @param {GUI} gui
 */
function loadPreset(gui) {
        const presetString = localStorage.getItem('gui-preset');
        if (presetString) {
            const preset = JSON.parse(presetString);
            gui.load(preset);
        }
        console.log('Preset loaded from localStorage');
}



/**
 * Builds the runtime tweak panel for world, controller, car, boost, and camera.
 *
 * @param {Car} car
 * @param {import('./Controller').Controller} controller
 * @param {Ball | undefined} ball
 * @param {import('./Map').Map} map
 * @param {import('three').WebGLRenderer} renderer
 * @param {import('./Engine').Engine} [engine]
 */
export function createUI(car, controller,  ball, map, renderer, engine) {

    const gui = new GUI();

    // World Folder
    // const worldFolder = gui.addFolder('World');
    // worldFolder.add(physics.world, 'gameSpeed', 0, 1).name("Game Speed");
    // worldFolder.add({ youtuberMode: false }, 'youtuberMode').name('Youtuber Mode').onChange((mode) => {
    //     youtuberMode(mode, map, renderer);
    // });

    // Controller Folder
    // const controllerFolder = gui.addFolder('Controller');
    // Deadzone Canvas Toggle
   
    // controllerFolder.add(controller, 'airRollLeftButton', { 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LB': 4, 'RB': 5, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Air Roll Left Button');
    // controllerFolder.add(controller, 'airRollRightButton', { 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LB': 4, 'RB': 5, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Air Roll Right Button');
    // controllerFolder.add(controller, 'airRollFreeButton', { 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LB': 4, 'RB': 5, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Free Air Roll Button');
    // controllerFolder.add(controller, 'boostButton', { 'LB': 4, 'RB': 5, 'A': 0, 'B': 1, 'X': 2, 'Y': 3, 'LT': 6, 'RT': 7, 'Back': 8, 'Start': 9, 'LStick': 10, 'RStick': 11, 'DPadUp': 12, 'DPadDown': 13, 'DPadLeft': 14, 'DPadRight': 15 }).name('Boost Button');
    // const deadzoneCanvas = document.getElementById('deadzone');
    // deadzoneCanvas.style.display = 'none';
    // const deadzoneState = { showDeadzone: false };
    // controllerFolder.add(deadzoneState, 'showDeadzone').name('Show Deadzone').onChange((show) => {
    //     deadzoneCanvas.style.display = show ? 'block' : 'none';
    // });
    // controllerFolder.add(controller, 'controllerDeadzone', 0, 1).name('Deadzone Size');
    // controllerFolder.add(controller, 'controllerDeadzoneType', ['cross', 'square', 'circle']).name('Deadzone Type');
    // controllerFolder.add(controller, 'controllerSensitivity', 0.1, 5).name('Sensitivity');


    // // Car Folder
    // const carFolder = gui.addFolder('Car');

    // carFolder.add(physics.car, 'body', Object.keys(CAR_MODELS)).name('Car Body').onChange( (modelKey) => console.log(car.changeCarModel(modelKey)));
    // carFolder.add(car, 'boostType', Object.keys(BOOST_TYPES)).name('Boost Type').onChange((type) => {
    //     car.setBoostType(type);
    // });
    // Visuals Folder
    // const visualsFolder = carFolder.addFolder('Visuals');
    // visualsFolder.add( car, 'showLine').name('Show Forward Axis').onChange( () => car.updateVisibility());
    // visualsFolder.add( car, 'showAxisOfRotationLine').name('Show Axis of Rotation');

        // const boostFolder = visualsFolder.addFolder('Boost');
        // boostFolder.add( car.Boost, 'boostGap', 0, 0.3).name('Gap')
        // boostFolder.add( car.Boost, 'particlesPerSecond', 0, 300).name('Amount/s')
        // boostFolder.add( car.Boost, 'particleSpread', 0, 1).name('Spread')
        // boostFolder.add( car.Boost, 'particleRandomness', 0, 3).name('Randomness')

        // const fadeFolder = boostFolder.addFolder('Fade');
        // fadeFolder.add( car.Boost, 'particleFadeInFactor', 0,8).name('Fade In Factor')
        // fadeFolder.add( car.Boost, 'particleFadeInTime', 0, 3).name('Fade In Time')
        // fadeFolder.add( car.Boost, 'particleFadeOutFactor', 0,8).name('Fade Out Factor')
        // fadeFolder.add( car.Boost, 'particleFadeOutTime', 0, 3).name('Fade Out Time')

        // boostFolder.add( car.Boost, 'particleMaxScale', 0.1, 5).name('Max Particle Scale')
        // boostFolder.add( car.Boost, 'particleScaleFactor', 0.1, 5).name('Particle Scale Factor')

        // const boostColorObj = { color: '#ededed' };
        // boostFolder.addColor(boostColorObj, 'color').name('Boost Color').onChange((value) => {
        //     if (typeof value === 'string') {
        //         car.Boost.boostColour = parseInt(value.replace('#', '0x'), 16);
        //     } else {
        //         car.Boost.boostColour = value;
        //     }
        // });

        //  Helper Donut Folder
        // const helperDonutFolder = visualsFolder.addFolder('Helper Donut');
        // helperDonutFolder.add( car, 'showTorus').name('Show Helper Donut')
        // helperDonutFolder.add( car, 'torusDrawOnTop').name('Always On Top').onChange((value) => car.setTorusDrawOnTop(value));
        // helperDonutFolder.add( physics.car, 'torusBaseScale', 0, 2 ).name('Donut Scale');

        // Color picker for helper donut
        // const donutColorObj = { color: '#ff00ff' };
        // helperDonutFolder.addColor(donutColorObj, 'color').name('Donut Color').onChange((value) => {
        //     if (car._torusMaterial) {
        //         car._torusMaterial.color.set(value);
        //     }
        // });


    
    // Physics Folder
    // const physicsFolder = carFolder.addFolder('Physics');

    // // Pitch subfolder
    // const pitchFolder = physicsFolder.addFolder('Pitch');
    // pitchFolder.add(car.rotationSpeed, 'x', 0, 100).name('Pitch Rotation Speed');
    // pitchFolder.add(car.airDragCoefficient, 'x', 0.95, 1).name('Pitch Drag');
    // pitchFolder.add(car.maxRotationSpeed, 'x', 0, 100).name('Pitch Max Speed');

    // // Yaw subfolder
    // const yawFolder = physicsFolder.addFolder('Yaw');
    // yawFolder.add(car.rotationSpeed, 'y', 0, 100).name('Yaw Rotation Speed');
    // yawFolder.add(car.airDragCoefficient, 'y', 0.95, 1).name('Yaw Drag');
    // yawFolder.add(car.maxRotationSpeed, 'y', 0, 100).name('Yaw Max Speed');

    // // Roll subfolder
    // const rollFolder = physicsFolder.addFolder('Roll');
    // rollFolder.add(car.rotationSpeed, 'z', 0, 100).name('Roll Rotation Speed');
    // rollFolder.add(car.airDragCoefficient, 'z', 0.95, 1).name('Roll Drag');
    // rollFolder.add(car.maxRotationSpeed, 'z', 0, 100).name('Roll Max Speed');

    // physicsFolder.close();


    // Ball Folder
    const ballFolder = gui.addFolder('Ball');

    // // Show/Hide Ball button
    // const ballVisibility = { visible: true };
    // ballFolder.add(ballVisibility, 'visible').name('Show Ball').onChange((v) => {
    //     ball.visible = v;
    // });

    
    // ballFolder.add(physics.ball, 'randomizerPreset', ['default', 'vertical']).name("Randomizer Preset")
    // ballFolder.add(physics.ball, 'scale', 0, 5).name('Ball Scale').onChange( (value) => ball.setRadius(value));
    // ballFolder.add( ball, 'maxHealth', 1, 10, 1 ).name('Health');
    // // Movement subfolder
    // const movementFolder = ballFolder.addFolder('Movement');
    // // Button for random movement
    // movementFolder.add(ball, '_randomMoveEnabled').name('Random Ball Movement');
    // // Slider for flowySpeed
    // movementFolder.add(ball, 'flowySpeed', 0.1, 10).name('Flowy Speed');
    // const timeOutFolder = ballFolder.addFolder('Timeout');
    // timeOutFolder.add( physics.ball, 'timeout' ).name('Timeout');
    // timeOutFolder.add( physics.ball, 'chaseTimeout', 0.1, 5 ).name('Chase Timeout (s)');


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
