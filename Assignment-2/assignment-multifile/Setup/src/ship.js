import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z,scene } from './global_variables.js';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function create_ship(x,y,z) {
	ship_pos_x=x;
	ship_pos_y=y;
	ship_pos_z=z;
	var loader = new GLTFLoader();
	var ship_object = null;
	loader.load('/dist/pirate_sailing_ship/scene.gltf',
		function (gltf) {
			var object = gltf.scene;
			object.rotation.z = Math.PI;
			object.rotation.y = 0;
			object.rotation.x = -Math.PI/2;

			object.position.set(x,y,z);
			// object.material.color = 0xffff00
			object.scale.set(.01 * object.scale.x, .01 * object.scale.y, .01 * object.scale.z)
			scene.add(object)

			ship_object = new game_object(object, false);
			
		},

		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		function (error) {
			console.log('An error happened = ', error);
		}
	);
	
	return  ship_object;
}

export {create_ship}
