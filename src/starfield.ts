import {clearCanvas, generateCanvas, generateStars, initGLContext, mapStar, renderStar} from "./utils";
import {Star} from "./types";

const COORDINATE_LENGTH = 5000;
const deltaX = 0.12;
const deltaY = 0.04;

function draw(newVertexMatrix: number[][], gl: WebGL2RenderingContext, vertexBuffer: WebGLBuffer, positionAttribute: number, colorAttribute: number, indexBuffer: WebGLBuffer) {
    clearCanvas(gl);
    newVertexMatrix.forEach(renderStar(gl, vertexBuffer, positionAttribute, colorAttribute, indexBuffer));
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
    const stars = generateStars({starDensity: 1}, canvas);

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
