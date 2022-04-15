//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
import {generateCanvas, generateStars, initGLContext, mapStar} from "../utils";

function draw(newVertexMatrix: number[][], gl: WebGL2RenderingContext, vertexBuffer: WebGLBuffer, positionAttribute: number, colorAttribute: number, indexBuffer: WebGLBuffer) {
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
}

(() => {
    // generate canvas element
    const canvas = generateCanvas();

    // generate initial set of stars
    const stars = generateStars({starDensity: 6}, canvas);

    // init gl context
    const {gl, width, height, positionAttribute, colorAttribute} = initGLContext(canvas);

    gl.viewport(0, 0, width, height)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // convert stars to array of numbers
    const newVertexMatrix = stars.map(mapStar);

    const positionVAO = gl.createVertexArray()
    gl.bindVertexArray(positionVAO)

    const vertexBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()

    draw(newVertexMatrix, gl, vertexBuffer, positionAttribute, colorAttribute, indexBuffer);
})();
