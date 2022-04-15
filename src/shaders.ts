export const vertexShaderSource = `#version 300 es

in vec3 position;
in vec4 color;

out vec4 in_color;

void
main() {
  gl_Position = vec4(position, 1.0);

  in_color = color;
}`;

export const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec4 in_color;

out vec4 color;

void
main() {
  color = in_color;
}`;