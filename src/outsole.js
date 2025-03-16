import * as THREE from 'three';

/**
 * createOutsole()
 * Creates a stadium-shaped outsole by defining a single shape that extends from
 * left to right (the length of the shoe) with semicircular arcs at each end.
 *
 * @returns {THREE.Mesh} A mesh representing the stadium-shaped outsole
 */
export function createOutsole() {
  // Basic dimensions (in arbitrary units)
  const length = 8;       // Total length (heel to toe)
  const width = 3;        // Total width at the widest point
  const thickness = 0.3;  // Thickness of the outsole

  // Compute half-dimensions for convenience
  const halfLength = length / 2;  // 4.5
  const halfWidth = width / 2;    // 1.5

  // Create a new 2D shape
  const shape = new THREE.Shape();

  /*
   * We'll define the shape from left to right:
   * 1. Move to bottom-left corner (-halfLength, -halfWidth)
   * 2. Line to bottom-right corner (halfLength, -halfWidth)
   * 3. Arc around the right end from bottom to top
   * 4. Line to top-left corner (-halfLength, halfWidth)
   * 5. Arc around the left end from top to bottom
   * 6. Close the shape
   */

  // Start at the bottom-left corner
  shape.moveTo(-halfLength, -halfWidth);

  // Straight line along the bottom to the bottom-right corner
  shape.lineTo(halfLength, -halfWidth);

  // Arc around the right end (semicircle)
  // absarc(centerX, centerY, radius, startAngle, endAngle, clockwise)
  shape.absarc(halfLength, 0, halfWidth, -Math.PI / 2, Math.PI / 2, false);

  // Straight line along the top back to the top-left corner
  shape.lineTo(-halfLength, halfWidth);

  // Arc around the left end (semicircle)
  shape.absarc(-halfLength, 0, halfWidth, Math.PI / 2, -Math.PI / 2, false);

  // Close the path (optional but good practice)
  shape.closePath();

  // Define extrusion settings to give the shape thickness
  const extrudeSettings = {
    steps: 1,
    depth: thickness,
    bevelEnabled: false, // Disable bevel for a clean, sharp edge
  };

  // Extrude the 2D shape into 3D geometry
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  // Create a material that reacts to lights (MeshStandardMaterial)
  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,    // Dark gray
    roughness: 0.8,     // Less shiny
    metalness: 0.1,     // Slight metallic look
    side: THREE.DoubleSide, // Optional: render both front & back faces
  });

  // Create the mesh from the geometry + material
  const outsole = new THREE.Mesh(geometry, material);

  // Rotate it so the stadium lies flat on the XZ plane (like a floor)
  // -Math.PI/2 points the shape "up"
  outsole.rotation.x = -Math.PI / 2;

  // Center it or shift as needed
  outsole.position.set(0, 0, 0);

  return outsole;
}
