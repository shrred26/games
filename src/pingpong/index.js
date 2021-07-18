import React, { useCallback, useEffect, useReducer } from 'react';
import Canvas from '../canvas';
import { drawCircle, drawRectangle, drawText } from '../canvas/drawShapes';
import resizeCanvas from '../canvas/resizeCanvas';

const style = {width: '100%', height: '100vh'};

const screen = {
    w: window.innerWidth,
    h: window.innerHeight
}

const playerSize = {
    width: 20,
    height: 100
}

const ballSize = {
    radius: 20
}

const textPosition = {
    x: screen.w/2,
    y: 50
}

const moveCom = (ball,com) => {
    const delta = Math.min(4,Math.abs(ball.y-com.y));
    if(ball.y>com.y){
        return {...com,y:com.y+delta};
    }else if(ball.y<com.y){
        return {...com,y:com.y-delta};
    }
    return com;
}

const collision = (ballX,y,sideClosetoBallx,sideAwayFromBallX,player) => {
    return (ballX<sideClosetoBallx && (ballX>sideAwayFromBallX))
     &&(y>player.y - playerSize.height/2 && y<player.y + playerSize.height/2)
}

const resetBall = () => {
    const angle = 3*Math.PI/4 + Math.random()*(Math.PI/4);
    return {x:screen.w/2,y: screen.h/2,vx:5*Math.cos(angle),vy:5*Math.sin(angle)};
}

const bounceOffPlayer = (ball,player) => {
    const degree = ((ball.y-player.y)/(playerSize.height/2)*Math.PI/4);
    const {vx,vy} = ball;
    const speed = Math.sqrt(vx*vx+vy*vy)*1.05;
    return {...ball,vx:speed*Math.cos(degree)*(ball.x - player.x<0? -1: 1),vy:speed*Math.sin(degree)};
}

const updateBallPos = (state) => {
    let {ball,player,com,playerScore,comScore} = state;
    ball.x = ball.x + ball.vx;
    ball.y = ball.y + ball.vy;
    let updatedBall = ball;
    let {x,y} = ball;
    if(collision(x - ballSize.radius,y,player.x+playerSize.width/2,player.x-playerSize.width/2,player)){
        updatedBall = bounceOffPlayer(ball,player);
    }else if(collision(x + ballSize.radius,y,com.x+playerSize.width/2,com.x-playerSize.width/2,com)){
        updatedBall = bounceOffPlayer(ball,com);
    }else if((y+ballSize.radius> screen.h) || (y-ballSize.radius< 0)){
        updatedBall = {...ball,vy: -ball.vy};
    }else if((x > screen.w) || (x < 0)){
        updatedBall = resetBall();
        if(x > screen.w) playerScore = playerScore+1;
        else comScore = comScore+1;
    }
    let comPos = moveCom(ball,com);
    return {...state, ball:updatedBall,com:comPos, playerScore,comScore};
}

const reducer = (state,action) => {
    switch(action.type){
        case 'updateBallPos':{
            return updateBallPos(state);
        }
        
        case 'updatePlayer':{
            let {y} = action.payload;
            if(y>screen.h - playerSize.height/2) y=screen.h - playerSize.height/2;
            if(y<playerSize.height/2) y=playerSize.height/2;
            return { ...state, player: {...state.player,y}}
        }

        default:
            return state;
    }
}

const initialState = () => {
    const startAngle = 3*Math.PI/4 + Math.random()*(Math.PI/4);
    console.log(startAngle,Math.cos(startAngle));
    return {
        player:{
            x: 50,
            y: screen.h/2
        },
        com:{
            x: screen.w - 50,
            y: screen.h/2
        },
        ball: resetBall(),
        playerScore: 0,
        comScore: 0
    }
}

const PingPong = () => {
    const [state,dispatch] = useReducer(reducer,null,initialState);
    const {player,com,ball,playerScore,comScore} = state;
    const preDraw = (ctx,canvas) => {
        resizeCanvas(canvas);
        const {width,height} = ctx.canvas;
        ctx.clearRect(0, 0, width, height);
    }

    useEffect(()=>{
        let animateGame;
        const updateGame = () => {
            dispatch({type: 'updateBallPos'});
            animateGame = requestAnimationFrame(updateGame);
        }
        updateGame();
        const eventCallback = (e)=>{
            dispatch({type:'updatePlayer',payload:{y:e.clientY}})
        }
        window.addEventListener('mousemove',eventCallback)
        return () => { cancelAnimationFrame(animateGame); window.removeEventListener('mousemove',eventCallback); }
    },[])

    const draw = useCallback((ctx,frameCount) => {
        drawCircle(ctx,{radius: ballSize.radius, x: ball.x, y:ball.y, color: '#000000' });
        drawRectangle(ctx,{x: player.x, y: player.y,
             width: playerSize.width, height: playerSize.height, color: '#000000' });
        drawRectangle(ctx,{x: com.x, y: com.y, width: playerSize.width, height: playerSize.height, color: '#000000' });
        drawText(ctx,{text: `Player : ${playerScore}`, x: textPosition.x -100, y: textPosition.y, color: '#000000' });
        drawText(ctx,{text: `Computer : ${comScore}`, x: textPosition.x +100, y: textPosition.y, color: '#000000' });
    },[player,com,ball,playerScore,comScore])

    return <Canvas style={style} draw={draw} preDraw={preDraw}/>
}

export default PingPong;