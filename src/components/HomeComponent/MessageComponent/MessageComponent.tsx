import { useEffect, useState } from "react";
import Aside from "./AsideComponent";
// import Chat from "./ChatComponent";
import { Route, Routes } from "react-router-dom";
import MessageListComponent from "./MessageListComponent";
import CreateNewGroupModal from "./CreateNewGropModal";
import SelectFriendsModal from "./selectFriendsModal";
import GroupChatAside from "./groupChatAside";
import GroupMessageComponent from "./GroupMessageComponent";
import { toast } from "sonner";
import GroupDetails from "./GroupDetails";
const   MessageComponent = ({setIsVideoCall}:any) => {
  const [conversations, setConversations] = useState<any>();
  const [isCreateGrup,setIsCreategroup]=useState(false)
  const [newGroup,setewGroup]=useState(0)
  const [aside,setAside]=useState(0)
  const [isMore,setIsMore]=useState(false)
  const [isGroupChat,setIsGroupChat]=useState<boolean>(false)
  const [click,setClik]=useState<boolean>(false)
  const [isGroupDetails,setISGroupDetais]=useState(false)

  useEffect(() => {
    const path = window.location.pathname;
    toast.success(path);
    if (path.startsWith("/message")) {
      setIsGroupChat(false)
    } else if (path.startsWith("/group")) {
      setIsGroupChat(true)
    } else {
      toast.error("EROOOR IN path")
    }

    return ()=>{
      setIsGroupChat(false)
    }

  }, [newGroup]);
  return (
    <>

    {isGroupDetails && <GroupDetails setISGroupDetais={setISGroupDetais}/>}

    {newGroup == 1 && (<CreateNewGroupModal setewGroup={setewGroup}/>)}
    {newGroup == 2 && (<SelectFriendsModal setewGroup={setewGroup}/>)}

    <div className=" flex h-full w-full overflow-hidden bg-white">
      {aside==0 && <Aside conversations={conversations} setewGroup={setewGroup} setIsMore={setIsMore} isMore={isMore} setAside={setAside} setIsGroupChat={setIsGroupChat}/>}
      {aside==1 && <GroupChatAside setIsMore={setIsMore} isMore={isMore} setewGroup={setewGroup} setIsGroupChat={setIsGroupChat} setAside={setAside} setClik={setClik} click={click}/>}
      {isGroupChat && aside==1 ? (<GroupMessageComponent isGroupChat={isGroupChat} aside={aside} setClik={setClik} click={click} setIsVideoCall={setIsVideoCall} setISGroupDetais={setISGroupDetais}/>):  (<MessageListComponent conversations={conversations} setConversations={setConversations} aside={aside} isGroupChat={isGroupChat}/>)}
      
    </div>
    </>
  );
};

export default MessageComponent;
