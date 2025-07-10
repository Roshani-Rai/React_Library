import React,{useState} from 'react'
import {Input,Button} from './index'
import { useDispatch} from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/auth'
import {login} from '../assets/store/authSlice'

function Signup(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [error, setError]= useState("")
    const { register, handleSubmit} =useForm()

  const submit=async(data)=>{
    try{
         setError("")
         const createuser= await authService.createAccount(data)
         if(createuser){
            const user= await authService.getCurrentUser()
            if(user) dispatch(login(user));
            navigate("/")
         }
    }
     catch(error){
        setError(error.message)
     }
  }
    return(
          <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img className=' rounded-full shadow-lg shadow-black'  src="https://toowoombaautoservices.com.au/wp-content/uploads/2020/01/person-1824144_1280-1080x1080.png"
               />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary text-blue-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                 <form onSubmit={handleSubmit(submit)} >
                     <div className='space-y-3'>
                        <Input label="Full Name:"
                        type="text"
                        placeholder="Enter Your Name"
                        {...register("name",{
                            required:true,
                        })}  />
                      <Input type="email"
                      placeholder="Enter Your Email-Id"
                      label="Email:"
                      {...register("email",{
                        required:true,
                         validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                      }
                      )}
                      />
                      <Input label="Password:"
                                      type="password"
                                      placeholder="Enter Your Password"
                                      {...register("password",{
                                          required:true,
                                      })}
                                      />
                                       <Button type="submit" className='rounded-lg w-[80%] text-2xl font-bold shadow-lg shadow-gray-800 hover:bg-black  py-[16px] mt-3'> Create Account </Button>
                     </div>
                 </form>
                </div>
                </div>
       
    )
}

export default Signup