import {Star} from "./types";
import {applyRandomShade, getRandom, getWeightedRandomColor, getWeightedRandomSize} from "./random";
import {COORDINATE_LENGTH} from "./utils";

/**
 * Generates all random values to create a random star
 * @return {Star} a star with random X/Y, size and color
 */
export const getRandomStar = (): Star => new Star(
    getRandom(1, COORDINATE_LENGTH),
    getRandom(1, COORDINATE_LENGTH),
    getRandom(1, 4),
    getWeightedRandomSize(),
    applyRandomShade(getWeightedRandomColor()));
