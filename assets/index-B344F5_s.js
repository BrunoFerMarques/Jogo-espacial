(function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))x(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const P of i.addedNodes)P.tagName==="LINK"&&P.rel==="modulepreload"&&x(P)}).observe(document,{childList:!0,subtree:!0});function H(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function x(o){if(o.ep)return;o.ep=!0;const i=H(o);fetch(o.href,i)}})();const S=new THREE.Vector3(5e3,0,20),M=new THREE.Vector3(1,0,0),A=new THREE.Vector3(0,1,0),y=new THREE.Vector3(0,0,1);let m=0,T=0,G=.02;const _=.04;let s=null;const g={};window.addEventListener("keydown",t=>{g[t.key.toLowerCase()]=!0});window.addEventListener("keyup",t=>{g[t.key.toLowerCase()]=!1});function b(t){new GLTFLoader().load("./models/speeders/scene.gltf",H=>{s=H.scene,s.scale.set(1/1e5,1/1e5,1/1e5),s.position.copy(S),s.rotation.set(0,0,1),t.add(s)})}function k(){if(!s)return;m*=.095,T*=.095,Math.abs(m)>_&&(m=Math.sign(m)*_),Math.abs(T)>_&&(T=Math.sign(T)*_),g.a&&(m+=.02),g.d&&(m-=.02),g.w&&(T-=.02),g.s&&(T+=.02),g[" "]&&(G+=.002),g.x&&(G-=.006),M.applyAxisAngle(y,m),A.applyAxisAngle(y,m),A.applyAxisAngle(M,T),y.applyAxisAngle(M,T),M.normalize(),A.normalize(),y.normalize(),S.add(y.clone().multiplyScalar(G));const t=new THREE.Matrix4().makeBasis(M,A,y);s.matrixAutoUpdate=!1,s.matrix.identity().multiply(new THREE.Matrix4().makeTranslation(S.x,S.y,S.z)).multiply(t),s.quaternion.setFromRotationMatrix(t)}function V(t){if(s){const h=new THREE.Vector3().setFromMatrixPosition(s.matrixWorld),x=new THREE.Vector3(0,8,-20).clone().applyQuaternion(s.quaternion).add(h);t.position.copy(x);const o=new THREE.Vector3(0,1,0).applyQuaternion(s.quaternion);t.up.copy(o),t.lookAt(h)}}console.log("Three carrregado com sucesso",THREE);let w=[],p=10,u=100,E=20*u;function C(t){new THREE.TextureLoader().load("./textures/planets/earth/2k_earth_daymap.jpg",r=>{const a=new THREE.SphereGeometry(1.2756*u,32,32),n=new THREE.MeshStandardMaterial({map:r}),e=new THREE.Mesh(a,n);e.castShadow=!0,e.receiveShadow=!0,w.push(e),t.add(e),e.position.set(150*p+E,0,500),console.log("Terra carregada com sucesso!",e);const l=new THREE.TextureLoader().load("./textures/planets/earth/2k_earth_clouds.jpg"),R=new THREE.SphereGeometry(1.2756*u+1,32,32),f=new THREE.MeshStandardMaterial({map:l,transparent:!0,opacity:.5,side:THREE.DoubleSide}),d=new THREE.Mesh(R,f);d.position.set(150*p+E,0,500),console.log("Nuvens da terra carregada com sucesso!",d),t.add(d),w.push(d)}),new THREE.TextureLoader().load("./textures/planets/sun/8k_sun.jpg",r=>{console.log("Textura do sol carregada com sucesso!");const a=new THREE.SphereGeometry(20*u,500,500),n=new THREE.MeshStandardMaterial({map:r,emissive:16761378,emissiveIntensity:1,roughness:.2,metalness:.5}),e=new THREE.Mesh(a,n);e.position.set(0*p,0,0),w.push(e),t.add(e);const l=new THREE.PointLight(16761378,650,1e12,.6);l.position.set(0,0,0),l.castShadow=!0,t.add(l);const R=new THREE.PointLightHelper(l,40);t.add(R)}),new THREE.TextureLoader().load("./textures/planets/mercury/2k_mercury.jpg",r=>{console.log("Textura de mercurio carregada com sucesso!");const a=new THREE.SphereGeometry(.488*u,100,100),n=new THREE.MeshStandardMaterial({map:r}),e=new THREE.Mesh(a,n);e.position.set(60*p+E,0,0),e.receiveShadow=!0,e.castShadow=!0,w.push(e),t.add(e)}),new THREE.TextureLoader().load("./textures/planets/venus/8k_venus_surface.jpg",r=>{console.log("Textura de venus carregada com sucesso!");const a=new THREE.SphereGeometry(1.2104*u,100,100),n=new THREE.MeshStandardMaterial({map:r}),e=new THREE.Mesh(a,n);e.position.set(108.2*p+E,0,200),e.receiveShadow=!0,e.castShadow=!0,w.push(e),t.add(e);const l=new THREE.TextureLoader().load("./textures/planets/venus/4k_venus_atmosphere.jpg"),R=new THREE.SphereGeometry(1.21045*u,32,32),f=new THREE.MeshStandardMaterial({map:l,transparent:!0,opacity:.5,side:THREE.DoubleSide}),d=new THREE.Mesh(R,f);d.position.set(150*p+E,0,500),console.log("atmosfera de venus carregada com sucesso!",e),t.add(d)}),new THREE.TextureLoader().load("./textures/planets/mars/8k_mars.jpg",r=>{console.log("Textura de marte carregada com sucesso!");const a=new THREE.SphereGeometry(.6794*u,100,100),n=new THREE.MeshStandardMaterial({map:r}),e=new THREE.Mesh(a,n);e.position.set(227.9*p+E,0,0),e.receiveShadow=!0,e.castShadow=!0,w.push(e),t.add(e)}),new THREE.TextureLoader().load("./textures/planets/jupiter/8k_jupiter.jpg",r=>{console.log("Textura de jupiter carregada com sucesso!");const a=new THREE.SphereGeometry(10*u,100,100),n=new THREE.MeshStandardMaterial({map:r}),e=new THREE.Mesh(a,n);e.position.set(640.3*p+E,0,0),e.receiveShadow=!0,e.castShadow=!0,w.push(e),t.add(e)}),new THREE.TextureLoader().load("./textures/planets/saturn/8k_saturn.jpg",r=>{console.log("Textura de saturn carregada com sucesso!");const a=new THREE.SphereGeometry(8*u,100,100),n=new THREE.MeshStandardMaterial({map:r}),e=new THREE.Mesh(a,n);e.position.set(1430*p+E,0,0),e.receiveShadow=!0,e.castShadow=!0,w.push(e),t.add(e);const l=new THREE.TextureLoader().load("./textures/planets/saturn/8k_saturn_ring_alpha.png"),R=new THREE.RingGeometry(12*u,32,32),f=new THREE.MeshStandardMaterial({map:l,transparent:!0,opacity:.8,side:THREE.DoubleSide}),d=new THREE.Mesh(R,f);d.position.set(1430*p+E,0,0),d.rotation.x=Math.PI/2,console.log("atmosfera de venus carregada com sucesso!",d),t.add(d)})}function z(){w.forEach(t=>{t.rotation.y+=.001})}window.innerWidth=1e3;window.innerHeight=800;const c=new THREE.WebGLRenderer({antialias:!0});c.outputColorSpace=THREE.SRGBColorSpace;c.setSize(window.innerWidth,window.innerHeight);c.setClearColor(0);c.setPixelRatio(window.devicePixelRatio);c.shadowMap.enabled=!0;c.shadowMap.type=THREE.PCFSoftShadowMap;document.body.appendChild(c.domElement);c.shadowMap.enabled=!0;c.shadowMap.type=THREE.PCFSoftShadowMap;const L=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e6);L.position.set(-50,0,0);const v=new THREE.Scene,W=new THREE.TextureLoader;W.load("./textures/galaxy/8k_stars_milky_way.jpg",t=>{t.mapping=THREE.EquirectangularReflectionMapping,v.background=t});const F=new THREE.AmbientLight(16775920,1);v.add(F);window.addEventListener("resize",()=>{L.aspect=window.innerWidth/window.innerHeight,L.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight)});b(v);C(v);function j(){requestAnimationFrame(j),z(),k(),V(L),c.render(v,L)}j();
