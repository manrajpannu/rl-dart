import * as THREE from "three";

export class OrbitingMovement {
  constructor({
    center = new THREE.Vector3(0, 0, 0),
    radius = 2,
    speed = 1,
    axis = new THREE.Vector3(0, 1, 0)
  } = {}) {
    this.center = center.clone();
    this.radius = radius;
    this.speed = speed;
    this.axis = axis.clone().normalize();
    this.angle = 0;

    // Create orthogonal basis
    this.right = new THREE.Vector3(1, 0, 0).cross(this.axis).normalize();
    this.forward = this.axis.clone().cross(this.right).normalize();
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
    this.center = pos.clone();
    this.angle = 0;
  }

  update(ball, dt) {
    this.angle += this.speed * dt;

    const x = Math.cos(this.angle) * this.radius;
    const y = Math.sin(this.angle) * this.radius;

    // Compute new position
    const newPos = this.center.clone()
      .addScaledVector(this.right, x)
      .addScaledVector(this.forward, y);
    if (typeof ball.setPosition === 'function') {
      ball.setPosition(newPos);
    } else {
      ball.position.copy(newPos);
    }
  }
}