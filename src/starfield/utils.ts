import {StarfieldOptions} from "./types";

export const COORDINATE_LENGTH = 5000;
export const MOVEMENT_X = 0.12;
export const MOVEMENT_Y = 0.04;

export const DEFAULT_STARFIELD_OPTIONS: StarfieldOptions = {
    starDensity: 1.0,
    mouseScale: 1.0,
    seedMovement: true,
    fpsLimit: 30,
    antialiasing: true,
}

export const normalize = (x: number, min: number, max: number, a: number = -1, b: number = 1) => {
    const part1 = b - a;
    const part2a = x - min
    const part2b = max - min;
    const part2 = part2a / part2b;

    return part1 * part2 + a;
};
