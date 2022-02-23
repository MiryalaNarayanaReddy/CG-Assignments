import * as THREE from '../node_modules/three';
import {game_init} from './game.js'
import {
    ship_pos_x, ship_pos_y, ship_pos_z, camera_top_view,

    container, stats,
    camera, scene, renderer, controls, water, sun,

    NumberOfObjects,
    treasure_boxes, pirate_ships, player_ship,
    promise_pirate_ships, promise_treasure_boxes, promise_player_ship


} from './global_variables'



game_init();


function animate() {
	requestAnimationFrame(animate);
	render();
	stats.update();
}


function render() {

	// const time = performance.now() * 0.001;

	// mesh.position.y = Math.sin(time) * 20 + 5;
	// mesh.rotation.x = time * 0.5;
	// mesh.rotation.z = time * 0.51;
	// console.log(treasure_boxes[0]);
	treasure_boxes[0].object.position.x += 0.1


	
	
	// console.log(x.position.x);
	water.material.uniforms['time'].value += 1.0 / 60.0;

	renderer.render(scene, camera);


}

export { animate }