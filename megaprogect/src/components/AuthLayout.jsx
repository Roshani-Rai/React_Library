import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Protected({children,authentication=true }){

    const navigate= useNavigate()
    const [loading,setLoading]=useState(true)
     const authStatus=useSelector((state)=>state.auth.status)
            useEffect(()=>{
                if(authentication && authStatus!==authentication){
                       navigate("/login")
         }
                else if(!authentication && authStatus!==authentication){
                navigate("/")
         }
                setLoading(false)
      },[authStatus, navigate, authentication])
       
    return(
       loading ? <h1>Loading...</h1> : <>{children}</>
    )
}

export default Protected


 /*useEffect(() => {
    // If the user must be logged in but isn't
    if (authentication === true && authStatus === false) {
        navigate("/login");
    }
    // If the user must be logged out but is logged in
    else if (authentication === false && authStatus === true) {
        navigate("/");
    }
    setLoading(false);
}, [authStatus, navigate, authentication]);
*/