import {useState,useEffect} from 'react';

const useArrow = () => {

    const [dir,setDir] = useState('ArrowRight');

    useEffect(()=>{
        const detectKeyStroke = e=>{
          if(e.keyCode>=37&&e.keyCode<=40){
            if(dir===e.key) return;
            if((dir==="ArrowRight"&&e.key==="ArrowLeft")||(dir==="ArrowLeft"&&e.key==="ArrowRight")) return;
            if((dir==="ArrowDown"&&e.key==="ArrowUp")||(dir==="ArrowUp"&&e.key==="ArrowDown")) return;
            setDir(e.key);
          }
        }
        document.addEventListener('keydown',detectKeyStroke);
        return ()=>{document.removeEventListener('keydown',detectKeyStroke);}
      },[dir]);

      return dir;
}

export default useArrow;