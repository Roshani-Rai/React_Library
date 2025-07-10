import React,{useState, useEffect} from 'react'
import {PostCard} from '../components/index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';

function Home(){
            const isLoggedIn = useSelector((state) => state.auth.status);
    const [post,setPost]=useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
           if(posts) setPost(posts.documents)
        })
    },[])
     if(post.length===0){
    return(   
            <div className="w-full  py-8 mt-4 text-center">
                <div className=' h-full max-w-[80rem] mx-auto px-4'>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl text-blue-800 font-bold mt-16  hover:text-blue-700">
                                 {isLoggedIn ? "No posts available" : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
   ) }
   return(
        <div className='w-full py-8'>
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex flex-wrap'>
                    {post.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
)}
export default Home