import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z } from './global_variables.js';

function create_ship() {

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const texture = new THREE.TextureLoader()
	.load(
		//  [
		'/treasurebox/ship.png',
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
	var ship_object = new game_object(ship, false)
	return ship_object
}

export {create_ship}