import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createOutsole } from './outsole.js';
// Global variables
let scene, camera, renderer, controls;

// Initialize the scene
init();
// Start the animation loop
animate();

function init() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Create camera
  camera = new THREE.PerspectiveCamera(
    50, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Add orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add a grid for reference
  const gridHelper = new THREE.GridHelper(20, 20, 0xaaaaaa, 0xdedede);
  scene.add(gridHelper);

  // Add the primary stadium-shaped outsole
  const outsole = createOutsole();
  scene.add(outsole);
  
  // If you want to see the alternative version, uncomment this:
  // const alternativeOutsole = createRoundedRectOutsole();
  // alternativeOutsole.position.set(0, 0, 10); // Offset it so they don't overlap
  // scene.add(alternativeOutsole);

  // Handle window resize
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}