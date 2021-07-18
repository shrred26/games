import { useEffect, useRef } from 'react';

const useCanvas = (draw,preDraw,postDraw) => {
    const canvasRef = useRef();

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context =  canvas.getContext('2d');
        let frameCount = 0;
        let animationFrame;
        const render = () => {
            frameCount++;
            preDraw&&preDraw(context,canvasRef.current);
            draw(context,frameCount);
            postDraw&& postDraw(context,frameCount);
            animationFrame = requestAnimationFrame(render);
        }
        render();
        return () => {
            cancelAnimationFrame(animationFrame);
        }
    },[draw,preDraw,postDraw])

    return canvasRef;
}

export default useCanvas;