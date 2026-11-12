import * as THREE from 'three'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 20);
camera.position.z = 1;

renderer.setSize(sizes.width, sizes.height);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material)
const mesh2 = mesh.clone();
const mesh3 = mesh.clone();

mesh.position.x = 0;
mesh2.position.x = 1.5;
mesh3.position.x = -1.5;

const groupMesh = new THREE.Group();
groupMesh.add(mesh, mesh2, mesh3);
groupMesh.position.z = -5;

const timer = new THREE.Timer();
timer.connect(document);


function tip(timestamp){

  timer.update(timestamp);  
  
  let elapsedtTime = timer.getElapsed();
  let deltaTime = timer.getDelta();
 

  groupRotate(deltaTime);
  fluidCube(elapsedtTime, groupMesh);

  
  renderer.render(scene, camera);
  requestAnimationFrame(tip)
}

function fluidCube(elapsedTime, meshCube){
  meshCube.children.slice(1, 3).forEach(child => {
    child.position.y = Math.sin(elapsedTime);
  });
}

function groupRotate(deltaTime){
  groupMesh.children.forEach(child => {
    child.rotateX(deltaTime);
    child.rotateY(deltaTime);
  });
}

requestAnimationFrame(tip)
scene.add(groupMesh);

document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);