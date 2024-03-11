import { Film, Image, MoreVertical, Radio } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const CreateMediaComponent = ({setAddStory,setIsAddPost,setIsAddLive}:any) => {
  const [currentMedia, setCurrentMedia] = useState<any>("");
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const setMedia=(media:string)=>{
    console.log(media,"mediamediamediamediamedia");
    if(media=="Story"){
      setAddStory(true)
    }else if(media=="Post"){
      setIsAddPost(true)
    }else if( media=='Live'){
     
      setIsAddLive(true)
    }
  }
  return (
    <>
    <div className="bg-white rounded-md w-full h-[290px] sm:h-[290px]  flex justify-between flex-col">
            {/* sepration 1  */}
            <div className="w-full h-[130px]  flex justify-between  ">
              <div className="w-full h-[110px]  flex items-center pl-5 gap-2 ">
                <img
                  src={`http://localhost:3000/profile/${userData?.profile}`}
                  className="sm:w-12 sm:h-12 h-10 w-10 rounded-full  border-2 border-[#C1506D]"
                  alt=""
                />
                <input
                  type="text"
                  className="sm:w-5/6 w-5/6 p-2 outline-none  placeholder:text-gray-500 placeholder:text-sm placeholder:sm:text-lg "
                  readOnly={true}
                  placeholder="Create share and shine..."
                />
              </div>
              <div className="h-full  w-2/12 flex justify-center items-center pb-5">
                <MoreVertical size={20} color="#C1506D" />
              </div>
            </div>
            {/* sepration 1  */}

            {/* sepration 2  */}

            <div className="w-full h-full flex justify-between">
            <div className="flex items-center  w-full gap-5 p-3 sm:pl-8 pl-5">
                <div
                  className={`${
                    currentMedia === "Post"
                      ? "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#C1506D] text-white border-3"
                      : "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#FADBE1] text-gray-500"
                  } flex justify-center items-center`}
                  onClick={()=>setCurrentMedia("Post")}
                >
                  <Image className={`size-5 sm:size-6`} />
                </div>
                <div
                  className={`${
                    currentMedia === "Story"
                      ? "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#C1506D] text-white border-3"
                      : "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#FADBE1] text-gray-500"
                  } flex justify-center items-center`}
                  onClick={()=>setCurrentMedia("Story")}
                >
                  <Film className="  size-5 sm:size-6" />
                </div>
                <div
                  className={`${
                    currentMedia === "Live"
                      ? "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#C1506D] text-white border-3"
                      : "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#FADBE1] text-gray-500"
                  } flex justify-center items-center`}
                  onClick={()=>setCurrentMedia("Live")}
                >
                  <Radio className=" size-5 sm:size-6" />
                </div>
              </div>
              <div className="sm:w-3/12 w-6/12  flex justify-center items-center">
                {currentMedia === "Post" && (
                  <button onClick={()=>setMedia("Post")} className="sm:w-24 rounded-md sm:h-10 h-8 w-16 bg-[#C1506D] text-white font-roboto font-medium sm:font-semibold">
                    Post
                  </button>
                )}
                {currentMedia === "Story" && (
                  <button onClick={()=>setMedia("Story")} className="sm:w-24  rounded-md sm:h-10 h-8 w-16 bg-[#C1506D] text-white font-roboto font-medium sm:font-semibold">
                    Story
                  </button>
                )}
                {currentMedia === "Live" && (
                  <button onClick={()=>setMedia("Live")} className="sm:w-24  rounded-md sm:h-10 h-8 w-16 bg-[#C1506D] text-white font-roboto  font-medium sm:font-semibold">
                    Live
                  </button>
                )}
              </div>
            </div> 
            </div> 
    </>
  )
}

export default CreateMediaComponent