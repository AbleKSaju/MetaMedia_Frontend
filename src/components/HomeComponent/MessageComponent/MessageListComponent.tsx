import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
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
import {
  BlockAndUnblockUserFunction,
  CreateConversationFunction,
  sendMessageFunction,
} from "../../../utils/api/methods/ChatService/post/post";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  blockedUsers,
  editUser,
} from "../../../utils/ReduxStore/Slice/userSlice";
import { none } from "@cloudinary/url-gen/qualifiers/fontHinting";
import { addSocketData } from "../../../utils/ReduxStore/Slice/videoCallSlice";
const MessageListComponent = ({ conversations, setConversations }: any) => {
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [newState, setNewState] = useState(false);
  const [messages, setMessages] = useState<any>({});
  const [socket, setSocket] = useState<any>(null);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const messageRef = useRef<any>(null);
  const { user_id } = useParams();
  const dispatch = useDispatch();
const navigate = useNavigate()
  const [videoCall,setVideoCall] = useState(false)

  useEffect(() => {
    setSocket(io("http://localhost:8081"));    
  }, []);
  if(socket){    
  dispatch(addSocketData(socket))
}
  const handleSubmitForm = useCallback(
    () => {
      socket?.emit("room:join", { name: userData.name, room: 123 });
    },
    [socket, userData.name]
  );
  console.log(videoCall,"videoCallvideoCallvideoCall");
  
  useEffect(() => {
    if (videoCall) {
      console.log("I AM videoCall")
        handleSubmitForm();
    }
  }, [videoCall, handleSubmitForm]);

  useEffect(() => {
    socket?.on('room:join', (data:any) =>{      
console.log(data,"Dsss");
    });
  }, [socket,videoCall]);


  const handleJoinRoom = useCallback(
    (data:any) => {
      const { email, room } = data;
      console.log(email, room,"email, room");
      navigate(`/videoCall/${room}`);
    },
    []
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  

  useEffect(() => {
    console.log("I am socket");

    socket?.emit("addUser", userData?.userId);
    socket?.on("getUsers", (users: any) => {
      console.log("activeUsers :>> ", users);
    });
    socket?.on("getMessage", (data: any) => {
      setMessages((prev: any) => ({
        ...prev,
        messages: [...prev.messages, data],
      }));
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchConversations = async () => {
      const response: any = await GetConversationsFunction();
      const userExist = response.data.data.find(
        (data: any) => data.id === user_id
      );

      if (!userExist && user_id !== "index") {
        const data = {
          senderId: user_id,
          receiverId: userData.userId,
        };
        await CreateConversationFunction(data);
        setNewState(true);
      } else {
        if (response.data.data) {
          const userId = { ids: response.data.data };
          const userData: any = await GetUsersDataByIdFunction(userId);
          const users: any = [];
          userData.data.data.map((data: any, index: number) => {
            const userDetails: any = {
              conversationId: data.conversationId,
              name: data.user.fullName,
              email: data.user.email,
              profile: data.user.profile,
              receiverId: data.user.receiverId,
              lastUpdate: response.data.data[index].lastUpdate,
            };
            users.push(userDetails);
          });
          setConversations(users);
        }
      }
    };
    fetchConversations();
  }, [isSendMessage, user_id, newState,videoCall]);

  useEffect(() => {
    (async () => {
      if (user_id) {
        const response = await conversations?.filter(
          (data: any) => data.receiverId === user_id
        );
        if (response) {
          const message: any = await getMessagesFunction(response[0]);
          if (message.data.status) {
            setMessages({
              messages: message.data.data,
              data: response[0],
            });
          }
        }
      }
    })();
  }, [user_id, conversations, isSendMessage,videoCall, newState]);

  const sendMessage = async () => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: userData?.userId,
      receiverId: messages?.data?.receiverId,
      message,
      conversationId: messages?.data?.conversationId,
      lastUpdate: Date.now(),
    });

    const data = {
      conversationId: messages?.data?.conversationId || "new",
      senderId: userData?.userId,
      message,
      receiverId: messages?.data?.receiverId,
      lastUpdate: Date.now(),
    };
    const response = await sendMessageFunction(data);
    console.log(response, "RRRRR");
    if (response) {
      setIsSendMessage(!isSendMessage);
    }
  };

  const BlockAndUnblockUser = async (userId: string) => {
    const data = {
      userId,
    };
    const response: any = await BlockAndUnblockUserFunction(data);
    if (response.data.status) {
      dispatch(editUser(response.data.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  const isBlocked = userData.blockedUsers.some(
    (user: any) => user.userId === messages?.data?.receiverId
  );
  return (
    <>
      <div className="flex flex-col w-full ">
        {messages?.data && (
          <header className=" w-full flex items-center p-2 sm:p-3 border-b border-gray-300 bg-[#EBE9EF] ">
            <ArrowLeft className="mr-3 sm:hidden" />
            <img
              src={
                messages?.data?.profile?.startsWith("https://")
                  ? `${messages?.data?.profile}`
                  : messages?.data?.profile
                  ? `http://localhost:3000/profile/${messages?.data?.profile}`
                  : `${profile}`
              }
              alt=""
              className="rounded-full mr-4 w-[35px] h-[35px]"
            />
            <div className="flex flex-col">
              <p className="font-medium md:font-bold">{messages?.data?.name}</p>
              <p className="font-light text-sm">5 min ago</p>
            </div>
            <div className=" text-gray-600 ml-auto flex gap-2 sm:gap-5">
              {/* <Phone className={`${isBlocked ? "text-gray-400":""} mt-0.5 size-4 lg:size-6`}/> */}
              <Video onClick={()=>setVideoCall(!videoCall)} className={`${isBlocked ? "text-gray-400":""} ml-2 size-5 lg:size-7`} />
              <MoreVertical
                onClick={() => setIsOpen(!isOpen)}
                className="size-4 lg:size-7"
              />
            </div>
            {isOpen && (
              <div className="absolute top-14 right-6 w-40 bg-white z-20 rounded-tr-none rounded-lg shadow-lg border">
                <ul>
                  <li
                    onClick={() => setIsOpen(!isOpen)}
                    className="py-2 px-4 hover:bg-[#C1506D] hover:rounded-lg hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer"
                  >
                    <Link to={`/profile/${messages?.data?.receiverId}`}>
                      {" "}
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      BlockAndUnblockUser(messages?.data?.receiverId);
                      setIsOpen(!isOpen);
                    }}
                    className="py-2 px-4 hover:bg-[#C1506D] hover:rounded-lg hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer"
                  >
                    {isBlocked ? "Unblock" : "Block"}
                  </li>
                  <li
                    onClick={() => setIsOpen(!isOpen)}
                    className="py-2 px-4 hover:bg-[#C1506D] hover:rounded-lg hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer"
                  >
                    Cancel
                  </li>
                </ul>
              </div>
            )}
          </header>
        )}
        <div
          id="messages"
          className="flex flex-col mb-12 space-y-4 p-3 overflow-y-auto scrollbar-hide"
        >
          {messages?.messages?.length > 0 ? (
            messages.messages.map((data: any) => {
              return data.senderId !== userData.userId ? (
                <div className="chat-message" key={data.id}>
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
                      <div>
                        <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
                          {data.message}
                        </span>
                        <div ref={messageRef}></div>
                      </div>
                    </div>
                    <img
                      src={
                        messages?.data?.profile?.startsWith("https://")
                          ? `${messages?.data?.profile}`
                          : messages?.data?.profile
                          ? `http://localhost:3000/profile/${messages?.data?.profile}`
                          : `${profile}`
                      }
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
                        <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-br-none bg-[#C1506D] text-white ">
                          {data.message}
                        </span>
                        <div ref={messageRef}></div>
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
                  <p className="text-red-500 text-center font-bold">
                    {isBlocked && "unblock to start messaging"}
                  </p>
        </div>
        {user_id !== "index" && !isBlocked && (
          <>
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
              {!message?.length ? (
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
          </>
        )}
      </div>
    </>
  );
};

export default MessageListComponent;
