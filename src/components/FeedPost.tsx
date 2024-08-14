import { Comment,TPost } from "../types"
import { GetUser } from "../lib/react-query/queries"
import { useAppSelector } from "../store/hooks"
import { AddComment, HandleLike } from "../lib/react-query/mutations"
import { useForm, SubmitHandler } from "react-hook-form"
import PostComment from "./PostComment"
import useFollowUser from "../hooks/useFollowUser"
type Props = {
    post : TPost
}
type Inputs = {
    comment : string
}
function FeedPost({post }:Props) {
    const {data:user} = GetUser(post.createdBy)
    const {user:Authuser} = useAppSelector(store=>store.auth)
    const {mutateAsync:likeHandle} = HandleLike()
    const {mutateAsync,isPending:isAdding} = AddComment()
    const {handleFollow,isSuccess} = useFollowUser(post.createdBy)
    const handlelike = async()=>{
        await likeHandle({uid:Authuser?.uid as string,post : post as TPost ,postid : post.id as string})
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        const NewComment : Comment = {
            comment : data.comment,
            createdAt : new Date(),
            postId : post?.id as string,
            createdBy : Authuser?.uid as string
        };
        await mutateAsync({id : post.id as string,post : post as TPost,comment : NewComment})
    }
    return (
        <div className="flex flex-col w-3/4 p-2 mx-auto mb-2 border border-gray-900 shadow-sm rounded-xl ">
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-2 mb-3">
                    {user ? <img src={user.profileImg }className="h-10 w-10 rounded-full" alt="" /> :<div className="h-10 w-10 rounded-full border border-white"></div>}
                    <div>
                        {!user ?<div className="animate-pulse w-32 h-3 bg-white rounded-md mb-3"></div> : <h2 className="text-md font-bold">{user.name}</h2>}
                        {!user ?<div className="animate-pulse w-32 h-3 bg-white rounded-md mb-3"></div> : <h2 className="text-gray-500">{user.username} / {post?.createdAt.toDate().toDateString()} {post?.createdAt.toDate().toLocaleTimeString()}</h2>}
                    </div>
                </div>
                {Authuser?.uid !== user?.uid ? <button className='text-blue-600 hover:text-white transition transition-300  ease-in-out' onClick={handleFollow}>Unfollow</button> : ""}
            </div>
            <div className="h-[350px]">
                {!post ?<div className="bg-slate-400 w-full h-full"></div> : <img className="w-full h-full object-cover rounded-md" src={post.postImg} alt="Image Description"/> }
            </div>
            <div className='flex gap-2 mt-2 text-xl'>
                <div className="flex gap-1">
                    <span className="">{post.likes.length}</span>
                    <button className="" onClick={handlelike}>
                    {
                        post?.likes.includes(Authuser?.uid as string)
                        ?
                        <i className="bi bi-suit-heart-fill"></i>
                        :
                        <i className="bi bi-suit-heart"></i>
                        }
                    </button>
                </div>
                <div className="flex gap-1">
                    <span className="">{post.comments.length}</span>
                    <button className="" ><i className="bi bi-chat"></i></button>
                </div>
            </div>
            <div className="px-3">
                <p className="my-2 text-gray-500 dark:text-neutral-400">
                    {post.caption}
                </p>
                <div className="border-t border-white pt-4">
                    {
                        post.comments.map(el =>{
                            return <PostComment Comment={el}/>
                        })
                    }
                </div>
            </div>
            <div className="border-b border-b-gray-800 ">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="flex gap-2">
                        <input type="text" className="py-3 px-4 block grow bg-black border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Write Your Comment" {...register("comment", { required: true })}/>
                        {/* errors will return when field validation fails  */}
                        <button type="submit" className="" disabled={isAdding}>
                            {isAdding ? <div className="h-5 w-5 rounded-full border-4 border-blue-600 border-b-transparent"></div> :"Send"}
                        </button>
                    </div>
                    {errors.comment && <span className="block px-4 text-red-600 ">Please Add A Comment !</span>}
                </form>
            </div>
            {
            isSuccess && 
                <div id="dismiss-alert" className="fixed end-10 bottom-10 hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert" tabIndex={-1} aria-labelledby="hs-dismiss-button-label">
                    <div className="flex">
                        <div className="shrink-0">
                            <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                            </svg>
                        </div>
                        <div className="ms-2">
                            <h3 id="hs-dismiss-button-label" className="text-sm font-medium">
                                User Unfollowed  successfully .
                            </h3>
                        </div>
                        <div className="ps-3 ms-auto">
                            <div className="-mx-1.5 -my-1.5">
                            <button type="button" className="inline-flex bg-teal-50 rounded-lg p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:bg-teal-100 dark:bg-transparent dark:text-teal-600 dark:hover:bg-teal-800/50 dark:focus:bg-teal-800/50" data-hs-remove-element="#dismiss-alert">
                                <span className="sr-only">Dismiss</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default FeedPost
