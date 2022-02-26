import * as THREE from '../node_modules/three';
// import * as THREE from '../node_modules/three/examples/js/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../node_modules/three/examples/jsm/objects/Water.js';
import { Sky } from '../node_modules/three/examples/jsm/objects/Sky.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { game_object } from './gameobject';

import {Load_game} from './load_game';

import {
    player_ship_pos_x, player_ship_pos_y, player_ship_pos_z, camera_top_view,

    container, stats,
    camera, scene, renderer, controls, water, sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship, UNIT_LENGTH,
    NumberOfCannonBalls,

} from './global_variables'





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
    camera.position.set(player_ship_pos_x,player_ship_pos_y+UNIT_LENGTH*2,player_ship_pos_z-UNIT_LENGTH*3);


    //

    sun = new THREE.Vector3();

    // Water

    const waterGeometry = new THREE.PlaneGeometry(100000, 100000);

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
    sky.scale.setScalar(100000);
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
     Load_game();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}




export { game_init }