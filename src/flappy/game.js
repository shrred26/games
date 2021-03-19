import './game.css';
import {useEffect, useReducer, useRef, useState} from 'react';
import birdImg from './flappyBird.png';

const Game = () => {
    const refY = useRef(window.innerHeight/2);

    const reducer = (state,action)=>{
        switch(action.type){
            case 'gravity':
                refY.current = state.y+(state.Vy*action.sec);
                return {
                    y: refY.current,
                    Vy: state.Vy-400*action.sec
                }
            
            case 'up':
                return {
                    y: state.y,
                    Vy: action.Vy
                }
    
            case 'setY':
                return {
                    y: action.y,
                    Vy: state.Vy
                }

            case 'setBoth':
                return {
                    y: action.y,
                    Vy: action.Vy
                }
    
            default:
                return state;    
        }
    }

    const [{y},setState] = useReducer(reducer,{y:window.innerHeight/2,Vy:0});
    const [columns,setColumns] = useState([]);
    const animateFrame = useRef([]);
    const container = useRef();
    const [score,setScore] = useState(0);
    const [gameOver,setGameOver] = useState(false);
    const gap = 120;
    const pipeWidth =30;
    const birdWidth = 50;

    useEffect(()=>{
        if(!container) return;
        let start;
        const applyGravity = (timestamp) => {
          if(gameOver) {cancelAnimationFrame(animateFrame.current[0]); return;}
          if (start === undefined) start = timestamp;
          const elapsed = timestamp - start;
          setState({type:'gravity',sec:elapsed/1000});
          start = timestamp;
          animateFrame.current[0] = requestAnimationFrame(applyGravity);
        }
        animateFrame.current[0] = requestAnimationFrame(applyGravity);
        const temp = animateFrame.current[0];
        return () => cancelAnimationFrame(temp);
    },[container,gameOver]);
    
    useEffect(()=>{
        if(y>window.innerHeight||y<4) setGameOver(true);
    },[y])

    useEffect(()=>{
        const detectKeyStroke = (e) =>{
            if(e.key==="ArrowUp"||e.which === 32) setState({type:'up',Vy: 200});
        }
        document.addEventListener('keydown',detectKeyStroke);
        return ()=>{document.removeEventListener('keydown',detectKeyStroke);}
      },[]);

    useEffect(()=>{
        const createColumn = () =>{
            if(gameOver) {clearInterval(animateFrame.current[1]); return;}
            const col1 = window.innerHeight*1/4 + Math.random()*(window.innerHeight*1/2-120);
            const col2 = window.innerHeight - col1 - 120;
            setColumns(columns=>{
                const clone = [...columns, {x:window.innerWidth-pipeWidth/2,col1,col2}];
                return clone;
            });
        }
        animateFrame.current[1] = setInterval(createColumn,1000);
        const temp = animateFrame.current[1];
        return () =>{clearInterval(temp);}
    },[gameOver]);

    const checkGameOver = (columns) =>{
        columns.forEach((column)=>{
            if(Math.abs(column.x - 80)<(pipeWidth+birdWidth)/2){
                const y= refY.current;
                if(y<column.col2||y>column.col2+gap) {
                    setGameOver(true);
                }
                return;
            }
        })
    }
    
    useEffect(()=>{
        let start;
        const updateColumns = (timestamp) =>{
            if(gameOver) {cancelAnimationFrame(animateFrame.current[2]); return;}
            if(start===undefined) start = timestamp;
            const elapsed = timestamp - start;
            setColumns(columns=>{
                if(columns.length>0) checkGameOver(columns);
                const clone = [...columns].map((column)=>({...column,x:column.x - elapsed*150/1000}));
                if(clone[0]&&clone[0].x<0){ clone.shift(); setScore(sc=> sc+1); }
                return clone;
            });
            start = timestamp;
            animateFrame.current[2] = requestAnimationFrame(updateColumns);
        }
        animateFrame.current[2] = requestAnimationFrame(updateColumns);
        const temp = animateFrame.current[2];
        return () => cancelAnimationFrame(temp);
    },[gameOver])

    const reset = () =>{
        setColumns([]);
        setState({type:'setBoth',y:window.innerHeight/2,Vy:0});
        setScore(0);
        setGameOver(false);
    }

    return (
        <div className='sky'>
            <h1 className='score'>{`Score: ${score}`}</h1>
            {gameOver&&<div className='center'>
                <h2>Game Over</h2>
                <button type='button' onClick={reset}>Reset</button>
            </div>}
            <img src={birdImg} className='atCenter' alt='bird' style={{transform:`translate(calc(80px - 50%), ${-y}px)`}}/>
            {columns.map((column,index)=>(
                <div key={index} style={{transform:`translate(calc(${column.x}px - 50%),0)`}} className='column'>
                    <div style={{height: `${column.col1}px`}} className='pipe'/>
                    <div style={{height: `120px`}}/>
                    <div style={{height: `${column.col2}px`}} className='pipe'/>
                </div>
            ))}
        </div>
    )
}

export default Game;