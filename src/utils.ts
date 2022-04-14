import {Star, StarfieldOptions} from "./types";
import {StarFactory} from "./StarFactory";

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
        stars.push(StarFactory.getRandomStar(width, height));
    }

    return stars;
};
