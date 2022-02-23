import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z,scene } from './global_variables.js';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function create_pirate_ship(x,y,z) {
		var loader = new GLTFLoader();
// let mesh = null;
		loader.load('/dist/pirate_ship/scene.gltf',
			function (gltf) {
				var object = gltf.scene;
				// object.rotation.x = -80;
				// object.rotation.z = 0;
				// object.rotation.y = 0;
				object.position.set(x,y,z);
				// object.material.color = 0xffff00
				object.scale.set(.02 * object.scale.x, .02 * object.scale.y, .02 * object.scale.z)
				scene.add(object)
				// mesh  = object
			},
	
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
	
			function (error) {
				console.log('An error happened = ', error);
			}
		);
		// return mesh;
}

export {create_pirate_ship}