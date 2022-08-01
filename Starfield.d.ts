declare type StarfieldOptions = {
    starDensity?: number;
    mouseScale?: number;
    seedMovement?: boolean;
    fpsLimit?: number;
    antialiasing?: boolean;
    onBeforeDraw?: () => void;
    onAfterDraw?: () => void;
};

declare const runStarfield: (options?: StarfieldOptions) => void;

export { runStarfield };
