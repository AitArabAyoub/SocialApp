import { useNavigate, useParams } from 'react-router-dom'
import { GetPost, GetUser } from '../lib/react-query/queries'
import { AddComment, DeletePost, EditUser, HandleLike } from '../lib/react-query/mutations'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { deletePost } from '../store/AuthSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { Comment, TComment, TNewPost, TPost } from '../types'
import PostComment from '../components/PostComment'

type Inputs = {
    Comment: string
}

function Post() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const{postid} = useParams()
    const {data:post,isLoading,isError} = GetPost(postid as string)
    const {data:Authuser,isLoading:loading} = GetUser(post?.createdBy as string)
    const {user} = useAppSelector(store => store.auth)
    const {mutateAsync,error:DeleteError,isSuccess:DeleteSuccess} = DeletePost()
    const {mutateAsync:Addcomment,isSuccess:IsAdded,isError:IsNotAdded,isPending:isAdding} = AddComment()
    const {mutateAsync:EditeUser} = EditUser()
    const {mutateAsync:likeHandle} = HandleLike()
    const disptach = useAppDispatch()
    const navigate = useNavigate()
    const handleClick = async()=>{
        if(user){
            // delete post firestore
            await mutateAsync({id : postid as string})
            // Edite User Posts Array
            await EditeUser({uid : user.uid,body: {...user,posts : user.posts.filter(el => el !== postid)}})
            // delete post user state
            disptach(deletePost(postid))
            // navigate(`/profile/${user?.uid}`)
            navigate(`/profile/${user.uid}`)
        }
    }
    const onSubmit: SubmitHandler<Inputs> =async (data) => {
        const NewComment : Comment = {
            comment : data.Comment,
            createdAt : new Date(),
            postId : post?.id as string,
            createdBy : user?.uid as string
        };
        await Addcomment({id : postid as string,post : post as TPost,comment : NewComment})
    }
    const handlelike = async()=>{
        await likeHandle({uid:user?.uid as string,post : post as TPost ,postid : postid as string})
    }
    return (
        <div className='flex pt-10'>
            <div className='grid grid-cols-2 gap-3 min-h-screen'>
                <div className='w-full'>
                    {post ? <img src={post?.postImg} className='object-cover w-full' style={{height : "100%"}} alt="" /> : <div className='w-[500px] h-full  bg-slate-100'></div>}
                </div>
                <div>
                    <div className="header flex gap-1 border-b border-white p-3">
                        <img src={Authuser?.profileImg} alt="" className='h-12 w-12 rounded-full' />
                        <div className='grow'>
                            <h2>{Authuser?.name}</h2>
                            <h2>@{Authuser?.username}</h2>
                        </div>
                        {user?.uid === Authuser?.uid ? <button className='bg-red-600 px-3 py-2 rounded-md text-white' onClick={handleClick}>Delete</button> : ""}
                    </div>
                    <div className="body h-[250px] overflow-y-scroll">
                        <div className="caption flex items-center gap-1 p-3">
                            <img src={Authuser?.profileImg} alt="" className='h-12 w-12 rounded-full' />
                            <div>
                                <h2>@{Authuser?.username}</h2>
                                <p>{post?.caption}</p>
                                <p className='text-gray-600'>{post?.createdAt.toDate().toDateString()} {post?.createdAt.toDate().toLocaleTimeString()}</p>
                            </div>
                        </div>
                        <div className="comments">
                            <h2 className='text-end me-3'>Comments</h2>
                                {
                                post?.comments.map((el:TComment)=>{
                                        return <PostComment Comment={el}/>
                                    })                                
                                }
                        </div>
                    </div>
                    <div className="footer mt-3 mx-2">
                        <div className='flex gap-1'>
                            <div>
                                <div className="flex gap-1">
                                    <span className="">{post?.likes.length}</span>
                                    <button className="" onClick={handlelike}>
                                        {
                                            post?.likes.includes(user?.uid as string)
                                            ?
                                            <i className="bi bi-suit-heart-fill"></i>
                                            :
                                            <i className="bi bi-suit-heart"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-1">
                                    <span className="">{post?.comments.length}</span>
                                    <button className="" ><i className="bi bi-chat"></i></button>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}  className="border-b border-b-gray-800 ">
                            <div className='flex'>
                                <input type="text" {...register("Comment",{required : true})}  className="py-3 px-4 block grow bg-black border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Write Your Comment"/>
                                <button type='submit' disabled={isAdding}>
                                    {isAdding ? <div className="h-5 w-5 rounded-full border-4 border-blue-600 border-b-transparent"></div> :"Send"}
                                </button>
                            </div>
                            {errors.Comment && <span className='block px-4 my-2 text-red-600'>Please Add A Comment !</span>}
                        </form>
                    </div>
                </div>
            </div>
            {
                DeleteSuccess &&
                <div className='absolute -bottom-0 end-10 bg-green-600 text-white p-3 rounded-md'>
                    <h2>Post Deleted Successfully</h2>
                </div>
            }
            {
                DeleteError &&
                <div className='absolute -bottom-0 end-10 bg-red-600 text-white p-3 rounded-md'>
                    <h2>Error : Can't Delete Post</h2>
                </div>
            }
            {
                IsAdded &&
                <div className='absolute -bottom-0 end-10 bg-green-600 text-white p-3 rounded-md'>
                    <h2>Comment Added Successfully</h2>
                </div>
            }
            {
                IsNotAdded &&
                <div className='absolute -bottom-0 end-10 bg-red-600 text-white p-3 rounded-md'>
                    <h2>Error : Can't Add Comment</h2>
                </div>
            }
        </div>
    )
}

export default Post
