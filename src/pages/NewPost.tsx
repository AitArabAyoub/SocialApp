import { useForm, SubmitHandler } from "react-hook-form"
import { FilePlus } from "lucide-react"
import useShowImg from "../hooks/useShowImg"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { db, storage } from '../firebase/firebase';
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { CreatePost } from "../lib/react-query/mutations";
import { addPost } from "../store/AuthSlice";
type Inputs = {
    caption:string
    postImg: string
}
function NewPost() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const {handleChange,selectedItem} = useShowImg()
    const {user} = useAppSelector(store => store.auth)
    const {mutateAsync,isSuccess,isPending,error} = CreatePost()
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        if(user){
            // create post object
            const Post = {
                caption : data.caption,
                likes  :[],
                comments : [],
                createdAt : new Date(),
                createdBy : user.uid
            }
            // create post 
            const postRef = await addDoc(collection(db, "posts"), Post);
            // upload post img
            const storageRef = ref(storage,`Posts/${postRef.id}`)
            await uploadString(storageRef, selectedItem, 'data_url')
            // download post img
            const url = await getDownloadURL(ref(storage, `Posts/${postRef.id}`))
            // update post
            const newpost = doc(db, 'posts', postRef.id)
            setDoc(newpost, {...Post,postImg : url})
            await mutateAsync({id : postRef.id,imgUrl:url,post:Post})
            // update user object
            const userRef = doc(db, 'users', user.uid)
            setDoc(userRef,{...user,posts:[...user.posts,postRef.id]})
            // update user state
            dispatch(addPost(postRef.id))
        }
    }
    return (
        <div className="container mx-auto p-5">
            <h2 className="flex items-center text-2xl font-bold gap-1"><FilePlus/> Create Post</h2>
            <form  onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto">
                <div className="space-y-3">
                    <label htmlFor="caption">Caption</label>
                    <textarea id="caption"  className="text-black py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" {...register("caption",{required : true})}/>
                    {errors.caption && <span className="text-red-600">Please add a caption !</span>}
                </div>
                <div className="space-y-3">
                    <label htmlFor="img" className="bg-blue-600 px-3 py-2 rounded-md mb-2">Add Photo</label>
                    <input type="file" className="" id="img" onChange={handleChange} style={{visibility : "hidden"}}/>
                </div>
                <div className="w-full border border-white rounded-md h-[400px] flex items-center justify-center mt-3">
                    {selectedItem 
                        ? 
                            <img src={selectedItem} className="object-cover rounded-md" style={{width : "100%",height :  "100%"}} alt="" /> 
                        :
                            ""
                    }
                </div>
                {errors.postImg && <span className="text-red-600">Please select an image !</span>}
                <input disabled={isPending} type="submit" value={isPending ? "Submitting" :"Submit"} className="bg-blue-600 px-3 py-2 rounded-md mt-2 block mx-auto" />
                { isSuccess && 
                    <div id="dismiss-alert" className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 absolute -bottom-16 end-10" role="alert"  aria-labelledby="hs-dismiss-button-label">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                            </div>
                            <div className="ms-2">
                                <h3 id="hs-dismiss-button-label" className="text-sm font-medium">
                                    Post Created successfully.
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
                {
                    error && 
                    <div id="dismiss-alert" className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-red-600 text-white rounded-lg p-4 absolute -bottom-16 end-10" role="alert"  aria-labelledby="hs-dismiss-button-label">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                            </div>
                            <div className="ms-2">
                                <h3 id="hs-dismiss-button-label" className="text-sm font-medium">
                                    {error.message}
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
            </form>
        </div>
    )
}

export default NewPost
