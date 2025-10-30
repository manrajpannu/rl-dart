import * as THREE from "three";
import { Octane } from "./octane.js";
import { physics } from "./physicsConfig.js";
import { degToRad } from "three/src/math/MathUtils.js";


const material = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});

function  weightedLerp(current, target, weights, dt) {
  // weights = how quickly each axis blends (higher = faster)
  // dt = delta time in seconds (e.g., from clock.getDelta())

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
    this.octane = new Octane(scene);
    this.add(this.octane);
    this.velocity = new THREE.Vector3();
    this.rotationVelocity = new THREE.Vector3();
    this.ballCam = true;
    this.showLine = false;
    this.showAxisOfRotationLine = false;
    this.showTorus = false;
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
      physics.camera.fov,
      window.innerWidth / window.innerHeight
    );
    this.LookAt = new THREE.Vector3(0, 0, 0);
    camera.position.set(0, 3, 7);
    camera.lookAt(this.LookAt);

    this.camera = camera;

    this.Up = new THREE.Vector3(0, 1, 0);
    this.forward = new THREE.Vector3(0, 0, -1);

    // {
    //   const geometry = new THREE.TorusGeometry( 0.65, 0.02, 10, 23 ); 
    //   const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
    //   const torus = new THREE.Mesh( geometry, material ); 
    //   torus.position.set(0,0.5,-0.5)
    //   torus.rotateX(degToRad(45));
    //   this.add( torus );
      
    // }
  }

  handleKey(code, isDown) {
    switch (code) {
      case "KeyA":
        this.input.right = isDown;
        break;
      case "KeyD":
        this.input.left = isDown;
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

  applyInputs(dt) {
    const inputVec = new THREE.Vector3();
    inputVec.x = this.input.pitchUp - this.input.pitchDown; // Pitch
    inputVec.y = this.input.right - this.input.left;         // Yaw
    inputVec.z = this.input.rollRight - this.input.rollLeft; // Roll

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
    this.rotationVelocity.x = THREE.MathUtils.clamp(
      this.rotationVelocity.x, -this.maxRotationSpeed, this.maxRotationSpeed
    );
    this.rotationVelocity.y = THREE.MathUtils.clamp(
      this.rotationVelocity.y, -this.maxRotationSpeed, this.maxRotationSpeed
    );
    this.rotationVelocity.z = THREE.MathUtils.clamp(
      this.rotationVelocity.z, -this.maxRotationSpeed * 1.2, this.maxRotationSpeed * 1.2
    );

    // --- Create rotation matrix for current frame ---
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
    } else {
      axis.set(0, 1, 0); // default if angle ≈ 0
    }

    // --- Show the axis of rotation ---
    if (this.showAxisOfRotationLine) {
      if (this.rotationLine) this.remove(this.rotationLine);
      const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        axis.clone().multiplyScalar(2)
      ]);
      this.rotationLine = new THREE.Line(geometry, material);
      this.add(this.rotationLine);
      if (this.showTorus) {
        this.showAxisTorus(axis);
      }
    }
    if (!this.showAxisOfRotationLine && this.rotationLine) this.remove(this.rotationLine);
  }

  showAxisTorus(axis) {
    // ensure axis is normalized (defensive)
    const axisDir = axis.clone().normalize();

    // compute center point 2 units along the axis
    const center = axisDir.clone().multiplyScalar(0.8);

    // remove old torus if present
    if (this._axisTorus) {
      this.remove(this._axisTorus);
      if (this._axisTorus.geometry) this._axisTorus.geometry.dispose();
      if (this._axisTorus.material) this._axisTorus.material.dispose();
      this._axisTorus = null;
    }

    // torus geometry params (tweak as needed)
    const ringRadius = 0.5;   // distance from torus center to tube center
    const tubeRadius = 0.02;  // tube thickness
    const radialSegs = 6;
    const tubularSegs = 6;

    const geom = new THREE.TorusGeometry(ringRadius, tubeRadius, radialSegs, tubularSegs);
    const mat = new THREE.MeshStandardMaterial({ color: 'purple', opacity: 0.7, transparent: true });

    const torus = new THREE.Mesh(geom, mat);

    // By default we assume the torus's ring-plane normal is +Y.
    // Compute quaternion to rotate +Y to the axis direction.
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();
    // handle near-parallel / anti-parallel safely:
    if (axisDir.dot(up) > 0.9999) {
      q.identity();
    } else if (axisDir.dot(up) < -0.9999) {
      // 180° rotation: pick any perpendicular axis (X)
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
    } else {
      q.setFromUnitVectors(up, axisDir);
    }

    
    torus.position.copy(center);
    torus.quaternion.copy(q);

    // optional: slightly offset the torus so its ring center sits exactly on the axis
    // (not needed here because center already sits on axis)

    // store and add
    torus.rotateX(degToRad(90)); // align torus tube with axis
    this._axisTorus = torus;
    this.add(torus);
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


}
