#include <glad/glad.h>
#include <GLFW/glfw3.h>


#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <iostream>

#include "camera.h"
#include "shader.h"

void framebuffer_size_callback(GLFWwindow *window, int width, int height);
void processInput(GLFWwindow *window);

// settings
const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 800;

// camera
Camera camera(glm::vec3(1.0f, 1.0f, 10.0f));

int main() {
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
	float vertices[] = {
		0.5f, 0.5f, 0.5f,  1.0f, 0.0f, 0.0f, 
		0.5f, 0.5f, -0.5f, 1.0f, 0.0f, 0.0f,  
		0.5f, -0.5f, 0.5f,  1.0f, 0.0f, 0.0f,

		0.5f, 0.5f, -0.5f, 1.0f, 0.0f, 0.0f,  
		0.5f, -0.5f, 0.5f,  1.0f, 0.0f, 0.0f,
		0.5f, -0.5f, -0.5f,  1.0f, 0.0f, 0.0f,
		
		0.5f, 0.5f, 0.5f,  0.0f, 1.0f, 0.0f, 
		0.5f, 0.5f, -0.5f, 0.0f, 1.0f, 0.0f, 
		-0.5f, 0.5f, -0.5f, 0.0f, 1.0f, 0.0f, 

		0.5f, 0.5f, 0.5f,  0.0f, 1.0f, 0.0f, 
		-0.5f, 0.5f, -0.5f, 0.0f, 1.0f, 0.0f, 
		-0.5f, 0.5f, 0.5f, 0.0f, 1.0f, 0.0f, 

		0.5f, 0.5f, 0.5f,  0.0f, 0.0f, 1.0f, 
		-0.5f, 0.5f, 0.5f, 0.0f, 0.0f, 1.0f, 
		0.5f, -0.5f, 0.5f, 0.0f, 0.0f, 1.0f, 

		-0.5f, 0.5f, 0.5f, 0.0f, 0.0f, 1.0f, 
		0.5f, -0.5f, 0.5f, 0.0f, 0.0f, 1.0f, 
		-0.5f, -0.5f, 0.5f, 0.0f, 0.0f, 1.0f, 


		0.5f, -0.5f, 0.5f, 0.0f, 1.0f, 1.0f, 
		-0.5f, -0.5f, 0.5f, 0.0f, 1.0f, 1.0f, 
		-0.5f, -0.5f, -0.5f, 0.0f, 1.0f, 1.0f,

		0.5f, -0.5f, -0.5f, 0.0f, 1.0f, 1.0f, 
		0.5f, -0.5f, 0.5f, 0.0f, 1.0f, 1.0f, 
		-0.5f, -0.5f, -0.5f, 0.0f, 1.0f, 1.0f,

		-0.5f, -0.5f, -0.5f, 1.0f, 1.0f, 0.0f,
		0.5f, -0.5f, -0.5f, 1.0f, 1.0f, 0.0f, 
		0.5f, 0.5f, -0.5f, 1.0f, 1.0f, 0.0f, 
	
		-0.5f, -0.5f, -0.5f, 1.0f, 1.0f, 0.0f,
		-0.5f, 0.5f, -0.5f, 1.0f, 1.0f, 0.0f, 
		0.5f, 0.5f, -0.5f, 1.0f, 1.0f, 0.0f, 

		-0.5f, -0.5f, -0.5f, 1.0f, 0.0f, 1.0f,
		-0.5f, 0.5f, -0.5f, 1.0f, 0.0f, 1.0f, 
		-0.5f, 0.5f, 0.5f, 1.0f, 0.0f, 1.0f, 

		-0.5f, -0.5f, -0.5f, 1.0f, 0.0f, 1.0f,
		-0.5f, -0.5f, 0.5f, 1.0f, 0.0f, 1.0f, 
		-0.5f, 0.5f, 0.5f, 1.0f, 0.0f, 1.0f, 

	};

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
	while (!glfwWindowShouldClose(window)) {
		// print stuff for better understanding
		/*
		printf("\n");
		printf("Camera Position: %0.3f %0.3f %0.3f\n", camera.Position.x,
			   camera.Position.y, camera.Position.z);
		*/

		// input
		processInput(window);

		// render
		glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

		// make transformations
		glm::mat4 transform = glm::mat4(1.0f);  // identity matrix

		transform = glm::rotate(transform, (float)glfwGetTime(),
								glm::vec3(1.0f, 0.0f, 0.0f));

		// transform =
		// 	glm::scale(transform, glm::vec3(glm::sin(glfwGetTime()) + 1.5,
		// 									glm::sin(glfwGetTime()) + 1.5,
		// 									glm::sin(glfwGetTime()) + 1.5));

		ourShader.use();
		ourShader.setMat4("transform", transform);

		// view matrix
		glm::mat4 view = camera.GetViewMatrix(glm::vec3(0.0f));
		ourShader.setMat4("view", view);

		// projection matrix
		glm::mat4 projection = glm::perspective(
			glm::radians(camera.Zoom), (float)SCR_WIDTH / (float)SCR_HEIGHT,
			0.1f, 100.0f);
		ourShader.setMat4("projection", projection);

		glBindVertexArray(VAO);  // seeing as we only have a single VAO there's
		// no need to bind it every time, but we'll do
		// so to keep things a bit more organized
		glDrawArrays(GL_TRIANGLES, 0, NUM_VERTICES);
		// glBindVertexArray(0); // no need to unbind it every time

		// glfw: swap buffers and poll IO events (keys pressed/released, mouse
		// moved etc.)
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
