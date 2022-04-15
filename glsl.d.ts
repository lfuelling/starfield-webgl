// add ability to import glsl files
declare module '*.glsl' {
    const value: string;
    export default value;
}
