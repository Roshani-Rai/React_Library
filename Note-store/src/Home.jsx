import React, {useState,useEffect} from 'react'
import {nanoid} from '@reduxjs/toolkit'
import {useSelector,useDispatch} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import {update,add} from './store/slice.js'


function Home(){
   const dispatch=useDispatch()
    const note=useSelector((state)=>state.paste.pastes);
    const [input,setInput]=useState('');
    const [Content,setContent]=useState('');
    const [searchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId")
    useEffect(()=>{
    if(pasteId){
    const paste=note.find((p)=>p.id===pasteId)
    setInput(paste.title)
    setContent(paste.content)
 }
},[pasteId,note])
    function addHandler(){
        const paste={
           id:nanoid(),
          title:input,
          content:Content,
        }
        if(pasteId){
         dispatch(update(paste))
        }
        else{
          dispatch(add(paste));
        }
       setInput('');
         setContent('');
    }

    return (
      <div className='bg-blue-900 w-full h-full'>
        <h1 className='font-bold text-4xl  text-white px-4 py-7'><u>Add your Notes Here for access in future</u></h1>
        <div className='flex justify-center p-7'>
        <input 
        type="text"
        placeholder="Enter Your Notes Title"
        value={input}
        className='rounded-md px-4 py-2 text-xl w-96 mx-3 '
        onChange={(e)=>setInput(e.target.value)}
        />
        <button 
        type='submit'
        className='rounded-md px-4 py-2 text-xl bg-slate-300 font-bold'
        onClick={addHandler}
        >  {
          pasteId? "Update My Paste":"Create My Paste"
        } </button>
        </div>
        <textarea 
        type='text'
        value={Content}
        placeholder='Enter Your Content Here'
        className='w-[80%] py-4 px-5 rounded-lg text-2xl shadow-lg  border-2 border-blue-950'
        rows={20}
        onChange={(e)=>setContent(e.target.value)}
        />
      </div>
    )
}

export default Home