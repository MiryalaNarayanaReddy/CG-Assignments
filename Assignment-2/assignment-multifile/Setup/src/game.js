import * as THREE from '../node_modules/three';
// import * as THREE from '../node_modules/three/examples/js/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../node_modules/three/examples/jsm/objects/Water.js';
import { Sky } from '../node_modules/three/examples/jsm/objects/Sky.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { game_object } from './gameobject';
import { animate } from './index';

import {
    ship_pos_x, ship_pos_y, ship_pos_z, camera_top_view,

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


function game_init() {

    container = document.getElementById('container');

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(30, 30, 100);

    //

    sun = new THREE.Vector3();

    // Water

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add(water);

    // Skybox

    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const parameters = {
        elevation: 90,
        azimuth: 180
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);



    const phi = THREE.MathUtils.degToRad(0);
    const theta = THREE.MathUtils.degToRad(180);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    scene.environment = pmremGenerator.fromScene(sky).texture;



    window.addEventListener('resize', onWindowResize);


    /////////////////   OBJECTS ADDING /////////////////////////////////////
    Load_objects();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}



function Load_objects() {

    for (let i = 0; i < NumberOfObjects; i++) {
        promise_treasure_boxes[i] = loadModel('/dist/treasure_chest/scene.gltf').then(result => { treasure_boxes[i] = new game_object(result.scene.children[0], false); });
        promise_pirate_ships[i] = loadModel('/dist/pirate_ship/scene.gltf').then(result => { pirate_ships[i] = new game_object(result.scene.children[0], false); });

    }

    promise_player_ship = loadModel('/dist/pirate_sailing_ship/scene.gltf').then(result => { player_ship = new game_object(result.scene.children[0], false); });
    let promise_game = promise_pirate_ships.concat(promise_treasure_boxes)
    promise_game.push(promise_player_ship);

    Promise.all(promise_game).then(() => {
        //do something to the model

        for (let i = 0; i < NumberOfObjects; i++) {
            treasure_boxes[i].object.position.set(i * i * 1000, 0, i * i * 1000);
            treasure_boxes[i].object.scale.set(0.1 * treasure_boxes[i].object.scale.x, 0.1 * treasure_boxes[i].object.scale.y, 0.1 * treasure_boxes[i].object.scale.z)
            scene.add(treasure_boxes[i].object);
        }

        for (let i = 0; i < NumberOfObjects; i++) {
            pirate_ships[i].object.position.set(i * i * 100, 0, -i * i * 100);
            pirate_ships[i].object.scale.set(0.01 * pirate_ships[i].object.scale.x, 0.01 * pirate_ships[i].object.scale.y, 0.01 * pirate_ships[i].object.scale.z)
            scene.add(pirate_ships[i].object);
        }
        player_ship.object.position.set(-1000, 0, -1000);
        player_ship.object.scale.set(0.1 * player_ship.object.scale.x, 0.1 * player_ship.object.scale.y, 0.1 * player_ship.object.scale.z)
        scene.add(player_ship.object);

        animate();
    });
}

export { game_init }