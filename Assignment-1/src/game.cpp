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
#include "texture.h"

// Game-related State data
SpriteRenderer  *Renderer;


Game::Game(unsigned int width, unsigned int height) 
    : State(GAME_ACTIVE), Keys(), Width(width), Height(height)
{ 

}

Game::~Game()
{
    delete Renderer;
}

void Game::Init()
{
    // load shaders
   const char* vs = "/home/narayana/Downloads/semester-4/Computer Graphics/CG Assignments/Assignment-1/src/shaders/sprite.vs";
    const char* fs = "/home/narayana/Downloads/semester-4/Computer Graphics/CG Assignments/Assignment-1/src/shaders/sprite.frag";
    ResourceManager::LoadShader(vs, fs, nullptr, "sprite");
    // configure shaders
    glm::mat4 projection = glm::ortho(0.0f, static_cast<float>(this->Width), 
        static_cast<float>(this->Height), 0.0f, -1.0f, 1.0f);
    ResourceManager::GetShader("sprite").Use().SetInteger("image", 0);
    ResourceManager::GetShader("sprite").SetMatrix4("projection", projection);
    // set render-specific controls
    Shader temp_shader = ResourceManager::GetShader("sprite");
    Renderer = new SpriteRenderer(temp_shader);
    // load textures
    ResourceManager::LoadTexture("/home/narayana/Downloads/semester-4/Computer Graphics/CG Assignments/Assignment-1/src/textures/awesomeface.png", true, "face");
}

void Game::Update(float dt)
{
    
}

void Game::ProcessInput(float dt)
{
   
}

void Game::Render()
{Texture2D temp_Texture2D = ResourceManager::GetTexture("face");
    Renderer->DrawSprite( temp_Texture2D, glm::vec2(200.0f, 200.0f), glm::vec2(300.0f, 400.0f), 45.0f, glm::vec3(0.0f, 1.0f, 0.0f));
}
