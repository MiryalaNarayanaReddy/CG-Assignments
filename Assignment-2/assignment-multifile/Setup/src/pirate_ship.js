import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z } from './global_variables.js';

function create_pirate_ship() {

	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const material = new THREE.MeshBasicMaterial({ color: 0xffffaa });
	const shipp = new THREE.Mesh(geometry, material);
	shipp.position.set(ship_pos_x+4, ship_pos_y+4, ship_pos_z)
	var shipp_object = new game_object(shipp, false)
	return shipp_object
}

export {create_pirate_ship}