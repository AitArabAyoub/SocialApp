import { House,FilePlus, LogOut,User, Search } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { logout } from "../store/AuthSlice"
function SideBar() {
    const disptach = useAppDispatch()
    const Navigate = useNavigate()
    const {user} = useAppSelector(store => store.auth)
    const links = [{path : "/",name : "Home",icon : <House/>},{path : "/new",name : "Create Post",icon:<FilePlus/>},{path : "/profile",name : "Profile",icon : <User/>}]
    const handleLogout = ()=>{
        disptach(logout())
        Navigate("/login")
    }    
    return (
        <div className="h-screen border-r border-r-black px-3 py-5 bg-[#10101079] flex flex-col">
            <img src="/assets/logo.svg" alt=""  className="h-[40px]"/>
            <div className="flex items-center gap-2 my-5">
                {user ? <img src={user?.profileImg} alt="" className="h-20 w-20 rounded-full border" />  : <div className="h-20 w-20 rounded-full border "></div>}
                <div>
                    <h2 className="font-bold">{user?.name}</h2>
                    <h2 className="text-[12px] text-gray-400">{user?.username}</h2>
                </div>
            </div>
            <ul className="grow">
                {
                    links.map(el =>{
                        return(
                            <li className="" key={el.name}>
                                {
                                    el.path === "/profile"
                                    ?
                                    <NavLink to={`/profile/${user?.uid}`} className={(({ isActive}) => isActive ? "active flex gap-2 p-3" : "flex gap-2 p-3")}>
                                        {el.icon}{el.name}
                                    </NavLink>
                                    :
                                    <NavLink to={`${el.path}`} className={(({ isActive}) => isActive ? "active flex gap-2 p-3" : "flex gap-2 p-3")}>
                                        {el.icon}{el.name}
                                    </NavLink>
                                }
                            </li>
                        )
                    })
                }
                <button className="flex gap-2 p-3" aria-controls="search-modal" data-hs-overlay="#search-modal">
                    <Search/>Search
                </button>
            </ul>
            <button 
                className="border border-white w-fit px-3 py-2 flex gap-2"
                onClick={handleLogout}
                ><LogOut/> Logout</button>
        </div>
    )
}

export default SideBar
