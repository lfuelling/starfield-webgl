import {Color, Star} from "./types";

export const COORDINATE_LENGTH = 5000;

// http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
const getWeightedRandom = <T>(list: T[], weight: number[]) => {

    const rand = function (min: number, max: number) {
        return Math.random() * (max - min) + min;
    };

    const total_weight = weight.reduce(function (prev, cur) {
        return prev + cur;
    });

    const random_num = rand(0, total_weight);
    let weight_sum = 0;

    for (let i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return list[i];
        }
    }
    return list[rand(0, list.length)];
}

const getWeightedRandomSize = () => {
    const list = [12, 15, 18];
    const weight = [0.8, 0.15, 0.05];
    return getWeightedRandom(list, weight);
}

const getWeightedRandomColor = () => {
    const list: Color[] = [
        new Color(255, 189, 111),
        new Color(255, 221, 180),
        new Color(255, 244, 232),
        new Color(251, 248, 255),
        new Color(202, 216, 255),
        new Color(170, 191, 255),
        new Color(155, 176, 255),
    ];
    const weight = [0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05];
    return getWeightedRandom(list, weight);
}

const getRandomShade = () => {
    const list = [0.4, 0.6, 1];
    const weight = [0.5, 0.3, 0.2];
    return getWeightedRandom(list, weight);
}

const applyRandomShade = (color: Color) => {
    const shade = getRandomShade();
    if (shade !== 1) { // skip processing full brightness stars
        color.r = Math.floor(color.r * shade);
        color.g = Math.floor(color.g * shade);
        color.b = Math.floor(color.b * shade);
    }
    return color;
}

/**
 * Generates all random values to create a random star
 * @return {Star} a star with random X/Y, size and color
 */
export const getRandomStar = (canvasWidth: number, canvasHeight: number) => {
    const x = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
    const y = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
    const size = getWeightedRandomSize();
    const color = getWeightedRandomColor();
    const tintedColor = applyRandomShade(color);
    return {
        ...new Star(x, y, size, tintedColor),
        canvasCoords: {
            x: Math.round((x / COORDINATE_LENGTH) * canvasWidth),
            y: Math.round((y / COORDINATE_LENGTH) * canvasHeight),
        }
    };
}
