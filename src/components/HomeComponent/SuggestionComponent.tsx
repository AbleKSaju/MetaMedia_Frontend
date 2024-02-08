import SuggestOneFriend from "./SuggestOneFriendComponent"

const Suggestion=()=>{
    return (
        <>
        <div className="mt-3 ">

       <div className=" flex flex-col " > 
        <p className="text-[#042F2C]text-sm font-roboto font-semibold">Suggested for you 🖇️  </p>
      <div className="flex flex-col mt-6">
      <SuggestOneFriend/>
      <SuggestOneFriend/>
      <SuggestOneFriend/>
      <SuggestOneFriend/>
      <SuggestOneFriend/>
   

  

      </div>
       </div>





<div className="justify-items-center flex gap-3 lg:mt-6">
    
    <p className="lg:text-[14px] pt-1 text-gray-300">About</p>
   <p className="lg:text-[14px] pt-1 text-gray-300">|</p>
    <p className="lg:text-[14px] pt-1 text-gray-300 ">help</p>
    <p className="lg:text-[14px] pt-1 text-gray-300">|</p>
    <p className="lg:text-[14px] pt-1 text-gray-300">Privecy</p>
    <p className="lg:text-[14px] pt-1 text-gray-300">|</p>
    <p className="lg:text-[14px] pt-1 text-gray-300">Terms</p>



    

     </div>
     <div className="text-sm font-mono font-normal lg:mt-4 text-gray-300">@ 2024  Meta media </div>

        </div>

        </>
    )
}


export default Suggestion