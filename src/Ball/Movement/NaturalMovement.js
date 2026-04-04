import * as THREE from 'three';

export class NaturalMovement {
	constructor({ bounds = 20, speed = 2, smoothness = 0.05 } = {}) {
		this.bounds = bounds;
		this.speed = speed;
		this.smoothness = smoothness;
		this.target = this._randomTarget();
		this.timer = 0;
		this.changeInterval = 2 + Math.random() * 2;
	}

	_randomTarget() {
		return new THREE.Vector3(
			(Math.random() - 0.5) * this.bounds * 2,
			1 + Math.random() * this.bounds,
			(Math.random() - 0.5) * this.bounds * 2
		);
	}

	reset(ball) {
		this.target = ball.position.clone();
		this.timer = 0;
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
		this.target = pos.clone();
		this.timer = 0;
	}

	update(ball, dt) {
		this.timer += dt;
		// Change target every few seconds
		if (this.timer > this.changeInterval) {
			this.target = this._randomTarget();
			this.timer = 0;
			this.changeInterval = 2 + Math.random() * 2;
		}

		// Move smoothly toward the target
		const current = ball.position.clone();
		const direction = this.target.clone().sub(current);
		const distance = direction.length();
		if (distance > 0.01) {
			direction.normalize();
			// Smooth interpolation
			const move = direction.multiplyScalar(Math.min(this.speed * dt, distance));
			const newPos = current.add(move.multiplyScalar(this.smoothness));
			if (typeof ball.setPosition === 'function') {
				ball.setPosition(newPos);
			} else {
				ball.position.copy(newPos);
			}
		}
	}
}
