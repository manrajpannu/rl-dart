import * as THREE from "three";
import { Octane } from "./octane.js";
import { physics } from "./physicsConfig.js";


const material = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});

export class Car extends THREE.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.octane = new Octane(scene);
    this.add(this.octane);
    this.velocity = new THREE.Vector3();
    this.rotationVelocity = new THREE.Vector3();
    this.ballCam = true;
    this.showLine = false;
    this.showAxisOfRotationLine = false;
    this.input = {
      forward: 0,
      backward: 0,
      left: 0,
      right: 0,
      pitchUp: 0,
      pitchDown: 0,
      rollLeft: 0,
      rollRight: 0,
      shiftHeld: false,
    };

    this.rotationSpeed = physics.car.rotationSpeed;
    this.airDragCoefficient = physics.car.airDragCoefficient;
    this.maxRotationSpeed = physics.car.maxRotationSpeed;
    this.maxRollSpeed = physics.car.maxRollSpeed;

    document.addEventListener("keydown", (e) => this.handleKey(e.code, true));
    document.addEventListener("keyup", (e) => this.handleKey(e.code, false));

    const start = new THREE.Vector3(0, 0, 0);
    const end = new THREE.Vector3(0, 0, -100);
    // const line = new THREE.Line3(start, end);
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    this.line = new THREE.Line(geometry, material);
    this.add(this.line);
    this.line.visible = this.showLine;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight
    );
    this.LookAt = new THREE.Vector3(0, 0, 0);
    camera.position.set(0, 3, 7);
    camera.lookAt(this.LookAt);

    this.camera = camera;

    this.Up = new THREE.Vector3(0, 1, 0);
    this.forward = new THREE.Vector3(0, 0, -1);
  }

handleKey(code, isDown) {
  switch (code) {
    case "ShiftLeft":
    case "ShiftRight":
      this.input.shiftHeld = isDown;
      if (this.input.aPressed) this._updateAD("KeyA");
      if (this.input.dPressed) this._updateAD("KeyD");
      break;

    case "KeyA":
      this.input.aPressed = isDown;
      this._updateAD("KeyA", isDown);
      break;

    case "KeyD":
      this.input.dPressed = isDown;
      this._updateAD("KeyD", isDown);
      break;

    case "KeyW":
      this.input.pitchDown = isDown ? 1 : 0;
      break;
    case "KeyS":
      this.input.pitchUp = isDown ? 1 : 0;
      break;
    case "ArrowUp":
      this.input.forward = isDown ? 1 : 0;
      break;
    case "ArrowDown":
      this.input.backward = isDown ? 1 : 0;
      break;
    case "KeyQ":
      this.input.rollLeft = isDown ? 1 : 0;
      break;
    case "KeyE":
      this.input.rollRight = isDown ? 1 : 0;
      break;
    case "Space":
      if (isDown) this.ballCam = !this.ballCam;
      break;
  }
}

// helper function
_updateAD(code, isDown = this.input[code === "KeyA" ? "aPressed" : "dPressed"]) {
  const shift = this.input.shiftHeld;
  if (code === "KeyA") {
    this.input.rollLeft = shift && isDown ? 1 : 0;
    this.input.left = !shift && isDown ? 1 : 0;
  } else if (code === "KeyD") {
    this.input.rollRight = shift && isDown ? 1 : 0;
    this.input.right = !shift && isDown ? 1 : 0;
  }
}

  applyInputs(dt) {

    const inputVec = new THREE.Vector3();
    inputVec.x = this.input.pitchUp - this.input.pitchDown; // + up, - down
    inputVec.y = this.input.right - this.input.left; // + right, - left
    inputVec.z = this.input.rollRight - this.input.rollLeft; // + right, - left

    if (inputVec.lengthSq() > 1) inputVec.normalize();

    this.rotationVelocity.x += inputVec.x * this.rotationSpeed * dt; // Pitch
    this.rotationVelocity.y += inputVec.y * this.rotationSpeed * dt; // Yaw
    this.rotationVelocity.z += inputVec.z * this.rotationSpeed * 1.15 * dt; // Roll

    const drag = new THREE.Vector3(this.airDragCoefficient, this.airDragCoefficient, this.airDragCoefficient);

    this.rotationVelocity.multiply(drag);
    if (this.rotationVelocity.lengthSq() < 1e-2) this.rotationVelocity.set(0, 0, 0);

    
    this.rotationVelocity.x = THREE.MathUtils.clamp(
      this.rotationVelocity.x,
      -this.maxRotationSpeed,
      this.maxRotationSpeed
    );
    this.rotationVelocity.y = THREE.MathUtils.clamp(
      this.rotationVelocity.y,
      -this.maxRotationSpeed,
      this.maxRotationSpeed
    );
    this.rotationVelocity.z = THREE.MathUtils.clamp(
      this.rotationVelocity.z,
      -this.maxRotationSpeed*1.2,
      this.maxRotationSpeed*1.2
    );
    console.log(this.rotationVelocity)
    if (this.showAxisOfRotationLine) {
      this.remove(this.rotationLine);
      const start = new THREE.Vector3(0, 0, 0);
      const geometry = new THREE.BufferGeometry().setFromPoints([start, this.rotationVelocity]);
      this.rotationLine = new THREE.Line(geometry, material);
      this.add(this.rotationLine);
    }
    this.rotateZ(-this.rotationVelocity.z * dt); // roll (
    this.rotateY(-this.rotationVelocity.y * dt); // yaw
    this.rotateX(this.rotationVelocity.x * dt); // pitch

    
  }

  update(dt) {
    this.position.addScaledVector(this.velocity, dt);
  }

  updateVisibility() {
    this.line.visible = this.showLine;
  }

  getForwardLine() {
    // Car’s world position
    const origin = new THREE.Vector3();
    this.getWorldPosition(origin);

    // Car’s forward direction (-Z in most models)
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(this.quaternion); // Rotate to match car orientation

    // Return as a ray
    return new THREE.Ray(origin, forward.normalize());
  }

  updateCamera(ballPosition, dt) {
    let forwardDir = new THREE.Vector3();
    let lookAt = new THREE.Vector3();

    if (this.ballCam) {
      forwardDir.subVectors(ballPosition, this.position);
      forwardDir.normalize();
      lookAt = ballPosition.clone();
    } else {
      forwardDir.copy(this.forward);
      forwardDir.applyQuaternion(this.quaternion);
      forwardDir.normalize();
      lookAt = this.position.clone().add(this.Up.clone().multiplyScalar(2));
    }

    let desiredCameraPos = this.position
      .clone()
      .sub(forwardDir.multiplyScalar(6))
      .add(this.Up.clone().multiplyScalar(4));

    this.camera.position.lerp(desiredCameraPos, dt);

    const smoothLookAt = new THREE.Vector3().lerpVectors(
      this.LookAt,
      lookAt,
      dt
    );
    this.camera.lookAt(smoothLookAt);
  }
}
