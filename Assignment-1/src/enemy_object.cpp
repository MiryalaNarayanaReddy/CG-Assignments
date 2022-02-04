#include "enemy_object.h"

EnemyObject::EnemyObject() : GameObject(), Radius(12.5f), Stuck(true) {}

EnemyObject::EnemyObject(glm::vec2 pos, float radius, glm::vec2 velocity,
						 Texture2D sprite)
	: GameObject(pos, glm::vec2(radius * 2.0f, radius * 2.0f), sprite,
				 glm::vec3(1.0f), velocity),
	  Radius(radius),
	  Stuck(true) {}

glm::vec2 EnemyObject::Move(float dt, unsigned int window_width,
							unsigned int window_height) {
	// if not stuck to player board

	// move the enemy
	this->Position += this->Velocity * dt;
	// then check if outside window bounds and if so, reverse velocity and
	// restore at correct position
	if (this->Position.x <= 0.0f) {
		this->Velocity.x = -this->Velocity.x;
		this->Position.x = 0.0f;
	} else if (this->Position.x + this->Size.x >= window_width) {
		this->Velocity.x = -this->Velocity.x;
		this->Position.x = window_width - this->Size.x;
	}
	if (this->Position.y <= 0.0f) {
		this->Velocity.y = -this->Velocity.y;
		this->Position.y = 0.0f;
	} else if (this->Position.y + this->Size.y >= window_height) {
		this->Velocity.y = -this->Velocity.y;
		this->Position.y = window_height - this->Size.y;
	}

	return this->Position;
}

// resets the enemy to initial Stuck Position (if enemy is outside window
// bounds)
void EnemyObject::Reset(glm::vec2 position, glm::vec2 velocity) {
	this->Position = position;
	this->Velocity = velocity;
	this->Stuck = true;
}