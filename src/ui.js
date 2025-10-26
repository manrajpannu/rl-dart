import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import {physics} from './physicsConfig.js'

export function createUI(car) {
    const gui = new GUI();
    gui.add( car, 'rotationSpeed', 0, 1000)
    gui.add( car, 'airDragCoefficient', 0, 1)
    gui.add( car, 'maxRotationSpeed', 0, 10)



}
