import * as THREE from "three";

export class ProceduralMovement {
  constructor({
        bounds = 20,
        speed = 1,
        turnRate = 2
    } = {}) {
    this.bounds = bounds;
    this.speed = speed;
    this.turnRate = turnRate;

    this.velocity = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
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
    // keep velocity for continuity
  }

  update(ball, dt) {
    // Random steering
    const randomTurn = new THREE.Vector3(
      (Math.random() - 0.5) * this.turnRate,
      (Math.random() - 0.5) * this.turnRate,
      (Math.random() - 0.5) * this.turnRate
    );

    this.velocity.add(randomTurn).normalize();

    // Compute new position
    const newPos = ball.position.clone().addScaledVector(this.velocity, this.speed * dt);

    // Soft bounds
    ["x", "y", "z"].forEach(axis => {
      if (Math.abs(newPos[axis]) > this.bounds) {
        this.velocity[axis] *= -1;
        newPos[axis] = Math.sign(newPos[axis]) * this.bounds;
      }
    });

    if (typeof ball.setPosition === 'function') {
      ball.setPosition(newPos);
    } else {
      ball.position.copy(newPos);
    }
  }
}
