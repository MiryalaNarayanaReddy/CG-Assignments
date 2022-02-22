import * as THREE from '../node_modules/three/build/three.module.js';
import { create_ocean } from './ocean.js';
import { create_pirate_ship } from './pirate_ship.js';
import { create_ship } from './ship.js';
import {create_treasurebox} from './treasure_box';
import { ship_pos_x, ship_pos_y, ship_pos_z, camera_top_view,scene} from './global_variables.js';
// import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

ship_pos_x = 0
ship_pos_y = 0
ship_pos_z = 0


function create_camera() {
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(ship_pos_x, ship_pos_y - 1, ship_pos_z + 1)

	camera.lookAt(camera.position.x, camera.position.y + 1, camera.position.z)

	
	return camera
}

function create_light() {
	const color = 0xFFFFFF;
	const intensity = 2;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(0,0,10);
	return light;
}


////////// scene part



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var ocean_object = create_ocean()
var ship_object  = create_ship(0,0,0)

create_treasurebox(3,6,0)
var camera = create_camera()
var light = create_light()
create_pirate_ship(-3,3,0)

scene.add(ocean_object.object)
// scene.add(ship_object.object)
// scene.add(treasurebox_object.object)
// scene.add(pirate_object.object)
scene.add(camera)
scene.add(light)

//////////////////     blender object


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

	// ship_object.object.position.x = ship_pos_x
	// ship_object.object.position.y = ship_pos_y
	// ship_object.object.position.z = ship_pos_z
	// light.position.set(ship_pos_x,ship_pos_y,ship_pos_z);
	light.position.set(camera.position.x, camera.position.y, camera.position.z);
	// camera.lookAt(camera.position.x,camera.position.y+1,camera.position.z)

	// light.position.set(camera.position.x,camera.position.y,camera.position.z);
	// ocean_object.update_ocean()
	renderer.render(scene, camera);
	// console.log("Working")
	// console.log(camera.position.y)
};

animate();
