import * as THREE from 'three';

export class CurvyMovement {
    constructor({ flowySpeed = 5, bounds = { x: 10, y: 0.5, z: 10 } } = {}) {
        this.flowySpeed = flowySpeed;
        this.bounds = bounds;
        this._bezierT = 0;
        this._bezierDuration = 2.0;
        this._bezierPoints = null;
    }

    _randomPointInBounds() {
        const b = this.bounds;
        return new THREE.Vector3(
            (Math.random() - 0.5) * 2 * b.x,
            b.y + Math.random() * 7.5, // y in [b.y, b.y+7.5]
            (Math.random() - 0.5) * 2 * b.z
        );
    }

    _startNewBezier(currentPosition) {
        const p0 = currentPosition.clone();
        const p3 = this._randomPointInBounds();
        // Control points: random directions from p0 and p3
        const dir0 = new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
        );
        const dir1 = new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
        );
        const p1 = p0.clone().add(dir0);
        const p2 = p3.clone().add(dir1);
        this._bezierPoints = [p0, p1, p2, p3];
        // Duration based on distance and speed
        const dist = p0.distanceTo(p3);
        this._bezierDuration = dist / this.flowySpeed;
        this._bezierT = 0;
    }

    update(ball, dt = 0.016) {
        if (!this._bezierPoints) {
            this._startNewBezier(ball.position);
        }
        // Advance t
        this._bezierT += dt / this._bezierDuration;
        if (this._bezierT > 1) {
            // Snap to end, start new curve
            this._startNewBezier(this._bezierPoints[3]);
            return;
        }
        // Cubic Bezier interpolation
        const [p0, p1, p2, p3] = this._bezierPoints;
        const t = this._bezierT;
        // De Casteljau's algorithm for cubic Bezier
        const a = p0.clone().lerp(p1, t);
        const b = p1.clone().lerp(p2, t);
        const c = p2.clone().lerp(p3, t);
        const d = a.lerp(b, t);
        const e = b.lerp(c, t);
        const pos = d.lerp(e, t);
        if (typeof ball.setPosition === 'function') {
            ball.setPosition(pos);
        } else {
            ball.position.copy(pos);
        }
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
        this._bezierPoints = null;
        this._bezierT = 0;
    }
}
