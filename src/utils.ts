import {Star, StarfieldOptions} from "./types";
import {fragmentShaderSource, vertexShaderSource} from "./shaders";
import {getRandomStar} from "./StarFactory";

export const generateCanvas = () => {
    const elem = document.querySelector('body');
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    const styleProps = {position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', 'z-index': -10};
    const attrProps = {width: elem.clientWidth, height: elem.clientHeight};
    for (const prop in styleProps) {
        // @ts-ignore it works (:
        canvas.style[prop] = styleProps[prop];
    }
    for (let prop in attrProps) {
        // @ts-ignore it works (:
        canvas.setAttribute(prop, attrProps[prop]);
    }
    elem.appendChild(canvas);
    return canvas;
}

export const generateStars = function (options: StarfieldOptions, canvas: HTMLCanvasElement): Star[] {
    const settings = {
        starDensity: 1.0,
        mouseScale: 1.0,
        seedMovement: true, ...options,
    };

    const stars: Star[] = [];

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const totalPixels = width * height;
    const starRatio = 0.002 * settings.starDensity;
    const numStars = Math.floor(totalPixels * starRatio);

    for (let i = 0; i < numStars; i++) {
        stars.push(getRandomStar(width, height));
    }

    return stars;
};

export function initGLContext(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {antialias: true})
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

    return {gl, positionAttribute, colorAttribute};
}

const normalize = (x: number, min: number, max: number, a: number = -1, b: number = 1) => {
    const part1 = b - a;
    const part2a = x - min
    const part2b = max - min;
    const part2 = part2a / part2b;

    return part1 * part2 + a;
};

export const mapStar = (s: Star) => {

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

    return [
        xOne, yOne, color.r, color.g, color.b, 1,
        xZero, yOne, color.r, color.g, color.b, 1,
        xOne, yZero, color.r, color.g, color.b, 1,
        xZero, yZero, color.r, color.g, color.b, 1
    ];
};

export const clearCanvas = (gl: WebGL2RenderingContext) => {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

export const renderStar = (gl: WebGL2RenderingContext, vertexBuffer: WebGLBuffer, positionAttribute: number, colorAttribute: number, indexBuffer: WebGLBuffer) => {
    return (star: number[]) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(star), gl.DYNAMIC_DRAW)

        gl.enableVertexAttribArray(positionAttribute)
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 6 * 4, 0)

        gl.enableVertexAttribArray(colorAttribute)
        gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 6 * 4, 2 * 4)

        const indexArray = [0, 2, 3, 0, 3, 1]

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW)

        gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
    };
}