import {Star, StarfieldBuffers} from "./types";
import {clearCanvas} from "./canvas";
import {drawStar} from "./drawStar";

export const drawFrame = (stars: Star[], buffers: StarfieldBuffers) => {
    clearCanvas(buffers.gl);
    stars.map(s => s.getVertex()).forEach(s => drawStar(s, buffers));
};
