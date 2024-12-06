import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { loadAirplane, updateAirplane, updateCamera } from './Aircraft.js';
import { loadPlanets, rotatePlanets} from './Planets.js';


//configurando o tamanho da ja nela de recorte
window.innerWidth = 1000
window.innerHeight = 800

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true; // Habilita sombras
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //melhora sombras
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.set(-50, 0, 0);

//carregando a textura e colocando como fundo da cena
const scene = new THREE.Scene();
const loaderScene = new THREE.TextureLoader();
loaderScene.load('./textures/galaxy/8k_stars_milky_way.jpg', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping; //textura é esferica
  scene.background = texture;
});
export default scene; 

const orbitControls = new OrbitControls(camera, renderer.domElement);
let isOrbitControls = false
const iluminationGlobal = new THREE.AmbientLight(0xfffaf0, 1);
scene.add(iluminationGlobal);



window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

loadAirplane(scene); 
loadPlanets(scene)
window.addEventListener('keydown', (e) => {
  if(e.key == 'c'){
    isOrbitControls = !isOrbitControls
  }
});
function animate() {
  requestAnimationFrame(animate);
  rotatePlanets()
  updateAirplane();  


  updateCamera(camera)
  

  renderer.render(scene, camera);
}

animate();
