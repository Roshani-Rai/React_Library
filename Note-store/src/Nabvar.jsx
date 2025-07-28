import React from 'react'
import {Link, Outlet} from 'react-router-dom'

 const Nabvar = () => {
  return (
    <div >
         <nav className='flex justify-around p-4 bg-blue-900'>
           <div className='font-bold bg-white text-black text-2xl border rounded-lg shadow-lg p-2'> <Link to="/">Home</Link> </div> 
          <div className='font-bold bg-white text-black text-2xl border rounded-lg shadow-lg p-2'> <Link to="/paste">All Pastes</Link></div> 
        </nav>
        <Outlet/>
        </div>
  )
}

export default Nabvar