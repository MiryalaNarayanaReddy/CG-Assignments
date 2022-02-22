import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z,scene } from './global_variables.js';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function create_treasurebox(x,y,z) {

	var loader = new GLTFLoader();

	loader.load('/dist/treasure_chest/scene.gltf',
		function (gltf) {
			var object = gltf.scene;
			object.rotation.x = -80;
			object.rotation.z = 0;
			object.rotation.y = -80;
			object.position.set(x,y,z+.01 * object.scale.z/2);
			
			object.scale.set(.01 * object.scale.x, .01 * object.scale.y, .01 * object.scale.z)
			scene.add(object)
		},

		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		function (error) {
			console.log('An error happened = ', error);
		}
	);

}

export { create_treasurebox }