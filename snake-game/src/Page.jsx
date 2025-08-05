import React from 'react'
import {Link,useParams} from 'react-router-dom'

function Page(){
  const {id}=useParams();
    return(
      <div>
        <div className='flex flex-col justify-end items-center absolute bottom-[1px]'>
        <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" />
          </div>
        <div className='flex flex-col justify-end items-center absolute bottom-[1px] right-2'>
         <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className="scale-x-[-1]"/>
          </div>
          <div className='flex flex-col justify-end items-center absolute top-[128px]'>
        <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif"/>
          </div>
        <div className='flex flex-col justify-end items-center absolute top-[128px] right-2'>
         <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className="scale-x-[-1]"/>
          </div>
      <div className='flex justify-center items-center h-[100vh] -mt-20'>
       <div className='flex flex-col py-28 px-20 w-[500px] h-[500px] bg-transparent  border-[5px]  border-green-800 border-spacing-96 shadow-2xl shadow-black'>
        <Link to={`/classicSnake/${id}`}
        className='rounded-2xl my-10 py-5 w-80 px-2 h-20 text-2xl font-bold text-green-600 bg-red-800  border-[7px] border-double border-green-800 border-spacing-96 shadow-2xl shadow-black hover:bg-red-900 tansition-all duration-250'
        >Classical Snake Game</Link>
         <Link to={`/advanceSnake/${id}`}
         className='rounded-2xl w-80 h-20 py-5 px-2 text-2xl font-bold text-green-600 bg-red-800  border-[7px] border-double border-green-800 border-spacing-96 shadow-2xl shadow-black hover:bg-red-900 tansition-all duration-250'
         >Advanced Snake Game</Link>
       </div>
       </div>
       </div>
    )
}

export default Page