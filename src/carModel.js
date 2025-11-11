import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class CarModel extends THREE.Group {
    constructor(scene, modelConfig) {
        super();
        this.scene = scene;
        this.modelUrl = modelConfig.modelUrl;
        this.model = null;
        this.loader = new GLTFLoader();

        this.loader.load(this.modelUrl, (gltf) => {
            this.model = gltf.scene;
            this.model.scale.set(modelConfig.scale, modelConfig.scale, modelConfig.scale);
            this.model.position.set(modelConfig.position.x, modelConfig.position.y, modelConfig.position.z);
            this.model.rotation.set(modelConfig.rotation.x, modelConfig.rotation.y, modelConfig.rotation.z);
            this.add(this.model);
        });
    }

    setVisible(visible) {
        if (this.model) {
            this.model.visible = visible;
        }
    }
}

export const CAR_MODELS = {
    octane: {
        name: 'octane',
        modelUrl: `${import.meta.env.BASE_URL}/models/octane/scene.gltf`,
        scale: 0.012,
        position: { x: 0, y: -0.2, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    },
    fennec: {
        name: 'fennec',
        modelUrl: `${import.meta.env.BASE_URL}/models/fennec/scene.gltf`,
        scale: 0.012,
        position: { x: 0, y: -0.2, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    },
    dominus: {
        name: 'dominus',
        modelUrl: `${import.meta.env.BASE_URL}/models/dominus/scene.gltf`,
        scale: 0.012,
        position: { x: 0, y: -0.2, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    },
    lambo: {
        name: 'lambo',
        modelUrl: `${import.meta.env.BASE_URL}/models/lambo/scene.gltf`,
        scale: 0.15,
        position: { x: 0.28, y: 0.03, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    }
};