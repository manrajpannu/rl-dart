import * as THREE from 'three'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export class Octane extends THREE.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.modelUrl = 'resources/models/octane/scene.gltf';
    this.moveSpeed = 0.02;
    this.rotationSpeed = 1 / 1.5; // rps
    this.rollSpeed = 1 / 1.11;

    this.loader = new GLTFLoader();
    this.car = null;

    this.input = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      rollLeft: false,
      rollRight: false,
      accelerate: false,
    };

    // Load model
    this.loader.load(this.modelUrl, (gltf) => {
      this.car = gltf.scene;
      this.car.scale.set(0.012, 0.012, 0.012);
      this.car.position.set(0, -0.2, 0);
      this.car.rotation.set(0, Math.PI / 2, 0);
      this.add(this.car);
    });

 

    // document.addEventListener("mousedown", (e) => {
    //   if (e.button === 0) this.input.accelerate = true;
    // });
    // document.addEventListener("mouseup", (e) => {
    //   if (e.button === 0) this.input.accelerate = false;
    // });
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'w': this.input.forward = true; break;
      case 's': this.input.backward = true; break;
      case 'a': this.input.left = true; break;
      case 'd': this.input.right = true; break;
      case 'ArrowLeft': this.input.rollLeft = true; break;
      case 'ArrowRight': this.input.rollRight = true; break;
    }
  }

  onKeyUp(e) {
    switch (e.key) {
      case 'w': this.input.forward = false; break;
      case 's': this.input.backward = false; break;
      case 'a': this.input.left = false; break;
      case 'd': this.input.right = false; break;
      case 'ArrowLeft': this.input.rollLeft = false; break;
      case 'ArrowRight': this.input.rollRight = false; break;
    }
  }

  applyInputs(deltaTime) {
    if (!this.car) return;

    const deltaQuat = new THREE.Quaternion();
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);

    const rotationAmountInRadians = (rps) =>
      rps * 2 * Math.PI * deltaTime;

    // Pitch
    if (this.input.forward)
      deltaQuat.setFromAxisAngle(xAxis, -rotationAmountInRadians(this.rotationSpeed));
    if (this.input.backward)
      deltaQuat.setFromAxisAngle(xAxis, rotationAmountInRadians(this.rotationSpeed));

    // Yaw
    if (this.input.left)
      deltaQuat.setFromAxisAngle(yAxis, rotationAmountInRadians(this.rotationSpeed));
    if (this.input.right)
      deltaQuat.setFromAxisAngle(yAxis, -rotationAmountInRadians(this.rotationSpeed));

    // Roll
    if (this.input.rollLeft)
      deltaQuat.setFromAxisAngle(zAxis, rotationAmountInRadians(this.rollSpeed));
    if (this.input.rollRight)
      deltaQuat.setFromAxisAngle(zAxis, -rotationAmountInRadians(this.rollSpeed));

    this.pivot.quaternion.multiply(deltaQuat);

    // Move forward on accelerate (left mouse button)
    if (this.input.accelerate) {
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