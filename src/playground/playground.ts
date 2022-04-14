//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
import {generateCanvas, generateStars} from "../utils";
import {COORDINATE_LENGTH} from "../StarFactory";

(() => {

    const canvas = generateCanvas();
    const stars = generateStars({starDensity: 1.2}, canvas);


    const gl = canvas.getContext('webgl2', {antialias: true})
    const width = 800
    const height = 500

    canvas.width = width
    canvas.height = height

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, `#version 300 es

in vec3 position;
in vec4 color;

out vec4 thecolor;

void
main() {
  gl_Position = vec4(position, 1.0);

  thecolor = color;
}
`)

    gl.shaderSource(fragmentShader, `#version 300 es
precision mediump float;

in vec4 thecolor;

out vec4 color;

void
main() {
  color = thecolor;
}
`)

    gl.compileShader(vertexShader)
    var success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
    if (!success) throw new Error(gl.getShaderInfoLog(vertexShader))

    gl.compileShader(fragmentShader)
    var success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
    if (!success) throw new Error(gl.getShaderInfoLog(fragmentShader))

    const program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    gl.useProgram(program)

    const positionAttribute = gl.getAttribLocation(program, 'position')
    const colorAttribute = gl.getAttribLocation(program, 'color')

    gl.viewport(0, 0, width, height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const positionVAO = gl.createVertexArray()
    gl.bindVertexArray(positionVAO)

    const vertexBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()

    const newVertexMatrix = stars.map(s => {

        const xZero = (s.x / COORDINATE_LENGTH - s.size) * 100;
        const yZero = (s.y / COORDINATE_LENGTH - s.size) * 100;

        const xOne = xZero + s.size;
        const yOne = yZero + s.size;

        return [
         //  x      y       r  g  b  a
            xOne,  yOne,    1, 1, 1, 1,
            xZero, yOne,    1, 1, 1, 1,
            xOne,  yZero,   1, 1, 1, 1,
            xZero, yZero,   1, 1, 1, 1
        ]
    })

    newVertexMatrix.forEach(vertexArray => {
        console.log(vertexArray)
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.DYNAMIC_DRAW)

        gl.enableVertexAttribArray(positionAttribute)
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 6*4, 0)

        gl.enableVertexAttribArray(colorAttribute)
        gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 6*4, 2*4)

        const indexArray = [ 0, 2, 3, 0, 3, 1 ]

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW)


        gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
    });
})();
