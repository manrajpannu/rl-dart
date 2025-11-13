import * as THREE from "three";
import { CarModel, CAR_MODELS } from "./carModel.js";
import { physics } from "./physicsConfig.js";
import { degToRad } from "three/src/math/MathUtils.js";

// Deadzone helper
const crossDeadzone = (value, deadzone = 0.10) => {
  return Math.abs(value) < deadzone ? 0 : value;
};

const circleDeadzone = (x, y, deadzone = 0.10) => {
  return Math.hypot(x, y) < deadzone ? (0, 0) : (x, y);
};

function circleToSquare(x, y) {
  const x2 = x * Math.sqrt(1 - (y * y) / 2);
  const y2 = y * Math.sqrt(1 - (x * x) / 2);
  return { x: x2, y: y2 };
}

function  weightedLerp(current, target, weights, dt) {
  const tX = 1.0 - Math.exp(-weights.x * dt);
  const tY = 1.0 - Math.exp(-weights.y * dt);
  const tZ = 1.0 - Math.exp(-weights.z * dt);

  current.x = THREE.MathUtils.lerp(current.x, target.x, tX);
  current.y = THREE.MathUtils.lerp(current.y, target.y, tY);
  current.z = THREE.MathUtils.lerp(current.z, target.z, tZ);
  }

export class Car extends THREE.Group {
  constructor(scene) {
    super();
    this.scene = scene;

    // Car 
    this.carModels = new Map();
    this.currentModel = null;
    this.loadCarModel(CAR_MODELS[physics.car.body]);
    this.ballCam = true;
    this.Up = new THREE.Vector3(0, 1, 0);
    this.forward = new THREE.Vector3(0, 0, -1);
    
    // Visuals
    this.showLine = false;
    this.showAxisOfRotationLine = true;
    this.showTorus = true;

    // Physics
    this.rotationPreset = 'default';
    this.rotationSpeed = physics.car.rotationSpeed;
    this.rotationVelocity = new THREE.Vector3();
    this.airDragCoefficient = physics.car.airDragCoefficient;
    this.maxRotationSpeed = physics.car.maxRotationSpeed;

    // change
    this.airRollLeft = true;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(physics.camera.fov, window.innerWidth / window.innerHeight);
    this.LookAt = new THREE.Vector3(0, 0, 0);
    camera.position.set(0, 3, 7);
    camera.lookAt(this.LookAt);
    this.camera = camera;
    
    // Forward Arrow
    this.forwardArrow  = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0),  2, "red", 0.1, 0.1);
    this.add(this.forwardArrow);
    this.forwardArrow.visible = this.showLine;
    
    // Rotation Line
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
    this._rotationLine = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 'blue' }));
    this._rotationLine.visible = false;
    this.add(this._rotationLine);

    // Helper Donut
    this._torusGeometry = new THREE.TorusGeometry(0.6, 0.02, 32, 32);
    this._torusMaterial = new THREE.MeshBasicMaterial({ color: 'magenta'});
    this.torus = new THREE.Mesh(this._torusGeometry, this._torusMaterial);
    this.torus.visible = false;
    this.torus.rotation.x = degToRad(90);
    this.torusDrawOnTop = false;
    this.add(this.torus);

    
    this.input = {
      yawLeft: 0,
      yawRight: 0,
      pitchUp: 0,
      pitchDown: 0,
      rollLeft: 0,
      rollRight: 0,
      shiftHeld: false,
    };

    // Controller state
    this.controllerDeadzone = 0.10;
    this.controllerDeadzoneType = 'cross'; 
    this.controllerSensitivity = 1.0;
    this.gamepadIndex = null;
    window.addEventListener('gamepadconnected', (e) => this.gamepadIndex = e.gamepad.index);
    window.addEventListener('gamepaddisconnected', (e) => {if (this.gamepadIndex === e.gamepad.index) this.gamepadIndex = null});

    // Keyboard input
    document.addEventListener("keydown", (e) => this.handleKey(e.code, true));
    document.addEventListener("keyup", (e) => this.handleKey(e.code, false));
  }

  setTorusDrawOnTop(enable) {
    if (!this.torus) return;
    this._torusDrawOnTop = Boolean(enable);
    this.torus.renderOrder = this._torusDrawOnTop ? 1000 : 0;
    const mat = this.torus.material;
    if (mat) {  
      mat.depthTest = !this._torusDrawOnTop;
      mat.depthWrite = !this._torusDrawOnTop;
      mat.needsUpdate = true;
    }
  }

  handleKey(code, isDown) {
    switch (code) {
      case "KeyA":
        this.input.yawRight = isDown ? 1 : 0;
        break;
      case "KeyD":
        this.input.yawLeft = isDown ? 1 : 0;
        break;
      case "KeyW":
        this.input.pitchDown = isDown ? 1 : 0;
        break;
      case "KeyS":
        this.input.pitchUp = isDown ? 1 : 0;
        break;
      case "ArrowUp":
        this.input.pitchDown = isDown ? 1 : 0;
        break;
      case "ArrowDown":
        this.input.pitchUp = isDown ? 1 : 0;
        break;
      case "KeyQ":
        this.input.rollLeft = isDown ? 1 : 0;
        break;
      case "KeyE":
        this.input.rollRight = isDown ? 1 : 0;
        break;
      case "ArrowLeft":
        this.input.rollLeft = isDown ? 1 : 0;
        break;
      case "ArrowRight":
        this.input.rollRight = isDown ? 1 : 0;
        break
      case "Space":
        if (isDown) this.ballCam = !this.ballCam;
        break;
    }

    
 
  }

  handleController() {
    let yaw = 0, pitch = 0, roll = 0;

    if (this.gamepadIndex !== null) {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[this.gamepadIndex];
      if (gp && gp.connected) {

        let x, y;
        switch (this.controllerDeadzoneType) {
          case 'circle':
            ({x, y} = circleDeadzone(gp.axes[0], gp.axes[1], this.controllerDeadzone));
            break;
          case 'cross':
            x = crossDeadzone(gp.axes[0], this.controllerDeadzone);
            y = crossDeadzone(gp.axes[1], this.controllerDeadzone);

            break;
          case 'square':
            ({x, y} = circleToSquare(gp.axes[0], gp.axes[1], this.controllerDeadzone));
            x = crossDeadzone(x, this.controllerDeadzone);
            y = crossDeadzone(y, this.controllerDeadzone);
            break;     
          default:
            break;
        }
        
      yaw = -THREE.MathUtils.clamp(x*this.controllerSensitivity, -1, 1);
      pitch = THREE.MathUtils.clamp(y*this.controllerSensitivity, -1, 1);
      
      // Button indices: LB=4, RB=5, X=2, Y=3, A=0, B=1
      // fix this later
      if (
        gp.buttons[4]?.pressed ||
        gp.buttons[5]?.pressed ||
        gp.buttons[0]?.pressed ||
        gp.buttons[1]?.pressed ||
        gp.buttons[2]?.pressed ||
        gp.buttons[3]?.pressed
      ) {
        roll = this.airRollLeft ? -1 : 1;
      }
      }
    }

    return {controller_yaw: yaw, controller_pitch: pitch, controller_roll: roll};
  }
 
  applyInputs(dt) {

    let { controller_yaw, controller_pitch, controller_roll } = this.handleController();

    const inputVec = new THREE.Vector3();
    inputVec.x = (this.input.pitchUp - this.input.pitchDown) || controller_pitch;      // Pitch
    inputVec.y = (this.input.yawRight - this.input.yawLeft) || controller_yaw;         // Yaw
    inputVec.z = (this.input.rollRight - this.input.rollLeft) || controller_roll;      // Roll

    console.log(inputVec);

    if (inputVec.lengthSq() > 1) inputVec.normalize();

    // Update rotational velocity
    this.rotationVelocity.x += inputVec.x * this.rotationSpeed * dt;
    this.rotationVelocity.y += inputVec.y * this.rotationSpeed * dt;
    this.rotationVelocity.z += inputVec.z * this.rotationSpeed * 1.15 * dt;

    // Apply drag
    const drag = new THREE.Vector3(this.airDragCoefficient, this.airDragCoefficient, this.airDragCoefficient);
    this.rotationVelocity.multiply(drag);

    if (this.rotationVelocity.lengthSq() < 1e-3)
      this.rotationVelocity.set(0, 0, 0);

    // Clamp
    this.rotationVelocity.x = THREE.MathUtils.clamp(this.rotationVelocity.x, -this.maxRotationSpeed, this.maxRotationSpeed);
    this.rotationVelocity.y = THREE.MathUtils.clamp(this.rotationVelocity.y, -this.maxRotationSpeed, this.maxRotationSpeed);
    this.rotationVelocity.z = THREE.MathUtils.clamp(this.rotationVelocity.z, -this.maxRotationSpeed * 1.2, this.maxRotationSpeed * 1.2);

    const rotMat = new THREE.Matrix4();

    const q = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        this.rotationVelocity.x * dt,
        this.rotationVelocity.y * dt,
        -this.rotationVelocity.z * dt
      ));

    rotMat.makeRotationFromQuaternion(q);

    // --- Apply rotation matrix to model ---
    this.matrix.multiply(rotMat);
    this.matrix.decompose(this.position, this.quaternion, this.scale);

    const axis = this.findAxisOfRotation(rotMat);
    this.showAxisOfRotation(axis)
  }

  findAxisOfRotation(rotMat) {
    // --- Extract axis of rotation (eigenvector for λ = 1) ---
    const axis = new THREE.Vector3();
    const m3 = new THREE.Matrix3().setFromMatrix4(rotMat);
    const trace = m3.elements[0] + m3.elements[4] + m3.elements[8];
    const angle = Math.acos(Math.min(Math.max((trace - 1) / 2, -1), 1));

    if (angle > 1e-6) {
      axis.set(
        m3.elements[7] - m3.elements[5],
        m3.elements[2] - m3.elements[6],
        m3.elements[3] - m3.elements[1]
      );
      axis.normalize();

      if (axis.z > 0) axis.negate();
    } else {
      axis.set(0, 0, 1);
    }
    return axis
  }

  showAxisOfRotation(axis) {
    // --- Show the axis of rotation ---
    if (this._rotationLine) {
      const positions = this._rotationLine.geometry.attributes.position.array;
      // Start point
      positions[0] = 0;
      positions[1] = 0;
      positions[2] = 0;
      // End point
      const end = axis.multiplyScalar(2);
      positions[3] = end.x;
      positions[4] = end.y;
      positions[5] = end.z;
      
      this._rotationLine.geometry.attributes.position.needsUpdate = true;
      this._rotationLine.visible = this.showAxisOfRotationLine;
      if (this.showTorus) {
        const axisDir = axis.normalize();
        const alignment = Math.abs(this.forward.dot(axisDir));
        const radius = Math.sqrt(1 - alignment * alignment);
        this.createHelperTorus(axisDir, radius*1.5*physics.car.torusBaseScale);
      } else {
        this.torus.visible = false;
        this.torus.scale.setScalar(0);
      }
    }
    if (!this.showAxisOfRotationLine && this._rotationLine) this._rotationLine.visible = false;
  }

  createHelperTorus(axis, scale) {
    if (!this.torus) return;
    const axisDir = axis.clone().normalize();

    const center = axisDir.clone().multiplyScalar(0.9-scale*0.2); // when no dar is applied, the torus is further up, when you are applying full dar then torus is back
    const torusUp = new THREE.Vector3(0, 0, 1);
    const torusQuat = new THREE.Quaternion();

    if (torusUp.dot(axisDir) > 0.9999) {
      torusQuat.identity();
    } else if (torusUp.dot(axisDir) < -0.9999) {
      torusQuat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
    } else {
      torusQuat.setFromUnitVectors(torusUp, axisDir);
    }
    this.torus.position.copy(center);
    this.torus.quaternion.copy(torusQuat);

    if (typeof scale === 'number' && isFinite(scale)) {
      this.torus.scale.setScalar(Math.max(0.01, scale));
    }

    this.torus.visible = this.showTorus;
  }

  updateVisibility() {
    this.forwardArrow.visible = this.showLine;
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

  updateFov() {
    this.camera.fov = physics.camera.fov
    this.camera.updateProjectionMatrix();
  }

  updateCamera(ballPosition, dt) {
    let forwardDir = new THREE.Vector3();
    let lookAt = new THREE.Vector3();
    let weights = new THREE.Vector3(0, 0, 0);

    if (this.ballCam) {
      forwardDir.subVectors(ballPosition, this.position);
      forwardDir.normalize();
      lookAt = ballPosition.clone();
    } else {
      weights = new THREE.Vector3(0.5, 0.2, 0.5);
      
      forwardDir.copy(this.forward);
      forwardDir.applyQuaternion(this.quaternion);
      forwardDir.normalize();
      lookAt = this.position.clone().add(this.Up.clone().multiplyScalar(physics.camera.height));
    }

    let desiredCameraPos = this.position
      .clone()
      .sub(forwardDir.multiplyScalar(physics.camera.distance))
      .add(this.Up.clone().multiplyScalar(physics.camera.height));

    this.ballCam ?  this.camera.position.lerp(desiredCameraPos, dt) :  weightedLerp(this.camera.position, desiredCameraPos, weights, dt)
    
    const smoothLookAt = new THREE.Vector3().lerpVectors(
      this.LookAt,
      lookAt,
      dt
    );
    this.camera.lookAt(smoothLookAt);
  }

  loadCarModel(modelConfig) {
    console.log('Loading car model:', modelConfig.name);
    if (!this.carModels.has(modelConfig.name)) {
      const model = new CarModel(this.scene, modelConfig);
      this.carModels.set(modelConfig.name, model);
      this.add(model);
      
      if (!this.currentModel) {
        this.currentModel = modelConfig.name;
        return true;
      }
    }
    return false;
  }

  switchCarModel(modelName) {
    if (this.currentModel === modelName) return true;
    
    if (!this.carModels.has(modelName)) {
      console.warn(`Car model ${modelName} not loaded. Loading it now...`);
      const modelConfig = Object.values(CAR_MODELS).find(config => config.name === modelName);
      if (!modelConfig) {
        console.error(`Car model ${modelName} not found in CAR_MODELS`);
        return false;
      }
      this.loadCarModel(modelConfig);
    }
    
    if (this.currentModel) {
      this.carModels.get(this.currentModel).visible = false;
    }
    
    this.carModels.get(modelName).visible = true;
    this.currentModel = modelName;
    return true;
  }

}