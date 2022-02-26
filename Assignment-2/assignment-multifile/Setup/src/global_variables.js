import * as THREE from '../node_modules/three/build/three.module.js';
var player_ship_pos_x = 0
var player_ship_pos_y = 0
var player_ship_pos_z = 0

var camera_top_view = false
var UNIT_LENGTH = 10

let container, stats;
let camera, scene, renderer;
let controls, water, sun;

let NumberOfObjects = 10
let number_of_cannons_shot = 0;

let number_of_left_over_pirate_ships = NumberOfObjects;
let number_of_treasures_left_to_be_collected = NumberOfObjects;

let treasure_boxes = new Array(NumberOfObjects);
let pirate_ships = new Array(NumberOfObjects);
let promise_pirate_ships = new Array(NumberOfObjects);
let promise_treasure_boxes = new Array(NumberOfObjects);
let cannon_balls = new Array(NumberOfObjects*10);
let promise_connon_balls = new Array(NumberOfObjects*10);

let player_ship;
let promise_player_ship;

let game_score = 0;
let game_treasures = 0;
let game_health = 100;
let game_time = 0;
let cannon_ball_number = 0;
let NumberOfCannonBalls = 10;
let  game_start_time = 0;
let game_over = false;
let tbox;
let ship_p;
let cannon_b;

export {
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
    game_start_time,game_over,
    tbox,ship_p,cannon_b
}
