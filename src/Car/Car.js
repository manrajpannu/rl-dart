import * as THREE from "three";
import { CarModel, CAR_MODELS } from "./CarModel.js";
import { physics } from "../PhysicsConfig.js";
import { degToRad } from "three/src/math/MathUtils.js";
import { BOOST_TYPES, createBoost } from "./boost/BoostFactory.js";

/**
 * Player-controlled car with rotational physics and chase-camera behavior.
 */
export class Car extends THREE.Group {
  /**
   * @param {THREE.Object3D} scene Parent scene/group used by boost effects.
   * @param {number} dps Maximum shoot sound trigger rate.
   */
  constructor(scene, dps = 5) {
    super();
    this.carModels = new Map();
    this.currentModel = null;
    this.loadCarModel(CAR_MODELS[physics.car.body]);
    this.ballCam = true;
    this.Up = new THREE.Vector3(0, 1, 0);
    this.forward = new THREE.Vector3(0, 0, -1);
    this.rotation.x = Math.PI / 2;
    this._lastInertia = { x: 'null', y: 'null', z: 'null' };

    this.boostType = 'Pulse';
    this.Boost = createBoost(scene, this.boostType);
    this.add(this.Boost);
    
    // Visuals
    this.showLine = false;
    this.showAxisOfRotationLine = true;
    this.showTorus = true;
    
    // Physics
    this.rotationVelocity = new THREE.Vector3();
    this.rotationSpeed = physics.car.rotationSpeed;
    this.maxRotationSpeed = physics.car.maxRotationSpeed;
    this.airDragCoefficient = physics.car.airDragCoefficient;
    this.rampSpeed = physics.car.rampSpeed;
    
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
    this._torusMaterial = new THREE.MeshStandardMaterial({ color: 'magenta'});
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

    // Shoot
    // Use a pool of Audio objects for overlapping shoot sounds
    this._shootSounds = Array.from({length: 3}, () => {
      const a = new Audio('/rl-dart/sounds/shoot.ogg');
      a.volume = 0.01;
      return a;
    });
    this._shootSoundIndex = 0;
    this.shootAccumulator = 0;
    this.dps = dps;
    
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

  /**
   * Integrates one rotation step using input impulses + drag damping.
   *
   * Inputs are first mapped into local pitch/yaw/roll acceleration,
   * accumulated into angular velocity, then attenuated by air-drag.
   * The result is converted to a quaternion and applied to this transform.
   *
   * @param {number} yaw
   * @param {number} pitch
   * @param {number} roll
   * @param {number} dt Fixed simulation delta time in seconds.
   */
  rotate(yaw, pitch, roll, dt) {
    const inputVec = new THREE.Vector3();
   
    inputVec.x = pitch
    inputVec.y = yaw
    inputVec.z = roll
    
    
    if (inputVec.lengthSq() > 1) inputVec.normalize();
    
    this.rotationVelocity.x += inputVec.x * this.rotationSpeed.x * dt;
    this.rotationVelocity.y += inputVec.y * this.rotationSpeed.y * dt;
    this.rotationVelocity.z += inputVec.z * this.rotationSpeed.z * dt;


     if (Math.abs(this.rotationVelocity.x) > 1e-3 && pitch === 0) {
      this.inertiaTimerX += dt;
    } else if (this.inertiaTimerX > 0) {
      this.lastInertiaX = this.inertiaTimerX;
      this.inertiaTimerX = 0;
    }
    // Y (Yaw)
    if (Math.abs(this.rotationVelocity.y) > 1e-3 && yaw === 0) {
      this.inertiaTimerY += dt;
    } else if (this.inertiaTimerY > 0) {
      this.lastInertiaY = this.inertiaTimerY;
      this.inertiaTimerY = 0;
    }
    // Z (Roll)
    if (Math.abs(this.rotationVelocity.z) > 1e-3 && roll === 0) {
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
        hudCtx.fillStyle = 'white';
        hudCtx.textAlign = 'left';
        hudCtx.textBaseline = 'top';
        // Rotations per minute (RPM) = (|vel| / 2π) * 60
        const rpmX = Math.abs(this.rotationVelocity.x) > 1e-6 ? (Math.abs(this.rotationVelocity.x) / (2 * Math.PI)) * 60 : 0;
        const rpmY = Math.abs(this.rotationVelocity.y) > 1e-6 ? (Math.abs(this.rotationVelocity.y) / (2 * Math.PI)) * 60 : 0;
        const rpmZ = Math.abs(this.rotationVelocity.z) > 1e-6 ? (Math.abs(this.rotationVelocity.z) / (2 * Math.PI)) * 60 : 0;
        hudCtx.fillText(`Rotations/min:`, 4, 4);
        hudCtx.fillText(`X: ${rpmX === 0 ? '-' : rpmX.toFixed(2)}`, 4, 16);
        hudCtx.fillText(`Y: ${rpmY === 0 ? '-' : rpmY.toFixed(2)}`, 4, 27);
        hudCtx.fillText(`Z: ${rpmZ === 0 ? '-' : rpmZ.toFixed(2)}`, 4, 38);

        hudCtx.fillText(`Inertia (s):`, 4, 50);
        hudCtx.fillText(`X: ${(this.inertiaTimerX > 0 ? this.inertiaTimerX : this.lastInertiaX) > 0 ? (this.inertiaTimerX > 0 ? this.inertiaTimerX : this.lastInertiaX).toFixed(2) : '-'}`, 4, 61);
        hudCtx.fillText(`Y: ${(this.inertiaTimerY > 0 ? this.inertiaTimerY : this.lastInertiaY) > 0 ? (this.inertiaTimerY > 0 ? this.inertiaTimerY : this.lastInertiaY).toFixed(2) : '-'}`, 4, 72);
        hudCtx.fillText(`Z: ${(this.inertiaTimerZ > 0 ? this.inertiaTimerZ : this.lastInertiaZ) > 0 ? (this.inertiaTimerZ > 0 ? this.inertiaTimerZ : this.lastInertiaZ).toFixed(2) : '-'}`, 4, 83);
        hudCtx.restore();
      }
    }
    

    
    
    const drag = new THREE.Vector3(this.airDragCoefficient.x, this.airDragCoefficient.y, this.airDragCoefficient.z);
    this.rotationVelocity.multiply(drag);
    
    if (this.rotationVelocity.lengthSq() < 1e-3)
      this.rotationVelocity.set(0, 0, 0);

  
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
    this.scale.set(1, 1, 1);

    const axis = this.findAxisOfRotation(rotMat);
    this.showAxisOfRotation(axis)
  }

  boost(boostHeld, dt) {
    if (boostHeld) {
      this.updateMatrixWorld();
      const worldPos = new THREE.Vector3();
      this.getWorldPosition(worldPos);
      const worldQuat = new THREE.Quaternion();
      this.getWorldQuaternion(worldQuat);
      this.Boost.emitParticles(worldPos, worldQuat, dt);
    }

    this.Boost.updateParticles(dt);
  }

  /**
   * Switches boost implementation at runtime.
   * @param {keyof typeof BOOST_TYPES} type
   * @param {object} [options]
   */
  setBoostType(type, options = {}) {
    if (!BOOST_TYPES[type]) {
      console.warn(`Unknown boost type: ${type}`);
      return false;
    }
    if (type === this.boostType) return true;

    if (this.Boost && typeof this.Boost.dispose === 'function') {
      this.Boost.dispose();
    }
    if (this.Boost) this.remove(this.Boost);

    this.boostType = type;
    this.Boost = createBoost(this.parent || this, this.boostType, options);
    this.add(this.Boost);
    return true;
  }

  

  findAxisOfRotation(rotMat) {
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

    const center = axisDir.clone().multiplyScalar(0.9-scale*0.2); 
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

  getForwardVector() {
    const origin = new THREE.Vector3();
    const forward = new THREE.Vector3(0, 0, -1);
    this.getWorldPosition(origin);
    forward.applyQuaternion(this.quaternion); 

    return new THREE.Ray(origin, forward.normalize());
  }

  updateFov() {
    this.camera.fov = physics.camera.fov
    this.camera.updateProjectionMatrix();
  }

  toggleBallCam() {
    this.ballCam = !this.ballCam;
  }

  /**
   * Smoothly updates chase camera position/look target.
   * When ball cam is enabled and a target exists, camera orbits to keep ball in view.
   * Otherwise camera follows car forward orientation.
   *
   * @param {THREE.Vector3|null} ballPosition
   * @param {boolean} ballCam
   * @param {number} dt
   */
  updateCamera(ballPosition, ballCam, dt) {
    // If ballPosition is null or undefined, act as if ballCam is off
    if (!ballPosition) ballCam = false;

    let forwardDir = new THREE.Vector3();
    let lookAt = new THREE.Vector3();
    const alpha = ballCam ? 0.04 : 0.004; 

    const sphereCenter = this.position.clone().add(this.Up.clone().multiplyScalar(physics.camera.height));
    let targetOnSphere;

    if (ballCam) {
      forwardDir.subVectors(ballPosition, this.position);
      forwardDir.normalize();
      lookAt = ballPosition.clone();
      targetOnSphere = sphereCenter.clone().sub(forwardDir.clone().multiplyScalar(physics.camera.distance));
    } else {
      forwardDir.copy(this.forward);
      forwardDir.applyQuaternion(this.quaternion);
      forwardDir.normalize();
      lookAt = this.position.clone().add(this.Up.clone().multiplyScalar(physics.camera.height));
      targetOnSphere = sphereCenter.clone().sub(forwardDir.clone().multiplyScalar(physics.camera.distance));
    }

    let camVec = this.camera.position.clone().sub(sphereCenter);
    if (camVec.lengthSq() === 0) {
      camVec.set(0, 0, 1);
    } else {
      camVec.normalize();
    }
    camVec.multiplyScalar(physics.camera.distance);
    let currentOnSphere = sphereCenter.clone().add(camVec);

    let slerpedVec = currentOnSphere.clone().sub(sphereCenter).normalize();
    let targetVec = targetOnSphere.clone().sub(sphereCenter).normalize();
    slerpedVec = slerpedVec.lerp(targetVec, alpha).normalize();
    let newCameraPos = sphereCenter.clone().add(slerpedVec.multiplyScalar(physics.camera.distance));
    this.camera.position.copy(newCameraPos);

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

  getCamera() {
    return this.camera;
  }

  playShootSound(dt) {
    if (this.shootAccumulator > 0) {
      this.shootAccumulator -= dt;
    }
    if (this.shootAccumulator <= 0) {
      // Play shoot sound from pool
      const shootSound = this._shootSounds[this._shootSoundIndex];
      shootSound.currentTime = 0;
      shootSound.play();
      this._shootSoundIndex = (this._shootSoundIndex + 1) % this._shootSounds.length;
      this.shootAccumulator = 1 / this.dps;
    }
  }

}