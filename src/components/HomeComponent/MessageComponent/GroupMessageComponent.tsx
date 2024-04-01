import {
  ArrowLeft,
  Image,

  MoreVertical,
  Phone,
  Video,
  Files,
  
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import {
  GetGroupDataByIdFunction,
  GetGroupMessagesFunction,
} from "../../../utils/api/methods/ChatService/get/get";
import { useSelector } from "react-redux";

import { io } from "socket.io-client";
import {
  SendFileMessageFunction,
  SendGroupMessageFunction,
  SendVoiceNoteFunction,
} from "../../../utils/api/methods/ChatService/post/post";
import {
  getUserByIdFuntion,
} from "../../../utils/api/methods/UserService/post";
import VoiceRecorder from "./VoiceRecorder";

import profile from '../../../assets/profile.webp'
import { set } from "react-hook-form";



const GroupMessageComponent = ({ isGroupChat, aside, setClik, click,setIsVideoCall,setISGroupDetais }: any) => {
  const { group_id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages]: any = useState([]);
  const [groupData, setGroupData]: any = useState(null);
  const [inputText, setInputText] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>({});
  const [recordedAudioBlob, setRecordedAudioBlob]: any = useState(null);
  const [joinVideoCall,setJoinVidioCall]=useState(false)
  const [videoCallJoinRoomId,setVideoCallJoinRoomId]=useState('')
  const [joinAudioCall,setJoinAudiocall]=useState(false)
  const [audioCallRoomId,setAudioCallRoomId]=useState('')
  const navigate=useNavigate()







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
  const handleFileClick = () => {
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.click();
    }
  };

  const sendFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(async (file: File) => {
        let messageType: string;
        if (file.type.startsWith("image/")) {
        
          messageType = "image";
         
        } else if (file.type.startsWith("video/")) {
          messageType = "video";
          
        } else {
          messageType = "file";
         
        }

        const data: any = {
          group_id,
          sender_id: userData.userId,
          content: file,
          type: messageType,
          metadata: {},
        };

        const formData = new FormData();
        formData.append("file", data.content);
        formData.append("group_id", data.group_id);
        formData.append("sender_id", data.sender_id);
        formData.append("type", data.type);
        formData.append("metadata", JSON.stringify(data.metadata));

        try {
          const response = await SendFileMessageFunction(formData);
          if (response.status) {
           
            socket.emit("GroupfileMessage",response.data)
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          console.error("Error sending file:", error);
          toast.error("Error uploading file(s)");
        }
      });
    } else {
      toast.error("Select any file");
    }
  };

  const addAudioElement = async (blob: any) => {
   
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    //save the file in here

    // voice_note
    const audioFile = new File([blob], "audio.mp3", { type: "audio/mpeg" });
   

    const data: any = {
      group_id,
      sender_id: userData.userId,
      content: audioFile,
      type: "voice_note",
      metadata: {},
    };

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("group_id", data.group_id);
    formData.append("sender_id", data.sender_id);
    formData.append("type", data.type);
    formData.append("metadata", JSON.stringify(data.metadata));

    const response = await SendVoiceNoteFunction(formData);

    if (response.status) {
      socket.emit("GroupfileMessage",response.data)
    } else {
      toast.error(response.message);
    }
  };

  const userData = useSelector((state: any) => state.persisted.user.userData);

  useEffect(() => {
    setSocket(io("http://localhost:8081"));
  }, []);
  useEffect(()=>{
    if(socket && group_id !='index'){
  const emitData={
    group_id:group_id,
    userId:userData.userId
  }
      socket.emit("joinGroup",emitData)
      
    }else{
      
    }
 },[socket,group_id])
  useEffect(() => {
    if (group_id == "index") {
    } else {
      (async () => {
        const groupData = await GetGroupDataByIdFunction(group_id);

        if (groupData.status) {
         
          setGroupData(groupData.data);
          const response = await GetGroupMessagesFunction(group_id);
          if (response.status) {
            setMessages(response.data);
            setInputText("");
          } else {
            toast.error(response.message);
          }
        } else {
          toast.error(groupData.message);
        }
      })();
    }
  }, [isGroupChat, aside,click]);

  useEffect(() => {
    if (!groupData || !groupData.members) return;

   
    const fetchMemberData = async (memberId: any) => {
      try {
        const response = await getUserByIdFuntion(memberId);
     

        if (response?.status) {
          return { [memberId]: response.data };
        }
        return null;
      } catch (error) {
        console.error("Error fetching member data:", error);
        return null;
      }
    };

    Promise.all(groupData.members.map(fetchMemberData))
      .then((results) => {
        const updatedUserDetails = results.reduce((acc, result) => {
          if (result) {
            return { ...acc, ...result };
          }
          return acc;
        }, {});

        setUserDetails((prevUserDetails: any) => ({
          ...prevUserDetails,
          ...updatedUserDetails,
        }));
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
        toast.error("ERROR TO FIND THE USER");
      });
  }, [groupData]);

  useEffect(() => {
    console.log(userDetails, "UUUUUUUSERR");
  }, [userDetails]);


  useEffect(()=>{
   if(socket){
    

    socket.on("responseGroupMessage",(data:any)=>{
      setMessages((prevMessages:any) => {
        const setNewMessage=[...prevMessages, data]
        return setNewMessage
      });
      setInputText('')
      
    })
    socket.on("GroupfileResponceMessage",(data:any)=>{
      setMessages((prevMessages:any) => {
        const setNewMessage=[...prevMessages, data]
        return setNewMessage
      });
    })

    socket.on("GroupVideoCallResponse",(data:any)=>{
      setVideoCallJoinRoomId(data.roomId)
      setJoinVidioCall(true)
    })

    socket.on('GroupAudioCallResponse',(data:any)=>{
      setAudioCallRoomId(data.roomId)
      setJoinAudiocall(true)
    })
    
    
   }
  },[socket])
  useEffect(() => {
    if (groupData && groupData._id) {
      try {
        socket.on(`GroupChat`, (message: any) => {
         
          setMessages((prevMessages: any) => [...prevMessages, message]);
        });

      } catch (error) {
        toast.error("ERROR IN CATCH");
      }
    } else {
    }
  }, [groupData,socket]);

  const sendMessage = async () => {
    try {
      const data = {
        group_id,
        sender_id: userData.userId,
        content: inputText,
        type: "text",
        metadata: {},
        lastUpdate: Date.now(),
      };

      socket.emit("GroupMessage",data)

      // const response = await SendGroupMessageFunction(data);
      // if (response.status) {
       
      // } else {
      //   toast.error(response.message);
      // }
    } catch (error) {}
  };

  function randomID(len:number) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const handleGroupVideoCall=()=>{

    const  roomId=randomID(10)
    const emitData={
      group_id,
      roomId:roomId
    }

    socket.emit('GroupVideoCallRequest',emitData)
   
    navigate(`/GroupVideoCall/${roomId}`)
  }


  const handleJoinVidoCallRoom=()=>{
 
    navigate(`/GroupVideoCall/${videoCallJoinRoomId}`)
   
  }

  const handlegroupAudioCall=()=>{
    const  roomId=randomID(10)

    const emitData={
      group_id,
      roomId:roomId
    }
    socket.emit('GroupAudioCallRequest',emitData)
   
    navigate(`/GroupAudioCall/${roomId}`)
  }
  const handleJoinAudioCallRoom=()=>{
    
    navigate(`/GroupAudioCall/${audioCallRoomId}`)
  }
  const DateToTime = (lastMessageDate: any) => {
    const date = new Date(lastMessageDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    return `${twelveHourFormat}:${minutes < 10 ? "0" : ""}${minutes}`;
  };
  
  return (
    <>

   
      <div className="flex flex-col w-full ">
        {messages.length > 0 ? (
          <>
            <header className=" w-full flex items-center p-2 sm:p-3 border-b border-gray-300 bg-[#EBE9EF] ">
              <ArrowLeft className="mr-3 sm:hidden" />
              <img
                src={`http://localhost:3005/Chat/${groupData.profile}`}
                alt="aa"
                className="rounded-full mr-4 w-[35px] h-[35px]"
                onClick={()=>setISGroupDetais(true)}
              />
              <div className="flex flex-col">
                <p className="font-medium md:font-bold">{groupData.name}</p>
                <p className="font-light text-sm">5 min ago</p>
              </div>

              <div className=" text-gray-600 ml-auto flex gap-2 sm:gap-5">
                {/* <Link to='/AudioCall' > */}
{joinAudioCall  ? (
                  <button className="w-16 h-7 rounded-md bg-green-400 text-sm " onClick={handleJoinAudioCallRoom}>Join</button>

):(
  <Phone className="mt-0.5 size-4 lg:size-6" onClick={handlegroupAudioCall} />

)}
                {/* </Link > */}
                {/* <Link to='/jitsy' > */}

                {joinVideoCall ? (
                  <>
                  <button className="w-16 h-7 rounded-md bg-green-400 text-sm " onClick={handleJoinVidoCallRoom}>Join</button>
                  </>
                ):(
                  <Video className="ml-2 size-5 lg:size-7" onClick={handleGroupVideoCall}/>
                )}
                 
                  {/* </Link>  */}
                <MoreVertical
                  onClick={() => setIsOpen(!isOpen)}
                  className="size-4 lg:size-7"
                />
              </div>
              {isOpen && (
                <div className="absolute top-14 right-6 w-40 bg-teal-900 rounded-tr-none rounded-lg shadow-lg z-10 border">
                  <ul>
                    <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
                      About
                    </li>
                    <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
                      Search
                    </li>
                    <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer">
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
              <div className="chat-message">
                {messages.map((item: any) => {
                 
                  return (
                    <>
                      {item.sender_id == userData.userId ? (
                        <>
                          <div className="chat-message pt-3">
                            <div className="flex items-end justify-end">
                              <div className="flex flex-col space-y-2 gap-2 max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
                                <div className="">
                                  {item.type == "text" && (
                                    <>
                                      <span
                            className="px-4 py-3 relative h-auto rounded-lg text-sm md:text-base inline-block rounded-br-none bg-[#FADBE1] text-black"
                          
                          >
                            {item.content}
                            <p className="absolute -bottom-1 right-1 text-gray-700 text-[11px]">
                              {DateToTime(item?.timestamp)}
                            </p>
                          </span>
                                    </>
                                  )}
                                  {item.type == "voice_note" && (
//                                     <>
//                                     <audio controls>

//   <source  src={`http://localhost:3005/Chat/${item.content}`} type="audio/mpeg" />
 
// </audio>
//                        </>
                                    <span className="px-4 py-2 relative rounded-lg flex  text-sm md:text-base justify-center bg-[#FADBE1] items-center  rounded-br-none  text-white gap-2">
                                    <AudioPlayer
                                      src={`http://localhost:3005/Chat/${item.content}`}
                                      customAdditionalControls={[]}
                                      className="w-[200px] h-[80px] md:w-[300px]"
                                    />
                                      <p className="absolute z-40 bottom-0 right-5 text-black text-[11px]">
                                      {DateToTime(item?.timestamp)}
                                    </p>
                                  </span>
                                  )}


                                  {item.type == "image" && (
                                    <>
                                      <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <img
                              src={`http://localhost:3005/chat/${item.content}`}
                              alt=""
                              className="relative rounded-lg object-cover w-full h-full"
                            />
                            <p className="absolute bottom-0 right-1 text-white text-xs">
                              {DateToTime(item?.timestamp)}
                            </p>
                          </span>
                                    </>
                                  )}
                                  {item.type == "video" && (
                                    <>
                                      <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <video
                              controls
                              className="relative rounded-lg object-cover w-full h-full"
                            >
                              <source
                                src={`http://localhost:3005/Chat/${item.content}`}
                              />
                              <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                                {DateToTime(item?.timestamp)}
                              </p>
                            </video>
                          </span>
                                    </>
                                  )}
                                  {item.type == "file" && <>filee</>}


                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-end pt-3">
                            <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
                              <div>
                                <></>
                                {item.type == "text" && (
                                  <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                    {item.content}
                                  </span>
                                )}
                                {item.type == "voice_note" && (
                                  <>
                                    <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                    <AudioPlayer

src={`http://localhost:3005/Chat/${item.content}`}
customAdditionalControls={[]} 
style={{width:"300px", height:"80px"}}
onPlay={e => console.log("onPlay")}

/>

                                    </span>
                                  </>
                                )}

                                {item.type == "image" && (
                                  <>
                                    <img
                                        className="w-60 h-60 object-cover rounded-md border  "
                                      src={`http://localhost:3005/Chat/${item.content}`}
                                      alt=""
                                    />
                                  </>
                                )}
                                {item.type == "video" && (
                                  <>
                                    <span className="rounded-lg relative text-sm md:text-base w-48 h-48 md:w-80 md:h-80  border border-[#C1506D] text-white flex items-center justify-center">
                            <video
                              controls
                              className="relative rounded-lg object-cover w-full h-full"
                            >
                              <source
                                src={`http://localhost:3005/Chat/${item.content}`}
                              />
                              <p className="absolute bottom-0 right-1 text-gray-200 text-xs">
                                {DateToTime(item?.timestamp)}
                              </p>
                            </video>
                            </span>
                                  </>
                                )}
                                {item.type == "file" && <>filee</>}
                                <div></div>
                              </div>
                            </div>
                            <></>
                            <img
                             src={
                              userDetails[item.sender_id]?.profile?.profileUrl.startsWith("https://")
                                ? `${userDetails[item.sender_id]?.profile.profileUrl}`
                                : userDetails[item.sender_id]?.profile.profileUrl
                                ? `http://localhost:3000/profile/${userDetails[item.sender_id]?.profile.profileUrl}`
                                : `${profile}`
                            }
                              alt="Profile"
                              className="h-6 w-6 sm:w-7 sm:h-7 border border-[#C1506D] rounded-full order-1"
                            />
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            </div>

            <footer className="fixed bottom-0 w-full">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Type message ..."
                  value={inputText}
                  onChange={(e: any) => setInputText(e.target.value)}
                  className="rounded-lg bg-gray-100 py-3 sm:py-4 px-4 w-full outline-none border-t border-gray-300"
                />
              </div>
            </footer>
            <div className="absolute right-6 bottom-3 flex z-40   w-2/12 justify-end items-end">
              {inputText.length > 0 && inputText.trim().length > 0 ? (
                <>
                  <p
                    className="hover:text-teal-800 font-bold cursor-pointer"
                    onClick={() => sendMessage()}
                  >
                    Send
                  </p>
                </>
              ) : (
                <>
                  <div className="w-full flex  items-center gap-3 justify-end">
                    <div className="mr-4">
                      <VoiceRecorder
                        onRecordingComplete={addAudioElement}
                        setRecordedAudioBlob={setRecordedAudioBlob}
                      />
                    </div>

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
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept=".pdf,.zip,.docx"
                      onChange={sendFiles}
                      hidden
                    />

                    <Image
                      className="size-5 lg:size-6"
                      onClick={handleImageClick}
                    />
                    <Video
                      className="size-5 lg:size-6"
                      onClick={handleVidoClick}
                    />
                    <Files
                      className="size-5 lg:size-6"
                      onClick={handleFileClick}
                    />
                   
                  </div>
                </>
              )}
              <></>
            </div>
          </>
        ) : (
          <>
            <div className="text-center text-lg font-semibold mt-24">
              No Messages or No Group Selected
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default GroupMessageComponent;
