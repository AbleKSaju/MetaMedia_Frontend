import React from 'react'

const PostInHomeShimmer = () => {
    const items:any=["a","b","c","d"]
  return (
    <>
    {items.map((val:any,ind:number)=>(
    <div className=" md:p-5 sm:p-3 p-7 w-screen sm:w-full flex justify-center sm:pl-0 lg:p-4 " key={ind}>
    <div className=" flex flex-col justify-center bg-white shadow-md bg-clip-border rounded-lg lg:w-[520px] lg:h-[800px] border w-[300px] md:w-[450px] sm:w-[330px]">
      {/* Profile Info Placeholder */}
      <div className="animate-pulse flex p-2 sm:p-4 pl-5 md:p-3 sm:pl-5 ">
        <div className="w-10 h-10 bg-gray-300 rounded-full lg:ml-6 lg:mt-1 md:ml-3 md:border-2 border-amber-100 border-2 lg:border-2"></div>
        <div className="flex flex-col">
          <div className="w-20 h-4  bg-gray-300 rounded-md mt-4 ml-3"></div>
          {/* <div className="w-16 h-3 bg-gray-300 rounded-md"></div> */}
        </div>
      </div>
      {/* Media Placeholder */}
      <div className="relative mx-4 h-60 md:h-80 mt-0 overflow-hidden bg-blue-800 text-gray-700 shadow-lg bg-clip-border rounded-md lg:h-[500px] animate-pulse">
        <div className="w-full h-full bg-gray-300"></div>
      </div>
      {/* Action Buttons Placeholder */}
      <div className="flex md:pl-7 lg:pl-7 sm:pl-5 sm:pt-4 sm:p-2 lg:p-6 lg:pt-4 lg:gap-5 sm:gap-2 md:gap-4 pl-4 gap-1 pt-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer flex justify-end"></div>
      </div>
      {/* Likes Placeholder */}
      <div className="lg:pl-8 pt-2 pl-5 text-[10px]  sm:text-sm md:pl-8 md:pt-2 font-semibold font-roboto text-black sm:pl-8 sm:p-1">
        <p className="w-32 h-6 bg-gray-300"></p>
      </div>
      {/* Description Placeholder */}
      <div className="lg:pl-8 p-2 text-[13px] pl-5  sm:text-md font-semibold text-black md:pl-8 sm:pl-8">
        <p className="w-40 h-6 bg-gray-300"></p>
      </div>
      {/* Comments Placeholder */}
      <div className="sm:text-[14px] text-[10px]  font-roboto font-normal pl-5 lg:pl-8 p-2 md:pl-8 sm:pl-8">
        <p className="w-40 h-6 bg-gray-300"></p>
      </div>
      {/* Timestamp Placeholder */}
      <div className="ml-9 text-[12px]  text-gray-500">
        <p className="w-20 h-6 bg-gray-300"></p>
      </div>
      {/* Add Comment Placeholder */}
      <div className="sm:text-[14px] text-[10px] mb-2 pl-4 p-2 font-roboto font-normal lg:pl-8 md:pl-8 sm:pl-8 ">
        <input
          className="w-3/4 outline-none hover:border-b py-2 border-black bg-gray-300"
          type="text"
          name=""
          id=""
          placeholder=" Add comment..."
          disabled
        />
        <div className="sm:pt-2 md:pt-2 lg:p-0"></div>
      </div>
    </div>
  </div>
    ))}
    </>
  )
}

export default PostInHomeShimmer