import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';
import { ship_pos_x, ship_pos_y, ship_pos_z } from './global_variables.js';

function create_treasurebox() {

	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const texture = new THREE.TextureLoader().load( 'treasurebox/face.png' );
	const material = new THREE.MeshBasicMaterial({ color: 0xffff00, map:texture });

	const treasurebox = new THREE.Mesh(geometry, material);

	treasurebox.position.set(2, 6, 0)
	var treasurebox_object = new game_object(treasurebox, false)
	return treasurebox_object
}

export {create_treasurebox}