import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { Ball } from './Ball';
import { Map } from './Map';
import { Car } from './Car';
import { createUI } from './Ui';
import { physics } from './physicsConfig';

const stats = new Stats()
document.body.append(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("darkgrey")
document.body.appendChild(renderer.domElement);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
// camera.position.set(-8,8,-8);
// camera.lookAt(0,0,0);

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.set(0,0,0)
// controls.update()

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

function animate() {
  requestAnimationFrame(animate);
  const currentTime = performance.now();
  const dt = ((currentTime - lastTime) / 1000) * physics.world.gameSpeed; 

  ball.intersectsLine(car.getForwardLine(), dt);
  car.applyInputs(dt);
  car.updateCamera(ball.position, dt);
  lastTime = currentTime;
  renderer.render(scene, car.camera);
  stats.update()
}

window.addEventListener('resize', () => {
  car.camera.aspect = window.innerWidth / window.innerHeight;
  car.camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight)

})

setupLights();
createUI(car, ball);
animate();
