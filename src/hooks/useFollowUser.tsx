import { useEffect, useState } from "react"
import { GetUser } from "../lib/react-query/queries"
import { EditUser } from "../lib/react-query/mutations"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { login } from "../store/AuthSlice"
import { TNewUser } from "../types"

const useFollowUser = (followId : string) => {
    const {data:followUser}  = GetUser(followId)
    const {mutateAsync,isSuccess,isPending} = EditUser()
    const {user} = useAppSelector(store => store.auth)
    const dispatch = useAppDispatch()
    const handleFollow = async()=>{
        if(user && followUser){
            const followedUser:TNewUser = {
                uid:followUser.uid,
                name:followUser.name,
                username:followUser.username,
                email:followUser.email,
                bio:followUser.bio,
                createdAt:followUser.createdAt,
                followers:followUser.followers,
                following:followUser.following,
                posts:followUser.posts,
                profileImg:followUser.profileImg
            }
            if(user?.following.includes(followId)){
                await mutateAsync({uid : user.uid,body : {...user,following : user.following.filter(el => el !== followId)}})
                await mutateAsync({uid : followUser.uid,body : {...followedUser,followers : followUser.following.filter((el:string) => el !== user.uid)}})
                dispatch(login({...user,following : user.following.filter(el => el !== followId)}))
            }else{
                await mutateAsync({uid : user.uid,body : {...user,following : [...user.following,followId]}})
                await mutateAsync({uid : followUser.uid,body : {...followedUser,followers : [...followUser.followers,user.uid]}})
                dispatch(login({...user,following : [...user.following,followId]}))
            }
        }
    }
    return {handleFollow,isSuccess,isPending}
}

export default useFollowUser
