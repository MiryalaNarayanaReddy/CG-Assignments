import * as THREE from 'three';
// import * as THREE from '../node_modules/three/examples/js/three.module.js';
import Stats from 'three/examples/jsm/libs/stats.module';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { game_object } from './gameobject';
import { animate } from './index.js';
import {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container, stats,
    camera, scene, renderer, controls, water, sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship


} from './global_variables'



 function loadModel(url) {

   return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}


async function Load_game() {

    for (let i = 0; i < NumberOfObjects; i++) {
        promise_treasure_boxes[i] = loadModel('/dist/treasure_chest/scene.gltf').then(result => { treasure_boxes[i] = new game_object(result.scene, false); });
        promise_pirate_ships[i] = loadModel('/dist/pirate_ship/scene.gltf').then(result => { pirate_ships[i] = new game_object(result.scene, false); });

    }

    promise_player_ship = loadModel('/dist/pirate_sailing_ship/scene.gltf').then(result => { player_ship = new game_object(result.scene, false); });
    let promise_game = promise_pirate_ships.concat(promise_treasure_boxes)
    promise_game.push(promise_player_ship);

    Promise.all(promise_game).then(() => {
        //do something to the model

        

        
        for (let i = 0; i < NumberOfObjects; i++) {
            treasure_boxes[i].object.position.set(i * i * 100, 0, i * i * 100);
            treasure_boxes[i].object.scale.set(0.1 * treasure_boxes[i].object.scale.x, 0.1 * treasure_boxes[i].object.scale.y, 0.1 * treasure_boxes[i].object.scale.z)
            scene.add(treasure_boxes[i].object);
        }

        for (let i = 0; i < NumberOfObjects; i++) {
            pirate_ships[i].object.position.set( i* 100, 1, -i * i * 100);
            pirate_ships[i].object.scale.set(0.01 * pirate_ships[i].object.scale.x, 0.01 * pirate_ships[i].object.scale.y, 0.01 * pirate_ships[i].object.scale.z)
            scene.add(pirate_ships[i].object);
        }

        player_ship.object.position.set(player_ship_pos_x,player_ship_pos_y,player_ship_pos_z);
        player_ship.object.scale.set(0.2 * player_ship.object.scale.x, 0.2 * player_ship.object.scale.y, -0.2 * player_ship.object.scale.z)
        
        scene.add(player_ship.object);

        animate();
    });
}

export {Load_game}