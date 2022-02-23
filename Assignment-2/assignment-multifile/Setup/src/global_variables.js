import * as THREE from '../node_modules/three/build/three.module.js';
var ship_pos_x = 0
var ship_pos_y = 0
var ship_pos_z = 1

var camera_top_view = false


let container, stats;
let camera, scene, renderer;
let controls, water, sun;

let NumberOfObjects = 10

let treasure_boxes = new Array(NumberOfObjects);
let pirate_ships = new Array(NumberOfObjects);
let promise_pirate_ships = new Array(NumberOfObjects);
let promise_treasure_boxes = new Array(NumberOfObjects);

let player_ship;
let promise_player_ship;



export {
    ship_pos_x, ship_pos_y, ship_pos_z, camera_top_view,

    container,stats,
    camera,scene,renderer,controls,water,sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship


}
