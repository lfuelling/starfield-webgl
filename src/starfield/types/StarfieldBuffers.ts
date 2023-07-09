export type StarfieldBuffers = {
    gl: WebGL2RenderingContext;

    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;

    indexArray: number[];
    colorAttribute: number;
    positionAttribute: number;
};