import {
  LucideVoicemail,
  Mic,
  MoreVertical,
  Phone,
  Video,
  Voicemail,
} from "lucide-react";

const MessageComponent = ({ setSidebarOpen }: any) => {
  setSidebarOpen(false);
  return (
    <div className=" flex h-screen sm:ml-20 overflow-hidden">
      <div className=" hidden sm:flex sidebar w-96 bg-white min-w-60 flex-col border-r border-gray-300 transition-all">
        <div className="logo flex items-center justify-center py-4 text-3xl font-medium">
          Messages
        </div>
        <div className="flex justify-center border-b border-gray-300 lg:my-6">
          <input
            type="text"
            className=" flex border border-gray-300 mb-4 p-1 rounded-md"
            placeholder="search people"
          />
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

      <div className="flex flex-col w-full">
        <header className="w-full flex items-center p-2 sm:p-3 border-b border-gray-300">
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
            <Phone className="mt-0.5 size-5 lg:size-6" />
            <Video className="ml-2 size-6 lg:size-7" />
            <MoreVertical className="size-6 lg:size-7" />
          </div>
        </header>

        <div className="flex-col overflow-auto p-3 pb-0">
          <div className="w-fit max-w-[80%] md:max-w-[70%] p-2 lg:p-3 rounded-lg bg-amber-100 mb-3">
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="w-fit max-w-[80%] md:max-w-[70%] p-2 lg:p-3 rounded-lg bg-amber-100 mb-3">
            <p>
              Lorem ipsum dolor sit r Lorem ipsum dolor sit r Lorem ipsum dolor
              sit r Lorem ipsum dolor sit r Lorem ipsum dolor sit r
            </p>
          </div>
        </div>

        <div className="flex-col bg-red-800 overflow-auto p-4 py-0 self-end">
          <div className="w-fit max-w-[80%] md:max-w-[70%] p-2 lg:p-3 rounded-lg bg-teal-800 mb-3">
            <p>lorem ipsum dolor sit ammet consectetur</p>
          </div>
          <div className="w-fit max-w-[80%] md:max-w-[70%] p-2 lg:p-3 rounded-lg bg-teal-800 mb-3">
            <p>
              Lorem ipsum dolor sit r Lorem ipsum dolor sit r Lorem ipsum dolor
              sit r Lorem ipsum dolor sit r Lorem ipsum dolor sit r
            </p>
          </div>
        </div>
        <footer className="fixed bottom-0 w-full">
  <div className="relative flex items-center">
    <input
      type="text"
      placeholder="Type message ..."
      className="rounded-lg bg-gray-100 py-3 sm:py-4 mb-16 sm:mb-0 px-4 w-full outline-none border-t border-gray-300"
    />
  </div>
</footer>
    <div className="absolute right-5 bottom-3 flex z-50">
      <Mic className="size-5 lg:size-6"/>
    </div>
      </div>
    </div>
  );
};

export default MessageComponent;
