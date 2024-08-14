import { useForm, SubmitHandler } from "react-hook-form"
import { db } from "../firebase/firebase"
import { useState } from "react"
import { TNewUser } from "../types"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Link} from 'react-router-dom'
import HSOverlay from "@preline/overlay"
type Inputs = {
    username: string
}
function SearchForm() {
    const [users,setUsers] = useState<TNewUser[]>([])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        const q = query(collection(db, "users"), where("username", "==", data.username))
        const querySnapshot = await getDocs(q)
        if(!querySnapshot.empty){
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as TNewUser)
            })
        }
        console.log(users)
    }
    const handleClose = ()=>{
        setUsers([])
    }
    const handleRedirect  = ()=>{
        const modal  = new HSOverlay(document.querySelector('#search-modal') as HTMLElement);
        const openBtn = document.querySelector('#open-btn') as Element;
        openBtn.addEventListener('click', () => {
            modal.close();
        });
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                    <label htmlFor="username" className="block mb-2">Username</label>
                    <input id="username" className="block w-3/4 mx-auto px-3 py-2 rounded-md text-black" {...register("username")} />
                    {errors.username && <span>This field is required</span>}
                    <input type="submit" className="bg-blue-700 p-2 block mx-auto mt-2 rounded-md cursor-pointer" />
                </form>
            </div>
            <div className='w-3/4 mx-auto'>
                {users.map(el => {
                    return (
                        <div className='flex items-center justify-center my-2 border p-2 rounded-md'>
                            <Link to={`/profile/${el.uid}`}  className='flex gap-3'  onClick={handleRedirect}>
                                <img src={el.profileImg} className='h-12 w-12 rounded-md' alt="" />
                                <div className=''>
                                    <h2>{el.name}</h2>
                                    <h2>{el.username}</h2>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-end px-4 ">
                <button onClick={handleClose} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#search-modal">
                    Close
                </button>
            </div>
        </div>
    )
}

export default SearchForm
