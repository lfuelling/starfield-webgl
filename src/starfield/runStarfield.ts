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

    // init stars
    const stars: Star[] = generateStars(settings, canvas.clientHeight, canvas.clientWidth);

    // init frame limit
    const frameLimit = 1000 / (settings.fpsLimit + 1);

    let previous = 0;

    function shouldRenderFrame(delta: number, frameLimit: number): boolean {
        if (settings.fpsLimit <= 0) {
            return true;
        } else {
            return delta >= frameLimit;
        }
    }

    // define animation loop
    const animLoop = () => {
        requestAnimationFrame((current) => {

            const delta = current - previous;

            if (shouldRenderFrame(delta, frameLimit)) {
                if (typeof settings.onBeforeDraw === 'function') settings.onBeforeDraw();
                previous = current;

                // move stars
                stars.forEach(s => s.move(delta));

                // draw frame
                drawFrame(stars, buffers);

                if (typeof settings.onAfterDraw === 'function') settings.onAfterDraw();
            }

            animLoop();
        });
    }

    // run animation loop
    animLoop();
};
