import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import {physics} from './physicsConfig.js'


export function createUI(car, ball) {
    const gui = new GUI();
    const worldFolder = gui.addFolder('World');
    worldFolder.add(physics.world, 'gameSpeed', 0, 1)

    const carFolder = gui.addFolder('Car');
    gui.add( {rotationPreset:''}, 'rotationPreset', [ 'default', 'snappy' ] ).name('Rotation Preset').onChange((preset) => {
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
    carFolder.add( car, 'rotationSpeed', 0, 100).name('Rotation Speed')
    carFolder.add( car, 'airDragCoefficient', 0, 1).name('Air Drag Coefficient')
    carFolder.add( car, 'maxRotationSpeed', 0, 100).name('Max Rotation Speed')
    carFolder.add( car, 'ballCam').name('Ball Camera');
    carFolder.add( car, 'showLine').name('Show Car Z Axis Line').onChange( () => {
        car.updateVisibility();
    }   );
    carFolder.add( car, 'showAxisOfRotationLine').name('Show Car Rotation Axis Line');
    const ballFolder = gui.addFolder('Ball');
    ballFolder.add( physics.ball, 'timeLimit', 0.1, 5 ).name('Ball Time Limit (s)');
    ballFolder.add(physics.ball, 'scale', 0, 5).name('Ball Scale').onChange( (value) => {
        ball.updateBallScale(value);
    });


}
