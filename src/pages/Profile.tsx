import { Link, useParams } from "react-router-dom"
import ProfilePosts from "../components/ProfilePosts"
import { GetUser } from "../lib/react-query/queries"
import { useAppSelector } from "../store/hooks"
import EditProfile from "../components/EditProfile"
import useFollowUser from "../hooks/useFollowUser"

function Profile() {
    const {userid} = useParams()
    const {data:user,error} = GetUser(userid as string)
    const {user:authUser} = useAppSelector(store => store.auth)
    const {handleFollow,isSuccess,isPending} = useFollowUser(userid as string)
    if(error){
        return (
            <div className="text-center">
                <h2>User Not Found</h2>
                <Link to={"/"} className="text-blue-800 underline" >Go Back Home</Link>
            </div>
        )
    }
    return (    
        <div className="container pt-10 px-20">
            <div className="header flex gap-3">
                {user?.profileImg ? <img src={user?.profileImg} alt="" className="h-20 w-20 rounded-full border" />  : <div className="h-20 w-20 rounded-full border "></div>}
                <div>
                    {!user? <div className="animate-pulse w-full h-3 bg-gray-700 rounded-md mb-3"></div> :<h2 className="text-xl font-bold ">{user?.name}</h2>}
                    {!user ? <div className="animate-pulse w-full h-3 bg-gray-700 rounded-md mb-3"></div> : <h2 className="text-gray-500">{user?.username}</h2>}
                    {!user ? <div className="animate-pulse w-full h-3 bg-gray-700 rounded-md"></div> : <p className="mb-5">{user?.bio}</p>}
                    <div className="flex gap-2">
                        <h2><span className="text-[#877EFF] font-bold">{user?.posts.length}</span> Posts</h2>
                        <h2><span className="text-[#877EFF] font-bold">{user?.followers.length}</span> Followers</h2>
                        <h2><span className="text-[#877EFF] font-bold">{user?.following.length}</span> Following</h2>
                    </div>
                    {/* show edit profile or follow button */}
                    {
                        userid === authUser?.uid
                        ?
                        <button className="text-black bg-white mt-3 px-3 py-2 rounded-md" data-hs-overlay="#edit-modal">Edit Profile</button>
                        :
                        authUser?.following.includes(userid as string) 
                        ?
                        <button className="text-black bg-white mt-3 px-3 py-2 rounded-md" disabled={isPending} onClick={handleFollow}>UnFollow</button>
                        :
                        <button className="text-black bg-white mt-3 px-3 py-2 rounded-md" disabled={isPending} onClick={handleFollow}>Follow</button>
                    }
                </div>
            </div>
            <div className="mt-5 pt-3 border-t border-t-gray-600">
                <div className="flex justify-center gap-3">
                    <h2 className="text-center"><i className="bi bi-file-earmark-post"></i> Posts</h2>
                </div>
                {user && <ProfilePosts id={user?.uid}/>} 
            </div>
            <EditProfile/>
            {/* toast */}
            { isSuccess && 
                <div id="dismiss-toast" className="absolute bottom-10 end-10 bg-teal-100 hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs  border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert"  aria-labelledby="hs-toast-dismiss-button-label">
                    <div className="flex p-4">
                        <p id="hs-toast-dismiss-button-label" className="text-sm text-gray-700 dark:text-neutral-400">
                            {authUser?.following.includes(userid as string) ? "Followed Successfully" : "UnFollowed Successfully"}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile
