import * as THREE from '../node_modules/three/build/three.module.js';
import { game_object } from './gameobject.js';

function create_ocean() {

	const geometry = new THREE.PlaneGeometry();
	const material = new THREE.MeshPhongMaterial({ color: 0x4ddbff });
	const ocean = new THREE.Mesh(geometry, material);
	ocean.position.set(0, 0, 0)
	ocean.scale.set(window.innerWidth, 10000, 1)
	var ocean_object = new game_object(ocean, false)
	return ocean_object
}

export {create_ocean}