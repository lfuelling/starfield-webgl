import {StarfieldOptions} from "./types";
import {fragmentShaderSource, vertexShaderSource} from "../shaders/shaders";

export const initGLContext = (canvas: HTMLCanvasElement, options: StarfieldOptions) => {
    const gl = canvas.getContext('webgl2', {antialias: options.antialiasing})
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    canvas.width = width
    canvas.height = height

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.shaderSource(fragmentShader, fragmentShaderSource)

    gl.compileShader(vertexShader)
    let success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (!success) throw new Error(gl.getShaderInfoLog(vertexShader))

    gl.compileShader(fragmentShader)
    success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!success) throw new Error(gl.getShaderInfoLog(fragmentShader))

    const program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    gl.useProgram(program)

    const positionAttribute = gl.getAttribLocation(program, 'position')
    const colorAttribute = gl.getAttribLocation(program, 'color');

    gl.viewport(0, 0, width, height);

    const positionVAO = gl.createVertexArray();
    gl.bindVertexArray(positionVAO);

    return {gl, positionAttribute, colorAttribute};
};
