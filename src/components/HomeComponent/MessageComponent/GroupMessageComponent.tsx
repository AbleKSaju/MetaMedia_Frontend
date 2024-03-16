import { ArrowLeft, Image, Mic, MoreVertical, Phone, Video } from "lucide-react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { GetGroupDataByIdFunction, GetGroupMessagesFunction } from "../../../utils/api/methods/ChatService/get/get";
import { useSelector } from "react-redux";
import Item from "antd/es/list/Item";

const GroupMessageComponent=({isGroupChat,aside,setClik ,click}:any)=>{
    const {group_id}=useParams()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages,setMessages]:any=useState([])
    const [groupData,setGroupData]:any=useState(null)
    const [inputText,setInputText]=useState<string>('')


   const userData=useSelector((state:any)=>state.persisted.user.userData)
    
    useEffect(()=>{
    toast.success("HIHIHI")

    if(group_id=='index'){
        toast.success("no selected")
    }else{
    
      (async()=>{

 

        const groupData=await GetGroupDataByIdFunction(group_id)

     if(groupData.status){
        console.log(groupData.data,'THIS ISSS KKKKKK');
        setGroupData(groupData.data)
        const response=await  GetGroupMessagesFunction(group_id)
        if(response.status){
            toast.success("Responce is hre")
            setMessages(response.data)
        }else{
   toast.error(response.message)
        }
     }else{
        toast.error(groupData.message)
     }

        
      })()
      toast.success('selcted')
      
    }

},[isGroupChat,aside,click])


    return (<>


<div className="flex flex-col w-full ">
    {messages.length >0 ? (
        <>
        

        <header className=" w-full flex items-center p-2 sm:p-3 border-b border-gray-300 bg-[#EBE9EF] ">
<ArrowLeft className="mr-3 sm:hidden" />
<img
              src={`http://localhost:3005/Chat/${groupData.profile}`}
              alt="aa"
              className="rounded-full mr-4 w-[35px] h-[35px]"
            />
            <div className="flex flex-col">
            <p className="font-medium md:font-bold">
               {groupData.name}
              </p>
              <p className="font-light text-sm">5 min ago</p>
            </div>

            <div className=" text-gray-600 ml-auto flex gap-2 sm:gap-5">
              <Phone className="mt-0.5 size-4 lg:size-6" />
              <Video className="ml-2 size-5 lg:size-7" />
              <MoreVertical
               onClick={() => setIsOpen(!isOpen)}
                className="size-4 lg:size-7"
              />
            </div>
            {isOpen && (
              <div className="absolute top-14 right-6 w-40 bg-teal-900 rounded-tr-none rounded-lg shadow-lg z-10 border">
                <ul>
                  <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
                    Profile
                  </li>
                  <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
                    Search
                  </li>
                  <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer">
                    {" "}
                    Block
                  </li>
                </ul>
              </div>
            )}  
</header>

<div
          id="messages"
          className="flex flex-col mb-12 space-y-4 p-3 overflow-y-auto scrollbar-hide"
        >

<div className="chat-message" >


{messages.map((item:any)=>{

    return (
        <>
        {console.log(item,'JJJJIYTTWWMWMW')
        }

        {item.sender_id==userData.userId ? (<>
        
            <div className="chat-message">
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
                      <div>
                        <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-br-none bg-[#C1506D] text-white ">
                         {item.content}
                        </span>
                        <div ></div>
                      </div>
                    </div>
                  </div>
                </div>
        
        </>):(<>
        
            <div className="flex items-end">
    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
      <div>
        <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
          {item.content}
        </span>
        <div ></div>
      </div>
    </div>
    <img
      src="https://i.pinimg.com/564x/72/75/37/72753786e3b19d504b185355785a2c00.jpg"
      alt="My profile"
      className="h-6 w-6 sm:w-10 sm:h-10 rounded-full order-1"
    />
  </div>
        
        </>)}
        
        </>
    )
    
})}
                


                 


</div>




        </div>

        <footer className="fixed bottom-0 w-full">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Type message ..."
              value={inputText}
              onChange={(e:any)=>setInputText(e.target.value)}
              className="rounded-lg bg-gray-100 py-3 sm:py-4 px-4 w-full outline-none border-t border-gray-300"
            />
          </div>
        </footer>
        <div className="absolute right-5 bottom-3 flex z-50 ">
         
         {inputText.length > 0 && inputText.trim().length >0 ? (<>

            <p
              className="hover:text-teal-800 font-bold cursor-pointer"
            //   onClick={() => sendMessage()}
            >
              Send
            </p>
            
         </>):(<>
            <Mic  className="size-5 lg:size-6 mr-3" />
            <Image className="size-5 lg:size-6" />
         
         </>)}
            <>
           
            </>
         
        </div>


        
        </>
    ):(
        <>
         <div className="text-center text-lg font-semibold mt-24">
              No Messages or No Group Selected
            </div>
        
        </>
    )}

    

</div>



    </>)
}
export default GroupMessageComponent