import { createSlice } from '@reduxjs/toolkit'
import { TNewUser } from '../types'
type TState = {
    user : TNewUser | null
    isAuth : boolean
}
const initialState : TState ={
    user : null,
    isAuth : false
}
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login : (state,action)=>{
            state.user = action.payload
            state.isAuth = true
        },
        logout : (state)=>{
            state.user = null
            state.isAuth = false
        },
        addPost : (state,action) =>{
            if(state.user){
                state.user.posts = [...state.user.posts,action.payload]
            }
        },
        deletePost : (state,action) =>{
            if(state.user){
                state.user.posts = state.user.posts.filter(el => el !== action.payload)
            }
        }
    },
})

export const {login,logout,addPost,deletePost} = AuthSlice.actions
export default AuthSlice.reducer