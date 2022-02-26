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
	display_score, display_treasures, display_health, display_time, game_treasures,
	cannon_ball_number,
	cannon_balls, NumberOfCannonBalls, game_score,

	number_of_cannons_shot, number_of_left_over_pirate_ships, number_of_treasures_left_to_be_collected, game_health


} from './global_variables'
import { Score } from '@material-ui/icons';

function float_objects() {

}



function collect_treasures() {

	// var player1 = new THREE.BoundingBoxHelper(player_ship.object);
	// player1.update();
	let player1 = new THREE.Box3().setFromObject(player_ship.object);

	for (let i = 0; i < NumberOfObjects; i++) {

		if ((!treasure_boxes[i].is_destroyed)) {

			let helper1 = new THREE.Box3().setFromObject(treasure_boxes[i].object);

			if (player1.intersectsBox(helper1)) {
				treasure_boxes[i].is_destroyed = true;
				scene.remove(treasure_boxes[i].object);
				// console.log("collides");
				game_treasures++;
				number_of_treasures_left_to_be_collected--;
				document.getElementById("treasures").innerHTML = `Treasure Boxes: ${game_treasures}`
				document.getElementById("treasure_boxes_left").innerHTML = `Treasure boxes left:  ${number_of_treasures_left_to_be_collected}`
			}

		}
	}

}

function update_pirate_cannons() {
	let player1 = new THREE.Box3().setFromObject(player_ship.object);

	for (let i = 0; i < NumberOfObjects; i++) {

		// if ((!pirate_ships[i].is_destroyed)) {
		for (let j = 0; j < 5; j++) {
			if (pirate_ships[i].cannon_balls[j].is_shot) {
				pirate_ships[i].cannon_balls[j].object.position.x += 2*pirate_ships[i].cannon_balls[j].velocity.x
				pirate_ships[i].cannon_balls[j].object.position.y += 0
				pirate_ships[i].cannon_balls[j].object.position.z += 2*pirate_ships[i].cannon_balls[j].velocity.z

				let helper1 = new THREE.Box3().setFromObject(pirate_ships[i].cannon_balls[j].object);

				if (player1.intersectsBox(helper1)) {
					pirate_ships[i].cannon_balls[j].is_shot = false;
					scene.remove(pirate_ships[i].cannon_balls[j].object);
					game_health--;
					document.getElementById("health").innerHTML = `Health: ${game_health}`
				}

				let d = Math.sqrt((pirate_ships[i].cannon_balls[j].position_of_shooting.x - pirate_ships[i].cannon_balls[j].object.position.x) ** 2 + (pirate_ships[i].cannon_balls[j].position_of_shooting.z - pirate_ships[i].cannon_balls[j].object.position.z) ** 2)


				if (d > UNIT_LENGTH * 100) {
					// cannon_balls[i].is_destroyed = true;
					pirate_ships[i].cannon_balls[j].is_shot = false;
					scene.remove(pirate_ships[i].cannon_balls[j].object);
				}
			}
		}

		// }
	}
}



function pirate_shoot_cannons() {
	for (let i = 0; i < NumberOfObjects; i++) {
		// console.log(pirate_ships[i].is_destroyed)
		if (!pirate_ships[i].is_destroyed) {
			let d = Math.sqrt((player_ship.object.position.x - pirate_ships[i].object.position.x) ** 2 + (player_ship.object.position.z - pirate_ships[i].object.position.z) ** 2)
			if (d <= UNIT_LENGTH * 30) {

				pirate_ships[i].cannon_balls[pirate_ships[i].cannon_ball_number].object.position.set(pirate_ships[i].object.position.x, pirate_ships[i].object.position.y, pirate_ships[i].object.position.z);
				pirate_ships[i].cannon_balls[pirate_ships[i].cannon_ball_number].is_shot = true;

				pirate_ships[i].cannon_balls[pirate_ships[i].cannon_ball_number].position_of_shooting.set(pirate_ships[i].object.position.x, pirate_ships[i].object.position.y, pirate_ships[i].object.position.z);
				pirate_ships[i].cannon_balls[pirate_ships[i].cannon_ball_number].velocity.set((player_ship.object.position.x - pirate_ships[i].object.position.x) / d, 0, (player_ship.object.position.z - pirate_ships[i].object.position.z) / d);
				scene.add(pirate_ships[i].cannon_balls[pirate_ships[i].cannon_ball_number].object)

				pirate_ships[i].cannon_ball_number++
				if (pirate_ships[i].cannon_ball_number == 5) {
					pirate_ships[i].cannon_ball_number=0
				}
			}
		}
	}
}

function update_pirate_ships() {
	for (let i = 0; i < NumberOfObjects; i++) {
		// console.log(pirate_ships[i].is_destroyed)
		if (!pirate_ships[i].is_destroyed) {
			let d = Math.sqrt((player_ship.object.position.x - pirate_ships[i].object.position.x) ** 2 + (player_ship.object.position.z - pirate_ships[i].object.position.z) ** 2)
			if (d > UNIT_LENGTH * 30) {
				let t = (d - 0.3) / d
				// let	m = (b.z-a.z)/(b.x-a.x)
				let x = (1 - t) * player_ship.object.position.x + t * pirate_ships[i].object.position.x
				let z = (1 - t) * player_ship.object.position.z + t * pirate_ships[i].object.position.z
				pirate_ships[i].object.position.set(x, pirate_ships[i].object.position.y, z);
				// console.log(`${i} = ${d}`)
			}
		}
	}
}

function update_cannon_balls() {
	for (let i = 0; i < NumberOfCannonBalls; i++) {
		if ((!cannon_balls[i].is_destroyed) && cannon_balls[i].is_shot) {
			// cannon_balls[i].object.position.set(cannon_balls[i].object.position+cannon_balls[i].velocity);

			cannon_balls[i].object.position.x += 2*cannon_balls[i].velocity.x
			cannon_balls[i].object.position.y += 0
			cannon_balls[i].object.position.z += 2*cannon_balls[i].velocity.z

			let ball_box = new THREE.Box3().setFromObject(cannon_balls[i].object);

			for (let j = 0; j < NumberOfObjects; j++) {

				if (!pirate_ships[j].is_destroyed) {
					let pirate_box = new THREE.Box3().setFromObject(pirate_ships[j].object);
					if (pirate_box.intersectsBox(ball_box)) {
						// cannon_balls[i].is_destroyed = true;
						cannon_balls[i].is_shot = false;

						scene.remove(cannon_balls[i].object);
						pirate_ships[j].health--;
						if (pirate_ships[j].health == 0) {
							pirate_ships[j].is_destroyed = true;
							scene.remove(pirate_ships[j].object);
							number_of_left_over_pirate_ships--;
							document.getElementById("pirate_ship_left").innerHTML = `Pirate ships left: ${number_of_left_over_pirate_ships}`
							game_score +=pirate_ships[j].points;
						}

						document.getElementById("score").innerHTML = `Score: ${game_score}`
						break;
					}
				}
			}

			if (Math.abs(cannon_balls[i].position_of_shooting.z - cannon_balls[i].object.position.z) > UNIT_LENGTH * 100) {
				// cannon_balls[i].is_destroyed = true;
				cannon_balls[i].is_shot = false;
				scene.remove(cannon_balls[i].object);
			}

		}
	}
}

function Update_game() {
	// document.getElementById("time").innerHTML = `Time : ${performance.now()/1000} s`
	water.material.uniforms['time'].value += 1.0 / 60.0;
	collect_treasures();
	update_pirate_ships();
	update_cannon_balls();
	update_pirate_cannons();
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
			camera.position.set(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH * 2, player_ship_pos_z - UNIT_LENGTH * 3);
			camera.lookAt(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH * 2, player_ship_pos_z - UNIT_LENGTH * 10000)
		}
		else {
			camera_top_view = true
			camera.position.set(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH * 50, player_ship_pos_z + UNIT_LENGTH * 50)
			camera.lookAt(player_ship_pos_x, player_ship_pos_y, player_ship_pos_z)
		}

	}

	if (keyCode == 32) {

		let d = 100000000
		let t = -1;
		for (let i = 0; i < NumberOfObjects; i++) {
			if (!pirate_ships[i].is_destroyed) {
				let d1 = Math.sqrt((player_ship.object.position.x - pirate_ships[i].object.position.x) ** 2 + (player_ship.object.position.z - pirate_ships[i].object.position.z) ** 2)

				if (d1 < d) {
					d = d1;
					t = i;
				}
			}
		}

		if (t == -1) {
			alert("No more pirates to shoot at");
		}
		else {
			cannon_balls[cannon_ball_number].object.position.set(player_ship_pos_x, player_ship_pos_y + UNIT_LENGTH, player_ship_pos_z - UNIT_LENGTH);
			scene.add(cannon_balls[cannon_ball_number].object);
			cannon_balls[cannon_ball_number].is_shot = true;
			cannon_balls[cannon_ball_number].position_of_shooting.set(player_ship_pos_x, player_ship_pos_y, player_ship_pos_z)
			cannon_balls[cannon_ball_number].velocity.set((pirate_ships[t].object.position.x - player_ship.object.position.x) / d, 0, (pirate_ships[t].object.position.z - player_ship.object.position.z) / d)
			cannon_ball_number++;
			number_of_cannons_shot++;
			document.getElementById("cannons").innerHTML = `Cannons: ${number_of_cannons_shot}`
			if (cannon_ball_number == NumberOfCannonBalls) {
				cannon_ball_number = 0;
			}
		}
	}

};

export { Update_game, pirate_shoot_cannons }
