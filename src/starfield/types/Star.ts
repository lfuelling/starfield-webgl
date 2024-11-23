import {COORDINATE_LENGTH, MOVEMENT_X, MOVEMENT_Y, normalize} from "../utils";
import {Color} from "./Color";

export class Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: Color;

    constructor(x: number, y: number, z: number, size: number, color: Color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.color = color;
    }

    move(deltaT: number) {
        const speed = 50 / this.z;
        const timeDeltaMillis = Date.now() - deltaT;
        const timeDeltaSecs = timeDeltaMillis / 1000
        const distance = speed * timeDeltaSecs;

        let newX = this.x - (distance * MOVEMENT_X);
        let newY = this.y - (distance * MOVEMENT_Y);

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

        this.x = newX;
        this.y = newY;
    }

    getVertex(): number[] {
        const xZero = normalize(this.x, 0, 5000);
        const yZero = normalize(this.y, 0, 5000);

        const normalizedSize = normalize(this.size, 0, 5000, 0);

        const xOne = xZero < 0 ? xZero - normalizedSize : xZero + normalizedSize;
        const yOne = yZero < 0 ? yZero - normalizedSize : yZero + normalizedSize;

        const color = {
            r: normalize(this.color.r, 0, 255, 0),
            g: normalize(this.color.g, 0, 255, 0),
            b: normalize(this.color.b, 0, 255, 0)
        }

        return [
            xOne, yOne, color.r, color.g, color.b, 1,
            xZero, yOne, color.r, color.g, color.b, 1,
            xOne, yZero, color.r, color.g, color.b, 1,
            xZero, yZero, color.r, color.g, color.b, 1
        ];
    }
}