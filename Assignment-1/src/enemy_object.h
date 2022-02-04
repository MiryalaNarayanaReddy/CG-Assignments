/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#ifndef ENEMYOBJECT_H
#define ENEMYOBJECT_H

#include <glad/glad.h>
#include <glm/glm.hpp>

#include "texture.h"
#include "sprite_renderer.h"
#include "game_object.h"
class EnemyObject : public GameObject
{
    public:
        // Enemy state	
        float     Radius;
        bool      Stuck;

        EnemyObject();
        EnemyObject(glm::vec2 pos, float radius, glm::vec2 velocity, Texture2D sprite);

        glm::vec2 Move(float dt, unsigned int window_width,unsigned int window_height);
        void      Reset(glm::vec2 position, glm::vec2 velocity);
}; 

#endif