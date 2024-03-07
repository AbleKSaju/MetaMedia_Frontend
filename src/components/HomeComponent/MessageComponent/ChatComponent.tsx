// import { ArrowLeft, Image, Mic, MoreVertical, Phone, Video } from 'lucide-react'
// import React, { useState } from 'react'

// const ChatComponent = ({messages}:any) => {
//     const [message,setMessage] = useState<string>("")
//     const [isOpen,setIsOpen] = useState<boolean>(false)
//     console.log(messages,"messagesmessagesmessagesmessagesmessages");
    
//   return (
//     <div
//     id="messages"
//     className="flex flex-col mb-12 space-y-4 p-3 overflow-y-auto scrollbar-hide"
//   >
//     {messages?.messages?.length > 0 ? (
//       messages.messages.map((data: any) => {

//         return data.senderId !== userData.userId ? (
//           <div className="chat-message" key={data.id}>
//             <div className="flex items-end">
//               <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
//                 <div>
//                   <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
//                     {data.message}
//                   </span>
//                   <div ref={messageRef}></div>
//                 </div>
//               </div>
//               <img
//                 src={
//                   messages?.data?.profile?.startsWith("https://")
//                     ? `${messages?.data?.profile}`
//                     : messages?.data?.profile
//                     ? `http://localhost:3000/profile/${messages?.data?.profile}`
//                     : `${profile}`
//                 }
//                 alt="My profile"
//                 className="h-6 w-6 sm:w-10 sm:h-10 rounded-full order-1"
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="chat-message">
//             <div className="flex items-end justify-end">
//               <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
//                 <div>
//                   <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-br-none bg-[#C1506D] text-white ">
//                     {data.message}
//                   </span>
//                   <div ref={messageRef}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })
//     ) : (
//       <div className="text-center text-lg font-semibold mt-24">
//         No Messages or No Conversation Selected
//       </div>
//     )}
//   </div>
//   <footer className="fixed bottom-0 w-full">
//     <div className="relative flex items-center">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message ..."
//         className="rounded-lg bg-gray-100 py-3 sm:py-4 px-4 w-full outline-none border-t border-gray-300"
//       />
//     </div>
//   </footer>
//   <div className="absolute right-5 bottom-3 flex z-50">
//     {!message.length ? (
//       <>
//         <Mic className="size-5 lg:size-6 mr-3" />
//         <Image className="size-5 lg:size-6" />
//       </>
//     ) : (
//       <p
//         className="hover:text-teal-800 font-bold cursor-pointer"
//         onClick={() => sendMessage()}
//       >
//         Send
//       </p>
//     )}
//   </div>
//   )
// }

// export default ChatComponent