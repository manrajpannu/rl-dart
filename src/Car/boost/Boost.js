import * as THREE from "three";

/**
 * Pooled boost particle system attached to the car.
 *
 * Uses pre-allocated meshes to avoid per-frame allocations while boosting.
 */
export class Boost extends THREE.Group {

  /**
   * @param {THREE.Object3D} scene Parent scene/group that owns particle visuals.
   */
    constructor(scene) {
        super();
    this.scene = scene;
        this.boostColour = 0xededed;
        this.boostGap = 0.2;
        this.particlesPerSecond = 140;
    this._emitAccumulator = 0;
        this.particleLife = 1.5;
        this.particleSpread = 0.2;
        this.particleRandomness = 0.0;
        this.particleFadeInFactor = 4.7;
        this.particleFadeOutFactor = 3.456;
        this.particleFadeInTime = 0.159;
        this.particleFadeOutTime = 1.971;
        this.particleScaleFactor = 1.2;
        this.particleMaxScale = 2.0;

        this.poolSafetyFactor = 1.5;
        this._poolSize = Math.ceil(this.particlesPerSecond * 2 * this.particleLife * this.poolSafetyFactor);

        this.particleGroup = new THREE.Group();
        scene.add(this.particleGroup);

        this._particleGeometry = new THREE.SphereGeometry(1, 12, 12);
        this._materialTemplate = new THREE.MeshBasicMaterial({
          color: this.boostColour,
          transparent: true,
          opacity: 1,
          depthWrite: false,
        });

        this._particles = [];
        this._activeParticles = [];
        this._availableParticles = [];

        this._leftOffset = new THREE.Vector3(-this.boostGap, 0, 0);
        this._rightOffset = new THREE.Vector3(this.boostGap, 0, 0);
        this._tempBackOffset = new THREE.Vector3();
        this._tempEmitPosition = new THREE.Vector3();
        this._tempWorldOffset = new THREE.Vector3();
        this._tempVelocity = new THREE.Vector3();

        this._initPool();
    }

      /**
       * Pre-allocates particle meshes for allocation-free runtime updates.
       */
    _initPool() {
      for (let i = 0; i < this._poolSize; i++) {
        const mesh = new THREE.Mesh(this._particleGeometry, this._materialTemplate.clone());
        mesh.visible = false;
        mesh.userData.velocity = new THREE.Vector3();
        mesh.userData.life = 0;
        mesh.userData.totalLife = 0;
        mesh.userData.baseOpacity = 0;
        mesh.userData.baseSize = 0.04;
        this.particleGroup.add(mesh);
        this._particles.push(mesh);
        this._availableParticles.push(mesh);
      }
    }
      /**
       * Emits new particles from the rear boost nozzles using dt-based rate control.
       * @param {THREE.Vector3} position Car world position.
       * @param {THREE.Quaternion} quaternion Car world orientation.
       * @param {number} dt Fixed simulation delta time.
       */

    _acquireParticle() {
      if (this._availableParticles.length === 0) return null;
      const particle = this._availableParticles.pop();
      this._activeParticles.push(particle);
      particle.visible = true;
      return particle;
    }

    _retireParticle(index) {
      const particle = this._activeParticles[index];
      particle.visible = false;
      particle.userData.life = 0;
      particle.userData.totalLife = 0;
      particle.userData.baseOpacity = 0;
      particle.userData.baseSize = 0.04;

      const last = this._activeParticles.length - 1;
      this._activeParticles[index] = this._activeParticles[last];
      this._activeParticles.pop();
      this._availableParticles.push(particle);
    }

    
    emitParticles(position, quaternion, dt) {
      // Emit particles from the back of the car, rate controlled by dt
      this._emitAccumulator += dt * this.particlesPerSecond;
      const numToEmit = Math.floor(this._emitAccumulator);
      if (numToEmit <= 0) return;
      this._emitAccumulator -= numToEmit;

      // Back of car: local +Z (Rocket League convention)
      this._tempBackOffset.set(0, 0.1, 0.6).applyQuaternion(quaternion);
      this._tempEmitPosition.copy(position).add(this._tempBackOffset);

      for (let i = 0; i < numToEmit; i++) {
        this._spawnParticle(this._leftOffset, quaternion);
        this._spawnParticle(this._rightOffset, quaternion);
      }
    }

    _spawnParticle(offset, quaternion) {
      const particle = this._acquireParticle();
      if (!particle) return;

      this._tempWorldOffset.copy(offset).applyQuaternion(quaternion);
      particle.position.copy(this._tempEmitPosition).add(this._tempWorldOffset);

      this._tempVelocity.set(
        (Math.random() - 0.5) * this.particleSpread,
        (Math.random() - 0.5) * this.particleSpread,
        1.5 + Math.random() * this.particleSpread
      ).applyQuaternion(quaternion);

      const life = this.particleLife + Math.random() * this.particleRandomness;
      particle.userData.velocity.copy(this._tempVelocity);
      particle.userData.life = life;
      particle.userData.totalLife = life;
      particle.userData.baseOpacity = 0.12 + Math.random() * 0.1;
      particle.userData.baseSize = 0.04 + Math.random() * 0.01;
    }
    
    /**
     * Advances all active particles and retires expired ones back into the pool.
     * @param {number} dt
     */
    updateParticles(dt) {
        if (!this._activeParticles) return;
        for (let i = this._activeParticles.length - 1; i >= 0; i--) {
          const p = this._activeParticles[i];
          p.position.addScaledVector(p.userData.velocity, dt * 2);
          p.userData.life -= dt;
    
          // Fade in at birth, fade out at death
          const totalLife = p.userData.totalLife || (p.userData.totalLife = p.userData.life + dt);
          const fadeIn = Math.pow(Math.min(1, (totalLife - p.userData.life) / this.particleFadeInTime), this.particleFadeInFactor); // sharper fade in
          const fadeOut = Math.pow(Math.min(1, p.userData.life / this.particleFadeOutTime), this.particleFadeOutFactor); // sharper fade out
          const lifeOpacity = Math.max(0, Math.min(1, p.userData.life * 0.4));
          p.material.opacity = p.userData.baseOpacity * lifeOpacity * fadeIn * fadeOut;
          p.material.transparent = true;
    
          // Scale is inverse of life, capped at maxScale
          const minLife = 0.05;
          const lifeScale = Math.min(this.particleMaxScale, this.particleScaleFactor / Math.max(p.userData.life, minLife));
          p.scale.setScalar(p.userData.baseSize * lifeScale);
    
          if (p.userData.life <= 0) {
            this._retireParticle(i);
          }
        }
    }

    /**
     * Clears active particles and resets emission state.
     */
    reset() {
      for (let i = this._activeParticles.length - 1; i >= 0; i--) {
        this._retireParticle(i);
      }
      this._emitAccumulator = 0;
    }

    /**
     * Releases pooled resources and removes particle group from scene graph.
     */
    dispose() {
      this.reset();
      if (this.particleGroup.parent) {
        this.particleGroup.parent.remove(this.particleGroup);
      }
      for (const particle of this._particles) {
        if (particle.material) particle.material.dispose();
      }
      if (this._materialTemplate) this._materialTemplate.dispose();
      if (this._particleGeometry) this._particleGeometry.dispose();

      this._particles.length = 0;
      this._activeParticles.length = 0;
      this._availableParticles.length = 0;
    }
    }