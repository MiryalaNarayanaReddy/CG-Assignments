import * as THREE from '../node_modules/three';
import { UNIT_LENGTH } from './global_variables';

class game_object {
	object;
	is_destroyed;
	health;
	points;
	is_cannon_ball;
	is_shot;
	position_of_shooting;
	velocity;
	cannon_balls ;
	promise_cannons ;
	cannon_ball_number;
	constructor(object, is_destroyed,is_cannon_ball) {
		this.object = object;
		this.is_destroyed = is_destroyed;
		this.is_cannon_ball = is_cannon_ball;
		this.is_shot = 0;
		this.velocity = new THREE.Vector3(0,0,-1)
		this.position_of_shooting = new THREE.Vector3(0,0,0)
		this.promise_cannons = new Array(5)
		this.cannon_balls = new Array(5);
		this.cannon_ball_number = 0;
	}
}

export {game_object}