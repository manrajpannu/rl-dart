import { withAssetBase } from './assetBase.js';

class SoundManager {
    constructor() {
        this.ctx = null;
        this.buffers = {};
        this.loading = {};
    }

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    async loadSound(id, src) {
        if (this.buffers[id] || this.loading[id]) return;
        this.loading[id] = true;
        try {
            const url = typeof src === 'string' && src.startsWith('http') ? src : withAssetBase(src);
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            
            this.init();
            if (this.ctx) {
                const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
                this.buffers[id] = audioBuffer;
            }
        } catch (e) {
            console.warn(`Failed to load sound [${id}] from ${src}:`, e);
        }
        delete this.loading[id];
    }

    playSound(id, volume = 1.0) {
        this.init();
        if (!this.ctx) return;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        
        const buffer = this.buffers[id];
        if (!buffer) return;

        try {
            const source = this.ctx.createBufferSource();
            source.buffer = buffer;

            const gainNode = this.ctx.createGain();
            gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
            
            // Apply a smooth 50ms fade-out at the very end of the buffer to prevent popping/clipping artifacts
            const fadeStart = Math.max(0, this.ctx.currentTime + buffer.duration - 0.05);
            gainNode.gain.setTargetAtTime(0, fadeStart, 0.015);
            
            source.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            source.start(0);
        } catch (e) {
            console.warn(`Failed to play sound [${id}]:`, e);
        }
    }
}

export const soundManager = new SoundManager();
