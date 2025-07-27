import React,{useState} from 'react'
import {remove} from './store/slice.js'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
function Paste(){
  const dispatch=useDispatch()
   const pastes=useSelector((state)=>state.paste.pastes)
    const [search,setSearch]=useState('')

    const filterData=pastes.filter((paste)=>paste.title.toLowerCase().includes(search.toLowerCase()));
    
    return(
     < div className='bg-blue-900 w-full h-full'>
         <input
      type='search'
      placeholder='Search Here'
      className='rounded-md px-3 py-2 text-xl w-[90%] mx-3 my-6'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      /> 
        <div className="flex flex-col  gap-5 mt-5 ">
     
      {filterData.length>0&&filterData.map((paste)=>(
        <div className='border-2 border-black shadow-xl shadow-black w-[93%] mb-8 mx-8 rounded-lg pt-3 pb-8 '  key={paste.id}>
        <div className='flex flex-col items-start'>
          <div className='text-3xl text-white font-bold px-8'>{paste.title}</div>
          <div className='text-2xl text-gray-200 font-semibold px-8'>{paste.content}</div>
             </div>
          <div className='flex flex-row gap-2 justify-end mx-4 -mt-6'>
            <button className='rounded-md px-4 text-white py-2 text-[15px] bg-slate-800 font-bold'>
               < Link to={`/paste/${paste?.id}`}>
               <i className="fa-solid fa-eye" style={{color:'white'}}></i>View </Link> </button>
            <button className='rounded-lg px-2 text-white py-2 text-[15px] bg-slate-800 font-bold' > <i className="fa-solid fa-pen" style={{color:'whites'}}></i><Link to={`/?pasteId=${paste?.id}`}> Edit </Link></button>
            <button className='rounded-md px-2 text-white py-2 text-[15px] bg-slate-800 font-bold' onClick={()=>dispatch(remove(paste))}> <i className="fa-solid fa-xmark" style={{color:'white'}}></i>Delete</button>
            <button className='rounded-md px-2 text-white py-2 text-[15px] bg-slate-800 font-bold' 
            onClick={()=>{navigator.clipboard.writeText(paste.content);
              toast.success("Copied Successfully")
            }}>
              <i className="fa-solid fa-copy" style={{color:'white'}}> </i>Copy  </button>
            <button className='rounded-md px-2 text-white py-2 text-[15px] bg-slate-800 font-bold' 
              onClick={()=>{
                if(navigator.share){
                  navigator.share({
                    title:paste.title,
                    content:paste.content,
                    url:`${window.location.origin}/paste/${paste.id}`
                  })
                }
              }}>
              <i className="fa-solid fa-share" style={{color:'white'}}></i> Share </button>
          </div>
        </div>
      )
      )}
      </div>
      </div>
    )
}

export default Paste