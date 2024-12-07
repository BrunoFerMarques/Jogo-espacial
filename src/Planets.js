import * as THREE from 'three'

console.log("Three carrregado com sucesso", THREE)
let planets = [];
let scalePosition = 10
let scaleSize = 100
let positionSun = 20 * scaleSize
export function loadPlanets(scene) {
  const textureLoaderEarth = new THREE.TextureLoader();
  textureLoaderEarth.load(
    './textures/planets/earth/2k_earth_daymap.jpg',  
    (texture) => {  
      
      const geometryEarth = new THREE.SphereGeometry(1.2756*scaleSize, 32, 32);//tamanho  
      const materialEarth = new THREE.MeshStandardMaterial({ map: texture });  
      const earth = new THREE.Mesh(geometryEarth, materialEarth);  
      earth.castShadow = true
      earth.receiveShadow = true
      planets.push(earth);
      scene.add(earth);
      earth.position.set(150*scalePosition + positionSun, 0, 500);  //posição
      console.log("Terra carregada com sucesso!", earth);
      
      const cloudTexture = new THREE.TextureLoader().load('./textures/planets/earth/2k_earth_clouds.jpg')
      const cloudGeometry = new THREE.SphereGeometry(1.2756*scaleSize + 1, 32, 32); // Raio ligeiramente maior que o da Terra  
      const cloudMaterial = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,   
        opacity: 0.5,        
        side: THREE.DoubleSide  
        
      });
      const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      clouds.position.set(150*scalePosition + positionSun,0,500)
      console.log("Nuvens da terra carregada com sucesso!", clouds);  
      scene.add(clouds)
      planets.push(clouds)
    }
  )
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
      sun.position.set(0* scalePosition,0,0)
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

  const textureLoaderMercury = new THREE.TextureLoader()
  textureLoaderMercury.load(
    './textures/planets/mercury/2k_mercury.jpg',
    (texture) => {
      console.log("Textura de mercurio carregada com sucesso!")
      const geometryMercury = new THREE.SphereGeometry(0.4880*scaleSize, 100, 100);  
      const materialMercury = new THREE.MeshStandardMaterial({ map: texture });  
      const mercury = new THREE.Mesh(geometryMercury, materialMercury);  
      mercury.position.set(60*scalePosition + positionSun,0,0)
      
      mercury.receiveShadow = true
      mercury.castShadow = true
      planets.push(mercury);
      scene.add(mercury);
    }
  )

  const textureLoaderVenus = new THREE.TextureLoader()
  textureLoaderVenus.load(
    './textures/planets/venus/8k_venus_surface.jpg',
    (texture) => {
      console.log("Textura de venus carregada com sucesso!")
      const geometryVenus = new THREE.SphereGeometry(1.2104*scaleSize, 100, 100);  
      const materialVenus = new THREE.MeshStandardMaterial({ map: texture });  
      const venus = new THREE.Mesh(geometryVenus, materialVenus);  
      venus.position.set(108.2*scalePosition + positionSun,0,200)
      venus.receiveShadow = true
      venus.castShadow = true
      planets.push(venus);
      scene.add(venus);
      
      const venusAtmosphereLoader = new THREE.TextureLoader().load('./textures/planets/venus/4k_venus_atmosphere.jpg')
      const venusAtmosphereGeometry = new THREE.SphereGeometry(1.21045*scaleSize, 32, 32);
      const venusAtmosphereMaterial = new THREE.MeshStandardMaterial({
        map: venusAtmosphereLoader,
        transparent: true,   
        opacity: 0.5,        
        side: THREE.DoubleSide  
        
      });
      const venusAtmosphere = new THREE.Mesh(venusAtmosphereGeometry, venusAtmosphereMaterial);
      venusAtmosphere.position.set(150*scalePosition + positionSun,0,500)
      console.log("atmosfera de venus carregada com sucesso!", venus);  
      scene.add(venusAtmosphere)
    }
  )

  const textureLoaderMars = new THREE.TextureLoader()
  textureLoaderMars.load(
    './textures/planets/mars/8k_mars.jpg',
    (texture) => {
      console.log("Textura de marte carregada com sucesso!")
      const geometryMars = new THREE.SphereGeometry(0.6794*scaleSize, 100, 100);  
      const materialMars = new THREE.MeshStandardMaterial({ map: texture });  
      const mars = new THREE.Mesh(geometryMars, materialMars);  
      mars.position.set(227.9*scalePosition + positionSun,0,0)
      
      mars.receiveShadow = true
      mars.castShadow = true
      planets.push(mars);
      scene.add(mars);
    }
  )

  const textureLoaderJupiter = new THREE.TextureLoader()
  textureLoaderJupiter.load(
    './textures/planets/jupiter/8k_jupiter.jpg',
    (texture) => {
      console.log("Textura de jupiter carregada com sucesso!")
      const geometryJupiter = new THREE.SphereGeometry(10*scaleSize, 100, 100);  
      const materialJupiter = new THREE.MeshStandardMaterial({ map: texture });  
      const jupiter = new THREE.Mesh(geometryJupiter, materialJupiter);  
      jupiter.position.set(640.3*scalePosition + positionSun,0,0)
      
      jupiter.receiveShadow = true
      jupiter.castShadow = true
      planets.push(jupiter);
      scene.add(jupiter);
    }
  )

  const textureLoaderSaturn = new THREE.TextureLoader()
  textureLoaderSaturn.load(
    './textures/planets/saturn/8k_saturn.jpg',
    (texture) => {
      console.log("Textura de saturn carregada com sucesso!")
      const geometrySaturn = new THREE.SphereGeometry(8*scaleSize, 100, 100);  
      const materialSaturn = new THREE.MeshStandardMaterial({ map: texture });  
      const saturn = new THREE.Mesh(geometrySaturn, materialSaturn);  
      saturn.position.set(1430*scalePosition + positionSun,0,0)
      
      saturn.receiveShadow = true
      saturn.castShadow = true
      planets.push(saturn);
      scene.add(saturn);
   
      const saturnRingLoader = new THREE.TextureLoader().load('./textures/planets/saturn/8k_saturn_ring_alpha.png')
      const saturnRingGeometry = new THREE.RingGeometry(12*scaleSize, 32, 32);
      const saturnRingMaterial = new THREE.MeshStandardMaterial({
        map: saturnRingLoader,
        transparent: true,   
        opacity: 0.8,        
        side: THREE.DoubleSide  
        
      });
      const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
      saturnRing.position.set(1430 * scalePosition + positionSun, 0, 0); // Centralizar no planeta
      saturnRing.rotation.x = Math.PI / 2; 
      console.log("atmosfera de venus carregada com sucesso!", saturnRing);  
      scene.add(saturnRing)
    }
  )

}
export function rotatePlanets() {
  planets.forEach((planet) => {
    planet.rotation.y += 0.001; 
  });
}
export function getPlanets() {
  return planets;
}
