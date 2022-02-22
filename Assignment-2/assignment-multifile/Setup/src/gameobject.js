class game_object {
	object;
	is_destroyed = false;

	constructor(object, is_destroyed) {
		this.object = object;
		this.is_destroyed = is_destroyed;
	}

}

export {game_object}