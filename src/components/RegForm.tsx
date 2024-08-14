import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegSchema, RegSchemaProps } from "../lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// auth from firebase config 
import { auth, db } from "../firebase/firebase";
import { TNewUser } from "../types";
import { doc, setDoc } from "firebase/firestore"; 
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/AuthSlice";
export default function RegFrom() {
  const dispatch = useAppDispatch()
  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegSchemaProps>({
      resolver: zodResolver(RegSchema)
  })
  const [createUserWithEmailAndPassword,,loading,error,] = useCreateUserWithEmailAndPassword(auth);
  async function submitForm(data : RegSchemaProps) {
    const res = await createUserWithEmailAndPassword(data.email,data.password)
    if(res){
      const newUser:TNewUser = {
        uid : res.user.uid,
        username : data.username,
        email : data.email,
        name : data.name,
        profileImg : "",
        bio :"",
        createdAt : new Date(),
        followers : [],
        following : [],
        posts : []
      }
      // add new user in db, users collection 
      await setDoc(doc(db, "users", res.user.uid),newUser)
      // update user state
      dispatch(login(newUser))
      // allow user to access home page
      Navigate("/")
    }else{
      console.log(error?.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-2/3 text-black">
      <div className="">
        <label htmlFor="input-name" className="block text-white text-sm font-medium my-2 ">Name</label>
        <input type="text" {...register("name")} id="input-name" className="py-3 px-4 mb-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "/>
        {errors.name && <span className="text-red-600 font-bold">{errors.name.message}</span>}
      </div>
      <div className="">
          <label htmlFor="input-username" className="block text-white text-sm font-medium my-2 ">Username</label>
          <input type="text" {...register("username")} id="input-username" className="py-3 px-4 mb-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "/>
          {errors.username && <span className="text-red-600 font-bold">{errors.username.message}</span>}
      </div>
      <div className="">
          <label htmlFor="input-email" className="block text-white text-sm font-medium my-2 ">Email</label>
          <input type="email" {...register("email")} id="input-email" className="py-3 px-4 mb-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "/>
          {errors.email && <span className="text-red-600 font-bold">{errors.email.message}</span>}
      </div>
      <div className="">
          <label htmlFor="input-password" className="block text-white text-sm font-medium my-2 ">Password</label>
          <input type="password" {...register("password")} id="input-password" className="py-3 px-4 mb-1 block w-full text-black border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "/>
          {errors.password && <span className="text-red-600 font-bold">{errors.password.message}</span>}
      </div>
      <p className="text-center text-white">You Already Have An Account? <Link to="/login" className="underline text-blue-600">Login</Link></p>
      <button disabled={loading} type="submit" className="px-2 py-3 bg-blue-600 text-white rounded-lg mt-3  w-full ">Register</button>
      { error && 
        <div id="dismiss-alert" className="hs-removing:translate-x-5 hs-removing:opacity-0 mt-3 transition duration-300 bg-red-600 border  text-sm text-white rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <div className="ms-2">
              <div className="text-sm font-medium">
                {error?.message}
              </div>
            </div>
            <div className="ps-3 ms-auto">
            </div>
          </div>
        </div> 
        }
    </form>
  )
}