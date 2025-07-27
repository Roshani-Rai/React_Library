import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
const ViewPaste=()=>{
    const {id}=useParams();
    const allPaste=useSelector((state)=>state.paste.pastes)
    const paste=allPaste.find((p)=>p.id===id)

    return(
        <div className='flex flex-col'>
              <input
      type='text'
      disabled
      className='rounded-md px-4 py-3 text-2xl font-semibold text-center w-[80%] mx-20 my-6 border shadow shadow-black bg-gray-200'
      value={paste.title}
      /> 
      <textarea 
        type='text'
        value={paste.content}
        className='w-[80%] py-4 px-8 rounded-lg text-2xl shadow-lg shadow-black mx-20 border-2 bg-gray-200 '
        disabled
        rows={10}  
        />
        </div>
    )
}
export default ViewPaste