/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#include "game.h"
#include "resource_manager.h"
#include "sprite_renderer.h"
#include "game_object.h"
#include "enemy_object.h"
#include <cstdlib>
#include <ctime>
#include <iostream>

// Game-related State data
SpriteRenderer  *Renderer;
GameObject      *Player;
// EnemyObject *Enemy;

// Initial velocity of the Enemy
// const glm::vec2 INITIAL_ENEMY_VELOCITY(10.0f, -100.0f);
// Radius of the Enemy object
// const float ENEMY_RADIUS = 12.5f;

Game::Game(unsigned int width, unsigned int height) 
    : State(GAME_ACTIVE), Keys(), Width(width), Height(height)
{ 

}

Game::~Game()
{
    delete Renderer;
    delete Player;
}

void Game::Init()
{
    
    // load shaders
    ResourceManager::LoadShader("/home/narayana/Assignment-1/src/shaders/sprite.vs", "/home/narayana/Assignment-1/src/shaders/sprite.frag", nullptr, "sprite");
    // configure shaders
    glm::mat4 projection = glm::ortho(0.0f, static_cast<float>(this->Width), 
        static_cast<float>(this->Height), 0.0f, -1.0f, 1.0f);
    ResourceManager::GetShader("sprite").Use().SetInteger("image", 0);
    ResourceManager::GetShader("sprite").SetMatrix4("projection", projection);
    // set render-specific controls
    Shader temp = ResourceManager::GetShader("sprite");
    Renderer = new SpriteRenderer(temp);
    // load textures
    ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/background.jpg", false, "background");
    ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/awesomeface.png", true, "face");
    ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/block.png", false, "block");
    ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/block_solid.png", false, "block_solid");
    ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/enemy.png", true, "enemy");
    ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/coin.jpg", true, "coin");
    // ResourceManager::LoadTexture("/home/narayana/Assignment-1/src/textures/paddle.png", true, "paddle");
    // load levels
    GameLevel one; one.Load("/home/narayana/Assignment-1/src/levels/one.lvl", this->Width, this->Height);
// GameLevel two; two.Load("/home/narayana/Assignment-1/src/levels/two.lvl", this->Width, this->Height / 2);
  //  GameLevel three; three.Load("/home/narayana/Assignment-1/src/levels/three.lvl", this->Width, this->Height / 2);
    //GameLevel four; four.Load("/home/narayana/Assignment-1/src/levels/four.lvl", this->Width, this->Height / 2);
    this->Levels.push_back(one);
    // this->Levels.push_back(two);
    // this->Levels.push_back(three);
    // this->Levels.push_back(four);
    this->Level = 0;
    // configure game objects
    glm::vec2 playerPos = glm::vec2( 0, this->Height/2 - PLAYER_SIZE.y/2);
    Player = new GameObject(playerPos, PLAYER_SIZE, ResourceManager::GetTexture("face"));
// srand( (unsigned)time(NULL) );

//  glm::vec2 enemyPos = glm::vec2((rand()%9+1)*(this->Width/10),(rand()%5+1)*(this->Height/7));
//     Enemy = new EnemyObject(enemyPos,ENEMY_RADIUS,INITIAL_ENEMY_VELOCITY, ResourceManager::GetTexture("enemy"));


}

void Game::Update(float dt)
{
    // update objects
    // Enemy->Move(dt, this->Width);
    // // check for collisions
    // this->DoCollisions();
        // Enemy->Move(dt, this->Width,this->Height);

    for(EnemyObject eo:this->Levels[this->Level].Enemies)
    {
        eo.Move(dt,this->Width,this->Height);
    }

}

void Game::ProcessInput(float dt)
{
    if (this->State == GAME_ACTIVE)
    {
        float velocity = PLAYER_VELOCITY * dt;
        // move playerboard
        if (this->Keys[GLFW_KEY_LEFT])
        {
            if (Player->Position.x >= 0.0f)
                Player->Position.x -= velocity;
        }
        if (this->Keys[GLFW_KEY_RIGHT])
        {
            if (Player->Position.x <= this->Width - Player->Size.x)
                Player->Position.x += velocity;
        }
         if (this->Keys[GLFW_KEY_DOWN])
        {
            if (Player->Position.y <= this->Height - Player->Size.y)
                Player->Position.y += velocity;
        }
           if (this->Keys[GLFW_KEY_UP])
        {
            if (Player->Position.y >=0.0f)
                Player->Position.y -= velocity;
        }
    }
}

void Game::Render()
{
    if(this->State == GAME_ACTIVE)
    {
        Texture2D temp = ResourceManager::GetTexture("background");
        // draw background
        Renderer->DrawSprite(temp, glm::vec2(0.0f, 0.0f), glm::vec2(this->Width, this->Height), 0.0f);
        // draw level
        this->Levels[this->Level].Draw(*Renderer);
        // draw player
        Player->Draw(*Renderer);
        // draw enemy
        // Enemy->Draw(*Renderer);
         
    }


}

// bool CheckCollision(EnemyObject &one, GameObject &two) // AABB - Circle collision
// {
//     // get center point circle first 
//     glm::vec2 center(one.Position + one.Radius);
//     // calculate AABB info (center, half-extents)
//     glm::vec2 aabb_half_extents(two.Size.x / 2.0f, two.Size.y / 2.0f);
//     glm::vec2 aabb_center(
//         two.Position.x + aabb_half_extents.x, 
//         two.Position.y + aabb_half_extents.y
//     );
//     // get difference vector between both centers
//     glm::vec2 difference = center - aabb_center;
//     glm::vec2 clamped = glm::clamp(difference, -aabb_half_extents, aabb_half_extents);
//     // add clamped value to AABB_center and we get the value of box closest to circle
//     glm::vec2 closest = aabb_center + clamped;
//     // retrieve vector between center circle and closest point AABB and check if length <= radius
//     difference = closest - center;
//     return glm::length(difference) < one.Radius;
// }      

void Game::DoCollisions()
{
    // for (GameObject &walls : this->Levels[this->Level].Bricks)
    // {
        
    //         if (CheckCollision(*Player,player))
    //         {
                
    //         }
        
    // }
} 

 