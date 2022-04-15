import {clearCanvas, generateCanvas, generateStars, initGLContext, mapStar} from "./utils";
import {MessageData, Star} from "./types";

const COORDINATE_LENGTH = 5000;
const deltaX = 0.12;
const deltaY = 0.04;

function draw(newVertexMatrix: number[][], gl: WebGL2RenderingContext, vertexBuffer: WebGLBuffer, positionAttribute: number, colorAttribute: number, indexBuffer: WebGLBuffer) {

    clearCanvas(gl);

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

const moveStar = (star: Star, time: number) => {
    const speed = 2;
    const timeDeltaMillis = Date.now() - time;
    const timeDeltaSecs = timeDeltaMillis / 1000
    const distance = speed * timeDeltaSecs;

    let newX = star.x - (distance * deltaX);
    let newY = star.y - (distance * deltaY);

    if (newX < 0) {
        newX += COORDINATE_LENGTH;
    } else if (newX > COORDINATE_LENGTH) {
        newX -= COORDINATE_LENGTH;
    }
    if (newY < 0) {
        newY += COORDINATE_LENGTH;
    } else if (newY > COORDINATE_LENGTH) {
        newY -= COORDINATE_LENGTH;
    }

    return {
        ...star,
        x: newX,
        y: newY
    };
};

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

    let animStars = stars;
    let time = Date.now();

    const animLoop = () => {
        requestAnimationFrame(() => {
           animStars = animStars.map(s => moveStar(s, time));
           time = Date.now();

           draw(animStars.map(mapStar), gl, vertexBuffer, positionAttribute, colorAttribute, indexBuffer);
           animLoop();
        });
    }

    animLoop();
})();
