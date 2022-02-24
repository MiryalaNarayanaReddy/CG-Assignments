import * as THREE from '../node_modules/three';
// import * as THREE from '../node_modules/three/examples/js/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../node_modules/three/examples/jsm/objects/Water.js';
import { Sky } from '../node_modules/three/examples/jsm/objects/Sky.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { game_object } from './gameobject';

import {Load_game} from './load_game';

import {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container, stats,
    camera, scene, renderer, controls, water, sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship,UNIT_LENGTH


} from './global_variables'

function float_objects()
{
 
}




function Update_game()
{
	
    water.material.uniforms['time'].value += 1.0 / 60.0;

  

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
	else if (keyCode == 84)  // t
	{

		if (camera_top_view) {
			camera_top_view = false
			camera.position.set(player_ship_pos_x,player_ship_pos_y+UNIT_LENGTH,player_ship_pos_z-UNIT_LENGTH);
			camera.lookAt(player_ship_pos_x-1,player_ship_pos_y,player_ship_pos_z-1)
		}
		else {
			camera_top_view = true
			camera.position.set(player_ship_pos_x,player_ship_pos_y+UNIT_LENGTH*50,player_ship_pos_z+UNIT_LENGTH*50)
			camera.lookAt(player_ship_pos_x,player_ship_pos_y,player_ship_pos_z)
		}

	}
	player_ship.object.position.set( player_ship_pos_x, player_ship_pos_y, player_ship_pos_z);

};




export {Update_game}