import * as THREE from 'three'


const measures = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
  antialias: window.devicePixelRatio < 2,
  logarithmicDepthBuffer: true
})
const camera = new THREE.PerspectiveCamera(72, measures.width/measures.height, 0.1, 100);


renderer.setSize(measures.width, measures.height);

const pixelRatio = Math.min(window.devicePixelRatio, 2)

renderer.setPixelRatio(pixelRatio);

camera.position.set(8, 8, 8);
camera.lookAt(0 ,0, 0); 


const material = new THREE.MeshNormalMaterial();

const size = 6;

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const height = Math. random() * 4 + 1;
    const geometry = new THREE. BoxGeometry(1, height, 1);
    const mesh = new THREE.Mesh (geometry, material);
    mesh.position.set(-size + i * 2, height / 2, -size + j * 2);
    scene.add(mesh);
  }
}


document.body.appendChild(renderer.domElement)
renderer.render(scene, camera);