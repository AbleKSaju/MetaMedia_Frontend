import React, { useEffect, useState } from "react";
import ChatComponent from "./ChatComponent";
import useMediaQuery from "../../../utils/costumHook/mediaqueri";
import io from "socket.io-client";
import { axiosPrivet } from "../../../utils/api/baseUrl/axios.baseUrl";

  
//   interface Message {
//     message: string;
//     from: string;
//   }

const AsideComponent = () => {
  const isMobile = useMediaQuery("(max-width: 425px)");
//   const [users, setUsers] = useState([]);
//   const [time, setTime] = useState<string>("fetching");
//   const [msg, setMsg] = useState<string>("waiting");
//   const [personal, setPersonal] = useState<string>("wait bijj");
//   const [roomName, setRoomName] = useState<string>("");
//   const [messageArray, setMessageArray] = useState<Message[]>([]);
//   const [focusMessage, setFocusMessage] = useState(null);


//   const socket = io("http://localhost:8005");

//   useEffect(() => {
//     axiosPrivet
//       .get(http://localhost:8000/api/user/subscribers/${trainer._id})
//       .then(({ data }) => {
//         console.log(data, "datttaaaa from getsubscription");
//         joinRoom(trainer._id);
//         setUsers(data);
//       });
//   }, []);

//   useEffect(() => {
//     socket.emit("joinRoom", trainer._id);
//     socket.on("connect", () => console.log(socket.id));
//     socket.on("connect_error", () => {
//       setTimeout(() => socket.connect(), 5000);
//     });
//     joinRoom(trainer._id);
//     socket.on("time", (data: string) => setTime(data));
//     socket.on("message", (data: Message) => {
//       setMsg(data.message);
//       setMessageArray((prevMessages) => [
//         ...prevMessages,
//         { message: data.message, from: "user" },
//       ]);
//       console.log(messageArray, "messages");
//     });
//     socket.on("2", (data: Message) => setPersonal(data.message));
//     socket.on("disconnect", () => setTime("server disconnected"));

//     return () => {
//       socket.disconnect(); // Clean up socket connection on component unmount
//     };
//   }, []);

//   const joinRoom = (room: string) => {
//     socket.emit("joinRoom", room);
//   };

//   const sentMsg = (roomName: string, msg: string) => {
//     setMessageArray((prevMessages) => [
//       ...prevMessages,
//       { message: msg, from: "trainer" },
//     ]);
//     console.log(messageArray, "messsagesss sent");
//     socket.emit("sentMsg", { roomName: roomName, message: msg });
//   };

//   const sendPersonal = (id: string) => {
//     setRoomName(id);
//     socket.emit("personal", id);
//   };

//   const selectFocusMessage = (user:any) => {
//     setFocusMessage(user);
//   };

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
          <div className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]">
            <img
              src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
              alt=""
              className="rounded-full mr-2 w-[50px] h-[50px]"
            />
            <div className="info flex-1">
              <div className="flex flex-col">
                <span className=" font-bold">Taylor Swift</span>
                <span className="font-light text-sm">Good night.</span>
              </div>
            </div>
            <span className="time text-gray-600">now</span>
          </div>
          <div className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]">
            <img
              src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
              alt=""
              className="rounded-full mr-2 w-[50px] h-[50px]"
            />
            <div className="info flex-1">
              <div className="flex flex-col">
                <span className=" font-bold">Taylor Swift</span>
                <span className="font-light text-sm">Good night.</span>
              </div>
            </div>
            <span className="time text-gray-600">now</span>
          </div>
          <div className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]">
            <img
              src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
              alt=""
              className="rounded-full mr-2 w-[50px] h-[50px]"
            />
            <div className="info flex-1">
              <div className="flex flex-col">
                <span className=" font-bold">Taylor Swift</span>
                <span className="font-light text-sm">Good night.</span>
              </div>
            </div>
            <span className="time text-gray-600">now</span>
          </div>
          <div className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]">
            <img
              src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
              alt=""
              className="rounded-full mr-2 w-[50px] h-[50px]"
            />
            <div className="info flex-1">
              <div className="flex flex-col">
                <span className="font-bold">Taylor Swift</span>
                <span className="font-light text-sm">Good night.</span>
              </div>
            </div>
            <span className="time text-gray-600">now</span>
          </div>
        </div>
      </div>
      {!isMobile && <ChatComponent />}
    </>
  );
};

export default AsideComponent;
