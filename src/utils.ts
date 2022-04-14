export const generateCanvas = () => {
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
    return canvas;
}