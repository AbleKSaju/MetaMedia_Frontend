import { useState } from "react";
import Aside from "./AsideComponent";
import Chat from "./ChatComponent";
import { Route, Routes } from "react-router-dom";

const MessageComponent = ({ setSidebarOpen }: any) => {
  setSidebarOpen(false);

  return (
    <div className=" flex h-[99vh] sm:ml-20 overflow-hidden">
      <Routes>
        <Route path="/" element={<Aside />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default MessageComponent;
