import {StarFactory} from "./StarFactory";
import {FunctionalWorker, MessageData, Star, StarfieldOptions} from "./types";


(() => {
    const generateStars = function (options: StarfieldOptions, canvas: HTMLCanvasElement): Star[] {
        const settings = {
            starDensity: 1.0,
            mouseScale: 1.0,
            seedMovement: true, ...options,
        };

        const stars: Star[] = [];

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const totalPixels = width * height;
        const starRatio = 0.002 * settings.starDensity;
        const numStars = Math.floor(totalPixels * starRatio);

        for (let i = 0; i < numStars; i++) {
            stars.push(StarFactory.getRandomStar(width, height));
        }

        return stars;
    };

    const draw = function (messageData: MessageData, canvas: HTMLCanvasElement) {
        const width = messageData.canvasSize.width;
        const height = messageData.canvasSize.height;

        canvas.setAttribute('width', width.toString());
        canvas.setAttribute('height', height.toString());

        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');

            // iterate stars and draw them
            messageData.starfield.forEach((star) => {
                // @ts-ignore it works (:
                ctx.fillStyle = star.color;
                ctx.fillRect(star.canvasCoords.x, star.canvasCoords.y, star.size, star.size);
            });
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        const elem = document.querySelector('body');
        const canvas = document.createElement('canvas');
        canvas.id = 'starfield';
        const styleProps = {position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', 'z-index': -10};
        const attrProps = {width: elem.clientWidth, height: elem.clientHeight};
        for (const prop in styleProps) {
            // @ts-ignore it works (:
            canvas.style[prop] = styleProps[prop];
        }
        for (let prop in attrProps) {
            // @ts-ignore it works (:
            canvas.setAttribute(prop, attrProps[prop]);
        }
        elem.appendChild(canvas);

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