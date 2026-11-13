import * as THREE from 'three'


const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.heigth, 0.1, 20);
const renderer = new THREE.WebGLRenderer();
camera.position.set(0, 0, 20);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 15;

const timer = new THREE.Timer();
const velCube = 2.5;
function tip(timestamp)
{
  timer.update(timestamp);
  let elapsedTime = timer.getElapsed();
  let currentTime = timer.getDelta();

  mesh.position.y = Math.sin(elapsedTime * velCube) * 0.5;
  
  mesh.rotateX(Math.sin(currentTime));
  mesh.rotateY(Math.sin(currentTime));

  renderer.render(scene, camera);
  requestAnimationFrame(tip)
}
requestAnimationFrame(tip);

scene.add(mesh);

camera.lookAt(mesh.position);

renderer.setSize(sizes.width,sizes.heigth);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);