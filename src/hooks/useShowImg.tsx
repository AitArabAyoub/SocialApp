import { useState } from "react"

const useShowImg = () => {
    const [selectedItem,setSelectedItem] = useState("")
    const fr = new FileReader()
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        if(e && e.target.files !== null){
            // read file as url
            fr.readAsDataURL(e.target.files[0])
            // after reading result property has the url
            fr.onloadend = ()=>{
                setSelectedItem(fr.result as string)
            }
        }
    }
    return {selectedItem,handleChange}
}

export default useShowImg
