import {Color, Star} from "./types";

export const COORDINATE_LENGTH = 5000;

export const StarFactory = {
    /**
     * Generates all random values to create a random star
     * @return {Star} a star with random X/Y, size and color
     */
    getRandomStar: function (canvasWidth: number, canvasHeight: number) {
        const x = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
        const y = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
        const size = this._getWeightedRandomSize();
        const color = this._getWeightedRandomColor();
        const tintedColor = this._applyRandomShade(color);
        return {
            ...new Star(x, y, size, tintedColor),
            canvasCoords: {
                x: Math.round((x / COORDINATE_LENGTH) * canvasWidth),
                y: Math.round((y / COORDINATE_LENGTH) * canvasHeight),
            }
        };
    },

    _getWeightedRandomSize: function () {
        const list = [12, 15, 18];
        const weight = [0.8, 0.15, 0.05];
        return this._getWeightedRandom(list, weight);
    },

    _getWeightedRandomColor: function () {
        const list = [
            {'r': 255, 'g': 189, 'b': 111},
            {'r': 255, 'g': 221, 'b': 180},
            {'r': 255, 'g': 244, 'b': 232},
            {'r': 251, 'g': 248, 'b': 255},
            {'r': 202, 'g': 216, 'b': 255},
            {'r': 170, 'g': 191, 'b': 255},
            {'r': 155, 'g': 176, 'b': 255},
        ];
        const weight = [0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05];
        return this._getWeightedRandom(list, weight);
    },

    _getRandomShade: function () {
        const list = [0.4, 0.6, 1];
        const weight = [0.5, 0.3, 0.2];
        return this._getWeightedRandom(list, weight);
    },

    _applyRandomShade: function (color: Color) {
        const shade = this._getRandomShade();
        if (shade !== 1) { // skip processing full brightness stars
            color.r = Math.floor(color.r * shade);
            color.g = Math.floor(color.g * shade);
            color.b = Math.floor(color.b * shade);
        }
        return color;
    },

    // http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
    _getWeightedRandom: function (list: number[], weight: number[]) {

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
    },
};
