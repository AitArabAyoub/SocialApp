import { useQuery } from "@tanstack/react-query"
import { getFeedPosts, getPost, getSuggUsers, getUser, getUserPosts,  } from "../../utils/api"
export function GetUser(uid:string){
    return useQuery({
        queryKey : ["user",{uid}],
        queryFn : ()=>getUser(uid),
    })
}
export function GetSuggUsers(uid : string,ids : string[]){
    return useQuery({
        queryKey : ["suggusers",{uid}],
        queryFn : ()=>getSuggUsers(uid,ids)
    })
}
export function GetUserPosts(id:string){
    return useQuery({
        queryKey : ["posts",{id}],
        queryFn : ()=>getUserPosts(id)
    })
}
export function GetPost(id:string){
    return useQuery({
        queryKey : ["post",{id}],
        queryFn : ()=>getPost(id)
    })
}
export function GetFeedPosts(ids:string[]){
    return useQuery({
        queryKey : ["feedposts",{ids}],
        queryFn : ()=>getFeedPosts(ids)
    })
}
