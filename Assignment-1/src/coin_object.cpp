#include "coin_object.h"

CoinObject::CoinObject() : GameObject(), Radius(12.5f), Stuck(true) {}

CoinObject::CoinObject(glm::vec2 pos, float radius, glm::vec2 velocity,
						 Texture2D sprite)
	: GameObject(pos, glm::vec2(radius * 2.0f, radius * 2.0f), sprite,
				 glm::vec3(1.0f), velocity),
	  Radius(radius),
	  Stuck(true) {}

// resets the coin to initial Stuck Position (if coin is outside window
// bounds)
void CoinObject::Reset(glm::vec2 position, glm::vec2 velocity) {
	this->Position = position;
	this->Velocity = velocity;
	this->Stuck = true;
}