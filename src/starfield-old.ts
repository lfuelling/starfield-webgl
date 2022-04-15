import {StarFactory} from "./StarFactory";
import {FunctionalWorker, MessageData, Star, StarfieldOptions} from "./types";
import {generateCanvas, generateStars} from "./utils";


(() => {
    const draw = function (messageData: MessageData, canvas: HTMLCanvasElement) {
        const width = messageData.canvasSize.width;
        const height = messageData.canvasSize.height;

        canvas.setAttribute('width', width.toString());
        canvas.setAttribute('height', height.toString());

        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');

            // iterate stars and draw them
            messageData.starfield.forEach((star) => {
                ctx.fillStyle = star.color.rgbColorString();
                ctx.fillRect(star.canvasCoords.x, star.canvasCoords.y, star.size, star.size);
            });
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        const canvas = generateCanvas();

        const stars = generateStars({starDensity: 1.2}, canvas);

        if (window.Worker) {
            const worker = FunctionalWorker<MessageData>(() => {
                const COORDINATE_LENGTH = 5000;
                const deltaX = 0.12;
                const deltaY = 0.04;
                const mapStarfield = (m: MessageData, star: Star) => {
                    let newX = star.x - deltaX;
                    let newY = star.y - deltaY;

                    if (newX < 0) {
                        newX += COORDINATE_LENGTH;
                    } else if (newX > COORDINATE_LENGTH) {
                        newX -= COORDINATE_LENGTH;
                    }
                    if (newY < 0) {
                        newY += COORDINATE_LENGTH;
                    } else if (newY > COORDINATE_LENGTH) {
                        newY -= COORDINATE_LENGTH;
                    }

                    return {
                        ...star,
                        x: newX,
                        y: newY,
                        canvasCoords: {
                            x: Math.round((newX / COORDINATE_LENGTH) * m.canvasSize.width),
                            y: Math.round((newY / COORDINATE_LENGTH) * m.canvasSize.height),
                        }
                    };
                };

                onmessage = (e) => postMessage({
                    ...e.data,
                    starfield: e.data.starfield.map((s: Star) => mapStarfield(e.data, s))
                });
            });
            worker.onmessage = msg => {
                requestAnimationFrame(() => {
                    draw(msg.data, canvas)
                    worker.postMessage({
                        ...msg.data,
                        canvasSize: {width: canvas.clientWidth, height: canvas.clientHeight}
                    });
                });
            };

            worker.postMessage({
                starfield: stars,
                canvasSize: {width: canvas.clientWidth, height: canvas.clientHeight}
            });
        } else {
            console.error('Your browser doesn\'t support web workers. The starfield background won\'t be animated.');
        }

        requestAnimationFrame(() => {
            draw({
                starfield: stars,
                canvasSize: {width: canvas.clientWidth, height: canvas.clientHeight}
            }, canvas)
        });
    });
})();