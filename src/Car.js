import * as THREE from "three";
import { CarModel, CAR_MODELS } from "./carModel.js";
import { physics } from "./physicsConfig.js";
import { degToRad } from "three/src/math/MathUtils.js";
import { cross } from "three/tsl";

// Deadzone helper
const crossDeadzone = (value, deadzone = 0.10) => {
  return Math.abs(value) < deadzone ? 0 : value;
};

const circleDeadzone = (x, y, deadzone = 0.10) => {
  return Math.hypot(x, y) < deadzone ? { x: 0, y: 0 } : { x, y };
};

function circleToSquare(x, y) {
  if (x === 0 && y === 0) return { x: 0, y: 0 }; // center
  const r = Math.hypot(x, y);           // sqrt(x*x + y*y)
  const cosT = x / r;
  const sinT = y / r;
  const m = Math.max(Math.abs(cosT), Math.abs(sinT));
  // scale so circle edge maps to square edge
  const scale = (m === 0) ? 0 : r / m;
  return { x: cosT * scale, y: sinT * scale };
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
    this.rotation.x = Math.PI / 2;
    this._lastInertia = { x: '-', y: '-', z: '-' };
    
    // Visuals
    this.showLine = false;
    this.showAxisOfRotationLine = true;
    this.showTorus = true;
    
    // Physics
    this.rotationVelocity = new THREE.Vector3();
    this.rotationSpeed = physics.car.rotationSpeed;
    this.maxRotationSpeed = physics.car.maxRotationSpeed;
    this.airDragCoefficient = physics.car.airDragCoefficient;

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

    // Inertia timers for X, Y, Z
    this.inertiaTimerX = 0;
    this.inertiaTimerY = 0;
    this.inertiaTimerZ = 0;
    // Last inertia times for X, Y, Z
    this.lastInertiaX = 0;
    this.lastInertiaY = 0;
    this.lastInertiaZ = 0;
    
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
    this.controllerDeadzone = 0.15;
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
    if (code === "ShiftLeft" || code === "ShiftRight") {
      this.input.shiftHeld = isDown;
      // Instantly switch roll/yaw when shift is pressed or released
      if (!isDown) {
        // Shift released: if A/D held, switch roll to yaw
        if (this.input.rollLeft) {
          this.input.rollLeft = 0;
          if (this.input.aHeld) this.input.yawRight = 1;
        }
        if (this.input.rollRight) {
          this.input.rollRight = 0;
          if (this.input.dHeld) this.input.yawLeft = 1;
        }
      } else {
        // Shift pressed: if A/D held, switch yaw to roll
        if (this.input.yawRight) {
          this.input.yawRight = 0;
          if (this.input.aHeld) this.input.rollLeft = 1;
        }
        if (this.input.yawLeft) {
          this.input.yawLeft = 0;
          if (this.input.dHeld) this.input.rollRight = 1;
        }
      }
      return;
    }
    switch (code) {
      case "KeyA":
        this.input.aHeld = isDown;
        if (this.input.shiftHeld) {
          this.input.rollLeft = isDown ? 1 : 0;
          if (isDown) this.input.yawRight = 0;
        } else {
          this.input.yawRight = isDown ? 1 : 0;
          if (isDown) this.input.rollLeft = 0;
        }
        break;
      case "KeyD":
        this.input.dHeld = isDown;
        if (this.input.shiftHeld) {
          this.input.rollRight = isDown ? 1 : 0;
          if (isDown) this.input.yawLeft = 0;
        } else {
          this.input.yawLeft = isDown ? 1 : 0;
          if (isDown) this.input.rollRight = 0;
        }
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
        break;
      case "Space":
        if (isDown) this.ballCam = !this.ballCam;
        break;
    }

    
 
  }

  handleController() {
  let pitch = 0, yaw = 0, roll = 0;

  if (this.gamepadIndex !== null) {
    const gp = navigator.getGamepads()[this.gamepadIndex];
    if (gp && gp.connected) {

      // Raw stick input
      let x = gp.axes[0];
      let y = gp.axes[1];

      // Apply deadzone + mapping
      switch (this.controllerDeadzoneType) {

        case 'circle': {
          ({x, y} = circleDeadzone(x, y, this.controllerDeadzone));
          // apply sens
          x *= this.controllerSensitivity;
          y *= this.controllerSensitivity;
          const hyp = Math.hypot(x, y);
          if (hyp > 1) {
            x /= hyp;
            y /= hyp;
          }
          break;
        }

        case 'cross': {
          x = crossDeadzone(x, this.controllerDeadzone);
          y = crossDeadzone(y, this.controllerDeadzone);
          // apply sens
          x *= this.controllerSensitivity;
          y *= this.controllerSensitivity;
          const hyp = Math.hypot(x, y);
          if (hyp > 1) {
            x /= hyp;
            y /= hyp;
          }
          break;
        }

        case 'square': {
          // Convert circular stick → square range
          x = crossDeadzone(gp.axes[0], this.controllerDeadzone);
          y = crossDeadzone(gp.axes[1], this.controllerDeadzone);
          
          const sq = circleToSquare(x * this.controllerSensitivity, y * this.controllerSensitivity);

          // THEN apply deadzone + sensitivity
          x = sq.x
          y = sq.y
          break;
        }

        default: {
          x = crossDeadzone(x, this.controllerDeadzone);
          y = crossDeadzone(y, this.controllerDeadzone);
          break;
        }
      }

      // Convert stick to your game's pitch/yaw
      pitch = THREE.MathUtils.clamp(y, -1, 1);
      yaw   = -THREE.MathUtils.clamp(x, -1, 1);

      // Simplified roll logic (press any LB/RB/X/Y/A/B)
      const pressed =
        gp.buttons[0]?.pressed || gp.buttons[1]?.pressed ||
        gp.buttons[2]?.pressed || gp.buttons[3]?.pressed ||
        gp.buttons[4]?.pressed || gp.buttons[5]?.pressed;

      if (pressed) {
        roll = this.airRollLeft ? -1 : 1;
      }
    }
  }

  return {controller_pitch: (this.input.pitchUp - this.input.pitchDown) || pitch, controller_yaw: (this.input.yawRight - this.input.yawLeft) || yaw, controller_roll: (this.input.rollRight - this.input.rollLeft) || roll};
}
 
  applyInputs(dt) {


    let { controller_yaw, controller_pitch, controller_roll } = this.handleController();

    const inputVec = new THREE.Vector3();
    inputVec.x = controller_pitch;      // Pitch
    inputVec.y = controller_yaw;         // Yaw
    inputVec.z = controller_roll;      // Roll

    if (inputVec.lengthSq() > 1) inputVec.normalize();


    // Update rotational velocity
    this.rotationVelocity.x += inputVec.x * this.rotationSpeed.x * dt;
    this.rotationVelocity.y += inputVec.y * this.rotationSpeed.y * dt;
    this.rotationVelocity.z += inputVec.z * this.rotationSpeed.z * dt;

    // X (Pitch)
    if (Math.abs(this.rotationVelocity.x) > 1e-3 && controller_pitch === 0) {
      this.inertiaTimerX += dt;
    } else if (this.inertiaTimerX > 0) {
      this.lastInertiaX = this.inertiaTimerX;
      this.inertiaTimerX = 0;
    }
    // Y (Yaw)
    if (Math.abs(this.rotationVelocity.y) > 1e-3 && controller_yaw === 0) {
      this.inertiaTimerY += dt;
    } else if (this.inertiaTimerY > 0) {
      this.lastInertiaY = this.inertiaTimerY;
      this.inertiaTimerY = 0;
    }
    // Z (Roll)
    if (Math.abs(this.rotationVelocity.z) > 1e-3 && controller_roll === 0) {
      this.inertiaTimerZ += dt;
    } else if (this.inertiaTimerZ > 0) {
      this.lastInertiaZ = this.inertiaTimerZ;
      this.inertiaTimerZ = 0;
    }

    // Display full rotation times and inertia timers in top left of HUD canvas
    if (typeof window !== 'undefined') {
      const hudCanvas = document.getElementById('hud');
      if (hudCanvas) {
        const hudCtx = hudCanvas.getContext('2d');
        hudCtx.save();
        hudCtx.clearRect(0, 0, 120, 200);
        hudCtx.font = '11px monospace';
        hudCtx.fillStyle = 'black';
        hudCtx.textAlign = 'left';
        hudCtx.textBaseline = 'top';
        const timeX = Math.abs(this.rotationVelocity.x) > 1e-6 ? (2 * Math.PI) / Math.abs(this.rotationVelocity.x) : Infinity;
        const timeY = Math.abs(this.rotationVelocity.y) > 1e-6 ? (2 * Math.PI) / Math.abs(this.rotationVelocity.y) : Infinity;
        const timeZ = Math.abs(this.rotationVelocity.z) > 1e-6 ? (2 * Math.PI) / Math.abs(this.rotationVelocity.z) : Infinity;
        hudCtx.fillText(`Full rot (s):`, 4, 4);
        hudCtx.fillText(`X: ${timeX === Infinity ? '-' : timeX.toFixed(2)}`, 4, 16);
        hudCtx.fillText(`Y: ${timeY === Infinity ? '-' : timeY.toFixed(2)}`, 4, 27);
        hudCtx.fillText(`Z: ${timeZ === Infinity ? '-' : timeZ.toFixed(2)}`, 4, 38);

        hudCtx.fillText(`Inertia (s):`, 4, 50);
        hudCtx.fillText(`X: ${(this.inertiaTimerX > 0 ? this.inertiaTimerX : this.lastInertiaX) > 0 ? (this.inertiaTimerX > 0 ? this.inertiaTimerX : this.lastInertiaX).toFixed(2) : '-'}`, 4, 61);
        hudCtx.fillText(`Y: ${(this.inertiaTimerY > 0 ? this.inertiaTimerY : this.lastInertiaY) > 0 ? (this.inertiaTimerY > 0 ? this.inertiaTimerY : this.lastInertiaY).toFixed(2) : '-'}`, 4, 72);
        hudCtx.fillText(`Z: ${(this.inertiaTimerZ > 0 ? this.inertiaTimerZ : this.lastInertiaZ) > 0 ? (this.inertiaTimerZ > 0 ? this.inertiaTimerZ : this.lastInertiaZ).toFixed(2) : '-'}`, 4, 83);
        hudCtx.restore();
      }
    }
    // ...existing code...

    // Apply drag
    const drag = new THREE.Vector3(this.airDragCoefficient.x, this.airDragCoefficient.y, this.airDragCoefficient.z);
    this.rotationVelocity.multiply(drag);

    if (this.rotationVelocity.lengthSq() < 1e-3)
      this.rotationVelocity.set(0, 0, 0);

    // Clamp
    // this.rotationVelocity.x = THREE.MathUtils.clamp(this.rotationVelocity.x, -this.maxRotationSpeed.x, this.maxRotationSpeed.x);
    // this.rotationVelocity.y = THREE.MathUtils.clamp(this.rotationVelocity.y, -this.maxRotationSpeed.y, this.maxRotationSpeed.y);
    // this.rotationVelocity.z = THREE.MathUtils.clamp(this.rotationVelocity.z, -this.maxRotationSpeed.z, this.maxRotationSpeed.z);

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
    const alpha = 0.008; // Smoothing factor

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

    this.ballCam ?  this.camera.position.lerp(desiredCameraPos, alpha) :  weightedLerp(this.camera.position, desiredCameraPos, weights, alpha)
    
    const smoothLookAt = new THREE.Vector3().lerpVectors(
      this.LookAt,
      lookAt,
      alpha
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