const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry();
const material = new THREE.MeshPhongMaterial({color: 0x4ddbff});
const ocean = new THREE.Mesh( geometry, material );
scene.add( ocean );

ocean.position.set(0,0,0)
ocean.scale.set(window.innerWidth,10000,1)
camera.position.set(0,0,1.1)
camera.lookAt(0,1,1)


const color = 0xFFFFFF;
const intensity = 1;

const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//////////////

const geometry1 = new THREE.BoxGeometry(10,10,-10);
const material1 = new THREE.MeshPhongMaterial({color: 0x44aa88});
const cube = new THREE.Mesh( geometry1, material1 );
scene.add( cube );


////////////

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
};

animate();