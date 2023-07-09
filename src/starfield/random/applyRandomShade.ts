import {Color} from "../types";
import {getRandomShade} from "./getRandomShade";

export const applyRandomShade = (color: Color) => {
    const shade = getRandomShade();
    if (shade !== 1) { // skip processing full brightness stars
        color.r = Math.floor(color.r * shade);
        color.g = Math.floor(color.g * shade);
        color.b = Math.floor(color.b * shade);
    }
    return color;
};
