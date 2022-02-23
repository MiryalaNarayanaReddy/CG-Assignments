import * as THREE from '../node_modules/three/build/three.module.js';
var ship_pos_x = 0
var ship_pos_y = 0
var ship_pos_z = 1

var camera_top_view = false

const scene = new THREE.Scene();


let pirate_ships = [];
const treasure_boxes =  [];
export {ship_pos_x,ship_pos_y,ship_pos_z,camera_top_view,scene,pirate_ships,treasure_boxes}
