import {getWeightedRandom} from "./getWeightedRandom";

export const getWeightedRandomSize = () => {
    const list = [12, 15, 18];
    const weight = [0.8, 0.15, 0.05];
    return getWeightedRandom(list, weight);
}
