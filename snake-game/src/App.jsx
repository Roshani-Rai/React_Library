import './App.css'
import React ,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {add} from '../store/slice.js'
import {useNavigate} from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
function App() {
  const [input ,setInput]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate()
  function handler(value){
     const id=nanoid() 
    if(value=='') {alert("Please First enter Your Name");
      return;
    }
    else{
    const score={
      id,
      name:input,
      score:0,
      created:new Date().toDateString()
    };
    dispatch(add(score));
    setInput('');
    navigate(`/page/${id}`);
  }
}
  return (
    <div className='relative'>
      <div className='flex justify-between relative'>
          <img src="https://cartoonsco-media.s3.amazonaws.com/uploads/2022/08/preview-of-snake-animated-gif-pointing.gif" className='w-52 scale-x-[-1] -mt-[3rem]'/>
        <img src="https://cartoonsco-media.s3.amazonaws.com/uploads/2022/08/preview-of-snake-animated-gif-pointing.gif" className='w-52 -mt-[3rem]'/>
        </div>
        <div className='flex flex-col justify-end items-center absolute bottom-12'>
        <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className=""/>
          </div>
        <div className='flex flex-col justify-end items-center absolute bottom-12 right-2'>
         <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className="scale-x-[-1]"/>
          </div>
    <div className='flex justify-center items-center h-[100vh] -mt-[13rem] '>
   <div className='w-[500px] h-[500px] bg-transparent   border-[7px] -mt-24 border-green-800 border-spacing-96 shadow-2xl shadow-black'>
    <input
    className='mt-44 mx-6 mb-8 px-8 py-4 rounded-lg w-96 h-16 text-2xl text-white font-semibold bg-green-300   border-[7px] border-double border-green-800 border-spacing-96 shadow-2xl shadow-black'
    placeholder='Enter the Player name'
    type='text'
    value={input}
    onChange={(e)=>setInput(e.target.value)}
    />
   <button onClick={()=>handler(input)}
    className='rounded-lg w-72 h-16 text-2xl font-bold text-green-600 bg-red-800  border-[7px] border-double border-green-800 border-spacing-96 shadow-2xl shadow-black hover:bg-red-900 tansition-all duration-250'
    >Start the Game</button>
   </div>
   </div>
   </div>
  )
}

export default App
