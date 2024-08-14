import { GetFeedPosts } from '../lib/react-query/queries'
import { useAppSelector } from '../store/hooks'
import FeedPost from './FeedPost'

function FeedPosts() {
    const {user} = useAppSelector(store=>store.auth)
    const {data} = GetFeedPosts([...user?.following as string[],user?.uid as string ])
    if(data?.length === 0){
        return <h2 className='text-center pt-5 text-2xl font-bold'>No Posts To Show</h2>
    }
    return (
        <div className='min-h-screen pt-3'>
            {
                data?.map(el =>{
                    return <FeedPost post={el}/>
                })
            }
        </div>
    )
}

export default FeedPosts
