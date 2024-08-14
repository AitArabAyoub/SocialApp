import { TComment } from '../types'
import { GetUser } from '../lib/react-query/queries'

type Props = {
    Comment:TComment
}
function PostComment({Comment}:Props) {
    const {data:user} = GetUser(Comment.createdBy)
    return (
        <div className='flex gap-2 items-center mb-3' >
            <img src={user?.profileImg} alt="" className='h-12 w-12 rounded-full' />
            <div>
                <h2>@{user?.username}</h2>
                <p className='text-gray-600'>{Comment?.createdAt.toDate().toDateString()} {Comment?.createdAt.toDate().toLocaleTimeString()}</p>
                <p>{Comment.comment}</p>
            </div>
        </div>
    )
}

export default PostComment
