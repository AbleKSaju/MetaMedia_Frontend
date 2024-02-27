import { ArrowLeft, Image, Mic, MoreVertical, Phone, Video } from 'lucide-react'
import React, { useState } from 'react'

const ChatComponent = () => {
    const [message,setMessage] = useState<string>("")
    const [isOpen,setIsOpen] = useState<boolean>(false)
  return (
    <div className="flex flex-col w-full">
    <header className="w-full flex items-center p-2 sm:p-3 border-b border-gray-300">
      <ArrowLeft className="mr-3 sm:hidden" />
      <img
        src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
        alt=""
        className="rounded-full mr-4 w-[35px] h-[35px]"
      />
      <div className="flex flex-col">
        <p className="font-medium md:font-bold">Taylor Swift</p>
        <p className="font-light text-sm">5 min ago</p>
      </div>
      <div className=" text-gray-600 ml-auto flex gap-2 sm:gap-5">
        <Phone className="mt-0.5 size-4 lg:size-6" />
        <Video className="ml-2 size-5 lg:size-7" />
        <MoreVertical onClick={()=>setIsOpen(!isOpen)} className="size-4 lg:size-7" />
      </div>
      {isOpen && (
      <div className="absolute top-14 right-6 w-40 bg-teal-900 rounded-tr-none rounded-lg shadow-lg z-10 border">
        <ul>
          <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">Profile</li>
          <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">Search</li>
          <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer"> Block</li>
        </ul>
      </div>
    )}
    </header>
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-hide"
    >
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
                Can be verified on any platform using docker
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
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-br-none bg-blue-600 text-white ">
                Your error message say our error message say
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2  max-w-[80%] lg:max-w-lg mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-br-none bg-blue-600 text-white ">
                Your error message says permission denied, npm global
                installs must be given root privileges.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 max-w-[80%] lg:max-w-lg mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg text-sm md:text-base inline-block rounded-bl-none bg-gray-300 text-gray-600">
                Can be verified on any platform using docker Can be verified
                on any platform using dockerv
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
    </div>
    <footer className="fixed bottom-0 w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
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
      ):( <p className="hover:text-teal-800 font-bold cursor-pointer">Send</p> )}
    </div>
  </div>
  )
}

export default ChatComponent