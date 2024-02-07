import {
    Heart,
    MessageCircle,
    Send,
    Bookmark

} from 'lucide-react'


const PostScroll = () => {
  return (
    <>
    <div className="flex    p-4 justify-center">
  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-lg lg:w-[470px] lg:h-[800px] border ">
    <div className="flex p-2 ">
   

        <img className="lg:w-10 lg:h-10 font-roboto  rounded-full lg:ml-6 lg:mt-1  border-amber-100 lg:border-2" src="https://i.pinimg.com/736x/84/16/d7/8416d76f65c4557628631c93eb35cd53.jpg" alt="" />
          <p className="lg:pt-3 lg:pl-4 text-md font-semibold">__razik_</p>
          <p className="lg:pt-4 lg:pl-4 text-sm font-roboto ">. 5m </p>
          <p className="lg:ml-[210px] lg:text-lg font-bold pt-1">...</p>
    </div>
    <div className="relative mx-4 mt-0 overflow-hidden text-gray-700  shadow-lg bg-clip-border rounded-md lg:h-[500px]">
      <img
        className="w-full h-full "
        src="https://i.pinimg.com/564x/34/b3/be/34b3bef24ea232783464d5f82aca2181.jpg"
        alt=""
      />
     
    </div>
    <div className="flex lg:pl-7  lg:p-6 lg:pt-4 lg:gap-5">
        <Heart className='text-[#07312E]'/>
        <MessageCircle className='text-[#07312E]' />
        <Send className='text-[#07312E]'/>
        <div className='pl-64'><Bookmark className='text-[#07312E]'/></div>
    </div>

    <div className='lg:pl-8 text-sm font-semibold font-roboto text-[#07312E]'>
       1990 likes
    </div>

    <div className='lg:pl-8 p-2 text-md font-semibold text-[#07312E]'>
        __razik_ : <span className='text-sm font-normal text-[#07312E] '>hello conections ❤️ </span>
        
        </div>

        <div className='text-[14px] font-roboto font-normal lg:pl-8 p-2'>View all 9 comments</div>
        <div className='text-[14px] font-roboto font-normal lg:pl-8 '>
            <input className='w-3/4     outline-none  hover:border-b py-2 border-[#07312E] ' type="text" name="" id="" placeholder=' Add comment...' />
            
           </div>

  </div>
</div>


    </>
  );
};

export default PostScroll;
