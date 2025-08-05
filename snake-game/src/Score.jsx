import React from 'react'
import {remove} from '../store/slice'
import {useDispatch,useSelector} from 'react-redux'


function Score(){
  const dispatch=useDispatch()
   const player= useSelector((state)=>state.scores.score)
   console.log(player)
   return(
    <div className='relative'>
      <div className='flex flex-col justify-end absolute left-[1px]'>
        <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className=" rotate-45"/>   
         <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className="scale-x-[-1] rotate-45"/>      
          </div>
            <div className='flex flex-col justify-end absolute top-14 -right-[55px]'>
        <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className=" rotate-45 -right-8"/>   
         <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif" className="scale-x-[-1] rotate-45"/>      
          </div>
        <div className='text-pink-700 text-[3rem] -my-3 mb-5 font-bold text-center'><u> Score board</u></div>
      
    <div className='my-24'>
        <div className='flex justify-center items-center  -mt-24'>
          <div className=' relative w-[700px] bg-transparent border-[10px] border-dashed border-green-700 border-spacing-96 shadow-2xl shadow-black'>
            
        {player?.length>0 ? (player.map((player)=>(
          <div>
            <div className="flex justify-around w-full px-4 pt-3 pb-6  bg-green-400 rounded border-[7px] border-double border-green-600 " key={player.id}>
             <div className='text-white text-2xl font-bold py-2  '>Name: {player.name}</div> 
              <div className='text-white text-2xl font-bold py-2  '> Score: {player.score}</div> 
              <div className='text-white text-2xl font-bold py-2 '>Rank: {player.rank}</div> 
                 <button className='rounded-lg shadow-lg shadow-black px-1 -top-2 border-2 border-black bg-red-700 text-white text-[15px] font-bold'
                  onClick={()=>dispatch(remove(player.id))}>
                  <i class="fa-solid fa-trash"></i> Delete</button>
                </div>
                <div className='flex justify-end -mt-12 mr-3'>
                <div className='text-white text-[1rem] font-bold py-4 '> Played on: {player.created}</div>
                </div>
                </div>
        )))
        :(<div className='flex justify-center items-center h-[50vh] '>
        <p className='text-[2rem] text-white font-bold '>No Player yet</p>
        </div>)
       }
    </div>
    </div>
    </div>
      </div>
   )
}

export default Score