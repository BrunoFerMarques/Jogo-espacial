import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export const planePosition = new THREE.Vector3(5000, 0, 20);
const x = new THREE.Vector3(1, 0, 0);
const y = new THREE.Vector3(0, 1, 0);
const z = new THREE.Vector3(0, 0, 1);


let jawVelocity = 0;
let pitchVelocity = 0;
let speed = 0.02;
const maxVelocity = 0.04;

let airplane = null;

// Controle de teclado
export const controls = {};

window.addEventListener('keydown', (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  controls[e.key.toLowerCase()] = false;
});


export function loadAirplane(scene) {
  const loader = new GLTFLoader();
  loader.load('./models/speeders/scene.gltf', (gltf) => {
    airplane = gltf.scene;
    airplane.scale.set(1/100000, 1/100000, 1/100000);
    airplane.position.copy(planePosition);
    airplane.rotation.set(0, 0, 1);

    scene.add(airplane);
  });
}


// Atualizar o avião (movimento e rotação)
export function updateAirplane() {
  if (!airplane) return;

  jawVelocity *= 0.095;
  pitchVelocity *= 0.095;

  if (Math.abs(jawVelocity) > maxVelocity) jawVelocity = Math.sign(jawVelocity) * maxVelocity;
  if (Math.abs(pitchVelocity) > maxVelocity) pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  // Controle via teclado
  if (controls['a']) jawVelocity += 0.02; 
  if (controls['d']) jawVelocity -= 0.02; 
  if (controls['w']) pitchVelocity -= 0.02; 
  if (controls['s']) pitchVelocity += 0.02; 
  if (controls[' ']) speed += 0.002; 
  if (controls['x']) speed -= 0.006;


  if(controls['c']){

  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);


  x.normalize();
  y.normalize();
  z.normalize();

 
  planePosition.add(z.clone().multiplyScalar(speed));

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
    const offset = new THREE.Vector3(0, 8, -20); 
    const airplaneWorldPosition = new THREE.Vector3().setFromMatrixPosition(airplane.matrixWorld);
    const desiredPosition = offset.clone().applyQuaternion(airplane.quaternion).add(airplaneWorldPosition);
    camera.position.copy(desiredPosition)
    const airplaneUp = new THREE.Vector3(0, 1, 0).applyQuaternion(airplane.quaternion);
    camera.up.copy(airplaneUp);
    camera.lookAt(airplaneWorldPosition);
  }
}
