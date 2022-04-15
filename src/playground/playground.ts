//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
import {generateCanvas, generateStars, initGLContext, mapStar, renderStar} from "../utils";

function draw(newVertexMatrix: number[][], gl: WebGL2RenderingContext, vertexBuffer: WebGLBuffer, positionAttribute: number, colorAttribute: number, indexBuffer: WebGLBuffer) {
    newVertexMatrix.forEach(renderStar(gl, vertexBuffer, positionAttribute, colorAttribute, indexBuffer));
}

(() => {
    // generate canvas element
    const canvas = generateCanvas();

    // generate initial set of stars
    const stars = generateStars({starDensity: 6}, canvas);

    // init gl context
    const {gl, positionAttribute, colorAttribute} = initGLContext(canvas);

    // convert stars to array of numbers
    const newVertexMatrix = stars.map(mapStar);

    const positionVAO = gl.createVertexArray()
    gl.bindVertexArray(positionVAO)

    const vertexBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()

    draw(newVertexMatrix, gl, vertexBuffer, positionAttribute, colorAttribute, indexBuffer);
})();
