import {clearCanvas, generateCanvas, generateStars, initGLContext} from "./utils";
import {Star, StarfieldOptions} from "./types";

export const runStarfield = (options?: StarfieldOptions) => {
    // init settings
    const settings = {
        starDensity: 1.0,
        mouseScale: 1.0,
        seedMovement: true,
        fpsLimit: 30,
        antialiasing: true,
        ...options,
    };

    // generate canvas element
    const canvas = generateCanvas();

    // init gl context
    const {gl, positionAttribute, colorAttribute} = initGLContext(canvas, settings);

    // create buffers
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const indexArray = [0, 2, 3, 0, 3, 1];

    // init time and stars
    let time = Date.now();
    let stars: Star[] = generateStars(settings, canvas);

    const drawStar = (star: number[]) => {
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

                stars.forEach(s => s.move(time));
                time = Date.now();
                clearCanvas(gl);
                stars.map(s => s.getVertex()).forEach(drawStar);

                previous = current;

                (typeof settings.onAfterDraw === 'function') && settings.onAfterDraw();
            }

            animLoop();
        });
    }

    // run animation loop
    animLoop();
}