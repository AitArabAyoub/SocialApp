import { collection, deleteDoc, doc,getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Comment, TNewPost, TNewUser, TPost } from "../types";
export const getUser = async(uid : string)=>{
    const docRef = doc(db, "users", uid);
    const docSnap  = await getDoc(docRef)
    if(docSnap.exists()){
        return docSnap.data()
    }
}
export const editUser = async(uid : string,body : TNewUser)=>{
    await setDoc(doc(db, "users", uid), body);
}
export const getSuggUsers = async(uid:string,ids:string[])=>{
    const users : TNewUser [] = []
    const q = query(collection(db, "users"), where("uid", "not-in", [uid,...ids]),limit(4))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        users.push(doc.data() as TNewUser)
    })
    return users
}
export const createPost = async(id:string,imgUrl : string,post:{})=>{
    const newpost = doc(db, 'posts', id)
    setDoc(newpost, {...post,postImg : imgUrl,id})

}
export const getUserPosts = async(id:string)=>{
    const posts : TNewPost[] = []
    const q = query(collection(db,"posts"),where("createdBy","==",id))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        posts.push(doc.data() as TNewPost)
    })
    posts.sort((a:any, b:any) => b.createdAt - a.createdAt)
    return posts
}
export const getPost = async(id:string)=>{
    const docRef = doc(db, "posts", id);
    const docSnap  = await getDoc(docRef)
    if(docSnap.exists()){
        return docSnap.data()
    }
}
export const deletPost = async(id:string)=>{
    await deleteDoc(doc(db, "posts", id))
}
export const addComment = async(id:string,comment : Comment,post:TPost)=>{
    const newCmt = doc(db,"posts",id)
    setDoc(newCmt,{...post,comments : [...post.comments,comment]})
}
export const handlelike = async(uid:string,post:TPost,postid : string)=>{
    const hasId = post.likes.find(el => el === uid)
    const docRef = doc(db,"posts",postid)
    if(!hasId){
        setDoc(docRef,{...post,likes : [...post.likes,uid]})
    }else{
        setDoc(docRef,{...post,likes : post.likes.filter(el => el !== uid)})
    }
}
export const getFeedPosts = async(ids:string[])=>{
    const posts : TPost[] = []
    const q = query(collection(db,"posts"),where("createdBy","in",ids))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        posts.push(doc.data() as TPost)
    })
    posts.sort((a:any, b:any) => b.createdAt - a.createdAt)
    return posts
}