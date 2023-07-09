// http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
export const getWeightedRandom = <T>(list: T[], weight: number[]) => {
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
};
