import {StarfieldBuffers, StarfieldOptions} from "./types";
import {initGLContext} from "./initGLContext";

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
};
