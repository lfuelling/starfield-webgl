import {clearCanvas, generateCanvas, generateStars, initGLContext} from "./utils";
import {Star} from "./types";

export const runStarfield = () => {
    // generate canvas element
    const canvas = generateCanvas();

    // init gl context
    const {gl, positionAttribute, colorAttribute} = initGLContext(canvas);

    // create buffers
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const indexArray = [0, 2, 3, 0, 3, 1];

    // init time and stars
    let time = Date.now();
    let stars: Star[] = generateStars({starDensity: 1}, canvas);

    // define animation loop
    const animLoop = () => {
        requestAnimationFrame(() => {
            stars.forEach(s => s.move(time));
            time = Date.now();
            clearCanvas(gl);
            stars.map(s => s.getVertex()).forEach((star: number[]) => {
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(star), gl.DYNAMIC_DRAW)

                gl.enableVertexAttribArray(positionAttribute)
                gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 6 * 4, 0)

                gl.enableVertexAttribArray(colorAttribute)
                gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 6 * 4, 2 * 4)

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW)

                gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
            });

            animLoop();
        });
    }

    // run animation loop
    animLoop();
}