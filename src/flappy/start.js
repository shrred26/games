import './start.css';

const Start = ({setScreen})=>{
    return(
        <main>
            <h1>Flappy Bird</h1>
            <button onClick={()=>setScreen(1)}>Play</button>
        </main>
    )
}

export default Start;