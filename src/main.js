import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { Ball } from './ball';
import { Map } from './map';
import { Car } from './car';
import { createUI } from './Ui';
import { physics } from './physicsConfig';

const container = document.getElementById('three-container');

const stats = new Stats()
container.append(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("darkgrey")
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

function setupLights () {
  const light1 = new THREE.DirectionalLight();
  light1.position.set(1,1,1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight();
  light1.position.set(-1,1,-0.5);
  scene.add(light2);

  const light3 = new THREE.AmbientLight('white', 1.);
  scene.add(light3);


}

const ball = new Ball();
scene.add(ball);

const map = new Map(40);
map.gen();
map.position.y = -5;
scene.add(map);

const car = new Car(scene);
scene.add(car);

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
    ball.intersectsLine(car.getForwardLine(), FIXED_DT);
    car.applyInputs(FIXED_DT);

    accumulator -= FIXED_DT;
  }

  const renderDt = frameTime; 
  car.updateCamera(ball.position, renderDt);

  renderer.render(scene, car.camera);
  stats.update();
}

window.addEventListener('resize', () => {
  car.camera.aspect = window.innerWidth / window.innerHeight;
  car.camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight)

})

setupLights();
createUI(car, ball);
animate();
