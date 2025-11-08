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
            this.model.position.set(0, -0.2, 0);
            this.model.rotation.set(0, Math.PI / 2, 0);
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
    Octane: {
        name: 'Octane',
        modelUrl: 'resources/models/octane/scene.gltf',
        scale: 0.012
    },
    Fennec: {
        name: 'Fennec',
        modelUrl: 'resources/models/fennec/scene.gltf',
        scale: 0.012
    }
};