import * as THREE from 'three';

export class HealthBar extends THREE.Group {
    constructor(width = 1, height = 0.12, radius = 0.05, maxHealth, health) {
        super();
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.squirclePower = 2; // n=2 is a standard circle
        this.cornerRadiusRatio = 1.0; // Maximum roundedness
        this.maxHealth = maxHealth;
        this.health = health;

        // Create border (thick white)
        const borderThickness = 0.03 * Math.max(width, height);
        this.borderMesh = this._createSquircleMesh(
            width + borderThickness,
            height + borderThickness,
            this.squirclePower,
            this.cornerRadiusRatio,
            'black'
        );
        this.borderMesh.position.z = -0.02;
        // this.add(this.borderMesh);

        // Create background (missing health)
        this.bgMesh = this._createSquircleMesh(
            width,
            height,
            this.squirclePower,
            this.cornerRadiusRatio,
            0x333333
        );
        this.bgMesh.position.z = -0.01;
        this.add(this.bgMesh);

        // Create foreground (current health)
        this.fgMesh = this._createSquircleMesh(
            width,
            height,
            this.squirclePower,
            this.cornerRadiusRatio,
            0xff0000,
            health >= maxHealth // roundRight = true if full
        );
        this.fgMesh.position.z = 0.01; // Slightly in front
        this.add(this.fgMesh);

        // For billboarding
        this.matrixAutoUpdate = true;
        this._updateHealthBar();
    }

    // Public function to update health bar scale
    updateScale(scale) {
        this.scale.set(scale, scale, scale);
    }

    _createSquircleBarShape(width, height, power = 2, cornerRadiusRatio = 1.0, cornerSegments = 28, roundRight = true) {
        const shape = new THREE.Shape();
        const safeWidth = Math.max(0.0001, width);
        const safeHeight = Math.max(0.0001, height);
        const halfW = safeWidth / 2;
        const halfH = safeHeight / 2;
        const cornerRadius = Math.max(
            0.0001,
            Math.min(safeHeight * cornerRadiusRatio, halfW, halfH)
        );
        const innerHalfW = Math.max(0, halfW - cornerRadius);
        let started = false;

        const appendCorner = (centerX, centerY, startAngle, endAngle) => {
            for (let i = 0; i <= cornerSegments; i += 1) {
                if (started && i === 0) {
                    continue;
                }

                const t = i / cornerSegments;
                const angle = startAngle + (endAngle - startAngle) * t;
                const x = centerX + cornerRadius * Math.cos(angle);
                const y = centerY + cornerRadius * Math.sin(angle);

                if (!started) {
                    shape.moveTo(x, y);
                    started = true;
                } else {
                    shape.lineTo(x, y);
                }
            }
        };

        // Top-left
        appendCorner(-innerHalfW, halfH - cornerRadius, Math.PI, Math.PI / 2); 
        
        // Top-right
        if (roundRight) {
            appendCorner(innerHalfW, halfH - cornerRadius, Math.PI / 2, 0);
        } else {
            shape.lineTo(halfW, halfH);
        }

        // Bottom-right
        if (roundRight) {
            appendCorner(innerHalfW, -halfH + cornerRadius, 0, -Math.PI / 2);
        } else {
            shape.lineTo(halfW, -halfH);
        }

        // Bottom-left
        appendCorner(-innerHalfW, -halfH + cornerRadius, -Math.PI / 2, -Math.PI); 

        shape.closePath();
        return shape;
    }

    _createSquircleMesh(width, height, power, cornerRadiusRatio, color, roundRight = true) {
        const shape = this._createSquircleBarShape(width, height, power, cornerRadiusRatio, 28, roundRight);
        const geometry = new THREE.ShapeGeometry(shape, 48);
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
        const fgWidth = this.width * healthRatio;

        if (fgWidth <= 0.0001) {
            this.fgMesh.visible = false;
            return;
        }

        this.fgMesh.visible = true;
        this.fgMesh.geometry.dispose();
        this.fgMesh.geometry = new THREE.ShapeGeometry(
            this._createSquircleBarShape(
                fgWidth,
                this.height,
                this.squirclePower,
                this.cornerRadiusRatio,
                28,
                healthRatio >= 1.0 // roundRight = true if full
            ),
            48
        );

        // Keep left side fixed while width changes by moving mesh center.
        this.fgMesh.position.x = -(this.width / 2) + (fgWidth / 2);
    }

    // Call this in your render loop to face the camera
    faceCamera(camera) {
        this.lookAt(camera.position);
    }


}
