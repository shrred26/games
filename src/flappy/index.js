import Game from './game';
import Start from './start';
import {useState} from 'react'

const Flappy = () => {
    const [screen,setScreen] = useState(0);

    switch(screen){
        case 0:
            return <Start setScreen={setScreen}/>
        
        case 1:
            return <Game/>
        
        default:
            return <Start setScreen={setScreen}/>  
    }
}

export default Flappy;