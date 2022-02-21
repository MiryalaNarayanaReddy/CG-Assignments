class game_object {
	object;
	is_destroyed = false;

	constructor(object, is_destroyed) {
		this.object = object;
		this.is_destroyed = is_destroyed;
	}
}

function update_ocean(object){

}

function create_ocean() {

	const geometry = new THREE.PlaneGeometry();
	const material = new THREE.MeshPhongMaterial({ color: 0x4ddbff });
	const ocean = new THREE.Mesh(geometry, material);
	ocean.position.set(0, 0, 0)
	ocean.scale.set(window.innerWidth, 10000, 1)
	ocean_object = new game_object(ocean, false)
	return ocean_object
}

//////// ship






/////// treasure

function create_treasurebox() {

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	const treasurebox = new THREE.Mesh( geometry, material );
	treasurebox.position.set(2,6,0)
	treasurebox_object = new game_object(treasurebox, false)
	return treasurebox_object
}



///////  scene




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 1)
camera.lookAt(camera.position.x,camera.position.y+1,camera.position.z)

const color = 0xFFFFFF;
const intensity = 1;

const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);



ocean_object = create_ocean()
ship_object = create_ship()

scene.add(ocean_object.object)
scene.add(ship_object.object)

function animate() {
	requestAnimationFrame(animate);

	// camera.position.z +=0.1
	// camera.position.x -=1
	// camera.position.y +=0.01
	
	// camera.lookAt(camera.position.x,camera.position.y+1,camera.position.z)

	// light.position.set(camera.position.x,camera.position.y,camera.position.z);
	// ocean_object.update_ocean()
	renderer.render(scene, camera);
	// console.log(camera.position.y)
};

animate();

