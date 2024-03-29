import React from 'react';
import useCanvas from './useCanvas';

const Canvas = ({draw,preDraw,postDraw,...rest}) => {
    const canvasRef = useCanvas(draw,preDraw,postDraw);

    return <canvas ref={canvasRef} {...rest}/>;
}

export default Canvas;