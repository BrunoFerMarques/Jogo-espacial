import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/Addons.js'

//plano de posição inicial do avião
export const planePosition = new THREE.Vector3(5000, 0, 20);
//vetores para rotação
const x = new THREE.Vector3(1, 0, 0);
const y = new THREE.Vector3(0, 1, 0);
const z = new THREE.Vector3(0, 0, 1);

//configurações de jogabilidade do avião jawVelocity é a guinada e bearing é o giro em torno do proprio eixo
let jawVelocity = 0;
let bearingVelocity = 0;
let speed = 0.02;
const maxVelocity = 0.04;
let airplane = null;


//configurações iniciais dos controles
export const controls = {};
window.addEventListener('keydown', (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  controls[e.key.toLowerCase()] = false;
});

//configurações do avião, texturas, tamanho e posição, levo ao main para carrega-lo
export function loadAirplane(scene) {
  const loader = new GLTFLoader();
  loader.load('./models/speeders/scene.gltf', (gltf) => {
    airplane = gltf.scene;
    airplane.scale.set(1/1000, 1/1000, 1/1000);
    airplane.position.copy(planePosition);
    airplane.rotation.set(0, 0, 1);
    scene.add(airplane);
  });
}


// Atualizar o avião (movimento e rotação)
export function updateAirplane() {
  if (!airplane) return;

  jawVelocity *= 0.095;
  bearingVelocity *= 0.095;

  if (Math.abs(jawVelocity) > maxVelocity) jawVelocity = Math.sign(jawVelocity) * maxVelocity;
  if (Math.abs(bearingVelocity) > maxVelocity) bearingVelocity = Math.sign(bearingVelocity) * maxVelocity;

  // Controles do teclado
  if (controls['a']) jawVelocity += 0.02; 
  if (controls['d']) jawVelocity -= 0.02; 
  if (controls['w']) bearingVelocity -= 0.02; 
  if (controls['s']) bearingVelocity += 0.02; 
  if (controls[' ']) speed += 0.002; 
  if (controls['x']) speed -= 0.006;

  //aplicando as rotações 
  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(x, bearingVelocity);
  z.applyAxisAngle(x, bearingVelocity);

  //normalizar as matrizes
  x.normalize();
  y.normalize();
  z.normalize();

  //adicionar a posicao ao plano
  planePosition.add(z.clone().multiplyScalar(speed));
  
  //adcionar ao plano as matrizes de translacao e rotacao
  const rotMatrix = new THREE.Matrix4().makeBasis(x, y, z);
  airplane.matrixAutoUpdate = false;
  airplane.matrix
    .identity()
    .multiply(new THREE.Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
    .multiply(rotMatrix);
    airplane.quaternion.setFromRotationMatrix(rotMatrix);
}




export function updateCamera(camera) {
  if (airplane) {
    const airplaneWorldPosition = new THREE.Vector3().setFromMatrixPosition(airplane.matrixWorld);
    const offsetThirdPerson = new THREE.Vector3(0, 8, -20); 
    const desiredPosition  = offsetThirdPerson.clone()
    .applyQuaternion(airplane.quaternion)
    .add(airplaneWorldPosition);
    
    camera.position.copy(desiredPosition)
    const airplaneUp = new THREE.Vector3(0, 1, 0).applyQuaternion(airplane.quaternion);
    camera.up.copy(airplaneUp);
    camera.lookAt(airplaneWorldPosition);
  }
}