import React, { useEffect, useRef, useState } from "react";
// import ChatComponent from "./ChatComponent";
import { io } from "socket.io-client";
import useMediaQuery from "../../../utils/costumHook/mediaqueri";
import { useDispatch, useSelector } from "react-redux";
import {
  GetConversationsFunction,
  getMessagesFunction,
} from "../../../utils/api/methods/ChatService/get/get";
import { GetUsersDataByIdFunction } from "../../../utils/api/methods/UserService/post";
import {
  ArrowLeft,
  Image,
  Mic,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import profile from "../../../assets/profile.webp";
import { sendMessageFunction } from "../../../utils/api/methods/ChatService/post/post";
import { getAllUsersFunction } from "../../../utils/api/methods/UserService/get";
import { toast } from "sonner";
import { addCurrentReciever } from "../../../utils/ReduxStore/Slice/messageSlice";
import { Link, useParams } from "react-router-dom";

const AsideComponent = ({conversations}:any) => {

  // const dispach=useDispatch()
console.log("I a AsideComponent");
const {user_id} = useParams()
console.log(user_id,"user_id");

  const DateToTime=(lastMessageDate:string)=>{
    const date = new Date(lastMessageDate);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }

  return (
    <>
      <div className=" flex sidebar w-96 bg-[#EBE9EF] min-w-60 flex-col border-r border-gray-300 transition-all">
        <div className="logo flex items-center justify-center py-4 my-10 text-3xl font-medium">
          Messages
        </div>
        <div className="overflow-auto scrollbar-hide ">
          {conversations?.length
            ? conversations.map((data: any, index: number) => {
              
                return (
                  <div
                    className={`list flex cursor-pointer border-b border-gray-300 transition-all p-2 items-center h-[70px] ${user_id == data.receiverId ? "bg-gray-300":""}`}
                    key={index}
                  >
                  <Link to={`/profile/${data?.receiverId}`}>
                      <img
                      src={
                        data?.profile?.startsWith("https://")
                          ? `${data?.profile}`
                          : data?.profile
                          ? `http://localhost:3000/profile/${data?.profile}`
                          : `${profile}`
                      }
                      alt="P"
                      className="rounded-full mr-2 w-[50px] h-[50px]"
                    />
                    </Link>
                    <Link to={`/message/${data.receiverId}`}
                      className="info flex-1"
                    >
                      <div className="flex flex-col">
                        <span className=" font-bold">{data?.name}</span>
                        <span className="font-light text-sm">
                          {data?.email?.slice(0, 20)}...
                        </span>
                      </div>
                    </Link>
                    <span className=" text-gray-600">{DateToTime(data?.lastUpdate)}</span>
                  </div>
                );
              })
            : ""}
{/* 
          {users?.length
            ? users
                ?.filter((user: any) => user.id !== userData.userId)
                .map((data: any, index: number) => {
                  return (
                    <div
                      className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]"
                      key={index}
                    >
                         <Link to={`/profile/${data?.receiverId}`}>
                      <img
                        src={
                          data?.profile?.startsWith("https://")
                            ? `${data?.profile}`
                            : data?.profile
                            ? `http://localhost:3000/profile/${data?.profile}`
                            : `${profile}`
                        }
                        alt="P"
                        className="rounded-full mr-2 w-[50px] h-[50px]"
                      />
                      </Link>
                      <div
                        className="info flex-1"
                        onClick={() => fetchMessages(data)}
                      >
                        <div className="flex flex-col">
                          <span className=" font-bold">{data?.name}</span>
                          <span className="font-light text-sm">
                            {data?.email.slice(0, 25)}...
                          </span>
                        </div>
                      </div>
                      <span className=" text-gray-600">now</span>
                    </div>
                  );
                })
            : "" } */}
        </div>
      </div>
      {/* {!isMobile && <ChatComponent />} */}
    </>
  );
};

export default AsideComponent;
