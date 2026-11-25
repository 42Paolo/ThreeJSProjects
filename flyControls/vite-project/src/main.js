import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();


const material = new THREE.MeshNormalMaterial();
const size = 6;

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++){
    const height = Math. random() * 4 + 1
    const geometry = new THREE. BoxGeometry(1, height, 1)
    const mesh = new THREE.Mesh (geometry, material)
    const offset = size - 1;
    mesh.position.set(i * 2 - offset, height / 2, j * 2 - offset)
    scene.add(mesh);
  }
}




const fov = 75;
const camera = new THREE.PerspectiveCamera(fov, sizes.width/sizes.height, 0.1, 200);

camera.position.set(8,8,8);
camera.lookAt(0,0,0);


const renderer = new THREE.WebGLRenderer({
  antialias: true,
})

const pixelRatio = Math.min(devicePixelRatio, 2);

renderer.setPixelRatio(pixelRatio);
renderer.setSize(sizes.width, sizes.height);
window.addEventListener('resize', onresize)


const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 5;
controls.rollSpeed = 2;
controls.dragToLook = true;

const timer = new THREE.Timer();

document.body.appendChild(renderer.domElement);


function tic(timestamp){
  timer.update(timestamp);
  const deltaTime = timer.getDelta();

  controls.update(deltaTime);
  renderer.render(scene, camera);
  requestAnimationFrame(tic);
}

requestAnimationFrame(tic);

function onresize(){
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
}

