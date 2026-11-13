import * as THREE from 'three'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const cubeConfig = {
  count: 10,
  spacing: 2.5,
  speed: 1,
  x: 1,
  y: 1,
  z: 1,
  positionZ: -8,
};


// SETUP
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(80, sizes.width/sizes.height, 0.1, 20);

renderer.setSize(sizes.width, sizes.height);
camera.position.z = 1;
document.body.appendChild(renderer.domElement);

// MESH VARIABLE
const material = new THREE.MeshNormalMaterial();
const geometry = new THREE.BoxGeometry(cubeConfig.x, cubeConfig.y, cubeConfig.z);

// FUNCTION FOR CUBES
function cubeCreate({count, spacing}){
  const meshGroup = new THREE.Group();

  for(let i = 0; i < count; i++){
    const cube = new THREE.Mesh(geometry, material);
    // con i * spacing li avremmo uno a 0 poi 1.5 poi 3 .. 13.5 pero
    // dato che la camera e puntata a cord 0 0 0 vdremmo la fila verso sinistra
    // quindi andando ad applicare questa formula li avremmo tutti distanziati uguali
    // esempio di i = 5 verrebbe (10 - (9 / 2)) * 1.5
    cube.position.x = (i - (count - 1) / 2) * spacing; 
    cube.userData.index = i;
    meshGroup.add(cube); 
  }

  return meshGroup;
}

const cubes = cubeCreate(cubeConfig);
cubes.position.z = cubeConfig.positionZ;

const timer = new THREE.Timer();
timer.connect(document);

function tip(timestamp){
  timer.update(timestamp);
  
  const elapsedTime = timer.getElapsed();
  const deltaTime = timer.getDelta();
  // console.log("DELTA = " + deltaTime);
  // console.log("Elapsed = " + elapsedTime);
  eachCubeDifferentFloat(elapsedTime);
  renderer.render(scene, camera);
  requestAnimationFrame(tip);
}

function eachCubeDifferentFloat(elapsedTime){
  cubes.children.forEach(element => {
    element.position.y = Math.sin(elapsedTime);
  });
}

requestAnimationFrame(tip);


scene.add(cubes);

renderer.render(scene, camera);

