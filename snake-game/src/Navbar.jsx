import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { useRef } from 'react'
import backgroundMusic from '../public/backGround.mp3'
 import { ClickMusic } from './music'

function Navbar(){
   const [play,setPlay]=useState(true);
     const audioRef=useRef(null);

   useEffect(() => {
       // Play music on mount
          audioRef.current.play().catch((e) => {
         console.log("Autoplay failed", e);
          });
          }, []);

    return(
      <div>
       <div className='flex justify-around '>
        <Link to="/"> 
        <button onClick={ClickMusic}
         className='border-[8px] border-dotted border-gray-800 text-2xl text-white font-bold shadow-2xl shadow-black
         bg-green-700 rounded-xl px-4 py-3 mt-6 hover:bg-green-800 tansition-all duration-250'>Home</button>
         </Link>
         <Link to="/score" >
       <button onClick={ClickMusic} className='border-[8px] border-dotted border-gray-800 text-2xl text-white font-bold shadow-2xl shadow-black bg-green-700
          rounded-xl px-4 py-3 mt-6 hover:bg-green-800 tansition-all duration-250'>ScoreBoard</button>
          </Link>
       </div>

       <div className='absolute top-2 right-1'>
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

export default Navbar