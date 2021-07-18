import React, { useReducer } from 'react';
import Canvas from '../canvas';
import { drawCircle, drawRectangle, drawText } from '../canvas/drawShapes';
import resizeCanvas from '../canvas/resizeCanvas';

const style = {width: '100%', height: '100vh'};

const playerSize = {
    width: 20,
    height: 100
}

const ballSize = {
    radius: 20
}

const textPosition = {
    x: window.innerWidth/2,
    y: 50
}

const reducer = () => {

}

const initialState = () => {
    return {
        player:{
            x: 50,
            y: window.innerHeight/2
        },
        com:{
            x: window.innerWidth - 50,
            y: window.innerHeight/2
        },
        ball: {
            x: window.innerWidth/2,
            y: window.innerHeight/2 
        },
        score: 0
    }
}

const PingPong = () => {
    const [{player,com,ball,score},setState] = useReducer(reducer,null,initialState);
    const preDraw = (ctx,canvas) => {
        resizeCanvas(canvas);
        const {width,height} = ctx.canvas;
        ctx.clearRect(0, 0, width, height);
    }

    const draw = (ctx,frameCount) => {
        drawCircle(ctx,{radius: ballSize.radius, x: ball.x, y:ball.y, color: '#000000' });
        drawRectangle(ctx,{x: player.x, y: player.y,
             width: playerSize.width, height: playerSize.height, color: '#000000' });
        drawRectangle(ctx,{x: com.x, y: com.y, width: playerSize.width, height: playerSize.height, color: '#000000' });
        drawText(ctx,{text: `Score : ${score}`, x: textPosition.x, y: textPosition.y, color: '#000000' });
    }

    return <Canvas style={style} draw={draw} preDraw={preDraw}/>
}

export default PingPong;