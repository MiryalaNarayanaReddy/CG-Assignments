import * as THREE from '../node_modules/three';
import {game_init} from './game.js'
import {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container, stats,
    camera, scene, renderer, controls, water, sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship


} from './global_variables'

import {Update_game} from './update_game'


/***************************************************code */


game_init();

function render() {

	water.material.uniforms['time'].value += 1.0 / 60.0;
	renderer.render(scene, camera);

}

function animate() {
	Update_game()
	requestAnimationFrame(animate);
	render();
}


export { animate }
