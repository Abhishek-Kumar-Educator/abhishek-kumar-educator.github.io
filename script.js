// Initialize Three.js scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 50);

// Get container
const container = document.getElementById('threejs-container');

// Camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000);
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(50, 50);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Lab equipment (cubes)
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(Math.random() * 20 - 10, 1, Math.random() * 20 - 10);
    scene.add(cube);
}

// Androids (male robots) - simple humanoid
const androids = [];
for (let i = 0; i < 3; i++) {
    const group = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.BoxGeometry(0.5, 1, 0.3);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0080ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.2);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0x0080ff });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.7;
    group.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0x0080ff });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.3, 0.2, 0);
    leftArm.rotation.z = Math.PI / 4;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.3, 0.2, 0);
    rightArm.rotation.z = -Math.PI / 4;
    group.add(rightArm);

    group.position.set(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);
    androids.push(group);
    scene.add(group);
}

// Gynoids (female robots) - similar but different color
const gynoids = [];
for (let i = 0; i < 3; i++) {
    const group = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.BoxGeometry(0.5, 1, 0.3);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0080 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.2);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xff0080 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.7;
    group.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xff0080 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.3, 0.2, 0);
    leftArm.rotation.z = Math.PI / 4;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.3, 0.2, 0);
    rightArm.rotation.z = -Math.PI / 4;
    group.add(rightArm);

    group.position.set(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);
    gynoids.push(group);
    scene.add(group);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate androids and gynoids
    androids.forEach((android, index) => {
        android.rotation.y += 0.01;
        android.position.x += Math.sin(Date.now() * 0.001 + index) * 0.01;
    });

    gynoids.forEach((gynoid, index) => {
        gynoid.rotation.y -= 0.01;
        gynoid.position.z += Math.cos(Date.now() * 0.001 + index) * 0.01;
    });

    // Camera movement
    camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
    camera.position.z = Math.cos(Date.now() * 0.0005) * 5;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});