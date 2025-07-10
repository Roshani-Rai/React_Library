import React,{useId} from 'react'

const Input=React.forwardRef( function Input({
    type="text",
    className="",
    label,
    ...props
}, ref){
    const id=useId()
    return(
  <div className='w-full'>
     {label && <label 
            className='inline-block mb-1 pl-1 mt-6 shadow-2xl  text-2xl  px-4 font-bold' 
            htmlFor={id}>
                {label}
            </label>}
            <input className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
            ref={ref}  
            type={type}         
            id={id}
            {...props}/>
  </div>
    )}
)

export default Input
