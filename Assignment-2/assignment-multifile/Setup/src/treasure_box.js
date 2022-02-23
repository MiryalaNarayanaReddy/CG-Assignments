import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z,scene } from './global_variables.js';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {treasure_boxes} from './global_variables';

function create_treasurebox(x,y,z) {

	var loader = new GLTFLoader();

	loader.load('/dist/treasure_chest/scene.gltf',
		function (gltf) {
			var object = gltf.scene;
			// object.rotation.x = -80;
			// object.rotation.z = 0;
			// object.rotation.y = -80;
			// object.position.set(x,y,z+.01 * object.scale.z/2);
			
			object.scale.set(.1 * object.scale.x, .1 * object.scale.y, .1 * object.scale.z)
			scene.add(object)
			treasure_boxes.push(object.copy());
			console.log(object);
			console.log(treasure_boxes);
			console.log(treasure_boxes[0]);
		}

	
	);
	
}

export { create_treasurebox }