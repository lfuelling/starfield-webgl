export class Color {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export class Star {
    x: number;
    y: number;
    size: number;
    color: Color;

    constructor(x: number, y: number, size: number, color: Color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

export type StarfieldOptions = {
    starDensity?: number;
    mouseScale?: number;
    seedMovement?: boolean;
}
