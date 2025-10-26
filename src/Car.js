import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Car {


  constructor(scene, modelUrl) {
    this.scene = scene;
    this.modelUrl = modelUrl;
    this.moveSpeed = 0.02;
    this.rotationSpeed = 1 / 1.5; // rotations per second
    this.rollSpeed = 1 / 1.11;

    this.loader = new GLTFLoader();
    this.pivot = new THREE.Object3D();
    this.scene.add(this.pivot);

    this.car = null;

    this.loader.load(this.modelUrl, (gltf) => {
      this.car = gltf.scene;
      this.car.scale.set(0.012, 0.012, 0.012);
      this.car.position.set(0, -0.2, 0);
      this.car.rotation.set(0, Math.PI / 2, 0);
      this.pivot.add(this.car);
    });
  }

  update(deltaTime, keys, mouseButtons) {
    if (!this.car) return;

    const deltaQuat = new THREE.Quaternion();
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);

    const rotationAmountInRadians = (rps) =>
      rps * 2 * Math.PI * deltaTime;

    // Pitch
    if (keys.w) deltaQuat.setFromAxisAngle(xAxis, -rotationAmountInRadians(this.rotationSpeed));
    if (keys.s) deltaQuat.setFromAxisAngle(xAxis, rotationAmountInRadians(this.rotationSpeed));

    // Yaw
    if (keys.a) deltaQuat.setFromAxisAngle(yAxis, rotationAmountInRadians(this.rotationSpeed));
    if (keys.d) deltaQuat.setFromAxisAngle(yAxis, -rotationAmountInRadians(this.rotationSpeed));

    // Roll
    if (keys.ArrowLeft) deltaQuat.setFromAxisAngle(zAxis, rotationAmountInRadians(this.rollSpeed));
    if (keys.ArrowRight) deltaQuat.setFromAxisAngle(zAxis, -rotationAmountInRadians(this.rollSpeed));

    this.pivot.quaternion.multiply(deltaQuat);

    // Move forward on left-click
    if (mouseButtons.left) {
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.pivot.quaternion);
      this.pivot.position.addScaledVector(forward, this.moveSpeed);
    }
  }

  getPosition() {
    return this.pivot.position.clone();
  }

  getForward() {
    return new THREE.Vector3(0, 0, -1).applyQuaternion(this.pivot.quaternion);
  }

  getUp() {
    return new THREE.Vector3(0, 1, 0).applyQuaternion(this.pivot.quaternion);
  }
}
