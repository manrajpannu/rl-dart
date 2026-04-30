import * as THREE from 'three';
import { Engine } from './Engine';
import { physics } from './physicsConfig.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/**
 * Application runtime bootstrap.
 *
 * Responsibilities:
 * - Create renderer and scene-level rendering settings
 * - Create the game Engine and attach it to the scene graph
 * - Run a fixed-timestep simulation loop for deterministic updates
 * - Render each frame using the camera provided by Engine
 */
// Simulation updates run at a fixed cadence independent of render framerate.
const FIXED_DT = 1.0 / 136.0;
const MAX_FRAME_TIME = 0.05;
const MAX_STEPS_PER_FRAME = 8;

/**
 * Initializes the rl-dart runtime in a provided container element.
 * Returns lifecycle handles so host apps (Next.js/React) can dispose cleanly.
 *
 * @param {HTMLElement} container
 * @param {{ onModeStateChange?: (state: any) => void, challengeConfig?: any }} [options]
 */
export function initRlDartApp(container, options = {}) {
  if (!container) {
    throw new Error('initRlDartApp requires a valid container element.');
  }

  const originalContainerPosition = container.style.position;
  const shouldSetContainerRelative = getComputedStyle(container).position === 'static';
  if (shouldSetContainerRelative) {
    container.style.position = 'relative';
  }

  const fpsOverlay = document.createElement('div');
  fpsOverlay.textContent = '144 FPS';
  fpsOverlay.style.position = 'absolute';
  fpsOverlay.style.top = '4px';
  fpsOverlay.style.right = '12px';
  fpsOverlay.style.color = '#ffffff';
  fpsOverlay.style.fontWeight = 'bold';
  fpsOverlay.style.textTransform = 'uppercase';
  fpsOverlay.style.fontFamily = '"Poppins", sans-serif';
  fpsOverlay.style.fontSize = '12px';
  fpsOverlay.style.letterSpacing = '0.08em';
  fpsOverlay.style.pointerEvents = 'none';
  fpsOverlay.style.zIndex = '20';
  container.appendChild(fpsOverlay);

  const getContainerSize = () => ({
    width: Math.max(1, container.clientWidth || window.innerWidth),
    height: Math.max(1, container.clientHeight || window.innerHeight),
  });

  const initialSize = getContainerSize();

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(initialSize.width, initialSize.height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.8;
  pmremGenerator.dispose();

  const engine = new Engine(renderer, options, scene);
  scene.add(engine);

  const modeStateListener = typeof options.onModeStateChange === 'function'
    ? (state) => options.onModeStateChange?.(state)
    : null;

  if (modeStateListener) {
    engine.onModeStateChange(modeStateListener);
  }


  let lastTime = performance.now();
  let accumulator = 0;
  let rafId = 0;
  let disposed = false;
  let fpsFrameCount = 0;
  let lastFpsUpdate = performance.now();

  const onResize = () => {
    const size = getContainerSize();
    const camera = engine.getCamera();
    camera.aspect = size.width / size.height;
    engine.car.camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(size.width, size.height);
  };

  /**
   * Render loop with fixed-step simulation.
   *
   * Frame time is scaled by world gameSpeed and accumulated.
   * The engine is then stepped in fixed increments to keep gameplay/physics
   * consistent across variable monitor refresh rates.
   */
  const animate = () => {
    if (disposed) return;

    rafId = requestAnimationFrame(animate);
    const currentTime = performance.now();
    let frameTime = ((currentTime - lastTime) / 1000) * physics.world.gameSpeed;
    // Cap frame time so slow frames do not cause massive simulation catch-up bursts.
    frameTime = Math.min(frameTime, MAX_FRAME_TIME);
    lastTime = currentTime;

    accumulator += frameTime;
    let steps = 0;

    while (accumulator >= FIXED_DT && steps < MAX_STEPS_PER_FRAME) {
      engine.update(FIXED_DT);
      accumulator -= FIXED_DT;
      steps += 1;
    }

    if (steps === MAX_STEPS_PER_FRAME && accumulator >= FIXED_DT) {
      // Drop stale backlog to recover smoothly instead of entering spiral-of-death.
      accumulator = 0;
    }

    fpsFrameCount += 1;
    const fpsElapsed = currentTime - lastFpsUpdate;
    if (fpsElapsed >= 250) {
      const fps = Math.round((fpsFrameCount * 1000) / fpsElapsed);
      fpsOverlay.textContent = `${fps} FPS`;
      fpsFrameCount = 0;
      lastFpsUpdate = currentTime;
    }

    renderer.render(scene, engine.getCamera());
  };

  window.addEventListener('resize', onResize);
  animate();

  const onRestart = () => {
    if (engine) {
      engine.restartCurrentMode();
    }
  };
  window.addEventListener('rldart:restart', onRestart);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('rldart:restart', onRestart);
    if (modeStateListener) {
      engine.offModeStateChange(modeStateListener);
    }

    if (typeof engine.stopCurrentMode === 'function') {
      engine.stopCurrentMode();
    }

    renderer.dispose();
    renderer.domElement.remove();
    fpsOverlay.remove();
    if (shouldSetContainerRelative) {
      container.style.position = originalContainerPosition;
    }
  };

  return {
    engine,
    scene,
    renderer,
    dispose,
  };
}

