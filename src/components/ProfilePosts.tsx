import { GetUserPosts } from '../lib/react-query/queries'
import ProfilePost from './ProfilePost'

function ProfilePosts({id}:{id : string}) {
    const {data} = GetUserPosts(id)
    return (
        <div className='grid grid-cols-3 gap-4 mt-3'>
            {data?.map(el=>{
                return <ProfilePost post={el} key={el.id}/>
            })}
        </div>
    )
}

export default ProfilePosts
