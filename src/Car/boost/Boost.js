import * as THREE from "three";

export class Boost extends THREE.Group {

    constructor(scene) {
        super();
        this.boostColour = 0xededed;
        this.boostGap = 0.2;
        this.particlesPerSecond = 140;
        this._emitAccumulator = 0
        this.particleLife = 1.5;
        this.particleSpread = 0.2;
        this.particleRandomness = 0.0;
        this.particleFadeInFactor = 4.7;
        this.particleFadeOutFactor = 3.456;
        this.particleFadeInTime = 0.159;
        this.particleFadeOutTime = 1.971;
        this.particleScaleFactor = 1.2;
        this.particleMaxScale = 2.0;
        this.particleGroup = new THREE.Group();
        scene.add(this.particleGroup);
        this._particles = [];
    }


    
    emitParticles(position, quaternion, dt) {
      // Emit particles from the back of the car, rate controlled by dt
      this._emitAccumulator += dt * this.particlesPerSecond;
      const numToEmit = Math.floor(this._emitAccumulator);
      if (numToEmit <= 0) return;
      this._emitAccumulator -= numToEmit;

      // Back of car: local +Z (Rocket League convention)
      const backOffset = new THREE.Vector3(0, 0.1, 0.6); // adjust as needed
      backOffset.applyQuaternion(quaternion);
      const pos = position.clone().add(backOffset);

      for (let i = 0; i < numToEmit; i++) {
        // Center particle
        const offsets = [
          new THREE.Vector3(-this.boostGap, 0, 0),  // left
          new THREE.Vector3(this.boostGap, 0, 0)    // right
        ];
        for (const offset of offsets) {
          // Smoke: larger, softer, semi-transparent, random fade
          const size = 0.04 + Math.random()*0.01;
          const opacity = 0.12 + Math.random()*0.10;
          const particle = new THREE.Mesh(
            new THREE.SphereGeometry(size, 12, 12),
            new THREE.MeshBasicMaterial({ color: this.boostColour, transparent: true, opacity: opacity, depthWrite: false })
          );
          // Offset in car's local space, then rotate to world
          const worldOffset = offset.clone().applyQuaternion(quaternion);
          particle.position.copy(pos).add(worldOffset);
          // Give random velocity, mostly in car's -Z (back) direction
          particle.userData.velocity = new THREE.Vector3(
            (Math.random()-0.5)*this.particleSpread,
            (Math.random()-0.5)*this.particleSpread,
            1.5 + Math.random()*this.particleSpread // -Z for back
          ).applyQuaternion(quaternion);
          particle.userData.life = this.particleLife + Math.random()*this.particleRandomness;
          this.particleGroup.add(particle);
          this._particles.push(particle);
        }
      }
    }
    
      updateParticles(dt) {
        if (!this._particles) return;
        for (let i = this._particles.length - 1; i >= 0; i--) {
          const p = this._particles[i];
          p.position.addScaledVector(p.userData.velocity, dt * 2);
          p.userData.life -= dt;
    
          // Fade in at birth, fade out at death
          const totalLife = p.userData.totalLife || (p.userData.totalLife = p.userData.life + dt);
          const fadeIn = Math.pow(Math.min(1, (totalLife - p.userData.life) / this.particleFadeInTime), this.particleFadeInFactor); // sharper fade in
          const fadeOut = Math.pow(Math.min(1, p.userData.life / this.particleFadeOutTime), this.particleFadeOutFactor); // sharper fade out
          const baseOpacity = Math.max(0, Math.min(1, p.userData.life * 0.4));
          p.material.opacity = baseOpacity * fadeIn * fadeOut;
          p.material.transparent = true;
    
        // Scale is inverse of life, capped at maxScale
        const minLife = 0.05;
        const scale = Math.min(this.particleMaxScale, this.particleScaleFactor / Math.max(p.userData.life, minLife));
        p.scale.setScalar(scale);
    
        if (p.userData.life <= 0) {
          this.particleGroup.remove(p);
          if (p.geometry) p.geometry.dispose();
          if (p.material) p.material.dispose();
          this._particles.splice(i, 1);
        }
        }
      }
    }