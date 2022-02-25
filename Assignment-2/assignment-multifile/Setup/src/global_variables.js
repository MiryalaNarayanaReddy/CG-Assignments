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
let game_health = 20;
let game_time = 0;
let cannon_ball_number = 0;

export {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container,stats,
    camera,scene,renderer,controls,water,sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship,
    UNIT_LENGTH,
    game_score,game_treasures,game_health,game_time,

    cannon_balls,promise_connon_balls,cannon_ball_number
}
