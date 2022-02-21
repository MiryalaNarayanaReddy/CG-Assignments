
ship_pos_x = 0
ship_pos_y = 0
ship_pos_z = 1


class game_object {
	object;
	is_destroyed = false;

	constructor(object, is_destroyed) {
		this.object = object;
		this.is_destroyed = is_destroyed;
	}
}

function update_ocean(object) {

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


function create_ship() {

	const geometry = new THREE.BoxGeometry(1, 1, 1);


	const texture = new THREE.TextureLoader()
	.load(
		//  [
		'/js/treasurebox/face2.png',
		// '/js/treasurebox/face.png',
		// '/js/treasurebox/face.png',
		// '/js/treasurebox/face2.png',
		// '/js/treasurebox/face2.png',
		// '/js/treasurebox/face2.png'
	// ]
	 );

	const material = new THREE.MeshBasicMaterial({ color: 0x00ffaa,map:texture });
	const ship = new THREE.Mesh(geometry, material);
	ship.position.set(ship_pos_x, ship_pos_y, ship_pos_z)
	ship_object = new game_object(ship, false)
	return ship_object
}


/////// treasure

function create_treasurebox() {

	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const texture = new THREE.TextureLoader().load( '/js/treasurebox/face.png' );
	const material = new THREE.MeshBasicMaterial({ color: 0xffff00, map:texture });

	const treasurebox = new THREE.Mesh(geometry, material);

	treasurebox.position.set(2, 6, 0)
	treasurebox_object = new game_object(treasurebox, false)
	return treasurebox_object
}


///////  scene

ship_pos_x = 0
ship_pos_y = 0
ship_pos_z = 0
camera_top_view = false

function create_camera() {
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(ship_pos_x, ship_pos_y - 1, ship_pos_z + 1)
	camera.lookAt(camera.position.x, camera.position.y + 1, camera.position.z)
	return camera
}

function create_light() {
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(camera.position.x, camera.position.y, camera.position.z);
	return light;
}


////////// scene part

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


ocean_object = create_ocean()
ship_object = create_ship()
treasurebox_object = create_treasurebox()
camera = create_camera()
light = create_light()

scene.add(ocean_object.object)
scene.add(ship_object.object)
scene.add(treasurebox_object.object)
scene.add(camera)
scene.add(light)

//////////////////////////// event listeners

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
	var keyCode = event.which;

	if (keyCode == 87) {
		ship_pos_y += 0.1  // w
		camera.position.y += 0.1
	} else if (keyCode == 83) {
		ship_pos_y -= 0.1 // s
		camera.position.y -= 0.1
	} else if (keyCode == 65) {
		ship_pos_x -= 0.1  // a
		camera.position.x -= 0.1
	} else if (keyCode == 68) {
		ship_pos_x += 0.1 // d
		camera.position.x += 0.1
	}
	else if (keyCode == 84)  // t
	{

		if (camera_top_view) {
			camera_top_view = false
			camera.position.set(ship_pos_x, ship_pos_y - 1, ship_pos_z + 1)
			camera.lookAt(camera.position.x, camera.position.y + 1, camera.position.z)
		}
		else {
			camera_top_view = true
			camera.position.z = 10
			camera.lookAt(ship_pos_x, ship_pos_y, 0)
		}

	}
};


function animate() {
	requestAnimationFrame(animate);

	ship_object.object.position.x = ship_pos_x
	ship_object.object.position.y = ship_pos_y
	ship_object.object.position.z = ship_pos_z
	// light.position.set(camera.position.x, camera.position.y, camera.position.z);
	// camera.lookAt(camera.position.x,camera.position.y+1,camera.position.z)

	// light.position.set(camera.position.x,camera.position.y,camera.position.z);
	// ocean_object.update_ocean()
	renderer.render(scene, camera);
	// console.log(camera.position.y)
};

animate();
