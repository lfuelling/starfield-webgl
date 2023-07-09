import {Star, StarfieldOptions} from "./types";
import {fragmentShaderSource, vertexShaderSource} from "./shaders/shaders";
import {getRandomStar} from "./StarFactory";

export const COORDINATE_LENGTH = 5000;
export const MOVEMENT_X = 0.12;
export const MOVEMENT_Y = 0.04;

export const generateStars = function (options: StarfieldOptions, canvas: HTMLCanvasElement): Star[] {
    const stars: Star[] = [];

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const totalPixels = width * height;
    const starRatio = 0.002 * options.starDensity;
    const numStars = Math.floor(totalPixels * starRatio);

    for (let i = 0; i < numStars; i++) {
        stars.push(getRandomStar());
    }

    return stars;
};

export const normalize = (x: number, min: number, max: number, a: number = -1, b: number = 1) => {
    const part1 = b - a;
    const part2a = x - min
    const part2b = max - min;
    const part2 = part2a / part2b;

    return part1 * part2 + a;
};
