import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { addComment, createPost, deletPost, editUser, handlelike } from "../../utils/api"
import { Comment, TNewUser, TPost } from "../../types"
export function EditUser(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey : ["updateuser"],
        mutationFn : ({ uid, body } : {uid : string,body:TNewUser}) => editUser(uid, body),
        onSettled : async(_,error,variables)=>{
            if(error){
                console.log(error)
            }else{
                queryClient.invalidateQueries({queryKey : ["user",{uid:variables.uid}]})
            }
        }
    })
}
export function CreatePost(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey : ["createpost"],
        mutationFn : ({id,imgUrl,post}:{id:string,imgUrl:string,post:{}}) => createPost(id,imgUrl,post),
        onSettled : async(_,error,)=>{
            if(error){
                console.log(error)
            }else{
                queryClient.invalidateQueries({queryKey : ["posts"]})
            }
        }
    })
}
export function DeletePost(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey : ["deletepost"],
        mutationFn : ({id}:{id:string})=>deletPost(id),
        onSettled : async(_,error,)=>{
            if(error){
                console.log(error)
            }else{
                queryClient.invalidateQueries({queryKey : ["posts"]})
            }
        }
    })
}
export function AddComment(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey : ["addcomment"],
        mutationFn : ({id,comment,post}:{id : string,comment : Comment,post : TPost})=> addComment(id,comment,post),
        onSettled : async(_,error,)=>{
            if(error){
                console.log(error)
            }else{
                queryClient.invalidateQueries({queryKey : ["post"]})
                queryClient.invalidateQueries({queryKey : ["feedposts"]})
            }
        }
    })
}
export function HandleLike(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey : ["handlelike"],
        mutationFn : ({uid,post,postid}:{uid:string,post:TPost,postid:string})=>handlelike(uid,post,postid),
        onSettled : async(_,error,)=>{
            if(error){
                console.log(error)
            }else{
                queryClient.invalidateQueries({queryKey : ["post"]})
                queryClient.invalidateQueries({queryKey : ["feedposts"]})
            }
        }
    })
}
