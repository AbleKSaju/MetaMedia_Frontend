
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const PostScroll = () => {
  return (
    <>

      <div className=" md:p-5  sm:p-3 p-7 w-screen sm:w-full flex justify-center  sm:pl-0   lg:p-4   ">
        <div className=" flex  flex-col justify-center  bg-white shadow-md bg-clip-border rounded-lg lg:w-[464px] lg:h-[800px] border w-[300px] md:w-[450px] sm:w-[330px]">

          <div className="flex p-2 sm:p-4 pl-5 md:p-3 sm:pl-5 ">
            <img
              className="lg:w-10 lg:h-10 font-roboto  rounded-full lg:ml-6 lg:mt-1 md:ml-3  md:border-2 border-amber-100 border-2  lg:border-2 w-10 h-10 md:w-12 md:h-12 "
              src="https://i.pinimg.com/736x/84/16/d7/8416d76f65c4557628631c93eb35cd53.jpg"
              alt=""
            />
            <p className="lg:pt-3 lg:pl-4 text-sm md:text-md font-semibold text-[#07312E] md:pt-4 md:pl-3 p-2 pt-3  pl-5 ">
              __razik_
            </p>
            <p className="lg:pt-4 lg:pl-4 sm:text-sm text-[12px]  font-roboto text-[#07312E]  md:pt-5  md:pl-0 p-2 pt-4 pl-0  sm:pl-5 sm:pt-4  ">
              {" "}
              5m{" "}
            </p>
            <p className="lg:ml-[210px] lg:text-lg font-bold  text-[#07312E] md:pt-2 pl-10 lg:pl-0 pt-3 md:pl-52 sm:pl-24 ">
              ...
            </p>
          </div>
          <div className="relative mx-4 mt-0 overflow-hidden text-gray-700  shadow-lg bg-clip-border  rounded-md lg:h-[500px]">
            <img
              className="w-full h-full "
              src="https://i.pinimg.com/564x/34/b3/be/34b3bef24ea232783464d5f82aca2181.jpg"
              alt=""
            />
          </div>
          <div className="flex md:pl-7 lg:pl-7 sm:pl-5   sm:pt-4 sm:p-2 lg:p-6 lg:pt-4 lg:gap-5 sm:gap-2 md:gap-4 pl-4 gap-1 pt-3">
            <div>
              {" "}
              <Heart className="text-[#07312E]" />
            </div>

            <div>
              {" "}
              <MessageCircle className="text-[#07312E] " />
            </div>
            <div>
              {" "}
              <Send  className="text-[#07312E]" />
            </div>
            <div className="lg:pl-64 sm:pl-[55%] md:pl-[62%] pl-28 " >
              <Bookmark className="text-[#07312E]" />
            </div>
          </div>

          <div className="lg:pl-8 pt-2 pl-5 text-[10px] sm:text-sm md:pl-8 md:pt-2 font-semibold font-roboto text-[#07312E] sm:pl-8 sm:p-1">
            1990 likes 
          </div>

          <div className="lg:pl-8 p-2 text-[13px] pl-5 sm:text-md font-semibold text-[#07312E] md:pl-8 sm:pl-8">
            __razik_ :{" "}
            <span className="sm:text-sm pl-1 text-[10px] font-normal text-[#07312E] md:pl-1 sm:pl-1 ">
              hello conections ❤️{" "}
            </span>
          </div>

          <div className="sm:text-[14px] text-[10px] font-roboto font-normal pl-5  lg:pl-8 p-2 md:pl-8 sm:pl-8">
            View all 9 comments
          </div>
          <div className="sm:text-[14px] text-[10px] mb-2 pl-4 p-2 font-roboto font-normal lg:pl-8 md:pl-8 sm:pl-8 " >
            <input
              className="w-3/4     outline-none  hover:border-b py-2 border-[#07312E] "
              type="text"
              name=""
              id=""
              placeholder=" Add comment..."
            />
            <div className="sm:pt-2 md:pt-2 lg:p-0" > </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostScroll;
