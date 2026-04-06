import * as THREE from 'three';

export class HealthBar extends THREE.Group {
    constructor(width = 1, height = 0.1, radius = 0.05, maxHealth, health) {
        super();
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.maxHealth = maxHealth;
        this.health = health;

        // Create border (thick white)
        const borderThickness = 0.03 * Math.max(width, height);
        this.borderMesh = this._createRoundedRectMesh(width + borderThickness, height + borderThickness, radius + borderThickness * 0.5, 'black');
        this.borderMesh.position.z = -0.02;
        this.add(this.borderMesh);

        // Create background (missing health)
        this.bgMesh = this._createRoundedRectMesh(width, height, radius, 0x333333);
        this.bgMesh.position.z = -0.01;
        this.add(this.bgMesh);

        // Create foreground (current health)
        this.fgMesh = this._createRoundedRectMesh(width, height, radius, 0xff0000);
        this.fgMesh.position.z = 0.01; // Slightly in front
        this.add(this.fgMesh);

        // For billboarding
        this.matrixAutoUpdate = true;
    }

    // Public function to update health bar scale
    updateScale(scale) {
        this.scale.set(scale, scale, scale);
    }

    _createRoundedRectShape(width, height, radius) {
        const shape = new THREE.Shape();
        shape.moveTo(-width / 2 + radius, -height / 2);
        shape.lineTo(width / 2 - radius, -height / 2);
        shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
        shape.lineTo(width / 2, height / 2 - radius);
        shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
        shape.lineTo(-width / 2 + radius, height / 2);
        shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
        shape.lineTo(-width / 2, -height / 2 + radius);
        shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
        return shape;
    }

    _createRoundedRectMesh(width, height, radius, color) {
        const shape = this._createRoundedRectShape(width, height, radius);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color });
        return new THREE.Mesh(geometry, material);
    }

    setHealth(health) {
        this.health = Math.max(0, Math.min(health, this.maxHealth));
        this._updateHealthBar();
    }

    setMaxHealth(maxHealth) {
        this.maxHealth = Math.max(1, maxHealth);
        this.health = Math.min(this.health, this.maxHealth);
        this._updateHealthBar();
    }

    _updateHealthBar() {
        const healthRatio = this.health / this.maxHealth;
        // Scale the foreground mesh in X, and shift it so the left edge stays fixed
        this.fgMesh.scale.x = healthRatio;
        this.fgMesh.position.x = -(this.width * (1 - healthRatio)) / 2;
    }

    // Call this in your render loop to face the camera
    faceCamera(camera) {
        this.lookAt(camera.position);
    }

    
}
