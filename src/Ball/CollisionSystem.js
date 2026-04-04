import * as THREE from 'three';

/**
 * CollisionSystem detects and reports collision events:
 * - ray-to-ball
 * - ball-to-ball
 * - ball-to-car
 *
 * Usage:
 *   const collisions = CollisionSystem.detect({
 *     balls, car, ray
 *   });
 *   collisions = [
 *     { type: 'ray-ball', ball, intersection },
 *     { type: 'ball-ball', ballA, ballB },
 *     { type: 'ball-car', ball, car },
 *   ]
 */
export class CollisionSystem {
    /**
     * @param {Object} params
     * @param {Array<Ball>} params.balls
     * @param {Car} params.car
     * @param {THREE.Ray} [params.ray]
     * @returns {Array<Object>} collision events
     */
    static detect({ balls, car, ray }) {
        const events = [];
        // Ray-to-ball collisions
        if (ray) {
            balls.forEach(ball => {
                if (ray.intersectsSphere(ball.hitBox)) {
                    const intersection = CollisionSystem._findIntersection(ray, ball.hitBox, ball.position);
                    if (intersection) {
                        events.push({ type: 'ray-ball', ball, intersection });
                    }
                }
            });
        }
        // Ball-to-ball collisions
        for (let i = 0; i < balls.length; ++i) {
            for (let j = i + 1; j < balls.length; ++j) {
                const a = balls[i], b = balls[j];
                const dist = a.position.distanceTo(b.position);
                if (dist < a.radius + b.radius) {
                    events.push({ type: 'ball-ball', ballA: a, ballB: b });
                }
            }
        }
        // Ball-to-car collisions
        if (car && car.position && car.radius !== undefined) {
            balls.forEach(ball => {
                const dist = ball.position.distanceTo(car.position);
                if (dist < ball.radius + car.radius) {
                    events.push({ type: 'ball-car', ball, car });
                }
            });
        }
        return events;
    }

    // Helper for ray-sphere intersection
    static findIntersection(ray, sphere, spherePos) {
        const originToCenter = new THREE.Vector3().subVectors(spherePos, ray.origin);
        const tca = originToCenter.dot(ray.direction);
        const d2 = originToCenter.lengthSq() - tca * tca;
        if (d2 > sphere.radius * sphere.radius) return null;
        const thc = Math.sqrt(sphere.radius * sphere.radius - d2);
        const t1 = tca - thc;
        const t2 = tca + thc;
        let t = null;
        if (t1 >= 0 && t2 >= 0) t = Math.min(t1, t2);
        else if (t1 >= 0) t = t1;
        else if (t2 >= 0) t = t2;
        if (t !== null) {
            return new THREE.Vector3().copy(ray.origin).add(ray.direction.clone().multiplyScalar(t));
        }
        return null;
    }
}
