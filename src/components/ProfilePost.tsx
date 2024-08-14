import { TNewPost } from '../types'
import { Heart, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProfilePost({post}:{post:TNewPost}) {
    return (
        <Link to={`/post/${post.id}`} className='relative bg-white h-[180px]'>
            <img src={post.postImg} className='h-full w-full object-cover' alt="" />
            <div className='overlay absolute top-0 start-0 w-full h-full flex justify-center items-center ease-in-out duration-300'>
                <h2 className='flex gap-1'>{post.likes.length} <Heart/></h2>
                <h2 className='flex gap-1'>{post.comments.length} <MessageCircle/></h2>
            </div>
        </Link>
    )
}

export default ProfilePost
