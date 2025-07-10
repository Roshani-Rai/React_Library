import React from 'react'
import {useId} from 'react' 

function  Select ({
    options,
    label,
    className="",
    ...props
   },ref) {
    const id= useId();
  return (
    <div className='w-full'>
       { label && <label  htmlFor={id} className='text-2xl font-bold drop-shadow-2xl'>{label}</label>}
       <select
       id={id}
       {...props}
       ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-gray-400 text-xl  outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            { options?.map((option)=>(
                <option key={option} value={option}> {option} </option>
            ))}
            </select>
    </div>
  )
}
export default React.forwardRef(Select)
