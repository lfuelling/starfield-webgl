

export const vertexShaderSource = `#version 300 es

in vec3 position;
in vec4 color;

out vec4 thecolor;

void
main() {
  gl_Position = vec4(position, 1.0);

  thecolor = color;
}
`;
export const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec4 thecolor;

out vec4 color;

void
main() {
  color = thecolor;
}
`;