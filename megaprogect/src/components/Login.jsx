import React,{useState} from 'react'
import {Input,Button} from './index'
import {login as authlogin} from '../assets/store/authSlice'
import authService from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'


function Login(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit}= useForm()
    const [error,setError]=useState("")
   
    const create=async(data)=>{
        try{
            setError("")
                const session= await authService.login(data)
         if(session){
            const user=await authService.getCurrentUser()
            if(user) dispatch(authlogin(user))
                navigate("/")
        }
         }
         catch(error){
           setError(error.message)
         }
    }
    return(
        <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto my-8 w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img className=' rounded-full shadow-lg shadow-black'
                         src="https://toowoombaautoservices.com.au/wp-content/uploads/2020/01/person-1824144_1280-1080x1080.png"
               />
                    </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center ">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-2 mb-5">
             <div className='space-y-5'>
                <Input label="Email : "
                placeholder="Enter your email"
                type="email"
                {...register("email",{
                    required:true,
                   validate: {
                       matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                       "Email address must be a valid address",
                      }

                })} />
                <Input label="Password : "
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true,
                })}
                />
                <Button type="submit" className='rounded-lg w-[80%] text-2xl font-bold shadow-lg shadow-gray-800 hover:bg-black  py-[12px] mt-2'> Sign-in</Button>
             </div>
        </form>
        </div>
        </div>
    )
}

export default Login
/*
 const create = (data) => {
    setError("");

    authService.login(data)
        .then((session) => {
            if (session) {
                return authService.getCurrentUser();
            }
        })
        .then((user) => {
            if (user) {
                dispatch(authlogin(user));
                navigate("/");
            }
        })
        .catch((error) => {
            setError(error.message);
        });
};

*/ 