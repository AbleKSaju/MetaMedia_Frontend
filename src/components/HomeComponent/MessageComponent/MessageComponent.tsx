import { useState } from "react";
import Aside from "./AsideComponent";
// import Chat from "./ChatComponent";
import { Route, Routes } from "react-router-dom";
import MessageListComponent from "./MessageListComponent";

const MessageComponent = () => {
  const [conversations, setConversations] = useState<any>();

  return (
    <div className=" flex h-full w-full overflow-hidden bg-white">
      <Aside conversations={conversations} setConversations={setConversations} />
      <MessageListComponent conversations={conversations} setConversations={setConversations}/>
    </div>
  );
};

export default MessageComponent;
