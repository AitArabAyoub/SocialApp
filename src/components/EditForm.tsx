import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import useShowImg from '../hooks/useShowImg';
import { EditUser } from '../lib/react-query/mutations';
import { TNewUser } from '../types';
import { login } from '../store/AuthSlice';
import {  getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from '../firebase/firebase';


export type Inputs = {
    name : string
    username  :string
    profileImg : string
    bio : string
} 
function EditForm() {
    const {user} = useAppSelector(store => store.auth)
    const {handleChange,selectedItem} = useShowImg()
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const {mutate,isSuccess,isPending} = EditUser()
    async function submitForm(data:Inputs) {
        if(user){
            // upload image to storage firebase ProfileImgs folder 
            const storageRef = ref(storage,`ProfileImgs/${user.uid}`)
            await uploadString(storageRef, selectedItem, 'data_url')
            // download image from storage firebase as url
            const url = await getDownloadURL(ref(storage, `ProfileImgs/${user.uid}`))
            // create new user object
            const body : TNewUser = {
                uid : user?.uid,
                name : data.name,
                username : data.username,
                email : user?.email,
                profileImg : url,
                bio : data.bio,
                createdAt : user?.createdAt,
                followers : user?.followers,
                following : user?.following,
                posts : user?.posts
            }
            // update user in db and state
            mutate({uid : user?.uid,body})
            dispatch(login(body))
        }
    }
    
    return (
        <form onSubmit={handleSubmit(submitForm)} className="w-3/4 mx-auto">
            <div >
                <div className='my-2 flex items-center gap-2'>
                    <img src={selectedItem } alt="" className='h-20 w-20 rounded-full' />
                    <input type="file"  id="img"   {...register("profileImg", { required: true })} onChange={handleChange} accept='image/*'/>
                </div>
                {errors?.profileImg && <span className='text-red-700 font-bold block'>Please Chose A Profile Image</span>}
            </div>
            <div className="my-2">
                <label htmlFor="input-name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                    type="text" 
                    id="input-name" 
                    className="py-3 px-4 block w-full text-black border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                    {...register("name",{required : true})}
                    defaultValue={user?.name}
                    />
                {errors?.name && <span className='text-red-700 font-bold block'>Please Chose A Profile Image</span>}
            </div>
            <div className="my-2">
                <label htmlFor="input-username" className="block text-sm font-medium mb-2  dark:text-white">Username</label>
                <input 
                    type="text" 
                    id="input-username" 
                    className="py-3 px-4 block w-full text-black border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                    {...register('username',{required : true})}
                    defaultValue={user?.username}
                />
                {errors?.username && <span className="text-red-700 font-bold">Username is Required</span>}
            </div>
            <div className="my-2">
                <label htmlFor="input-bio" className="block text-sm font-medium mb-2  dark:text-white">Bio</label>
                <input 
                    type="text" 
                    id="input-bio" 
                    className="py-3 px-4 block w-full text-black border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                    {...register('bio')}
                    defaultValue={user?.bio}
                />
            </div>
            <button type="submit" disabled={isPending} className="px-2 py-3 bg-blue-600 text-white rounded-lg mt-3 block mx-auto">Register</button>
            {isSuccess && 
                <div id="dismiss-alert" className=" mt-3 hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert"  aria-labelledby="hs-dismiss-button-label">
                <div className="flex">
                    <div className="shrink-0">
                    <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    </div>
                    <div className="ms-2">
                    <h3 id="hs-dismiss-button-label" className="text-sm font-medium">
                        Profile has been successfully updated.
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
    )
}

export default EditForm
