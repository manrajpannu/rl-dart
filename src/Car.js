import * as THREE from 'three';
import { Octane } from './octane.js';
import { physics } from './physicsConfig.js';

export class Car extends THREE.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.octane = new Octane(scene);
    this.add(this.octane);
    this.velocity = new THREE.Vector3();
    this.rotationVelocity = new THREE.Vector3();
    this.ballCam = false;

    this.input = {
      forward: 0,
      backward: 0,
      left: 0,
      right: 0,
      pitchUp: 0,
      pitchDown: 0,
      rollLeft: 0,
      rollRight: 0,
    };

    this.rotationSpeed = physics.car.rotationSpeed;
    this.airDragCoefficient = physics.car.airDragCoefficient;
    this.maxRotationSpeed = physics.car.maxRotationSpeed;

    document.addEventListener("keydown", (e) => this.handleKey(e.code, true));
    document.addEventListener("keyup", (e) => this.handleKey(e.code, false));
  }

  handleKey(code, isDown) {
    switch (code) {
      case 'KeyW': this.input.pitchDown = isDown ? 1 : 0; break;
      case 'KeyS': this.input.pitchUp = isDown ? 1 : 0; break;
      case 'KeyA': this.input.left = isDown ? 1 : 0; break;
      case 'KeyD': this.input.right = isDown ? 1 : 0; break;
      case 'ArrowUp': this.input.forward = isDown ? 1 : 0; break;
      case 'ArrowDown': this.input.backward = isDown ? 1 : 0; break;
      case 'KeyQ': this.input.rollLeft = isDown ? 1 : 0; break;
      case 'KeyE': this.input.rollRight = isDown ? 1 : 0; break;
    }
  }

applyInputs(dt) {
    console.log(this.rotationVelocity)
  // --- TARGET INPUTS ---
  const yawInput   = this.input.right - this.input.left;         // + right, - left
  const pitchInput = this.input.pitchUp - this.input.pitchDown;  // + up, - down
  const rollInput  = this.input.rollRight - this.input.rollLeft; // + right, - left

  // --- Apply rotational acceleration ---
  this.rotationVelocity.x += pitchInput * this.rotationSpeed * dt; // Pitch
  this.rotationVelocity.y += yawInput   * this.rotationSpeed * dt; // Yaw
  this.rotationVelocity.z += rollInput  * this.rotationSpeed * dt; // Roll

  if (yawInput === 0 && pitchInput === 0 && rollInput === 0) {
    this.rotationVelocity.multiplyScalar(this.airDragCoefficient);
 }
  // --- Apply friction / drag ---

  // --- Clamp max rotation speed ---
  this.rotationVelocity.x = THREE.MathUtils.clamp(this.rotationVelocity.x, -this.maxRotationSpeed, this.maxRotationSpeed);
  this.rotationVelocity.y = THREE.MathUtils.clamp(this.rotationVelocity.y, -this.maxRotationSpeed, this.maxRotationSpeed);
  this.rotationVelocity.z = THREE.MathUtils.clamp(this.rotationVelocity.z, -this.maxRotationSpeed, this.maxRotationSpeed);

  // --- Apply rotations ---
  this.rotateX(this.rotationVelocity.x * dt); // pitch
  this.rotateY(-this.rotationVelocity.y * dt); // yaw (negative = intuitive right/left)
  this.rotateZ(-this.rotationVelocity.z * dt); // roll (negative = intuitive roll direction)
}

  update(dt) {
    this.position.addScaledVector(this.velocity, dt);
  }
}
