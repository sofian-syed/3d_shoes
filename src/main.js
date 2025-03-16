// Import the entire Three.js library as the namespace "THREE".
// Three.js is a high-level library built on top of WebGL (a low-level web graphics API)
// to simplify the creation and rendering of 3D graphics in the browser.
import * as THREE from 'three';

// Import OrbitControls from the Three.js examples.
// OrbitControls enables mouse/touch interactions (rotate, pan, zoom) with the camera.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/*
  Global Variables:
  - scene: The container for all 3D objects, lights, and cameras.
  - camera: The viewpoint from which we render the scene.
  - renderer: Responsible for drawing the scene using WebGL.
  - controls: Provides interactive camera controls.
  - shoeGroup: A Three.js Group that will hold all shoe components.
*/
let scene, camera, renderer, controls, shoeGroup;

// Initialize the scene and start rendering.
init();
animate();

/**
 * init()
 * Initializes the 3D scene, including the scene container, camera, renderer, lighting,
 * OrbitControls, and sets up a modular group (shoeGroup) to hold all future shoe components.
 */
function init() {
  // -------------------------------
  // Create the Scene
  // -------------------------------
  // The Scene is where all 3D objects, lights, and cameras are placed.
  scene = new THREE.Scene();
  // Set the background color of the scene to a light grey.
  scene.background = new THREE.Color(0xf0f0f0);

  // -------------------------------
  // Set Up the Camera
  // -------------------------------
  // A PerspectiveCamera simulates human eye perspective.
  // Parameters: (field of view, aspect ratio, near clipping plane, far clipping plane)
  camera = new THREE.PerspectiveCamera(
    75, // FOV: 75 degrees
    window.innerWidth / window.innerHeight, // Aspect ratio based on window dimensions
    0.1, // Near clipping plane: objects closer than 0.1 units are not visible
    1000 // Far clipping plane: objects further than 1000 units are not visible
  );
  // Position the camera at (3, 3, 3) in the 3D space.
  camera.position.set(3, 3, 3);
  // Make sure the camera is looking at the origin (0, 0, 0) where our objects will be placed.
  camera.lookAt(0, 0, 0);

  // -------------------------------
  // Set Up the Renderer
  // -------------------------------
  // The WebGLRenderer uses WebGL to draw the scene. Antialiasing is enabled for smoother edges.
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // Set the renderer size to fill the entire window.
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Adjust for high-DPI displays.
  renderer.setPixelRatio(window.devicePixelRatio);
  // Append the renderer's canvas element to the div with id "canvas-container".
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // -------------------------------
  // Set Up OrbitControls
  // -------------------------------
  // OrbitControls allow users to interact with the scene using the mouse or touch.
  controls = new OrbitControls(camera, renderer.domElement);
  // Enable damping for smoother interactions.
  controls.enableDamping = true;

  // -------------------------------
  // Add Basic Lighting
  // -------------------------------
  // AmbientLight lights up all objects in the scene uniformly.
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // White light at half intensity.
  scene.add(ambientLight);

  // DirectionalLight simulates light from a distant source (like the sun).
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // White light at high intensity.
  // Position the directional light to cast shadows and create depth.
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // -------------------------------
  // Establish a Modular Shoe Structure
  // -------------------------------
  // Create a new THREE.Group to act as a container for all shoe components.
  // This group makes it easy to manipulate the entire shoe (e.g., move, rotate, scale) as one object.
  shoeGroup = new THREE.Group();
  // Optionally, name the group for easier identification in debugging.
  shoeGroup.name = 'ShoeGroup';
  // Add the shoeGroup to the scene.
  scene.add(shoeGroup);

  // -------------------------------
  // Add a Test Object (Cube) as a Placeholder in the Shoe Group
  // -------------------------------
  // Create a simple cube geometry as a placeholder to confirm that our group is working.
  const geometry = new THREE.BoxGeometry(); // Default cube size (1 unit per side).
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff }); // Blue material.
  const cube = new THREE.Mesh(geometry, material); // Combine geometry and material into a mesh.
  // Instead of adding the cube directly to the scene, add it to our shoeGroup.
  shoeGroup.add(cube);

  // -------------------------------
  // Handle Window Resize
  // -------------------------------
  // This event listener ensures the camera and renderer adapt if the browser window size changes.
  window.addEventListener('resize', onWindowResize);
}

/**
 * onWindowResize()
 * Adjusts the camera's aspect ratio and renderer size when the browser window is resized.
 */
function onWindowResize() {
  // Update camera aspect ratio to new window dimensions.
  camera.aspect = window.innerWidth / window.innerHeight;
  // Recalculate the projection matrix after changing the aspect ratio.
  camera.updateProjectionMatrix();
  // Update renderer size to match new window size.
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * animate()
 * The main animation loop that updates the scene and re-renders it on every frame.
 * Uses requestAnimationFrame for smooth animations.
 */
function animate() {
  // Request the next animation frame.
  requestAnimationFrame(animate);
  // Update the OrbitControls (especially necessary with damping enabled).
  controls.update();
  // Render the scene from the perspective of the camera.
  renderer.render(scene, camera);
}
