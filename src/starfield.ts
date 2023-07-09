import {generateStars} from "./utils";
import {Star, StarfieldOptions} from "./types";
import {clearCanvas, generateCanvas} from "./canvas";
import {initGLContext} from "./webgl";

export type StarfieldBuffers = {
    gl: WebGL2RenderingContext;

    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;

    indexArray: number[];
    colorAttribute: number;
    positionAttribute: number;
}

export const initBuffers = (canvas: HTMLCanvasElement, settings: StarfieldOptions): StarfieldBuffers => {
    const {gl, positionAttribute, colorAttribute} = initGLContext(canvas, settings);

    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const indexArray = [0, 2, 3, 0, 3, 1];

    return {
        gl,
        vertexBuffer,
        indexBuffer,
        indexArray,
        colorAttribute,
        positionAttribute
    }
}

const drawStar = (star: number[], buffers: StarfieldBuffers) => {

    const {
        gl,
        positionAttribute,
        colorAttribute,
        vertexBuffer,
        indexBuffer,
        indexArray
    } = buffers;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(star), gl.DYNAMIC_DRAW)

    gl.enableVertexAttribArray(positionAttribute)
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 6 * 4, 0)

    gl.enableVertexAttribArray(colorAttribute)
    gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 6 * 4, 2 * 4)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW)

    gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
};

export const drawFrame = (stars: Star[], buffers: StarfieldBuffers) => {
    clearCanvas(buffers.gl);
    stars.map(s => s.getVertex()).forEach(s => drawStar(s, buffers));
}

export const DEFAULT_STARFIELD_OPTIONS: StarfieldOptions = {
    starDensity: 1.0,
    mouseScale: 1.0,
    seedMovement: true,
    fpsLimit: 30,
    antialiasing: true,
}

export const runStarfield = (options?: StarfieldOptions) => {
    // init settings
    const settings = {
        ...DEFAULT_STARFIELD_OPTIONS,
        ...options,
    };

    // generate canvas element
    const canvas = generateCanvas();

    // init buffers
    const buffers = initBuffers(canvas, settings);

    // init time and stars
    let time = Date.now();
    let stars: Star[] = generateStars(settings, canvas.clientHeight, canvas.clientWidth);

    let previous = 0;

    function shouldSkipFrame(delta: number) {
        return delta < 1000 / (settings.fpsLimit + 1);
    }

    // define animation loop
    const animLoop = () => {
        requestAnimationFrame((current) => {

            const delta = current - previous;

            if (!shouldSkipFrame(delta)) {
                (typeof settings.onBeforeDraw === 'function') && settings.onBeforeDraw();
                previous = current;

                // move stars
                stars.forEach(s => s.move(time));
                time = Date.now();

                // draw frame
                drawFrame(stars, buffers);

                (typeof settings.onAfterDraw === 'function') && settings.onAfterDraw();
            }

            animLoop();
        });
    }

    // run animation loop
    animLoop();
}
