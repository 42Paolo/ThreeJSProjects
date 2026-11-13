import * as THREE from 'three'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height, 0.1, 200);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
camera.position.z = 10;


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();


const centreMesh = new THREE.Mesh(geometry, material);
const meshPlanet = new THREE.Mesh(geometry, material);
const speed = 1;


scene.add(meshPlanet, centreMesh);

const timer = new THREE.Timer();
timer.connect(document);

const radius = 4;

function circle(timestamp){
  timer.update(timestamp);

  const elapTime = timer.getElapsed();
  const deltaTime = timer.getDelta();

  // La formula completa e X = CentroX + r * cos(deg) | Y = CentroY + r * sin(deg)
  // ma essendo il centro della circonferenza sul quale ruota il cubo (0, 0), la 
  // formula puo' essere accorciata anche a X = r * cos(deg) Y = r * sin(deg)
  // centreMesh.rotateX(Math.sin(deltaTime * 1.5));
  // centreMesh.rotateY(Math.sin(deltaTime * 1.5));
  meshPlanet.position.x = centreMesh.position.x + Math.cos(elapTime * speed) * radius;
  meshPlanet.position.y = centreMesh.position.y + Math.sin(elapTime * speed) * radius;
  meshPlanet.rotation.z = (elapTime * speed);
  console.log(elapTime);

  renderer.render(scene, camera);
  requestAnimationFrame(circle);
}

requestAnimationFrame(circle);
console.log(meshPlanet.position);
console.log(centreMesh.position);
renderer.render(scene, camera);


