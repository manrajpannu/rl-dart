import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
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
 * @param {{ onModeStateChange?: (state: any) => void }} [options]
 */
export function initRlDartApp(container, options = {}) {
  if (!container) {
    throw new Error('initRlDartApp requires a valid container element.');
  }

  // const stats = new Stats();
  // container.append(stats.dom);
  // stats.dom.style.position = 'absolute';
  // stats.dom.style.top = '8px';
  // stats.dom.style.left = '8px';

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
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('rgba(181, 225, 255, 0.85)');

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.8;
  pmremGenerator.dispose();

  const engine = new Engine(renderer);
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

    renderer.render(scene, engine.getCamera());
    // stats.update();
  };

  window.addEventListener('resize', onResize);
  animate();

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    if (modeStateListener) {
      engine.offModeStateChange(modeStateListener);
    }

    renderer.dispose();
    renderer.domElement.remove();
    // stats.dom.remove();
  };

  return {
    engine,
    scene,
    renderer,
    dispose,
  };
}
