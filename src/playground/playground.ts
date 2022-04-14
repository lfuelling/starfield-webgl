//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
import {generateCanvas, generateStars} from "../utils";

(() => {

    const canvas = generateCanvas();
    const stars = generateStars({starDensity: 6}, canvas);

    const gl = canvas.getContext('webgl2', {antialias: true})
    const width = canvas.clientWidth
    const height = canvas.clientHeight

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
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const positionVAO = gl.createVertexArray()
    gl.bindVertexArray(positionVAO)

    const vertexBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()

    const normalize = (x: number, min: number, max: number, a: number = -1, b: number = 1) => {
        const part1 = b - a;
        const part2a = x - min
        const part2b = max - min;
        const part2 = part2a / part2b;

        return part1 * part2 + a;
    };

    const newVertexMatrix = stars.map(s => {

        const xZero = normalize(s.x, 0, 5000);
        const yZero = normalize(s.y, 0, 5000);

        let normalizedSize = normalize(s.size, 0, 5000, 0);

        const xOne = xZero < 0 ? xZero - normalizedSize : xZero + normalizedSize;
        const yOne = yZero < 0 ? yZero - normalizedSize : yZero + normalizedSize;


        const color = {
            r: normalize(1, 0, 255, 0),
            g: normalize(s.color.g, 0, 255, 0),
            b: normalize(s.color.b, 0, 255, 0)
        }

        let vertex = [
            //  x      y       r           g        b     a
            xOne, yOne, color.r, color.g, color.b, 1,
            xZero, yOne, color.r, color.g, color.b, 1,
            xOne, yZero, color.r, color.g, color.b, 1,
            xZero, yZero, color.r, color.g, color.b, 1
        ];
        return vertex;
    })

    newVertexMatrix.forEach(vertexArray => {
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.DYNAMIC_DRAW)

        gl.enableVertexAttribArray(positionAttribute)
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 6 * 4, 0)

        gl.enableVertexAttribArray(colorAttribute)
        gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 6 * 4, 2 * 4)

        const indexArray = [0, 2, 3, 0, 3, 1]

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW)

        gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
    });
})();
