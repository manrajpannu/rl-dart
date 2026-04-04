import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { Engine } from './Engine.js';
import { physics } from './PhysicsConfig.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const container = document.getElementById('three-container');

const stats = new Stats()
container.append(stats.dom);

stats.dom.style.position = 'absolute';
stats.dom.style.top = '8px';
stats.dom.style.left = '8px';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const engine = new Engine(renderer);
scene.add(engine);

let lastTime = performance.now();
const FIXED_DT = 1.0 / 136.0; 
let accumulator = 0;




function animate() {
  requestAnimationFrame(animate);
  const currentTime = performance.now();
  let frameTime = ((currentTime - lastTime) / 1000) * physics.world.gameSpeed;
  lastTime = currentTime;

  accumulator += frameTime;

  while (accumulator >= FIXED_DT) {
    engine.update(FIXED_DT);
    accumulator -= FIXED_DT;
  }

  
  renderer.render(scene, engine.getCamera());
  stats.update();
}

window.addEventListener('resize', () => {
  const camera = engine.getCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  engine.car.camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight)

})


animate();
