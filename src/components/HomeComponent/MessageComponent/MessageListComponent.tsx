import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  GetConversationsFunction,
  getMessagesFunction,
} from "../../../utils/api/methods/ChatService/get/get";
import { GetUsersDataByIdFunction } from "../../../utils/api/methods/UserService/post";
import {
  ArrowLeft,
  ChevronDown,
  Image,
  MoreVertical,
  PhoneIcon,
  Video,
} from "lucide-react";
import profile from "../../../assets/profile.webp";

import {
  BlockAndUnblockUserFunction,
  CreateConversationFunction,
  DeleteMessageFunction,
  SendFileForMessageFunction,
  sendMessageFunction,
  SendVoiceFunction,
} from "../../../utils/api/methods/ChatService/post/post";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { editUser } from "../../../utils/ReduxStore/Slice/userSlice";
import { addSocketData } from "../../../utils/ReduxStore/Slice/videoCallSlice";
import VoiceRecorder from "./VoiceRecorder";
const DropDownComponent = ({
  setMessageDeleted,
  messageDeleted,
  setDropdownVisible,
  dropdownVisible,
  index,
  messageId,
}: any) => {
  const wrapperRef: any = useRef(null);
  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropdownVisible(-1);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteMessage = async (messageId: string) => {
    const response: any = await DeleteMessageFunction(messageId);
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setMessageDeleted(!messageDeleted);
    setDropdownVisible(!false);
  };
  return (
    <>
      {dropdownVisible !== -1 && dropdownVisible === index && (
        <div
          ref={wrapperRef}
          className="absolute top-6 right-0 z-20 w-20 sm:w-40 bg-[#FADBE1] rounded-tr-none border-black rounded-lg shadow-lg border"
        >
          <ul>
            <li
              className="py-1.5 sm:py-2 px-4 hover:bg-[#C1506D] border-b border-black rounded-tl-md text-black hover:text-amber-50 cursor-pointer"
              onClick={() => deleteMessage(messageId)}
            >
              Delete
            </li>
            <li
              onClick={() => setDropdownVisible(-1)}
              className="py-1.5 sm:py-2 px-4 hover:bg-[#C1506D] text-black hover:text-amber-50 rounded-b-lg border-b cursor-pointer"
            >
              Cancel
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

const MessageListComponent = ({
  conversations,
  setConversations,
  aside,
  isGroupChat,
}: any) => {
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recordedAudioBlob, setRecordedAudioBlob]: any = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(-1);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [messageDeleted, setMessageDeleted] = useState<boolean>(false);
  const [newState, setNewState] = useState(false);
  const [messages, setMessages] = useState<any>({});
  const [socket, setSocket] = useState<any>(null);
  const [showControls, setShowControls] = useState(false);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const messageRef = useRef<any>(null);
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoCall, setVideoCall] = useState(false);



  useEffect(() => {
    setSocket(io("http://localhost:8081"));
  }, []);

  if (messages) {
    dispatch(addSocketData(socket));
  }

  useEffect(() => {}, [incomingCall]);

  const handleSubmitForm = useCallback(
    (receiverId: any) => {
      socket?.emit("room:join", {
        senderId: userData.userId,
        name: userData.name,
        room: 123,
        receiverId: receiverId,
      });
    },
    [socket, userData.name]
  );

  useEffect(() => {
    if (videoCall) {
      localStorage.setItem("currentReceiver", messages?.data?.name);
      handleSubmitForm(messages?.data?.receiverId);
    }
  }, [videoCall, handleSubmitForm]);

  useEffect(() => {
    socket?.on("room:join", (data: any) => {});
  }, [socket, videoCall]);


  const handleJoinRoom = useCallback((data: any) => {
    const { email, room } = data;
    navigate(`/videoCall/${room}`);
  }, []);

  const handleCallingToRoom = useCallback((data: any) => {
    console.log(data,"datadata");
    const { senderId, receiverId, room, name } = data;
    localStorage.setItem("callingUser", name);
    setIncomingCall({ senderId, receiverId, room, name });
  }, []);

  useEffect(() => {
    socket?.on("callingToRoom", handleCallingToRoom);
    return () => {
      socket?.off("callingToRoom", handleCallingToRoom);
    };
  }, [socket, handleJoinRoom]);

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  useEffect(() => {
    socket?.emit("addUser", userData?.userId);
    socket?.on("getUsers", (users: any) => {
      console.log("activeUsers :>> ", users);
    });
    socket?.on("getMessage", (data: any) => {
      setMessages((prev: any) => ({
        ...prev,
        messages: [...prev.messages, data],
      }));
      console.log("changing New State");
      setNewState(!newState)
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchConversations = async () => {
     
      const response: any = await GetConversationsFunction();
     
      
      let userExist;
      if (response.data.status) {
        userExist = response?.data?.data?.find(
          (data: any) => data?.id === user_id
        );
      }

      if ((!userExist && user_id !== "index") || !response.data.status) {

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
  }, [isSendMessage, user_id, newState, videoCall, aside, isGroupChat,messages]);

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
  }, [
    user_id,
    conversations,
    isSendMessage,
    videoCall,
    newState,
    aside,
    isGroupChat,
    messageDeleted,
    socket,
  ]);

  const sendMessage = async () => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: userData?.userId,
      socketType: null,
      receiverId: messages?.data?.receiverId,
      message,
      conversationId: messages?.data?.conversationId,
      lastUpdate: Date.now(),
    });

    const data = {
      conversationId: messages?.data?.conversationId || "new",
      senderId: userData?.userId,
      type: "message",
      message,
      receiverId: messages?.data?.receiverId,
      lastUpdate: Date.now(),
    };

    const response = await sendMessageFunction(data);
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

  const handleImageClick = () => {
    const fileInput = document.getElementById("image");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleVidoClick = () => {
    const fileInput = document.getElementById("video");
    if (fileInput) {
      fileInput.click();
    }
  };

  const sendFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(async (file: File) => {
        console.log(file.type, "file.type");

        let messageType: string;
        if (file.type.startsWith("image/")) {
          messageType = "image";
        } else if (file.type.startsWith("video/")) {
          messageType = "video";
        } else {
          messageType = "file";
        }
        // const imageUrl = URL.createObjectURL(file);
        setMessage("");
        console.log(messageType, "messageType");

        const data: any = {
          conversationId: messages?.data?.conversationId || "new",
          senderId: userData?.userId,
          content: file,
          type: messageType,
          receiverId: messages?.data?.receiverId,
          lastUpdate: Date.now(),
        };
        console.log(data, "DDDDD");

        const formData = new FormData();
        formData.append("file", data.content);
        formData.append("senderId", data.senderId);
        formData.append("conversationId", data.conversationId);
        formData.append("receiverId", data.receiverId);
        formData.append("type", data.type);
        try {
          const response = await SendFileForMessageFunction(formData);
          if (response.status) {
            socket?.emit("sendMessage", {
              senderId: userData?.userId,
              receiverId: messages?.data?.receiverId,
              message: response.data,
              socketType: messageType,
              conversationId: messages?.data?.conversationId,
              lastUpdate: Date.now(),
            });
            setIsSendMessage(!isSendMessage);
            toast.success("File(s) uploaded successfully!");
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("Error uploading file(s)");
        }
      });
    } else {
      toast.error("Select any file");
    }
  };

  const DateToTime = (lastMessageDate: any) => {
    const date = new Date(lastMessageDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    return `${twelveHourFormat}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const addAudioElement = async (blob: any) => {
    console.log(blob, "BLOOOOO");

    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    //save the file in here

    // voice_note
    const audioFile = new File([blob], "audio.mp3", { type: "audio/mpeg" });
    console.log(audioFile, "FILLLLE");

    const data: any = {
      conversationId: messages?.data?.conversationId || "new",
      senderId: userData?.userId,
      content: audioFile,
      type: "voice_note",
      receiverId: messages?.data?.receiverId,
      lastUpdate: Date.now(),
    };

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("conversationId", data.conversationId);
    formData.append("senderId", data.senderId);
    formData.append("type", data.type);
    formData.append("receiverId", data.receiverId);
    formData.append("lastUpdate", data.lastUpdate);

    const response = await SendVoiceFunction(formData);
    console.log(response, "RRRRR");
    if (response.status) {
      socket?.emit("sendMessage", {
        senderId: userData?.userId,
        receiverId: messages?.data?.receiverId,
        message: response.data,
        socketType: "voice_note",
        conversationId: messages?.data?.conversationId,
        lastUpdate: Date.now(),
      });
    }
  };

  const AudioCallFunction=()=>{
    navigate('/audioCall')
  }

  return (
    <>
      <div
        className={`${user_id == "index" ? "hidden" : ""} flex flex-col w-full`}
      >
        {messages?.data && (
          <header className="w-full flex items-center p-2 sm:p-3 border-b border-gray-300 bg-[#EBE9EF] ">
            <Link to="/message/index">
              <ArrowLeft className="mr-3 sm:hidden" />
            </Link>
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
              {/* {incomingAudioCall ? (
                <p
                  className="rounded-xl px-2 text-black bg-green-700"
                  onClick={() => setAudioCall(!audioCall)}
                >
                  Join 
                </p>
              ) : ( */}
              <PhoneIcon
                onClick={AudioCallFunction}
                className={`${
                  isBlocked ? "text-gray-400" : ""
                } ml-2 size-4 lg:size-6 mt-0.5`}
              />
              {/* )} */}

              {incomingCall ? (
                <p
                  className="rounded-xl px-2 text-black bg-green-700"
                  onClick={() => setVideoCall(!videoCall)}
                >
                  Join
                </p>
              ) : (
                <Video
                  onClick={() => setVideoCall(!videoCall)}
                  className={`${
                    isBlocked ? "text-gray-400" : ""
                  } ml-2 size-5 lg:size-7`}
                />
              )}
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
          className="flex flex-col pb-16 space-y-4 p-3 overflow-y-auto scrollbar-hide"
        >
          {messages?.messages?.length > 0 ? (
            messages.messages.map((data: any, index: number) => {
              return data.senderId !== userData.userId ? (
                <div className="chat-message" key={data.id}>
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
                      <div>
                        {data?.type == "image" ? (
                          <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <img
                              src={`http://localhost:3005/chat/${data.message}`}
                              alt=""
                              className="relative rounded-lg object-cover w-full h-full"
                            />
                            <p className="absolute bottom-0 right-1 text-white text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.socketType == "image" ? (
                          <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <img
                              src={`http://localhost:3005/chat/${data.message}`}
                              alt=""
                              className="relative rounded-lg object-cover w-full h-full"
                            />
                            <p className="absolute bottom-0 right-1 text-white text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.type == "video" ? (
                          <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <video
                              controls
                              className="relative rounded-lg object-cover w-full h-full"
                            >
                              <source
                                src={`http://localhost:3005/Chat/${data.message}`}
                              />
                              <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                                {DateToTime(data?.time)}
                              </p>
                            </video>
                          </span>
                        ) : data?.socketType == "video" ? (
                          <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <video
                              controls
                              className="relative rounded-lg object-cover w-full h-full"
                            >
                              <source
                                src={`http://localhost:3005/chat/${data.message}`}
                              />
                              <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                                {DateToTime(data?.time)}
                              </p>
                            </video>
                            <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.type == "voice_note" ? (
                          <span className="px-4 py-2 relative rounded-lg flex  text-sm md:text-base justify-center items-center  rounded-br-none  text-white gap-2">
                            <AudioPlayer
                              src={`http://localhost:3005/Chat/${data.message}`}
                              customAdditionalControls={[]}
                              className="w-[200px] h-[80px] md:w-[300px]"
                            />
                              <p className="absolute z-40 bottom-0 right-5 text-black text-[11px]">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.socketType == "voice_note" ? (
                          <span className="px-4 py-2 rounded-lg flex  text-sm md:text-base justify-center items-center  rounded-br-none  text-white gap-2">
                            <AudioPlayer
                              src={`http://localhost:3005/Chat/${data.message}`}
                              customAdditionalControls={[]}
                              className="w-[200px] h-[80px] md:w-[300px]"
                            />
                              <p className="absolute -bottom-1 right-1 text-black text-[11px]">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : (
                          <span
                            className="px-4 py-3 relative h-auto rounded-lg text-sm md:text-base inline-block rounded-br-none bg-[#FADBE1] text-black"
                            key={index}
                          >
                            {data.message}
                            <p className="absolute -bottom-1 right-1 text-gray-700 text-[11px]">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        )}
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
                <div className="chat-message " key={data.id}>
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
                      <div>
                        {data?.type == "image" ? (
                          <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <img
                              src={`http://localhost:3005/chat/${data.message}`}
                              alt=""
                              className="relative rounded-lg object-cover w-full h-full"
                            />
                            <ChevronDown
                              className="absolute top-0 right-0 size-5"
                              onClick={() => setDropdownVisible(index)}
                            />
                            {dropdownVisible && (
                              <DropDownComponent
                                setMessageDeleted={setMessageDeleted}
                                messageDeleted={messageDeleted}
                                setDropdownVisible={setDropdownVisible}
                                dropdownVisible={dropdownVisible}
                                index={index}
                                messageId={data.messageId}
                              />
                            )}
                            <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.socketType == "image" ? (
                          <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <img
                              src={`http://localhost:3005/chat/${data.message}`}
                              alt=""
                              className="relative rounded-lg object-cover w-full h-full"
                            />
                            <ChevronDown
                              className="absolute top-0 right-0 size-5"
                              onClick={() => setDropdownVisible(index)}
                            />
                            {dropdownVisible && (
                              <DropDownComponent
                                setMessageDeleted={setMessageDeleted}
                                messageDeleted={messageDeleted}
                                setDropdownVisible={setDropdownVisible}
                                dropdownVisible={dropdownVisible}
                                index={index}
                                messageId={data.messageId}
                              />
                            )}

                            <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.type == "video" ? (
                          <span
                            className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <video
                              controls={showControls}
                              className="relative rounded-lg object-cover w-full h-full"
                            >
                              <source
                                src={`http://localhost:3005/Chat/${data.message}`}
                              />
                              <ChevronDown
                                className="absolute top-0 right-0 size-5"
                                onClick={() => setDropdownVisible(index)}
                              />
                              {dropdownVisible && (
                                <DropDownComponent
                                  setMessageDeleted={setMessageDeleted}
                                  messageDeleted={messageDeleted}
                                  setDropdownVisible={setDropdownVisible}
                                  dropdownVisible={dropdownVisible}
                                  index={index}
                                  messageId={data.messageId}
                                />
                              )}
                            </video>
                            <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.socketType == "video" ? (
                          <span
                            className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            {" "}
                            <video
                              controls
                              className="relative rounded-lg object-cover w-full h-full"
                            >
                              <ChevronDown
                                className="absolute top-0 right-0 size-5"
                                onClick={() => setDropdownVisible(index)}
                              />
                              {dropdownVisible && (
                                <DropDownComponent
                                  setMessageDeleted={setMessageDeleted}
                                  messageDeleted={messageDeleted}
                                  setDropdownVisible={setDropdownVisible}
                                  dropdownVisible={dropdownVisible}
                                  index={index}
                                  messageId={data.messageId}
                                />
                              )}
                              <source
                                src={`http://localhost:3005/chat/${data.message}`}
                              />
                            </video>
                            <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.type == "voice_note" ? (
                          <span className="px-4 py-2 relative rounded-lg flex  text-sm md:text-base justify-center items-center  rounded-br-none  text-white gap-2">
                            <AudioPlayer
                              src={`http://localhost:3005/Chat/${data.message}`}
                              customAdditionalControls={[]}
                              className="w-[200px] h-[80px] md:w-[300px]"
                            />
                                  <ChevronDown
                              className="absolute text-black top-1 right-3 size-5"
                              onClick={() => setDropdownVisible(index)}
                            />
                            {dropdownVisible && (
                              <DropDownComponent
                                setMessageDeleted={setMessageDeleted}
                                messageDeleted={messageDeleted}
                                setDropdownVisible={setDropdownVisible}
                                dropdownVisible={dropdownVisible}
                                index={index}
                                messageId={data.messageId}
                              />
                            )}
                                 <p className="absolute bottom-0 right-5 text-black text-[11px]">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        ) : data?.socketType == "voice_note" ? (
                          <span className="px-4 py-2 rounded-lg flex  text-sm md:text-base justify-center items-center  rounded-br-none  text-white gap-2">
                            <AudioPlayer
                              src={`http://localhost:3005/Chat/${data.message}`}
                              customAdditionalControls={[]}
                              className="w-[200px] h-[80px] md:w-[300px]"
                            />
                          </span>
                        ) : (
                          <span className="px-4 py-3 relative h-auto rounded-lg text-sm md:text-base inline-block rounded-br-none bg-[#C1506D] text-white ">
                            {data.message}
                            <ChevronDown
                              className="absolute top-0 right-0 size-5"
                              onClick={() => setDropdownVisible(index)}
                            />
                            {dropdownVisible && (
                              <DropDownComponent
                                setMessageDeleted={setMessageDeleted}
                                messageDeleted={messageDeleted}
                                setDropdownVisible={setDropdownVisible}
                                dropdownVisible={dropdownVisible}
                                index={index}
                                messageId={data.messageId}
                              />
                            )}
                              <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                              {DateToTime(data?.time)}
                            </p>
                          </span>
                        )}

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
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
              </div>
            </footer>
            <div className="absolute right-0 sm:right-5 bottom-3 flex z-50">
              {!message?.length ? (
                <>
                  <input
                    type="file"
                    name="file"
                    id="image"
                    accept="image/*"
                    onChange={sendFiles}
                    hidden
                  />
                  <input
                    type="file"
                    name="file"
                    id="video"
                    accept="video/*"
                    onChange={sendFiles}
                    hidden
                  />

                  <VoiceRecorder
                    onRecordingComplete={addAudioElement}
                    setRecordedAudioBlob={setRecordedAudioBlob}
                    //  sendFiles={sendFiles}
                  />
                  <Image
                    className="size-5 lg:size-6 mr-3 md:mt-2 mt-4 ml-2  "
                    onClick={handleImageClick}
                  />
                  <Video
                    className="size-5 lg:size-6 mr-3 md:mt-2 mt-4"
                    onClick={handleVidoClick}
                  />
                  {/* <Image className="size-5 lg:size-6" /> */}
                </>
              ) : (
                <button
                  className="hover:text-teal-800 font-bold cursor-pointer"
                  onClick={() => sendMessage()}
                >
                  Send
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {user_id == "index" && (
        <div className="hidden sm:flex w-full justify-center text-center text-lg font-semibold mt-24">
          No Messages or No Conversation Selected
        </div>
      )}
    </>
  );
};

export default MessageListComponent;
