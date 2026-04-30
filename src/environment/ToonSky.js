import * as THREE from 'three';

const SKY_VERTEX_SHADER = `
varying vec3 vWorldPos;

void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

// Use uniforms for sky colors
const SKY_FRAGMENT_SHADER = `
uniform vec3 horizonColor;
uniform vec3 zenithColor;
varying vec3 vWorldPos;

// Simple dithering to prevent color banding
float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec3 viewDir = normalize(vWorldPos - cameraPosition);
    float h = viewDir.y;
    float t = smoothstep(-0.08, 0.72, h);
    vec3 color = mix(horizonColor, zenithColor, t);
    
    // Apply a small amount of dither noise
    float dither = (random(gl_FragCoord.xy) - 0.5) * (1.0 / 255.0);
    color += dither;
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function createToonCloudTexture(size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, size, size);

    const circles = [
        { x: 0.28, y: 0.58, r: 0.23 },
        { x: 0.50, y: 0.46, r: 0.30 },
        { x: 0.72, y: 0.57, r: 0.22 },
        { x: 0.43, y: 0.62, r: 0.24 },
    ];

    for (const c of circles) {
        const g = ctx.createRadialGradient(
            c.x * size,
            c.y * size,
            c.r * size * 0.15,
            c.x * size,
            c.y * size,
            c.r * size,
        );
        g.addColorStop(0.0, 'rgba(255,255,255,0.95)');
        g.addColorStop(0.5, 'rgba(240,247,255,0.88)');
        g.addColorStop(1.0, 'rgba(220,232,248,0.0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(c.x * size, c.y * size, c.r * size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Soft toon-like base shadow.
    ctx.fillStyle = 'rgba(196, 214, 238, 0.18)';
    ctx.beginPath();
    ctx.ellipse(size * 0.5, size * 0.66, size * 0.36, size * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
}

/**
 * Shader-based stylized sky with darker horizon and toon clouds.
 */

export class ToonSky extends THREE.Group {
    constructor({ radius = 900, cloudCount = 26, hueShift = 0, darkMode = false } = {}) {
        super();
        this._clouds = [];
        this._radius = radius;
        this._cloudTexture = createToonCloudTexture(256);
        this._baseHorizon = new THREE.Color();
        this._baseZenith = new THREE.Color();
        this._hueShift = hueShift;
        this._darkMode = darkMode;

        this.setDarkMode(darkMode);
        this._createSkyDome(radius);
        // this._createCloudLayer(cloudCount, radius);
    }

    setDarkMode(isDark) {
        this._darkMode = isDark;
        if (isDark) {
            this._baseHorizon.set(0x000000); // Black Horizon
            this._baseZenith.set(0x525252);  // Dark Grey Zenith
        } else {
            this._baseHorizon.set(0xCCCCCC); // Light Grey Horizon (approx 0.6)
            this._baseZenith.set(0xffffff);  // White Zenith
        }

        if (this._skyMaterial) {
            this._skyMaterial.uniforms.horizonColor.value.copy(this._baseHorizon);
            this._skyMaterial.uniforms.zenithColor.value.copy(this._baseZenith);
            this.setHueShift(this._hueShift);
        }
    }

    _createSkyDome(radius) {
        const geometry = new THREE.SphereGeometry(radius, 48, 32);
        const uniforms = {
            horizonColor: { value: this._baseHorizon.clone() },
            zenithColor: { value: this._baseZenith.clone() }
        };
        const material = new THREE.ShaderMaterial({
            vertexShader: SKY_VERTEX_SHADER,
            fragmentShader: SKY_FRAGMENT_SHADER,
            uniforms,
            side: THREE.BackSide,
            depthWrite: false,
            fog: false,
            dithering: true,
        });
        this._skyMaterial = material;
        const dome = new THREE.Mesh(geometry, material);
        dome.renderOrder = -10;
        this.add(dome);
    }

    setHueShift(hueShift) {
        this._hueShift = hueShift;
        const horizon = this._baseHorizon.clone();
        const zenith = this._baseZenith.clone();

        const horizonHsl = { h: 0, s: 0, l: 0 };
        const zenithHsl = { h: 0, s: 0, l: 0 };

        horizon.getHSL(horizonHsl);
        zenith.getHSL(zenithHsl);

        horizonHsl.h = (horizonHsl.h + hueShift) % 1;
        zenithHsl.h = (zenithHsl.h + hueShift) % 1;

        horizon.setHSL(horizonHsl.h, horizonHsl.s, horizonHsl.l);
        zenith.setHSL(zenithHsl.h, zenithHsl.s, zenithHsl.l);

        if (this._skyMaterial) {
            this._skyMaterial.uniforms.horizonColor.value.copy(horizon);
            this._skyMaterial.uniforms.zenithColor.value.copy(zenith);
        }
    }

    _createCloudLayer(count, radius) {
        if (!this._cloudTexture) return;

        for (let i = 0; i < count; i++) {
            const material = new THREE.SpriteMaterial({
                map: this._cloudTexture,
                color: 0xffffff,
                transparent: true,
                depthWrite: false,
                blending: THREE.NormalBlending,
                fog: false,
            });

            const cloud = new THREE.Sprite(material);
            const angle = Math.random() * Math.PI * 2;
            const orbitRadius = radius * (0.42 + Math.random() * 0.32);
            const altitude = 75 + Math.random() * 55;
            const width = 62 + Math.random() * 96;
            const height = width * (0.34 + Math.random() * 0.16);

            cloud.position.set(
                Math.cos(angle) * orbitRadius,
                altitude,
                Math.sin(angle) * orbitRadius,
            );
            cloud.scale.set(width, height, 1);
            cloud.renderOrder = -2;

            cloud.userData.angle = angle;
            cloud.userData.orbitRadius = orbitRadius;
            cloud.userData.altitude = altitude;
            cloud.userData.angularSpeed = (0.03 + Math.random() * 0.05) * (Math.random() > 0.5 ? 1 : -1);
            cloud.userData.bobPhase = Math.random() * Math.PI * 2;
            cloud.userData.bobAmp = 2 + Math.random() * 5;

            this._clouds.push(cloud);
            this.add(cloud);
        }
    }

    update(dt) {
        for (const cloud of this._clouds) {
            cloud.userData.angle += cloud.userData.angularSpeed * dt;
            cloud.userData.bobPhase += 0.35 * dt;

            const y = cloud.userData.altitude + Math.sin(cloud.userData.bobPhase) * cloud.userData.bobAmp;
            cloud.position.set(
                Math.cos(cloud.userData.angle) * cloud.userData.orbitRadius,
                y,
                Math.sin(cloud.userData.angle) * cloud.userData.orbitRadius,
            );
        }
    }
}
