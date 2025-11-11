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

stats.dom.style.position = 'absolute';
stats.dom.style.top = '8px';
stats.dom.style.left = '8px';

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
  light2.position.set(-1,1,-0.5);
  scene.add(light2);
  
  const light3 = new THREE.AmbientLight('white', 2.0);
  scene.add(light3);

  const light4 = new THREE.DirectionalLight();
  light4.position.set(0,-1,0);
  light4.target.position.set(0,0,0);
  scene.add(light4);

}

const ball = new Ball(new THREE.Vector3(0, 0, -3), 0.9125);
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

const canvas = document.getElementById('hud');
const ctx = canvas.getContext('2d');
const R = 40; // radius of circle
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function drawDot(yawDiff, pitchDiff) {
  // Convert yaw and pitch to polar coordinates
  yawDiff = -yawDiff * 100;
  pitchDiff = -pitchDiff * 100;
  const angle = Math.atan2(pitchDiff, yawDiff); // angle in radians
  const length = Math.min(Math.sqrt(yawDiff * yawDiff + pitchDiff * pitchDiff), R-5); // clamp to circle radius

  const dotX = centerX + length * Math.cos(angle);
  const dotY = centerY + length * Math.sin(angle);

  // filled grey circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
  ctx.fillStyle = 'grey';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // white dot
  ctx.beginPath();
  ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();

}

window.addEventListener("gamepadconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index,
    gp.id,
    gp.buttons.length,
    gp.axes.length,
  );
});

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
