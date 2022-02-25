import * as THREE from '../node_modules/three';
// import * as THREE from '../node_modules/three/examples/js/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../node_modules/three/examples/jsm/objects/Water.js';
import { Sky } from '../node_modules/three/examples/jsm/objects/Sky.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { game_object } from './gameobject';

import { Load_game } from './load_game';

import {
	player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

	container, stats,
	camera, scene, renderer, controls, water, sun,

	NumberOfObjects,
	treasure_boxes, pirate_ships, player_ship,
	promise_pirate_ships, promise_treasure_boxes, promise_player_ship, UNIT_LENGTH,
	display_score,display_treasures,display_health,display_time, game_treasures,
	cannon_ball_number,
	cannon_balls


} from './global_variables'

function float_objects() {

}

function collect_treasures() {

	// var player1 = new THREE.BoundingBoxHelper(player_ship.object);
	// player1.update();
let	player1 =  new THREE.Box3().setFromObject(player_ship.object);

	for (let i = 0; i < NumberOfObjects; i++) {

		if ((!treasure_boxes[i].is_destroyed)) {

			let helper1 =new THREE.Box3().setFromObject(treasure_boxes[i].object);
	
			if( player1.intersectsBox(helper1))
			{
				treasure_boxes[i].is_destroyed = true;
				scene.remove(treasure_boxes[i].object);
				// console.log("collides");
				game_treasures++;
				document.getElementById("treasures").innerHTML = `Treasure Boxes: ${game_treasures}` 
			}

		}
	}

}

function Update_game() {

	water.material.uniforms['time'].value += 1.0 / 60.0;
	collect_treasures();
}


document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
	var keyCode = event.which;

	if (keyCode == 87) {
		player_ship_pos_z -= UNIT_LENGTH    // w
		camera.position.z -= UNIT_LENGTH


	} else if (keyCode == 83) {
		player_ship_pos_z += UNIT_LENGTH   // s
		camera.position.z += UNIT_LENGTH

	} else if (keyCode == 65) {
		player_ship_pos_x -= UNIT_LENGTH    // a
		camera.position.x -= UNIT_LENGTH

	} else if (keyCode == 68) {
		player_ship_pos_x += UNIT_LENGTH   // d
		camera.position.x += UNIT_LENGTH

	}
	player_ship.object.position.set(player_ship_pos_x, player_ship_pos_y, player_ship_pos_z);

	if (keyCode == 84)  // t
	{

		if (camera_top_view) {
			camera_top_view = false
			camera.position.set(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH, player_ship_pos_z - UNIT_LENGTH);
			camera.lookAt(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH, player_ship_pos_z - UNIT_LENGTH * 10000)
		}
		else {
			camera_top_view = true
			camera.position.set(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH * 50, player_ship_pos_z + UNIT_LENGTH * 50)
			camera.lookAt(player_ship_pos_x, player_ship_pos_y, player_ship_pos_z)
		}

	}

	if(keyCode == 32)
	{
		cannon_balls[cannon_ball_number].object.position.set(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH, player_ship_pos_z - UNIT_LENGTH);
		scene.add(cannon_balls[cannon_ball_number].object);
		cannon_ball_number++
	}

};

export { Update_game }
