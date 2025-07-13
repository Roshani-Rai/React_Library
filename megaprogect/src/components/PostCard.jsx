import React from 'react'
import service from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard ({$id , title , featuredImage}){
    return(
     <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-200 rounded-xl p-4  hover:shadow-2xl shadow-black hover:scale-105 border-2 border-gray-700'>
            <div className='w-full justify-center mb-4 '>
                <img src={service.getFileView(featuredImage)} alt={title}
                    className='rounded-xl w-full shadow-xl shadow-black border-2 border-gray-700' />
                </div>
                 <h2 className='text-xl font-bold' >{title}</h2>
            </div>
     </Link>
    )
}

export default PostCard