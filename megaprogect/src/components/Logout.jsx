import React from 'react'
import {Button} from './index'
import authService from '../appwrite/auth'
import {logout} from '../assets/store/authSlice'
import { useDispatch } from 'react-redux'

function Logout(){
    
    const dispatch = useDispatch()
    const handler=()=>{
           authService.logout().then(()=>
          { 
            dispatch(logout())
          })
    }
    return(
       <Button
    className=' mt-[12px] text-2xl  py-[13px] px-3 shadow-black shadow-xl font-bold  duration-200 hover:bg-gray-800 '
    onClick={handler}
    >Logout</Button>
  )
}
export default Logout

/*import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

...

if (result) {
    dispatch(logout());
    navigate("/login");
}
 */