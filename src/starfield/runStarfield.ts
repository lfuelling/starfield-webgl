import {Star, StarfieldOptions} from "./types";
import {generateCanvas} from "./canvas";
import {drawFrame} from "./drawFrame";
import {initBuffers} from "./initBuffers";
import {DEFAULT_STARFIELD_OPTIONS} from "./utils";
import {generateStars} from "./generateStars";

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
};
