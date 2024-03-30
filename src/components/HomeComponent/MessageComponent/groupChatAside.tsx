import { MoreVertical, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { GetAllGroupsOfuser } from "../../../utils/api/methods/ChatService/get/get"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import AsideSelectionComponent from "./AsideSelectionComponent"


const GroupChatAside=({setIsMore,isMore,setewGroup,setIsGroupChat,setAside,setClik,click}:any)=>{


    const userData=useSelector((state:any)=>state.persisted.user.userData)
    const [GroupData,setGroupData]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
(async()=>{
    const response=await GetAllGroupsOfuser(userData.userId)
    if(response.status){
    
        setGroupData(response.data)
    }else{
        console.log(response.message);
        toast.error(response.message)
        
    }

})()

    },[setewGroup])
    const handleMoreOption=()=>{
        setIsMore(!isMore)
      }
    
      const handleNewgroup=()=>{
        setIsMore(false)
        setewGroup(1)
      }


      const handleGroupChat=(item:any)=>{
        setClik(!click)
        setIsGroupChat(true)
        navigate(`/group/${item._id}`)

      }


    return (
        <>
        <div className=" flex sidebar w-96 bg-[#EBE9EF] min-w-60 flex-col border-r border-gray-300 transition-all">
        <div className="logo flex items-center justify-center py- my-7  font-medium flex-col ">
         <div className="w-full h-[70px]  flex justify-between items-center "> 
          <div className="w-11/12  h-full flex justify-center items-center text-3xl ml-4">Messages</div>
          <div className=" h-full w-1/12 justify-center items-center flex mt-2"><MoreVertical size={20} onClick={handleMoreOption}/></div>
         </div>
         {isMore && (<>
          <div className="fixed bg-white w-32 h-10 ml-[9.5%] border border-[#C1506D]  mt-28 rounded-md flex flex-col justify-between">
          <div className="w-full h-full justify-center items-center flex border-[#C1506D] border-b gap-2" onClick={handleNewgroup}><Users size={15 }/> <p className="text-sm">New Group</p></div>
         </div>
         </>)}
 
{/* aside selection  */}
<AsideSelectionComponent setAside={setAside} setIsGroupChat={setIsGroupChat}/>

        </div>
        <div className="overflow-auto scrollbar-hide ">

{GroupData.length >0 ?(<>

 {GroupData.map((item:any)=>{
    return (
        <>
        
 {/* one div  */}
 <div className={`list flex cursor-pointer border-b border-gray-300 transition-all p-2 items-center   `} onClick={()=>handleGroupChat(item)}>
        <img src={`http://localhost:3005/Chat/${item.profile}`} alt="P"  className="rounded-full mr-2 w-[50px] h-[50px]"/>
        <div className="info flex-1 ">
            <div className="flex flex-col">
                        <span className=" font-bold">{item.name}</span>
                        <span className="font-light text-sm">

                        </span>
                      </div>
                    </div>

                    <span className=" text-gray-600">{}</span>
        </div>
            {/* one div  */}

        </>
    )
 })}


</>):(<>
<div className="w-full  h-10 flex justify-center items-center">
     No Groups
</div>
</>)}
           
            

        </div>
        </div>



        </>
    )
}

export default GroupChatAside