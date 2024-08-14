import { Link } from "react-router-dom"
import useFollowUser from "../hooks/useFollowUser"
import { useAppSelector } from "../store/hooks"

type Props = {
    name : string
    followers : number
    id:string
    img:string
}
function SuggUser({name,followers,id,img}:Props) {
    const {handleFollow,isPending,isSuccess} = useFollowUser(id)
    const {user} = useAppSelector(store => store.auth)
    return (
        <div className="flex flex-col border border-gray-900 shadow-sm rounded-xl ">
            <Link to={`/profile/${id}`} >
                <div className="flex justify-center items-center pt-3">
                    <img className="w-12  h-12 rounded-full object-cover" src={img} alt="Image Description"/>
                </div>
                <div className="p-2 text-center">
                    <h3 className="text-md font-bold text-white">
                        {name}
                    </h3>
                    <p className=" text-gray-500 mb-1">
                        {followers} folowers
                    </p>
                </div>
            </Link>
            <button disabled={isPending} className="bg-[#877EFF] px-3 py-1 rounded-md w-fit mx-auto" onClick={handleFollow}>
                        {
                            isPending
                            ?
                            <div className="h-5 w-5 rounded-full  border-4 border-blue-600 border-b-transparent"></div>
                            :
                            user?.following.includes(id as string) 
                            ?
                            "UnFollow"
                            :
                            "Follow"
                        }
            </button>
            { isSuccess && 
                <div id="dismiss-toast" className="absolute bottom-10 end-10 bg-teal-100 hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs  border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert"  aria-labelledby="hs-toast-dismiss-button-label">
                    <div className="flex p-4">
                        <p id="hs-toast-dismiss-button-label" className="text-sm text-gray-700 dark:text-neutral-400">
                            {user?.following.includes(id as string) ? "Followed Successfully" : "UnFollowed Successfully"}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}

export default SuggUser
