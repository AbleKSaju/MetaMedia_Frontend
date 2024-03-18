import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AsideSelectionComponent=({setAside,setIsGroupChat}:any)=>{

const userData=useSelector((state:any)=>state.persisted.user.userData)
    const naviagte=useNavigate()
    const handelFriends=()=>{
     setAside(0)
     setIsGroupChat(false)
     naviagte(`/message/index`)
    }

    const handlegroup=()=>{
        setAside(1)
        setIsGroupChat(true)
        naviagte(`/group/index`)
    }
    return (
        <>

<div className="w-full border-b border-[#C1506D] h-10 flex justify-around items-center">
    <div onClick={handelFriends}>friends</div>
    <div onClick={handlegroup}>Groups</div>
 </div>
        </>
    )
}
export default AsideSelectionComponent