import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
const ViewPaste=()=>{
    const {id}=useParams();
    const allPaste=useSelector((state)=>state.paste.pastes)
    const paste=allPaste.find((p)=>p.id===id)

    return(
        <div className='flex flex-col bg-blue-800 h-[80vh]'>
              <div
      className=' flex justify-between rounded-md px-6 py-3 text-2xl font-semibold  w-[80%] mx-20 my-6 border shadow shadow-black bg-gray-200'
      >  
      <div>{paste.title}</div> 
      <button onClick={()=>{
        navigator.clipboard.writeText(paste.title);
              toast.success(" Your Title is copied Successfully")
      }}><i className="fa-solid fa-copy" ></i></button>
      </div>
      <div  className='relative flex justify-between h-full w-[80%] mb-7 py-4 px-8 rounded-lg text-2xl shadow-lg shadow-black mx-20 border-2 bg-gray-200 ' > 
       <div>{paste.content}</div> 
       <button onClick={()=>{
        navigator.clipboard.writeText(paste.content);
        toast.success(" Your Content is copied Successfully");
       }}
       className='absolute top-4 right-4'
       ><i className="fa-solid fa-copy" > </i></button>
       </div>
        </div>
    )
}
export default ViewPaste