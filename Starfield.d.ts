import {Star} from "./src/starfield/types";

/**
 * The configuration options for starfield-webgl
 */
declare type StarfieldOptions = {
    starDensity?: number;
    mouseScale?: number;
    seedMovement?: boolean;
    fpsLimit?: number;
    antialiasing?: boolean;
    onBeforeDraw?: () => void;
    onAfterDraw?: () => void;
};

/**
 * The buffers and rendering context.
 */
declare type StarfieldBuffers = {
    gl: WebGL2RenderingContext;

    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;

    indexArray: number[];
    colorAttribute: number;
    positionAttribute: number;
};

/**
 * The main function if you want to use the default dynamic version,
 */
declare const runStarfield: (options?: StarfieldOptions) => void;

/**
 * If you want to render a single frame, you'll need this to initialize the buffers and rendering context.
 */
declare const initBuffers: (canvas: HTMLCanvasElement, settings?: StarfieldOptions) => StarfieldBuffers;

/**
 * Use this function to draw a single frame onto the canvas.
 */
declare const drawFrame: (stars: Star[], buffers: StarfieldBuffers) => void;

/**
 * If you want to render a single frame, you might use this to generate canvas, but you could also do that yourself.
 */
declare const generateCanvas: () => HTMLCanvasElement;

/**
 * If you want to render a single frame, you'll need this to initialize the stars.
 */
declare const generateStars: (options: StarfieldOptions, height: number, width: number) => Star[];

/**
 * The default starfield options. Might be useful when rendering single frames.
 */
declare const DEFAULT_STARFIELD_OPTIONS: StarfieldOptions;

export {runStarfield, initBuffers, drawFrame, generateCanvas, generateStars, DEFAULT_STARFIELD_OPTIONS};
