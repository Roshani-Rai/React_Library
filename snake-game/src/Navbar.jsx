import React from 'react'
import {Link} from 'react-router-dom'
 
function Navbar(){
    return(
       <div className='flex justify-around '>
        <Link to="/" 
        className='border-[8px] border-dotted border-gray-800 text-2xl text-white font-bold shadow-2xl shadow-black
         bg-green-700 rounded-xl px-4 py-3 mt-6 hover:bg-green-800 tansition-all duration-250'>Home</Link>
         <Link to="/score" 
         className='border-[8px] border-dotted border-gray-800 text-2xl text-white font-bold shadow-2xl shadow-black bg-green-700
          rounded-xl px-4 py-3 mt-6 hover:bg-green-800 tansition-all duration-250'>ScoreBoard</Link>
       </div>
    )
}

export default Navbar