export type Color = {
    r: number;
    g: number;
    b: number;
}

export class Star {
    x: number;
    y: number;
    size: number;
    color: Color;
    canvasCoords?: {
        x?: number;
        y?: number;
    }

    constructor(x: number, y: number, size: number, color: Color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

export const FunctionalWorker = <T>(fn: (e: MessageEvent<T>) => unknown) => {
    return new Worker(window.URL.createObjectURL(new Blob(["(" + fn.toString() + ")()"], {type: "text/javascript"})));
};

export type MessageData = {
    starfield: Star[];
    canvasSize: {
        width: number;
        height: number;
    }
}

export type StarfieldOptions = {
    starDensity?: number;
    mouseScale?: number;
    seedMovement?: boolean;
}
