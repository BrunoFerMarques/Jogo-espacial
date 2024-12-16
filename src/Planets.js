import * as THREE from 'three'

let planets = new Array
let scaleSize = 100
let scalePosition = 10
let scaleSun = 20 * scaleSize
let earthPosition = 160*scalePosition + scaleSun
let positionSun = 0
let mercuryPosition = 50*scalePosition + scaleSun
let venusPosition = 100*scalePosition + scaleSun
let marsPosition = 227.9*scalePosition + scaleSun
let jupiterPosition = 640.3*scalePosition + scaleSun
let saturnPosition =  1430*scalePosition + scaleSun
export function loadPlanets(scene){

  
  //carregando sol e anel de saturno, pois sao diferentes
  const textureLoaderSun = new THREE.TextureLoader()
  textureLoaderSun.load(
    './textures/planets/sun/8k_sun.jpg',
    (texture) => {
      console.log("Textura do sol carregada com sucesso!")
      const geometrySun = new THREE.SphereGeometry(20*scaleSize, 500, 500);  
      const materialSun = new THREE.MeshStandardMaterial({ 
        map: texture,
        emissive: 0xffc222,  // Cor de emissão (amarelo, como o Sol)
        emissiveIntensity: 1,  // Intensidade da emissão
        roughness: 0.2,  // Opacidade e rugosidade (ajuste conforme necessário)
        metalness: 0.5,
       });  
      const sun = new THREE.Mesh(geometrySun, materialSun);  
      sun.position.set(0,0,0)
      planets.push(sun);
      scene.add(sun);
      //configurando a ilmunação do sol
      const sunLight1 = new THREE.PointLight(0xffc222, 650, 1000000000000,0.6); 
      sunLight1.position.set(0, 0, 0);
      sunLight1.castShadow = true; 
      scene.add(sunLight1);
      const helpSunLight1 = new THREE.PointLightHelper(sunLight1, 40)
      scene.add(helpSunLight1)
      
    }
  )

  const saturnRingLoader = new THREE.TextureLoader().load('./textures/planets/saturn/8k_saturn_ring_alpha.png')
  const saturnRingGeometry = new THREE.RingGeometry(12*scaleSize + 200, 32, 32);
  const saturnRingMaterial = new THREE.MeshStandardMaterial({
    map: saturnRingLoader,
      transparent: true,   
      opacity: 0.8,        
      side: THREE.DoubleSide  
      
  });
  const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
  saturnRing.name = 'saturnRing'
  saturnRing.position.set(saturnPosition, 0, 0); // Centralizar no planeta
  saturnRing.rotation.x = Math.PI / 2; 
  planets.push(saturnRing)
  scene.add(saturnRing)

  let earth = createPlanet(scene, 'earth','./textures/planets/earth/2k_earth_daymap.jpg', 1.2756*scaleSize, earthPosition,true, './textures/planets/earth/2k_earth_clouds.jpg', 'clouds')
  let mercury = createPlanet(scene, 'mercury','./textures/planets/mercury/2k_mercury.jpg', 0.4880*scaleSize, mercuryPosition)
  let venus = createPlanet(scene, 'venus','./textures/planets/venus/8k_venus_surface.jpg', 1.2104*scaleSize, venusPosition, true, './textures/planets/venus/4k_venus_atmosphere.jpg', 'venusAtmosphere')
  let mars = createPlanet(scene, 'mars','./textures/planets/mars/8k_mars.jpg', 0.6794*scaleSize, marsPosition)
  let jupiter = createPlanet(scene, 'jupiter', './textures/planets/jupiter/8k_jupiter.jpg', 10*scaleSize, jupiterPosition)
  let saturn = createPlanet(scene, 'saturn','./textures/planets/saturn/8k_saturn.jpg', 8*scaleSize, saturnPosition)
  
}
function createPlanet(scene, name ,texturePath, size, position, hasAtmosphere = false, atmosphereTexturePath, nameAthmosphere) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(texturePath, (texture) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const planet = new THREE.Mesh(geometry, material);
      
      planet.name = name
      planet.position.set(position, 0, 0);
      planet.receiveShadow = true;
      planet.castShadow = true;
      planets.push(planet);
      scene.add(planet);

      if (hasAtmosphere && atmosphereTexturePath) {
        // Criar a atmosfera
        const atmosphereGeometry = new THREE.SphereGeometry(size + 2, 32, 32); // Raio ligeiramente maior
        const atmosphereMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load(atmosphereTexturePath),
            transparent: true,
            opacity: 0.5, // Ajustar para um efeito semi-transparente
            side: THREE.DoubleSide, // Renderizar ambos os lados da esfera
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        atmosphere.name = nameAthmosphere
        atmosphere.position.set(position, 0, 0);
        scene.add(atmosphere);
        planets.push(atmosphere); // Adicionar atmosfera à lista de planetas para rotação
    }
  });
}

//rotação no proprio eixo
export function rotatePlanets() {
  planets.forEach((planet) => {
    planet.rotation.y += 0.001; 
  });
}

let planetsVelocitys = {
  earth: 0.0002,
  mercury: 0.0004,
  venus: 0.0005,
  mars: 0.0003,
  jupiter: 0.0001,
  saturn: 0.0001 
}

let theta = {
  earth : 0,
  clouds: 0,
  mercury: 0,
  venus: 0,
  venusAtmosphere:0,
  mars: 0,
  jupiter: 0,
  saturn: 0,  
  saturnRing: 0,
}

export function translatePlanets(){
  planets.forEach((planet) =>{
    if (planet.name == 'earth') {
      planet.position.set( earthPosition * Math.cos(theta.earth),0, earthPosition * Math.sin(theta.earth))
      theta.earth += planetsVelocitys.earth
    }
    if(planet.name == 'clouds'){
      planet.position.set( earthPosition * Math.cos(theta.earth),0, earthPosition * Math.sin(theta.earth))
      theta.clouds += planetsVelocitys.earth
    }
    if (planet.name == 'mercury') {
      planet.position.set( mercuryPosition * Math.cos(theta.mercury),0, mercuryPosition * Math.sin(theta.mercury))
      theta.mercury += planetsVelocitys.mercury
    }
    if (planet.name == 'venus') {
      planet.position.set( venusPosition * Math.cos(theta.venus),0, earthPosition * Math.sin(theta.venus))
      theta.venus += planetsVelocitys.venus
    }
    if (planet.name == 'venusAtmosphere') {
      planet.position.set( venusPosition * Math.cos(theta.venus),0, earthPosition * Math.sin(theta.venus))
      theta.venusAtmosphere += planetsVelocitys.venus
    }
    if (planet.name == 'mars') {
      planet.position.set( marsPosition * Math.cos(theta.mars),0, marsPosition * Math.sin(theta.mars))
      theta.mars += planetsVelocitys.mars
    }
    if (planet.name == 'jupiter') {
      planet.position.set( jupiterPosition * Math.cos(theta.jupiter),0, jupiterPosition * Math.sin(theta.jupiter))
      theta.jupiter += planetsVelocitys.jupiter
    }
    if (planet.name == 'saturn') {
      planet.position.set( saturnPosition * Math.cos(theta.saturn),0, saturnPosition * Math.sin(theta.saturn))
      theta.saturn += planetsVelocitys.saturn
    }
    if (planet.name == 'saturnRing') {
      planet.position.set( saturnPosition * Math.cos(theta.saturn),0, saturnPosition * Math.sin(theta.saturn))
      theta.saturnRing += planetsVelocitys.saturn
    }
  })
}


