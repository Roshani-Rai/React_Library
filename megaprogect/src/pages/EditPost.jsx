import React, {useEffect, useState} from 'react'
import { Postform} from '../components/index'
import service from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

  useEffect(() => {
  if (slug) {
    service.getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/'); // fallback if post is null
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/'); // redirect on error
      });
  } else {
    navigate('/');
  }
}, [slug, navigate]);

  return post ? (
    <div className='py-8'>
        <div className='w-full max-w-7xl mx-auto px-4'>
            <Postform post={post} />
        </div>
    </div>
  ) : null
}

export default EditPost