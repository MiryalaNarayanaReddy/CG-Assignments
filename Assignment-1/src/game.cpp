/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#include "game.h"

#include <bits/stdc++.h>
#include <unistd.h>
#include <wait.h>

#include <cstdlib>
#include <ctime>
#include <iostream>

#include "enemy_object.h"
#include "game_object.h"
#include "resource_manager.h"
#include "sprite_renderer.h"

#ifdef FREE_TYPE
#include "text_render.h"
TextRenderer *Text;
#endif

// Game-related State data
SpriteRenderer *Renderer;
GameObject *Player;

// EnemyObject *Enemy;

// Initial velocity of the Enemy
// const glm::vec2 INITIAL_ENEMY_VELOCITY(10.0f, -100.0f);
// Radius of the Enemy object
// const float ENEMY_RADIUS = 12.5f;

Game::Game(unsigned int width, unsigned int height)
	: State(GAME_ACTIVE), Keys(), Width(width), Height(height) {}

Game::~Game() {
	delete Renderer;
	delete Player;
}

void Game::Init() {
// load shaders
#ifdef FREE_TYPE
	Text = new TextRenderer(this->Width, this->Height);
	Text->Load("fonts/ocraext.TTF", 24);
#endif
	this->score = 0;
	ResourceManager::LoadShader(
		"/home/narayana/Assignment-1/src/shaders/sprite.vs",
		"/home/narayana/Assignment-1/src/shaders/sprite.frag", nullptr,
		"sprite");
	// ResourceManager::LoadShader(
	// 	"/home/narayana/Assignment-1/src/shaders/lighting.vs",
	// 	"/home/narayana/Assignment-1/src/shaders/lighting.frag", nullptr,
	// 	"lighting");

	// configure shaders
	glm::mat4 projection =
		glm::ortho(0.0f, static_cast<float>(this->Width),
				   static_cast<float>(this->Height), 0.0f, -1.0f, 1.0f);
	ResourceManager::GetShader("sprite").Use().SetInteger("image", 0);
	ResourceManager::GetShader("sprite").SetMatrix4("projection", projection);
	// set render-specific controls
	Shader temp = ResourceManager::GetShader("sprite");
	Renderer = new SpriteRenderer(temp);
	// load textures
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/background.jpg", false,
		"background");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/awesomeface.png", true,
		"face");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/block.png", false, "block");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/block_solid.png", false,
		"block_solid");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/enemy.png", true, "enemy");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/coin.png", true, "coin");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/game_over.png", true,
		"gameover");
	ResourceManager::LoadTexture(
		"/home/narayana/Assignment-1/src/textures/game_win.png", true,
		"gamewin");
	// ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/paddle.png",
	// true, "paddle"); load levels
	GameLevel one;
	one.Load(1, this->Width, this->Height);
	GameLevel two;
	two.Load(2, this->Width, this->Height);
	GameLevel three;
	three.Load(3, this->Width, this->Height);
	// GameLevel four;
	// four.Load("/home/narayana/Assignment-1/src/levels/four.lvl", this->Width,
	// this->Height / 2);
	this->Levels.push_back(one);
	this->Levels.push_back(two);
	this->Levels.push_back(three);
	// this->Levels.push_back(four);
	this->Level = 0;
	// configure game objects
	glm::vec2 playerPos = glm::vec2(0, this->Height / 2 - PLAYER_SIZE.y / 2);
	Player = new GameObject(playerPos, PLAYER_SIZE,
							ResourceManager::GetTexture("face"));
}

void Game::Update(float dt) {
	// update objects
	// Enemy->Move(dt, this->Width);
	// // check for collisions
	// this->DoCollisions();
	// Enemy->Move(dt, this->Width, this->Height);
	if (this->State == GAME_OVER || this->State == GAME_WIN) {
		sleep(2);
		this->~Game();
	}
	for (int i = 0; i < this->Levels[this->Level].Enemies.size(); i++) {
		this->Levels[this->Level].Enemies[i].Move(dt, this->Width,
												  this->Height);
	}
	this->DoCollisions();
	bool all_coins = true;
	for (int i = 0; i < this->Levels[this->Level].coins.size(); i++) {
		if (!this->Levels[this->Level].coins[i].Destroyed) {
			all_coins = false;
		}
	}

	if (all_coins) {
		if (Player->Position.x > this->Width * (9.0f / 10) &&
			Player->Position.y > this->Height * (2.0f / 7) &&
			Player->Position.y < this->Height * (4.0f / 7)) {
			if (this->Level == 2) {
				this->State = GAME_WIN;
			} else {
				this->Level = this->Level + 1;
				Player->Position.x = 0;
				Player->Position.y = this->Height / 2 - PLAYER_SIZE.y / 2;
				std::cout << "next level\n";
				sleep(2);
			}
		}
	}
}

bool CheckCollision(GameObject &one, GameObject &two)  // AABB - AABB collision
{
	// collision x-axis?
	bool collisionX = one.Position.x + one.Size.x >= two.Position.x &&
					  two.Position.x + two.Size.x >= one.Position.x;
	// collision y-axis?
	bool collisionY = one.Position.y + one.Size.y >= two.Position.y &&
					  two.Position.y + two.Size.y >= one.Position.y;
	// collision only if on both axes
	return collisionX && collisionY;
}

void Game::ProcessInput(float dt) {
	int posx = Player->Position.x;
	int posy = Player->Position.y;

	if (this->State == GAME_ACTIVE) {
		float velocity = PLAYER_VELOCITY * dt;
		// move playerboard
		if (this->Keys[GLFW_KEY_LEFT]) {
			if (Player->Position.x >= 0.0f)
				Player->Position.x -= velocity;
		}
		if (this->Keys[GLFW_KEY_RIGHT]) {
			if (Player->Position.x <= this->Width - Player->Size.x)
				Player->Position.x += velocity;
		}
		if (this->Keys[GLFW_KEY_DOWN]) {
			if (Player->Position.y <= this->Height - Player->Size.y)
				Player->Position.y += velocity;
		}
		if (this->Keys[GLFW_KEY_UP]) {
			if (Player->Position.y >= 0.0f)
				Player->Position.y -= velocity;
		}
	}
	for (GameObject &wall : this->Levels[this->Level].Bricks) {
		if (CheckCollision(*Player, wall)) {
			Player->Position.x = posx;
			Player->Position.y = posy;
		}
	}
}

void Game::Render() {
	if (this->State == GAME_ACTIVE) {
		Texture2D temp = ResourceManager::GetTexture("background");
		// draw background
		Renderer->DrawSprite(temp, glm::vec2(0.0f, 0.0f),
							 glm::vec2(this->Width, this->Height), 0.0f);
		// draw level
		this->Levels[this->Level].Draw(*Renderer);
		// draw player
		Player->Draw(*Renderer);

#ifdef FREE_TYPE
		std::stringstream ss;
		ss << this->score;
		Text->RenderText("Lives:" + ss.str(), 5.0f, 5.0f, 1.0f);
#endif
	} else if (this->State == GAME_OVER) {
		Texture2D temp = ResourceManager::GetTexture("gameover");
		Renderer->DrawSprite(
			temp,
			glm::vec2(this->Width * (2.0f / 10), this->Height * (2.0f / 5)),
			glm::vec2(this->Width / 2, this->Height / 2), 0.0f);

	} else if (this->State == GAME_WIN) {
		Texture2D temp = ResourceManager::GetTexture("gamewin");
		Renderer->DrawSprite(
			temp,
			glm::vec2(this->Width * (2.0f / 10), this->Height * (2.0f / 5)),
			glm::vec2(this->Width / 2, this->Height / 2), 0.0f);
	}
}

void Game::DoCollisions() {
	for (int i = 0; i < this->Levels[this->Level].Enemies.size(); i++) {
		if (CheckCollision(this->Levels[this->Level].Enemies[i], *Player)) {
			this->State = GAME_OVER;
			std::cout << "gameover\n";
		}
	}
	for (int i = 0; i < this->Levels[this->Level].coins.size(); i++) {
		if (CheckCollision(this->Levels[this->Level].coins[i], *Player)) {
			if (!this->Levels[this->Level].coins[i].Destroyed) {
				this->Levels[this->Level].coins[i].Destroyed = true;
				this->score++;
				std::cout << "Score = " << this->score << "\n";
			}
		}
	}

	for (int i = 0; i < this->Levels[this->Level].Enemies.size(); i++) {
		for (int j = 0; j < this->Levels[this->Level].Bricks.size(); j++) {
			if (CheckCollision(this->Levels[this->Level].Enemies[i],
							   this->Levels[this->Level].Bricks[j])) {
				this->Levels[this->Level].Enemies[i].Velocity.y =
					-this->Levels[this->Level].Enemies[i].Velocity.y;
			}
		}
	}
}
