import React,{useEffect,useState} from 'react'
import {updateScore} from '../store/slice.js'
 import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import { useRef } from 'react';
import backgroundMusic from '../public/backGround.mp3'
import overMusic from '../public/Over.mp3'
import hissMusic from '../public/hiss.mp3'
import { ClickMusic } from './music.js';
 
 function ClassicalGame(){
    const playerName=useSelector((state)=>state.scores.score);
   const {id}=useParams();
   const player = Array.isArray(playerName) ? playerName.find((p) => p.id === id) : null;
    const dispatch=useDispatch();
     const snakeArr=[[0,0]];
     const Board=32; //20*20 grid
     //const speed=200; //200ms
    
     const [snake,setSnake]=useState(snakeArr);
     const [Direction,setDirection]=useState([0,0]);
     const [Food,setFood]=useState(generateFood(snakeArr));
     const [score,setScore]=useState(0);
     const [gameOver,setgameOver]=useState(false);
     const [running,setRunning]=useState(true);
     const [play,setPlay]=useState(true);
     
      const hissAudio=useRef(new Audio(hissMusic));
     const FoodMusic=()=>{
      const audio=hissAudio.current;
      audio.pause();
      audio.currentTime=1;
     audio.play();
     };

     const stopFoodMusic=()=>{
      const audio=hissAudio.current;
         audio.pause();
         audio.currentTime=0;
     } 

     const CollisionMusic=()=>{
     const audio=new Audio(overMusic);
     audio.play();
     };
       const audioRef=useRef(null);
       
     //const interval=useRef(null);

     // Generate random food location
     function generateFood(snakeArr){
        let newFood;
        do{
            newFood=[
               Math.floor(Math.random()*Board),
               Math.floor(Math.random()*Board)
            ];
        }
         while(snakeArr.some(([x,y])=>x===newFood[0] && y===newFood[1]));
         return newFood;
     }

       useEffect(()=>{
       const handle = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (directionRef.current[1] !== 1) setDirection([0, -1]);
      break;
    case 'ArrowDown':
      if (directionRef.current[1] !== -1) setDirection([0, 1]);
      break;
    case 'ArrowLeft':
      if (directionRef.current[0] !== 1) setDirection([-1, 0]);
      break;
    case 'ArrowRight':
      if (directionRef.current[0] !== -1) setDirection([1, 0]);
      break;
    default:
      break;
  }
};

       window.addEventListener('keydown',handle);
       return ()=>window.removeEventListener('keydown', handle);
       },[]);
        

      
       const directionRef = useRef(Direction);
        useEffect(() => {
          directionRef.current = Direction;
        }, [Direction]);

       useEffect(()=>{
        if(gameOver || !running ) return ;
         else if(Direction[0]===0 && Direction[1]===0) return;
        const interval=setInterval(()=>{
          setSnake(prev=>{
           const newHead = [
             prev[0][0] + directionRef.current[0],
           prev[0][1] + directionRef.current[1]
          ];
          
          // Wrap-around
          newHead[0]=(newHead[0]+Board)%Board;
           newHead[1]=(newHead[1]+Board)%Board;

            //collision
            if(prev.some(([x,y])=>x===newHead[0] && y===newHead[1]))
            {
                CollisionMusic();
                setgameOver(true);
                setRunning(false);
                return prev;
            }
            const newSnake=[newHead,...prev];
            if(newHead[0]===Food[0] && newHead[1]===Food[1]){
             FoodMusic();
             setTimeout(stopFoodMusic,600);
              const newscore=score+1;
              setScore(newscore);
               dispatch(updateScore({id:player.id,score:score}));
                setFood(generateFood(newSnake));
                return newSnake;
            }
            else{
                newSnake.pop();
                return newSnake;
            }
          })
        },200);
        return ()=>clearInterval(interval);
       },[Food, gameOver,player.id, dispatch,Direction, score,running]);

       const toggleButton=()=>{
        if(gameOver) return;
        setRunning(!running);
       }

       useEffect(() => {
           // Play music on mount
              audioRef.current.play().catch((e) => {
             console.log("Autoplay failed", e);
              });
       
              return () => {
             // Pause when component unmounts
             if(audioRef.current)
             audioRef.current.pause();
              };
              }, []);
      /*  useEffect(() => {
                if (gameOver) {
              dispatch(updateScore({id:player.id,score:score}));
              }
             }, [gameOver,player.id, dispatch, score]);
             */

     return(
       <div className='relative h-[90vh]'>
         <Link to='/'>
          <div className='absolute rounded-full text-3xl font-bold p-1 -top-6
           bg-green-400 border-[5px] border-double border-green-800 shadow-md
            shadow-black hover:bg-green-600 transition-all duration-100'> 
            <i class="fa-solid fa-arrow-left-long" style={{color:"white"}}></i>
             </div>
             </Link> 
         <div className='absolute top-2 left-2'>
          <img src="https://i.pinimg.com/originals/0e/b1/46/0eb146bd08bd17aeee67aeb300262225.gif"/>
        </div>
        <div className='absolute bottom-6 -right-[6px]'>
          <img src="https://i.pinimg.com/originals/0e/b1/46/0eb146bd08bd17aeee67aeb300262225.gif" className='scale-x-[-1] '/>
        </div>
        <div className='text-[3.5rem] font-bold text-pink-700 mx-12 mb-2 mt-6 '><u> Snake Game</u></div>
        <div className='flex justify-center items-center p-5 '>
        {!gameOver && (
          <div className=' -ml-[13rem] mr-4 -mt-[5rem] space-y-8'>
      <div className='text-[25px] font-bold text-yellow-500 mx-3 mb-6 px-3'> PlayerName : {player.name} <br /> is playing the Game now ...</div>
       <div className='text-3xl font-bold text-yellow-600 m-3 '> Your Score : {score} </div>
       </div>
        ) }
        <div className='flex justify-center items-center h-[100vh] -mt-24 '>
       <div className=' relative w-[544px]  h-[544px]  bg-yellow-500 border-[10px] border-dashed border-pink-700 border-spacing-96 shadow-2xl shadow-black'>
          {!gameOver && (
            snake.map(([x,y],index)=>{ 
                    const place=snake.findIndex((snake)=>snake[0]===x && snake[1]===y);
                    const isHead=place===0;  
                    return(    
              <div key={index}
                className='absolute border-2 border-red-900 shadow-md border-double shadow-black'
                style={{
                  backgroundColor: isHead ? "blue":"#CC0066",
                  borderRadius: isHead? "30%" :"20%",
                  width:16,
                  height:16,
                  top:y*16,
                  left:x*16,
                }}>

                  {isHead?
                  <div className='flex  justify-around -mt-[2px]'>
                     <div className='rounded-full bg-black w-2 h-2 px-1 -ml-1 mr-1 '>
                     </div>
                      <div className='rounded-full bg-black w-2 h-2 px-1'></div>
                   </div>
                   :
                   <div className='rounded-full bg-white w-[6px] h-[6px] m-[2.4px]'> </div>
                   }
              </div>
              
            )})
          )}
          {!gameOver && (
            <div className='flex justify-center items-center'>
             <div className='absolute rounded-full w-2 h-2 bg-green-700 shadow-md shadow-black border-gray-600 '
          style={{
                  width:16,
                  height:16,
                  top:Food[1]*16,
                  left:Food[0]*16,
                }}>
          </div>
          </div>
          
          )}

           {
            gameOver &&( 
              <div >
                 <div className='text-pink-600 text-2xl font-bold mt-6'> Congratulations ! <br /> Your Score : {player.score}</div>
            <div className=' bg-pink-600 text-[3rem] mb-16 mt-36 font-bold text-green-500  '>Game Over </div>
            <Link to='/'>
             <button onClick={ClickMusic}
              className='rounded-xl px-10 py-4 text-3xl font-bold mb-1 text-green-600
              bg-red-800  border-[7px] border-double border-green-800  
              shadow-2xl shadow-black hover:bg-red-900 tansition-all duration-250'>Restart</button> 
             </Link>
            </div>
          )
          }
           </div>
         
      </div>
       </div>    
         {!gameOver && (
            <div className='absolute top-[2rem] right-44'>
            <button className='text-white font-bold text-xl border-[5px] border-black shadow-lg shadow-black border-double rounded-full px-1 py-1'
            style={{
              backgroundColor: running? "red":"green",
            }}
            onClick={toggleButton}
            > 
            {running? <i class="fa-solid fa-pause" style={{color:"white"}}></i>:<i class="fa-solid fa-play" style={{color:"white"}}></i>}
            { running? "Stop": "Start"}</button>
            </div>
          )}

          <div className='absolute  -top-6 right-1'>
              <button 
               className='text-white font-bold border-[5px] border-black border-double shadow-md shadow-black rounded-full px-2 py-1'
               style={{
                backgroundColor: play? "green": "red",
               }}
              onClick={() =>{
              if(play){
                audioRef.current.pause();
                setPlay(false);
              }
              else{
              audioRef.current.play();
              setPlay(true);
              }
              
            }}>
              { play?<i class="fa-solid fa-volume-high" style={{color:"white"}}></i> 
          :<i class="fa-solid fa-volume-xmark" style={{color:"white"}}></i> }</button>
                 </div>   
          
              <audio ref={audioRef} loop>
                  <source src={backgroundMusic} type="audio/mpeg" />
                  
                </audio>

         </div>
    )
 }

 export default ClassicalGame











 /*
  Second approch to render board and snake and food  by matrix

  const renderBoard=()=>{
    const board=[];
    for (int row=0;row<20;row++){
    const rows=[];
    for(int col=0;col<20;col++){
    const isSnake=snake.some(([x,y])=>x===col && y===col);
    const isFood=Food[0]===col && Food[1]===col;
    rows.push(<div
    key={`${row}-${col}`}
    className={`cell ${isSnake?'snake' : ''} $ {isFood?'food' :''}`}
    
    />);
    }
    board.push(<div key={row} className="row"
    {rows}
    );
    }
    return board;
    }
 
 */ 