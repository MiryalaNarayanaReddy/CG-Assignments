#include <GLFW/glfw3.h>
#include <glad/glad.h>

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <iostream>
#include <string>

#include "camera.h"
#include "shader.h"

void framebuffer_size_callback(GLFWwindow *window, int width, int height);
void processInput(GLFWwindow *window);

// settings
const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 800;

// camera
Camera camera(glm::vec3(0.0f, 0.0f, 10.0f));

int main(int argc, char *argv[]) {
	// glfw: initialize and configure
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

#ifdef __APPLE__
	glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
#endif

	// glfw window creation
	GLFWwindow *window =
		glfwCreateWindow(SCR_WIDTH, SCR_HEIGHT, "LearnOpenGL", NULL, NULL);
	if (window == NULL) {
		std::cout << "Failed to create GLFW window" << std::endl;
		glfwTerminate();
		return -1;
	}
	glfwMakeContextCurrent(window);
	glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

	// glad: load all OpenGL function pointers
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
		std::cout << "Failed to initialize GLAD" << std::endl;
		return -1;
	}

	// build and compile our shader program
	Shader ourShader("../src/vertex.shader", "../src/fragment.shader");

	// set up vertex data (and buffer(s)) and configure vertex attributes

	int n = std::stoi(argv[1]);
	std::cout << n << "\n";
	float polygon_vertices_a[3 * n];
	float polygon_vertices_b[3 * n];
	float theta = (2 * M_PI / n);
	for (int i = 0; i < n; i++) {
		int x = 3 * i;

		polygon_vertices_a[x] = 0.5 * cos(i * theta);
		polygon_vertices_a[x + 1] = 0.5 * sin(i * theta);
		polygon_vertices_a[x + 2] = 0.5;

		polygon_vertices_b[x] = 0.5 * cos(i * theta);
		polygon_vertices_b[x + 1] = 0.5 * sin(i * theta);
		polygon_vertices_b[x + 2] = -0.5;
	}

	float vertices[4 * n * 3 * 6];  // total 4n triangles 3 vertices each vertex
									// needs 6 floats

	for (int i = 1; i < n; i++) {
		int x = 3 * (6 * (i));
		int y = 3 * i;
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 0.0f;
		vertices[x + 4] = 1.0f;
		vertices[x + 5] = 0.0f;

		x += 6;
		y -= 3;
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 0.0f;
		vertices[x + 4] = 1.0f;
		vertices[x + 5] = 0.0f;

		x += 6;
		vertices[x] = 0;
		vertices[x + 1] = 0;
		vertices[x + 2] = 0.5;
		vertices[x + 3] = 0.0f;
		vertices[x + 4] = 1.0f;
		vertices[x + 5] = 0.0f;
	}
	int t = 0;
	int s = 3 * (n - 1);
	vertices[t] = polygon_vertices_a[s];
	vertices[t + 1] = polygon_vertices_a[s + 1];
	vertices[t + 2] = polygon_vertices_a[s + 2];
	vertices[t + 3] = 0.0f;
	vertices[t + 4] = 1.0f;
	vertices[t + 5] = 0.0f;

	t += 6;
	s = 0;
	vertices[t] = polygon_vertices_a[s];
	vertices[t + 1] = polygon_vertices_a[s + 1];
	vertices[t + 2] = polygon_vertices_a[s + 2];
	vertices[t + 3] = 0.0f;
	vertices[t + 4] = 1.0f;
	vertices[t + 5] = 0.0f;
	t += 6;
	vertices[t] = 0;
	vertices[t + 1] = 0;
	vertices[t + 2] = 0.5;
	vertices[t + 3] = 0.0f;
	vertices[t + 4] = 1.0f;
	vertices[t + 5] = 0.0f;

	for (int i = 1; i < n; i++) {
		int x = 3 * n * 6 + 3 * (6 * i);
		int y = 3 * i;
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0f;
		vertices[x + 4] = 0.0f;
		vertices[x + 5] = 1.0f;

		x += 6;
		y -= 3;
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0f;
		vertices[x + 4] = 0.0f;
		vertices[x + 5] = 1.0f;

		x += 6;
		vertices[x] = 0;
		vertices[x + 1] = 0;
		vertices[x + 2] = -0.5;
		vertices[x + 3] = 1.0f;
		vertices[x + 4] = 0.0f;
		vertices[x + 5] = 1.0f;
	}

	t = 3 * n * 6;
	s = 3 * (n - 1);
	vertices[t] = polygon_vertices_b[s];
	vertices[t + 1] = polygon_vertices_b[s + 1];
	vertices[t + 2] = polygon_vertices_b[s + 2];
	vertices[t + 3] = 1.0f;
	vertices[t + 4] = 0.0f;
	vertices[t + 5] = 1.0f;

	t += 6;
	s = 0;
	vertices[t] = polygon_vertices_b[s];
	vertices[t + 1] = polygon_vertices_b[s + 1];
	vertices[t + 2] = polygon_vertices_b[s + 2];
	vertices[t + 3] = 1.0f;
	vertices[t + 4] = 0.0f;
	vertices[t + 5] = 1.0f;
	t += 6;
	vertices[t] = 0;
	vertices[t + 1] = 0;
	vertices[t + 2] = -0.5;
	vertices[t + 3] = 1.0f;
	vertices[t + 4] = 0.0f;
	vertices[t + 5] = 1.0f;
	int cr1 = 1.0, cg1 = 1.0, cb1 = 0.0;
	int cr2 = 1.0, cg2 = 0.0, cb2 = 0.0;

	///////////////////////////////

	for (int i = 0; i < n - 1; i++) {
		int x = 2 * 3 * n * 6 + 3 * (6 * (i));
		int y = 3 * i;
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = i % 2;
		vertices[x + 5] = 0.0;

		x += 6;
		y += 3;
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = i % 2;
		vertices[x + 5] = 0.0;
		x += 6;
		y -= 3;
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = i % 2;
		vertices[x + 5] = 0.0;

		x = 3 * 3 * n * 6 + 3 * (6 * (i));

		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = i % 2;
		vertices[x + 5] = 0.0;

		x += 6;
		y += 3;
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = i % 2;
		vertices[x + 5] = 0.0;
		x += 6;

		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = i % 2;
		vertices[x + 5] = 0.0;
	}

	if (n % 2 == 0) {
		int x = 2 * 3 * n * 6 + 3 * (6 * (n - 1));
		int y = 3 * (n - 1);
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 0.0;

		x += 6;
		y = 0;
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 0.0;
		x += 6;
		y = 3 * (n - 1);
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 0.0;

		x = 3 * 3 * n * 6 + 3 * (6 * (n - 1));

		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 0.0;

		x += 6;
		y = 0;
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 0.0;
		x += 6;

		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 1.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 0.0;

	} else {
		int x = 2 * 3 * n * 6 + 3 * (6 * (n - 1));
		int y = 3 * (n - 1);
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 0.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 1.0;

		x += 6;
		y = 0;
		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 0.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 1.0;
		x += 6;
		y = 3 * (n - 1);
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 0.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 1.0;

		x = 3 * 3 * n * 6 + 3 * (6 * (n - 1));

		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 0.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 1.0;

		x += 6;
		y = 0;
		vertices[x] = polygon_vertices_b[y];
		vertices[x + 1] = polygon_vertices_b[y + 1];
		vertices[x + 2] = polygon_vertices_b[y + 2];
		vertices[x + 3] = 0.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 1.0;
		x += 6;

		vertices[x] = polygon_vertices_a[y];
		vertices[x + 1] = polygon_vertices_a[y + 1];
		vertices[x + 2] = polygon_vertices_a[y + 2];
		vertices[x + 3] = 0.0;
		vertices[x + 4] = (n - 1) % 2;
		vertices[x + 5] = 1.0;
	}

	unsigned int NUM_VERTICES = (sizeof(vertices) / sizeof(vertices[0])) / 6;

	unsigned int VBO, VAO;
	glGenVertexArrays(1, &VAO);
	glGenBuffers(1, &VBO);
	// bind the Vertex Array Object first, then bind and set vertex buffer(s),
	// and then configure vertex attributes(s).
	glBindVertexArray(VAO);

	glBindBuffer(GL_ARRAY_BUFFER, VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

	// position attribute
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float),
						  (void *)0);
	glEnableVertexAttribArray(0);
	// color attribute
	glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float),
						  (void *)(3 * sizeof(float)));
	glEnableVertexAttribArray(1);

	// note that this is allowed, the call to glVertexAttribPointer registered
	// VBO as the vertex attribute's bound vertex buffer object so afterwards we
	// can safely unbind
	glBindBuffer(GL_ARRAY_BUFFER, 0);

	// You can unbind the VAO afterwards so other VAO calls won't accidentally
	// modify this VAO, but this rarely happens. Modifying other VAOs requires a
	// call to glBindVertexArray anyways so we generally don't unbind VAOs (nor
	// VBOs) when it's not directly necessary.
	glBindVertexArray(0);

	// enable depth testing for 3d
	glEnable(GL_DEPTH_TEST);

	// render loop
	glm::mat4 view = camera.GetViewMatrix(glm::vec3(0.0f));
	glm::vec3 camera_up = glm::vec3(0, 0, 1);

	bool rot = false;
	bool turn_table = false;
	bool new_cam_pos1 = false;
	bool new_cam_pos2 = false;
	bool make_move = false;
	float displace_x = 0;
	float displace_y = 0;
	float displace_z = 0;
	float fly_theta = 0, fly_phi = 0;
	float radius = 10;
	while (!glfwWindowShouldClose(window)) {
		// input
		processInput(window);

		// render
		glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

		// make transformations
		glm::mat4 transform = glm::mat4(1.0f);  // identity matrix
		{
			if (turn_table) {
				const float radius = 10.0f;

				float camX = sin(glfwGetTime()) * radius;
				float camZ = cos(glfwGetTime()) * radius;
				view = glm::lookAt(glm::vec3(camX, 0.0, camZ),
								   glm::vec3(0.0, 0.0, 0.0),
								   glm::vec3(0.0, -1.0, 0.0));
			}
			if (rot) {
				transform = glm::rotate(transform, (float)glfwGetTime(),
										glm::vec3(1.0f, 0.0f, 0.0f));
			}

			if (new_cam_pos1) {
				view = glm::lookAt(glm::vec3(5.0, 5.0, 5.0),
								   glm::vec3(0.0, 0.0, 0.0),
								   glm::vec3(0.0, 0.0, 1.0));
			}
			if (new_cam_pos2) {
				view = glm::lookAt(glm::vec3(-5.0, -5.0, -5.0),
								   glm::vec3(0.0, 0.0, 0.0),
								   glm::vec3(0.0, 0.0, 1.0));
			}

			ourShader.use();
		}

		// translate
		{
			if (glfwGetKey(window, GLFW_KEY_X) == GLFW_PRESS) {
				displace_x += 0.05;
			}
			if (glfwGetKey(window, GLFW_KEY_Z) == GLFW_PRESS) {
				displace_z += 0.05;
			}
			if (glfwGetKey(window, GLFW_KEY_Y) == GLFW_PRESS) {
				displace_y += 0.05;
			}
			if (glfwGetKey(window, GLFW_KEY_J) == GLFW_PRESS) {
				displace_x -= 0.05;
			}
			if (glfwGetKey(window, GLFW_KEY_K) == GLFW_PRESS) {
				displace_y -= 0.05;
			}
			if (glfwGetKey(window, GLFW_KEY_L) == GLFW_PRESS) {
				displace_z -= 0.05;
			}
			transform = glm::translate(
				transform, glm::vec3(displace_x, displace_y, displace_z));
		}

		// prism fashion show
		{
			if (glfwGetKey(window, GLFW_KEY_0) == GLFW_PRESS) {
				new_cam_pos1 = true;
				new_cam_pos2 = false;
				rot = false;
				turn_table = false;
			} else if (glfwGetKey(window, GLFW_KEY_1) == GLFW_PRESS) {
				new_cam_pos2 = true;
				new_cam_pos1 = false;
				rot = false;
				turn_table = false;
			}
		}

		// rotating
		if (glfwGetKey(window, GLFW_KEY_R) == GLFW_PRESS) {
			if (rot) {
				rot = false;
			} else {
				// std::cout << "toggled = rotting\n";
				rot = true;
			}
		}

		// turntables
		if (glfwGetKey(window, GLFW_KEY_T) == GLFW_PRESS) {
			if (turn_table) {
				turn_table = false;
			} else {
				// std::cout << "turn table = rotting\n";
				turn_table = true;
			}
		}
		// flying camera
		{
			if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS) {
				radius += 0.1;
				new_cam_pos2 = false;
				new_cam_pos1 = false;
			}
			if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS) {
				radius -= 0.1;
				new_cam_pos2 = false;
				new_cam_pos1 = false;
			}
			if (glfwGetKey(window, GLFW_KEY_A) == GLFW_PRESS) {
				fly_phi--;
				new_cam_pos2 = false;
				new_cam_pos1 = false;
			}
			if (glfwGetKey(window, GLFW_KEY_D) == GLFW_PRESS) {
				fly_phi++;

				new_cam_pos2 = false;
				new_cam_pos1 = false;
			}
			if (glfwGetKey(window, GLFW_KEY_Q) == GLFW_PRESS) {
				fly_theta++;
				new_cam_pos2 = false;
				new_cam_pos1 = false;
			}
			if (glfwGetKey(window, GLFW_KEY_E) == GLFW_PRESS) {
				fly_theta--;
				new_cam_pos2 = false;
				new_cam_pos1 = false;
			}

			glm::vec3 cameraTarget =
				glm::vec3(displace_x, displace_y, displace_z);
			glm::vec3 cameraPos =
				glm::vec3(radius * cos(M_PI * fly_theta / 180) *
							  cos(M_PI * fly_phi / 180),
						  radius * cos(M_PI * fly_theta / 180) *
							  sin(M_PI * fly_phi / 180),
						  radius * sin(M_PI * fly_theta / 180));
			view = glm::lookAt(
				cameraPos, cameraTarget,
				glm::normalize(glm::vec3(
					-sin(M_PI * fly_theta / 180) * cos(M_PI * fly_phi / 180),
					-sin(M_PI * fly_theta / 180) * sin(M_PI * fly_phi / 180),
					cos(M_PI * fly_theta / 180))));
		}

		ourShader.setMat4("transform", transform);
		ourShader.setMat4("view", view);

		// projection matrix
		glm::mat4 projection = glm::perspective(
			glm::radians(camera.Zoom), (float)SCR_WIDTH / (float)SCR_HEIGHT,
			0.1f, 100.0f);

		ourShader.setMat4("projection", projection);

		glBindVertexArray(VAO);

		glDrawArrays(GL_TRIANGLES, 0, NUM_VERTICES);

		glfwSwapBuffers(window);
		glfwPollEvents();
	}

	// optional: de-allocate all resources once they've outlived their purpose:
	glDeleteVertexArrays(1, &VAO);
	glDeleteBuffers(1, &VBO);

	// glfw: terminate, clearing all previously allocated GLFW resources.
	glfwTerminate();
	return 0;
}

// process all input: query GLFW whether relevant keys are pressed/released this
// frame and react accordingly
void processInput(GLFWwindow *window) {
	if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
		glfwSetWindowShouldClose(window, true);
}

// glfw: whenever the window size changed (by OS or user resize) this callback
// function executes
void framebuffer_size_callback(GLFWwindow *window, int width, int height) {
	// make sure the viewport matches the new window dimensions; note that width
	// and height will be significantly larger than specified on retina
	// displays.
	glViewport(0, 0, width, height);
}
