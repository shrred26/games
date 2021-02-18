import './index.css';
import {useEffect, useState, useRef, useReducer} from 'react';
import useArrow from '../hooks/useArrow'

const size = 16;

const getGrid = (size) => {
  let array = [];
  const midElem = Math.trunc((size-1)/2);
  for(let i=0;i<size;i++){
    let subArray = [];
    for(let j=0;j<size;j++){
      (i === (midElem)&&j === midElem )? subArray.push(1): subArray.push(0);
    }
    array.push(subArray);
  }
  const {x,y} = getFood(array);
  const newArr = updateGrid(x,y,2,array);
  return newArr;
}

const getColor = (value,index1,index2) => {
  if(value===0) return (index1*size+index2+index1)%2===0?'dark':'light';
  else if(value===1) return 'blue';
  return 'red';
}

const getFood = (grid) => {
  const x = Math.floor(Math.random()*size);
  const y = Math.floor(Math.random()*size);
  if(grid[x][y]===1) return getFood(grid);
  else return {x,y}
}

const updateGrid = (row,col,val,grid) => {
  return [...grid.slice(0,row),
    [...grid[row].slice(0,col),val,...grid[row].slice(col+1)]
    ,...grid.slice(row+1)];
}

const directions = {
  ArrowUp: [-1,0],
  ArrowDown: [1,0],
  ArrowLeft: [0,-1],
  ArrowRight: [0,1]
}

const getHigh = () =>(window.localStorage.getItem('highScore')||0);

const reducer = (state,newState) => ({...state,...newState})
const getInitialState = (size) => ({grid:getGrid(size),snake:[[Math.trunc((size-1)/2),Math.trunc((size-1)/2)]],score:0})

function App() {
  const [error,setError] = useState(false);
  const [{grid,snake,score},setState] = useReducer(reducer,size,getInitialState);
  const [high,setHigh] = useState(getHigh)
  const key = useArrow();
  const animate = useRef();

  const reset = () => {
    setError(false);
    setState(getInitialState(size));
  }

  useEffect(()=>{
    if(error) return;
    clearInterval(animate.current);
    animate.current = setInterval(()=>{
      const dir = directions[key];
      const newX = snake[0][0]+dir[0];
      const newY = snake[0][1]+dir[1];
      if(newX>size-1||newX<0||newY>size-1||newY<0||grid[newX][newY]===1){
        setError('Game Over');
        clearInterval(animate.current);
        if(score>high){ 
          window.localStorage.setItem('highScore',score);
          setHigh(score);
        }
        return;
      }
      const copy = [...grid];
      const snakeCopy = [...snake];
      let eat = false;
      if(copy[newX][newY]==2) eat = true;
      snakeCopy.unshift([newX,newY]);
      copy[newX][newY] = 1;
      if(!eat){
        snakeCopy.pop();
        copy[snake[snake.length-1][0]][snake[snake.length-1][1]] = 0;
      }else{
        const {x,y} = getFood(copy);
        copy[x][y] = 2;
      }
      setState({grid:copy,snake:snakeCopy,score: (eat? score+1: score)})
    },100)
  })

  return (
    <div className="App">
      <div className='flex'>
        {<h1>{error?error:`Score: ${score}`}</h1>}
        <button type='button' onClick={reset}>Reset</button>
        {<h2>{`HighScore: ${high}`}</h2>}
      </div>
      <div className="container">
        {grid.map((item,index1)=>(
          item.map((subItem,index2)=>(
            <div 
              className={`gridBlock ${getColor(subItem,index1,index2)}`}
              key={index1*size+index2}
             />
          ))
        ))}
      </div>
    </div>
  );
}

export default App;
