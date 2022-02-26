import * as THREE from '../node_modules/three';
import {game_init} from './game.js'
import {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container,stats,
    camera,scene,renderer,controls,water,sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship,
    UNIT_LENGTH,
    game_score,game_treasures,game_health,game_time,

    cannon_balls,promise_connon_balls,cannon_ball_number,NumberOfCannonBalls,

    number_of_cannons_shot , number_of_left_over_pirate_ships, number_of_treasures_left_to_be_collected,
    game_start_time
}


from './global_variables'

import {pirate_shoot_cannons, Update_game} from './update_game'


/***************************************************code */


let t2 = new Date()
game_start_time = t2.getTime()


document.getElementById("treasures").innerHTML = `Treasure Boxes: ${game_treasures}`
document.getElementById("treasure_boxes_left").innerHTML = `Treasure boxes left:  ${number_of_treasures_left_to_be_collected}`
document.getElementById("health").innerHTML = `Health: ${game_health}`
document.getElementById("pirate_ship_left").innerHTML = `Pirate ships left: ${number_of_left_over_pirate_ships}`
document.getElementById("score").innerHTML = `Score: ${game_score}`
document.getElementById("cannons").innerHTML = `Cannons: ${number_of_cannons_shot}`
document.getElementById("time").innerHTML = `Time : ${ Math.floor(game_start_time/1000)} s`

document.getElementById("game_over").style.display= "none";

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
