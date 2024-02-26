import { MoreVertical, Phone, Video } from "lucide-react";

const MessageComponent = ({ setSidebarOpen }: any) => {
  setSidebarOpen(false);
  return (
    <div className=" flex h-screen sm:ml-20 overflow-hidden">
      <div className=" hidden sm:flex sidebar w-60bg-white min-w-60 flex-col border-r border-gray-300 transition-all">
        <div className="logo flex items-center justify-center py-4 text-3xl font-medium">
          Messages
        </div>
        <div className="flex justify-center border-b border-gray-300 lg:my-6">
        <input type="text" className=" flex border border-gray-300 mb-4 p-1 rounded-md"  placeholder="search people"/>
        </div>

        <div className="overflow-auto scrollbar-hide">
          <div className="list flex cursor-pointer hover:bg-gray-100 transition-all p-2 items-center h-[70px]">
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
          
        </div>
       
      </div>
      
      <div className=" flex flex-col w-full">
        <header className="w-full flex items-center p-4 border-b border-gray-300">
          <img
            src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
            alt=""
            className="rounded-full mr-4 w-[50px] h-[50px]"
          />
          <div className="flex flex-col">

          <p className="font-bold">Taylor Swift</p>
          <p className="font-light text-sm">5 min ago</p>
          </div>
          <div className=" text-gray-600 ml-auto flex gap-5">
            <Phone/>
            <Video className="ml-2"/>
            <MoreVertical/>
          </div>
        </header>
        <div className="message-wrap flex-1 overflow-auto p-4">
          Repeat the following divs for each message list
          <div className="message-list bg-white p-4 rounded-lg mb-4">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="message-list bg-blue-300 p-4 rounded-lg mb-4 text-white">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          Repeat the above divs for each message list
        </div>
        <div className="message-footer bg-gray-100 p-4 flex items-center">
          <input
            type="text"
            data-placeholder="Send a message to {0}"
            className="flex-1 rounded-lg py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
