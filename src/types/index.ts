import { Timestamp } from "firebase/firestore"

export type TNewUser = {
    uid : string
    username : string
    email : string
    name : string
    profileImg : string,
    bio : string
    createdAt : Date
    //  an array of users ids
    followers : string[] 
    //  an array of users ids
    following : string[]
    //  an array of posts ids
    posts  : string[]
}
export type TNewPost = {
    id : string
    caption : string
    postImg? : string
    likes : string[]
    comments : Comment []
    createdAt : Date
    createdBy : string
}
export type  Comment = {
    comment : string
    createdBy : string
    postId : string
    createdAt : Date
}
export type TPost = {
    id : string
    caption : string
    postImg? : string
    likes : string[]
    comments : TComment []
    createdAt : Timestamp
    createdBy : string
}
export type  TComment = {
    comment : string
    createdBy : string
    postId : string
    createdAt : Timestamp
}