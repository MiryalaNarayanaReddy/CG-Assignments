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
import { pirate_shoot_cannons } from './update_game';
import {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container, stats,
    camera, scene, renderer, controls, water, sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship, promise_connon_balls, cannon_balls,
    cannon_ball_number,
    UNIT_LENGTH, NumberOfCannonBalls,
    tbox,ship_p,cannon_b
} from './global_variables'



function loadModel(url) {

    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

function Load_game() {
    // let can = []
    // for (let i = 0; i < NumberOfObjects; i++) {
    //     promise_treasure_boxes[i] = loadModel('/dist/treasure_chest/scene.gltf').then(result => { treasure_boxes[i] = new game_object(result.scene, false,false); });
    //     promise_pirate_ships[i] = loadModel('/dist/pirate_ship/scene.gltf').then(result => { pirate_ships[i] = new game_object(result.scene, false,false); });

    //     for(let j=0;j<5;j++)
    //     {
    //         // pirate_ships[i].promise_cannons[j] = loadModel('/dist/cannon_ball/scene.gltf').then(result => { pirate_ships[i].cannon_balls[j] = new game_object(result.scene, false,true); });
    //    can.push(loadModel('/dist/cannon_ball/scene.gltf').then(result => { pirate_ships[i].cannon_balls[j] = new game_object(result.scene, false,true); }))
    //     }
    // }

    // for(let i=0;i<NumberOfCannonBalls;i++)
    // {
    //     promise_connon_balls[i] = loadModel('/dist/cannon_ball/scene.gltf').then(result => { cannon_balls[i] = new game_object(result.scene, false,true); });
    // }

    promise_player_ship = loadModel('/dist/pirate_sailing_ship/scene.gltf').then(result => { player_ship = new game_object(result.scene, false, false); });

    // let promise_game = promise_pirate_ships.concat(promise_treasure_boxes)
    // promise_game = promise_game.concat(promise_connon_balls)
    // promise_game.push(promise_player_ship)
    // promise_game = promise_game.concat(can);


    ////////////////////////////
   
    let pbox = loadModel('/dist/treasure_chest/scene.gltf').then(result => { tbox = new game_object(result.scene, false, false); });
    let pship = loadModel('/dist/pirate_ship/scene.gltf').then(result => { ship_p = new game_object(result.scene, false, false); });
    let pcannon = loadModel('/dist/cannon_ball/scene.gltf').then(result => { cannon_b = new game_object(result.scene, false, true); });


    let promise_game = [pbox, pship, pcannon, promise_player_ship]



    //////////////////////////////

    Promise.all(promise_game).then(() => {
        //do something to the model

        for (let i = 0; i < NumberOfObjects; i++) {
            treasure_boxes[i] = new game_object(tbox.object.clone(true), false, false);
            treasure_boxes[i].object.position.set(UNIT_LENGTH * 10 * (i + 10) * Math.cos(Math.PI * (Math.random() * (360))), 0, UNIT_LENGTH * (i + 10) * 10 * Math.sin(Math.PI * (Math.random() * (360))));
            treasure_boxes[i].object.scale.set(0.2 * treasure_boxes[i].object.scale.x, 0.2 * treasure_boxes[i].object.scale.y, 0.2 * treasure_boxes[i].object.scale.z)
            scene.add(treasure_boxes[i].object);
        }

        for (let i = 0; i < NumberOfObjects; i++) {
            pirate_ships[i] = new game_object(ship_p.object.clone(true), false, false);
            pirate_ships[i].object.position.set(UNIT_LENGTH * 10 * (i + 10) * Math.cos(Math.PI * (Math.random() * (360))), 3, UNIT_LENGTH * (i + 10) * 10 * Math.sin(Math.PI * (Math.random() * (360))));
            pirate_ships[i].object.scale.set(0.02 * pirate_ships[i].object.scale.x, 0.02 * pirate_ships[i].object.scale.y, -0.02 * pirate_ships[i].object.scale.z)
            pirate_ships[i].health = 2 + Math.floor(Math.random() * 5)
            pirate_ships[i].points = pirate_ships[i].health;
            scene.add(pirate_ships[i].object);

            for (let j = 0; j < 5; j++) {
                pirate_ships[i].cannon_balls[j] = new game_object(cannon_b.object.clone(true), false, true);
                pirate_ships[i].cannon_balls[j].object.scale.set(2 * pirate_ships[i].cannon_balls[j].object.scale.x, 2 * pirate_ships[i].cannon_balls[j].object.scale.y, 2 * pirate_ships[i].cannon_balls[j].object.scale.z)
            }
        }

        for (let i = 0; i < NumberOfCannonBalls; i++) {
            cannon_balls[i] = new game_object(cannon_b.object.clone(true), false, true);
            cannon_balls[i].object.scale.set(2 * cannon_balls[i].object.scale.x, 2 * cannon_balls[i].object.scale.y, 2 * cannon_balls[i].object.scale.z)
        }

        player_ship.object.position.set(player_ship_pos_x, player_ship_pos_y, player_ship_pos_z);
        player_ship.object.scale.set(0.7 * player_ship.object.scale.x, 0.7 * player_ship.object.scale.y, -0.7 * player_ship.object.scale.z)

        scene.add(player_ship.object);
        setInterval(pirate_shoot_cannons, 2000);
        animate();
    });
}

export { Load_game }