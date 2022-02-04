/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#include "game_level.h"

#include <fstream>
#include <sstream>

void create_level(int n, std::vector<std::vector<unsigned int>> &tileData) {
	int r = 7;
	int c = 10;

	int level[r][c] = {0};
	if (n == 1) {
		for (int i = 1; i < r - 1; i++) {
			level[i][0] = rand() % 5;
			level[i][1] = rand() % 5;
	        
            level[i][5] = rand() % 5;
			level[i][6] = rand() % 5;

			if (level[i][0] == 1) {
				level[i][0] = 0;
			}
            	if (level[i][1] == 1) {
				level[i][1] = 0;
			}
            	if (level[i][5] == 1) {
				level[i][5] = 0;
			}
            	if (level[i][6] == 1) {
				level[i][6] = 0;
			}
		}
	} else if (n == 2) {
		for (int i = 1; i < r - 1; i++) {
			for (int j = 0; j < c - 1; j++) {
				level[i][j] = rand() % 5;
				if (level[i][j] == 1) {
					level[i][j] = 0;
				}
			}
		}

	} else if (n == 3) {
		for (int i = 1; i < r - 1; i++) {
			for (int j = 0; j < c - 1; j++) {
				level[i][j] = rand() % 5;
				if (level[i][j] == 1) {
					level[i][j] = 0;
				}
			}
		}
	}
	for (int i = 0; i < c; i++) {
		level[0][i] = 1;
		level[rand()%5+1][i] = 0;
		level[r - 1][i] = 1;
	}
	level[1][rand()%8+1] = 3;
	level[3][rand()%8+1] = 3;
	level[5][rand()%8+1] = 3;
	level[2][rand()%8+1] = 2;
	for (int i = 0; i < r; i++) {
		level[i][0] = 1;
		level[i][c - 1] = 1;
	}
	level[3][0] = 0;
	level[3][1] = 0;
	level[3][c - 1] = 0;

	std::vector<unsigned int> row;
	for (int i = 0; i < r; i++) {
		for (int j = 0; j < c; j++) {
			row.push_back(level[i][j]);
		}
		tileData.push_back(row);
		row.clear();
	}
}

void GameLevel::Load(int level, unsigned int levelWidth,
					 unsigned int levelHeight) {
	srand((unsigned)time(NULL));
	// clear old data
	this->Bricks.clear();
	this->coins.clear();
	this->Enemies.clear();
	// load from file
	// unsigned int tileCode;
	// GameLevel level;
	// std::string line;
	// std::ifstream fstream(file);
	std::vector<std::vector<unsigned int>> tileData;

	create_level(level, tileData);
	if (tileData.size() > 0)
		this->init(tileData, levelWidth, levelHeight);

	// if (fstream)
	// {
	// while (std::getline(fstream, line)) // read each line from level file
	// {
	//     std::istringstream sstream(line);
	//     std::vector<unsigned int> row;
	//     while (sstream >> tileCode) // read each word separated by spaces
	//         row.push_back(tileCode);
	//     tileData.push_back(row);
	// }
	//     if (tileData.size() > 0)
	//         this->init(tileData, levelWidth, levelHeight);
	// }
}

void GameLevel::Draw(SpriteRenderer &renderer) {
	for (GameObject &tile : this->Bricks)
		if (!tile.Destroyed)
			tile.Draw(renderer);
	for (GameObject &tile : this->coins)
		if (!tile.Destroyed)
			tile.Draw(renderer);
	for (GameObject &tile : this->Enemies)
		if (!tile.Destroyed)
			tile.Draw(renderer);
}

bool GameLevel::IsCompleted() {
	for (GameObject &tile : this->Bricks)
		if (!tile.IsSolid && !tile.Destroyed)
			return false;
	return true;
}

void GameLevel::init(std::vector<std::vector<unsigned int>> tileData,
					 unsigned int levelWidth, unsigned int levelHeight) {
	// calculate dimensions
	unsigned int height = tileData.size();
	unsigned int width =
		tileData[0].size();  // note we can index vector at [0] since this
							 // function is only called if height > 0
	float unit_width = levelWidth / static_cast<float>(width),
		  unit_height = levelHeight / height;
	// initialize level tiles based on tileData

	for (unsigned int y = 0; y < height; ++y) {
		for (unsigned int x = 0; x < width; ++x) {
			// check block type from level data (2D level array)
			if (tileData[y][x] == 1)  // solid
			{
				glm::vec2 pos(unit_width * x, unit_height * y);
				glm::vec2 size(unit_width, unit_height);
				GameObject obj(pos, size,
							   ResourceManager::GetTexture("block_solid"),
							   glm::vec3(0.8f, 0.8f, 0.7f));
				obj.IsSolid = true;
				this->Bricks.push_back(obj);
			} else if (tileData[y][x] > 1)  // non-solid; now determine its
											// color based on level data
			{
				glm::vec3 color = glm::vec3(1.0f);  // original: white
				Texture2D sprite = ResourceManager::GetTexture("block");
				glm::vec2 pos(unit_width * x, unit_height * y);
				glm::vec2 size(25.0f, 25.0f);

				if (tileData[y][x] == 2) {
					color = glm::vec3(0.2f, 0.6f, 1.0f);
					sprite = ResourceManager::GetTexture("enemy");
					this->Enemies.push_back(GameObject(
						pos, size, sprite, color, glm::vec2(10.0f, 100.0f)));
				} else if (tileData[y][x] == 3) {
					// color = glm::vec3(0.0f, 0.7f, 0.0f);
					sprite = ResourceManager::GetTexture("coin");
					this->coins.push_back(GameObject(pos, size, sprite, color));
				} else if (tileData[y][x] == 4) {
					size = glm::vec2(25.0f, unit_height);
					sprite = ResourceManager::GetTexture("block");
					this->Bricks.push_back(
						GameObject(pos, size, sprite, color));
				}
			}
		}
	}
}
