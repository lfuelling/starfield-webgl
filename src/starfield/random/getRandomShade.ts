import {getWeightedRandom} from "./getWeightedRandom";

export const getRandomShade = () => {
    const list = [0.4, 0.6, 1];
    const weight = [0.5, 0.3, 0.2];
    return getWeightedRandom(list, weight);
};
