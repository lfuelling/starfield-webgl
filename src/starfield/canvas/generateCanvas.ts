const blackPixelPng = 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAACklEQVR4AWNmAAAACAAEbVhFewAAAABJRU5ErkJggg==\')';

export const generateCanvas = () => {
    const starfieldElem = document.getElementById('starfield');
    if (starfieldElem) {
        return starfieldElem as HTMLCanvasElement;
    }

    const body = document.querySelector('body');
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield';

    const styleProps = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        'z-index': -10,
        backgroundImage: blackPixelPng
    };
    const attrProps = {
        width: body.clientWidth,
        height: body.clientHeight
    };
    for (const prop in styleProps) {
        // @ts-ignore it works (:
        canvas.style[prop] = styleProps[prop];
    }
    for (let prop in attrProps) {
        // @ts-ignore it works (:
        canvas.setAttribute(prop, attrProps[prop]);
    }
    body.appendChild(canvas);
    return canvas;
}
