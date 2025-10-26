import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// --- Scene setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Floor

	{

		const planeSize = 40;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		//texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

// Octane
const gltfLoader = new GLTFLoader();
const url = 'resources/models/octane/scene.gltf';
let octane = null;


gltfLoader.load(url, (gltf) => {
  octane = gltf.scene;

  octane.scale.set(0.012, 0.012, 0.012);
  octane.position.set(0, -0.2, 0);
  octane.rotation.set(0, Math.PI / 2, 0); // Face forward along -Z
  
  // Add to scene
  scene.add(octane);
  
  // Create a pivot group for easy rotation and movement
  const pivot = new THREE.Object3D();
  scene.add(pivot);
  pivot.add(octane);
  
  // Store pivot globally
  window.octanePivot = pivot;
});

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 5;
scene.add(cube);
// Lighting
const light = new THREE.DirectionalLight(0xffffff, 4.0);
light.position.set(1, 2, 3);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 5;
camera.position.y = 2;

// --- Input state ---
const keys = { w: false, s: false, a: false, d: false, q: false, e: false, ArrowLeft: false, ArrowRight: false };
const mouseButtons = { left: false };

let lastTime = performance.now();

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (keys.hasOwnProperty(key)) keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  const key = e.key;
  if (keys.hasOwnProperty(key)) keys[key] = false;
});

window.addEventListener("mousedown", (e) => {
  if (e.button === 0) mouseButtons.left = true;
});
window.addEventListener("mouseup", (e) => {
  if (e.button === 0) mouseButtons.left = false;
});


// --- Camera follow settings ---
const cameraOffset = new THREE.Vector3(0, 2, 6); // relative offset (up + back)
const cameraLag = 0.05; // smoothing factor (0 = instant snap, 1 = frozen)


function animate() {
  requestAnimationFrame(animate);

  const rotationSpeed = 0.03;
  const moveSpeed = 0.02;

  // Create a quaternion for this frame's rotation
  const deltaQuat = new THREE.Quaternion();

  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000; // seconds
  lastTime = currentTime;

  function rotationAmountInRadians(rps, deltaTime) {
    return rps * 2 * Math.PI * deltaTime;
  }

  // Temporary axis vectors
  const xAxis = new THREE.Vector3(1, 0, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);

  
  // Extract local axes from quaternion
  const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(octane.quaternion);
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(octane.quaternion);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(octane.quaternion);

  // Apply pitch (W/S)
  if (keys.w) {
    deltaQuat.setFromAxisAngle(xAxis, -rotationAmountInRadians(1/1.5, deltaTime));
    octanePivot.quaternion.multiply(deltaQuat);
  }
  if (keys.s) {
    deltaQuat.setFromAxisAngle(xAxis, rotationAmountInRadians(1/1.5, deltaTime));
    octanePivot.quaternion.multiply(deltaQuat);
  }

  // Apply yaw (A/D)
  if (keys.a) {
    deltaQuat.setFromAxisAngle(yAxis, rotationAmountInRadians(1/1.5, deltaTime));
    octanePivot.quaternion.multiply(deltaQuat);
  }
  if (keys.d) {
    deltaQuat.setFromAxisAngle(yAxis, -rotationAmountInRadians(1/1.5, deltaTime));
    octanePivot.quaternion.multiply(deltaQuat);
  }

  // Apply roll (Q/E)
  if (keys.ArrowLeft) {
    deltaQuat.setFromAxisAngle(zAxis, rotationAmountInRadians(1/1.11, deltaTime));
    octanePivot.quaternion.multiply(deltaQuat);
  }
  if (keys.ArrowRight) {
    deltaQuat.setFromAxisAngle(zAxis, -rotationAmountInRadians(1/1.11, deltaTime));
    octanePivot.quaternion.multiply(deltaQuat);
  }

  // Move forward on left-click (along local Z axis)
  if (mouseButtons.left) {
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(octanePivot.quaternion);
    octanePivot.position.addScaledVector(forward, moveSpeed);
  } 

    // --- CAMERA FOLLOW (Rocket League style) ---
  const desiredCameraPos = octanePivot.position
    .clone()
    .addScaledVector(up, cameraOffset.y)
    .addScaledVector(forward, -cameraOffset.z);

  
  // // Smoothly interpolate camera position
  camera.position.lerp(desiredCameraPos, 1 - Math.pow(1 - cameraLag, deltaTime * 60));

  // // Camera always looks at car (can tweak for offset aiming)
  const lookTarget = octanePivot.position.clone().addScaledVector(forward, 2);
  camera.lookAt(cube.position);


  // --- CAMERA FOLLOW (Rocket League style) ---
  // if (octanePivot) {
  //   // Local offset of camera relative to the car (back and up)
  //   const localCameraOffset = new THREE.Vector3(0, 0, 6);

  //   // Transform the local offset to world space relative to the car
  //   const worldCameraPos = localCameraOffset.clone().applyQuaternion(octanePivot.quaternion).add(octanePivot.position);

  //   // Directly set camera position (no lag)
  //   camera.position.copy(worldCameraPos);

  //   // Look slightly above the car for a smoother feel
  //   const lookTarget = new THREE.Vector3(0, 0, 0)
  //     .applyQuaternion(octanePivot.quaternion)
  //     .add(octanePivot.position);

  //   camera.lookAt(lookTarget);
  // }

  renderer.render(scene, camera);
}


animate();
