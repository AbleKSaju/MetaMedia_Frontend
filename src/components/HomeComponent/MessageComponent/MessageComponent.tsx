import { useState } from "react";
import Aside from "./AsideComponent";
import Chat from "./ChatComponent";
import { Route, Routes } from "react-router-dom";

const MessageComponent = ({ setSidebarOpen }: any) => {
  setSidebarOpen(false);

  return (
    <div className=" flex h-full w-full overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Aside />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default MessageComponent;
