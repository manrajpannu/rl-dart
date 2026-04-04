import * as THREE from "three";

export class SinusoidalMovement {
  constructor({
    axis = new THREE.Vector3(1, 0, 0),
    amplitude = 2,
    frequency = 1
  } = {}) {
    this.axis = axis.clone().normalize();
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.time = 0;
    this.origin = null;
  }

  reset(ball, boundary = 20) {
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 2 * boundary,
      2 + Math.random() * 6,
      (Math.random() - 0.5) * 2 * boundary
    );
    if (typeof ball.setPosition === 'function') {
      ball.setPosition(pos);
    } else {
      ball.position.copy(pos);
    }
    this.time = 0;
    this.origin = pos.clone();
  }

  update(ball, dt) {
    if (!this.origin) this.origin = ball.position.clone();

    this.time += dt;
    const offset =
      Math.sin(this.time * this.frequency * Math.PI * 2) * this.amplitude;

    const newPos = this.origin.clone().addScaledVector(this.axis, offset);
    if (typeof ball.setPosition === 'function') {
      ball.setPosition(newPos);
    } else {
      ball.position.copy(newPos);
    }
  }
}