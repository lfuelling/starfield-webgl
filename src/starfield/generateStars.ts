import {Star, StarfieldOptions} from "./types";
import {getRandomStar} from "./getRandomStar";

export const generateStars = (options: StarfieldOptions, height: number, width: number): Star[] => {
    const stars: Star[] = [];

    const totalPixels = width * height;
    const starRatio = 0.002 * options.starDensity;
    const numStars = Math.floor(totalPixels * starRatio);

    for (let i = 0; i < numStars; i++) {
        stars.push(getRandomStar());
    }

    return stars;
};
