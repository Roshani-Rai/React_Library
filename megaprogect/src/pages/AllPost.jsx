import React, {useState, useEffect} from 'react'
import {  PostCard } from '../components/index'
import service from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []); 
  return (
    <div className='w-full py-8'>
       <div className='w-full max-w-7xl mx-auto px-4'>
            <div className='flex flex-wrap '>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4 shadow-lg shadow-black'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </div>
    </div>
  )
}

export default AllPosts