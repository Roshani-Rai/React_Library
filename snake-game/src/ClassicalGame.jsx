import React,{useEffect,useState} from 'react'
import {resetGame,updateScore} from '../store/slice.js'
 import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import { useRef } from 'react';

 
 function ClassicalGame(){
    const playerName=useSelector((state)=>state.scores.score);
   const {id}=useParams();
 const player=playerName.find((p)=>p.id===id);
    const dispatch=useDispatch();
     const snakeArr=[[0,0]];
     const food=[[5,6]];
     const Board=32; //20*20 grid
     //const speed=200; //200ms
    
     const [snake,setSnake]=useState(snakeArr);
     const [Direction,setDirection]=useState([1,0]);
     const [Food,setFood]=useState(generateFood(food));
     const [score,setScore]=useState(0);
     const [gameOver,setgameOver]=useState(false);
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
        if(gameOver) return ;
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
              
               dispatch(updateScore(score));
              dispatch(resetGame());
                setgameOver(true);
                return prev;
            }
            const newSnake=[newHead,...prev];
            if(newHead[0]===Food[0] && newHead[1]===Food[1]){
              setScore((prev)=>prev+1);
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
       },[Food, gameOver, dispatch, score]);



     return(
       <div className='relative h-[90vh]'>
         <div className='absolute top-2 left-2'>
          <img src="https://i.pinimg.com/originals/0e/b1/46/0eb146bd08bd17aeee67aeb300262225.gif"/>
        </div>
        <div className='absolute bottom-6 -right-[6px]'>
          <img src="https://i.pinimg.com/originals/0e/b1/46/0eb146bd08bd17aeee67aeb300262225.gif" className='scale-x-[-1] '/>
        </div>
        <div className='text-[3.5rem] font-bold text-yellow-700 mt-6 '><u> Snake Game</u></div>
        <div className='flex justify-center items-center p-5 '>
        {player && (
          <div className=' -ml-[13rem] mr-4 -mt-[15rem] space-y-8'>
      <div className='text-[35px] font-bold text-yellow-500 mx-3 mb-6 px-3'> PlayerName : {player.name} <br /> is playing the Game now ...</div>
       <div className='text-3xl font-bold text-yellow-600 m-3 '> Your Score : {score} </div>
       </div>
        ) }
        <div className='flex justify-center items-center h-[100vh] -mt-24 '>
       <div className=' relative w-[544px]  h-[544px] bg-transparent bg-yellow-500 border-[7px] border-double border-yellow-700 border-spacing-96 shadow-2xl shadow-black'>
          {!gameOver && (
            snake.map(([x,y],index)=>( 
                          
              <div key={index}
                className='absolute bg-orange-600 border-2 border-red-800'
                style={{
                  width:16,
                  height:16,
                  top:y*16,
                  left:x*16,
                }}>
              </div>
              
            ))
          )}
          {!gameOver && (
            <div className='flex justify-center items-center'>
             <div className='absolute rounded-full w-2 h-2 bg-blue-700 border-gray-600 '
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
            <div className=' bg-pink-600 text-[3rem] mb-16 mt-48 font-bold text-green-500  '>Game Over </div>
            <Link to='/'>
             <button className='rounded-xl px-10 py-4 text-3xl font-bold mb-1 text-green-600 bg-red-800  border-[7px] border-double border-green-800  shadow-2xl shadow-black hover:bg-red-900 tansition-all duration-250'>Restart</button> 
             </Link>
            </div>
          )
          }
           </div>
         
      </div>
       </div>    
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