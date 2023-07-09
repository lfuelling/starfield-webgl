import {Color} from "../types";
import {getWeightedRandom} from "./getWeightedRandom";

export const getWeightedRandomColor = () => {
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
};
