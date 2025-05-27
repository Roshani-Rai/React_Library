import React from 'react'
import {useRef,useState,useCallback,useEffect} from 'react'

function App() {
  const passref= useRef(null)
      const[length,setlength]=useState(8)
       const[password,setPassword]=useState(" ")
       const[character,setCharacter]=useState(false)
       const[number,setNumber]=useState(false)
       const copy=useCallback(()=>{
        passref.current?.select();
        passref.current?.setSelectionRange(0,100);
        window.navigator.clipboard.writeText(password);
       },[password])
       const passwordGenerator=useCallback(() =>{
              let pass="";
              let str=
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
              if(number) str+="123456789"
              if(character) str+="!@#$%^&*(){}[]~"
              for(let i=1; i<=length; i++ ){
                let char=Math.floor((Math.random()*str.length)+1)
                pass+=str.charAt(char)
              }
              setPassword(pass)
       }, [length,number,character,setPassword])
       useEffect(()=>{
        passwordGenerator()
       }, [length,number,character,passwordGenerator])
  return (
    <>
   <div className=" w-[94.6rem] h-[50rem] flex justify-center items-center overflow-y-hidden relative" >
   <img src="https://wallup.net/wp-content/uploads/2016/07/20/43415-Dubai-cityscape-city-skyscraper-building-lights.jpg"
    className="absolute -z-50 overflow-hidden"/>
        <div className="w-[50%] h-[30%] bg-transparent border-4 border-orange-700 rounded-xl z-50">
          <h1 className="text-center text-white font-bold m-3 text-3xl"> Password Generator</h1>
          <input
          type="text"
          placeholder="Password"
          value={password}
          className="w-[65%] h-[20%] bg-white  px-5 ml-16 my-6 rounded-l-2xl inset-1.5"
          ref={passref}
          readOnly
          />
          <button className="h-[20%] w-[8%] mr-12  text-white  text-xl font-semibold 
           bg-blue-500 rounded-r-2xl active:bg-blue-700"
           onClick={copy}
           >
            Copy</button>
            <input type="range"
            value={length}
            min={3}
            max={100}
            className="px-3 ml-12 my-5 cursor-pointer"
            onChange={(e)=>
              {setlength(e.target.value)}}
            />
            <label className="mx-5 text-white text-xl font-semibold "> Length : {length}</label>
            <input 
            type="checkbox"
            defaultChecked={character}
            className="ml-8 text-white text-xl font-semibold "
            id="character"
            onChange={()=>{
              setCharacter((prev)=>!prev);
            }}
            />
            <label htmlFor="character" className="text-white text-xl font-semibold ">Characters</label>
             <input
             type="checkbox"
             defaultChecked={character}
             id="Numbers"
              className="ml-5 text-white text-xl font-semibold "
             onChange={()=>{
               setNumber((prev)=>!prev);
             }
             }
             />
            <label htmlFor="Numbers" className="text-white text-xl font-semibold ">Numbers</label>
          </div>     
   </div>
    </>
  )
}

export default App

