import React from "react"
import SideBar from "../components/SideBar"

function Home({children} : {children:React.ReactNode}) {
  return(
    <div className="bg-black text-white">
      <div className="grid grid-cols-5 ">
        <div className="cols-span-1"><SideBar/></div>
        <div className="col-span-4">{children}</div>
      </div>
    </div>
  ) 
}

export default Home
