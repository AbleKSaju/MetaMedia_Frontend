import React, { useEffect, useState } from "react";
import ChatComponent from "./ChatComponent";
import { io } from 'socket.io-client'
import useMediaQuery from "../../../utils/costumHook/mediaqueri";
import { useSelector } from "react-redux";
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

const AsideComponent = () => {
  const [conversations, setConversations] = useState<any>();
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>({});
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState<any>(null)
  const isMobile = useMediaQuery("(max-width: 425px)");
  const userData = useSelector((state: any) => state.persisted.user.userData);

  useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])

  useEffect(() => {
    socket?.emit('addUser', userData?.userId);
		// socket?.emit('addUser', user?.id);
		// socket?.on('getUsers', users => {
		// 	console.log('activeUsers :>> ', users);
		// })
	// 	socket?.on('getMessage', data => {
	// 		setMessages(prev => ({
	// 			...prev,
	// 			messages: [...prev.messages, { user: data.user, message: data.message }]
	// 		}))
	// 	})
	}, [socket])
  
  useEffect(() => {
    const fetchConversations = async () => {
      const response: any = await GetConversationsFunction();
      if (response.data.data) {
        const userId = { ids: response.data.data };
        const userData: any = await GetUsersDataByIdFunction(userId);
        const users: any = [];
        userData.data.data.map((data: any) => {
          const userDetails: any = {
            conversationId: data.conversationId,
            name: data.user.fullName,
            email: data.user.email,
            profile: data.user.profile,
            receiverId: data.user.receiverId,
          };
          users.push(userDetails);
        });
        setConversations(users);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsersFunction();
      if (response.status) {
        const filteredUsers = response.data.filter(
          (user: any) =>
              !conversations.some((conversation: any) => conversation.email === user.email) &&
              user.email !== userData.email
      );
        setUsers(filteredUsers);
      } else {
        toast.error("Users not found");
      }
    };
    fetchUsers();
  }, [conversations]);

  const fetchMessages = async (data: any) => {
    console.log(data, "DATAAAAAAAA");

    const messages: any = await getMessagesFunction(data);
    if (messages.data.status) {
      setMessages({
        messages: messages.data.data,
        data: data,
      });
    }
  };

  const sendMessage = async () => {
    // setMessage('')
    // socket?.emit('sendMessage', {
    // 	senderId: user?.id,
    // 	receiverId: messages?.receiver?.receiverId,
    // 	message,
    // 	conversationId: messages?.conversationId
    // });
    const data = {
      conversationId: messages?.data?.conversationId || "new",
      senderId: userData?.userId,
      message,
      receiverId: messages?.data?.receiverId,
    };
    setMessage("");
    const response = await sendMessageFunction(data);
    console.log(response, "responseresponseresponse");
  };

  return (
    <>
      <div className=" flex sidebar w-96 bg-white min-w-60 flex-col border-r border-gray-300 transition-all">
        <div className="logo flex items-center justify-center py-4 text-3xl font-medium">
          Messages
        </div>
        <div className="flex justify-center border-b border-gray-300 lg:mt-6">
          <input
            type="text"
            className=" flex border focus:border-2 border-gray-300 mb-4 p-1 outline-none rounded-md"
            placeholder="search people"
          />
        </div>
        <div className="overflow-auto scrollbar-hide ">
          {conversations?.length ? (
            conversations?.map((data: any, index: number) => {
              return (
                <div
                  className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]"
                  key={index}
                >
                  <img
                    src={
                      data?.profile
                        ? `http://localhost:3000/profile/${data?.profile}`
                        : `${profile}`
                    }
                    alt="P"
                    className="rounded-full mr-2 w-[50px] h-[50px]"
                  />
                  <div
                    className="info flex-1"
                    onClick={() => fetchMessages(data)}
                  >
                    <div className="flex flex-col">
                      <span className=" font-bold">{data?.name}</span>
                      <span className="font-light text-sm">{data?.email?.slice(0,20)}...</span>
                    </div>
                  </div>
                  <span className=" text-gray-600">now</span>
                </div>
              );
            })
          ) : (
            <p className="text-center mt-10 font-bold">No Conversations</p>
          )}

          {users?.length ? (
            users
              ?.filter((user: any) => user.id !== userData.userId)
              .map((data: any, index: number) => {
                console.log(data, "USERS");

                return (
                  <div
                    className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]"
                    key={index}
                  >
                    <img
                      src={
                        data?.profile
                          ? `http://localhost:3000/profile/${data?.profile}`
                          : `${profile}`
                      }
                      alt="P"
                      className="rounded-full mr-2 w-[50px] h-[50px]"
                    />
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
          ) : (
            <p className="text-center mt-10 font-bold">No Conversations</p>
          )}
        </div>
      </div>
      {/* {!isMobile && <ChatComponent />} */}
      <div className="flex flex-col w-full">
        {messages?.data?.name && (
          <header className="w-full flex items-center p-2 sm:p-3 border-b border-gray-300">
            <ArrowLeft className="mr-3 sm:hidden" />
            <img
              src={
                messages?.data?.profile
                  ? `http://localhost:3000/profile/${messages?.data?.profile}`
                  : `${profile}`
              }
              alt=""
              className="rounded-full mr-4 w-[35px] h-[35px]"
            />
            <div className="flex flex-col">
              <p className="font-medium md:font-bold">
                {messages?.data?.name}
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
        )}
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-hide"
        >
          {messages?.messages?.length > 0 ? (
            messages.messages.map((data: any) => {
              console.log(data.message, "dataaaaa");

              return data.senderId !== userData.userId ? (
                <div className="chat-message" key={data.id}>
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
                      <div>
                        <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
                          {data.message}
                        </span>
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile"
                      className="h-6 w-6 sm:w-10 sm:h-10 rounded-full order-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="chat-message">
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
                      <div>
                        <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-br-none bg-blue-600 text-white ">
                          {data.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-semibold mt-24">
              No Messages or No Conversation Selected
            </div>
          )}
        </div>
        <footer className="fixed bottom-0 w-full">
          <div className="relative flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message ..."
              className="rounded-lg bg-gray-100 py-3 sm:py-4 px-4 w-full outline-none border-t border-gray-300"
            />
          </div>
        </footer>
        <div className="absolute right-5 bottom-3 flex z-50">
          {!message.length ? (
            <>
              <Mic className="size-5 lg:size-6 mr-3" />
              <Image className="size-5 lg:size-6" />
            </>
          ) : (
            <p
              className="hover:text-teal-800 font-bold cursor-pointer"
              onClick={() => sendMessage()}
            >
              Send
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AsideComponent;
