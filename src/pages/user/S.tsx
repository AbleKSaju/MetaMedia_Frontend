const S=()=>{
    return (
        <>
<div className="w-screen h-screen bg-white justify-center ">
 
<h1 className="text-[#01161E] ml-28 pt-28 font-semibold font-sans text-1xl  md:text-center md:ml-0 md:text-4xl    lg:text-cernter lg:ml-72   ">Get Started Now</h1>
 <div className="flex flex-col ml-20 mt-14 md:justify-center md:ml-72 ">
   <label className="text-md  font-medium  font-sans text-[#01161E] pl-1 md:text-3xl" >Name</label>
   <input className="w-52 border border-gray-400 rounded-md pl-3 placeholder:text-[12px] placeholder:font-light md:h-10 md:w-1/2" type="email" name="email" placeholder="Enter your name" />
 </div>

 <div className="flex flex-col ml-20 mt-5  md:ml-72 ">
   <label className="text-md  font-medium font-sans text-[#01161E] pl-1 md:text-2xl" >Email</label>
   <input className="w-52 border border-gray-400 rounded-md pl-3 placeholder:text-[12px] placeholder:font-light md:h-10  md:w-1/2 " type="text" name="email" placeholder="Enter your name" />
 </div>

 <div className="flex flex-col ml-20 mt-5  md:ml-72">
   <label className="text-md font-medium  font-sans text-[#01161E] pl-1" >Password</label>
   <input className="w-52 border border-gray-400 rounded-md pl-3 placeholder:text-[12px] placeholder:font-light md:h-10  md:w-1/2" type="password" name="email" placeholder="Enter your Password" />
 </div>
 <div className="flex flex-col ml-20 mt-12  md:ml-72">
    <button className="w-52 h-7 border border-gray-400 bg-[#01161E] rounded-md pl-2   text-white font-sans md:h-10  font-bold text-sm md:w-1/2 ">Sign Up</button>
 </div>

<div className="justify-center ml-[120px]  md:ml-64">

 <div className="flex items-center mt-9 w-1/2">
  <div className="flex-1 h-0.5  bg-gray-200 "></div>
  <div className="mx-4 text-gray-500">or</div>
  <div className="flex-1 h-0.5 bg-gray-200"></div>

 </div>
</div>

<div className="flex  ml-[75px] mt-10  md:ml-72">
    <button className="w-24 h-7 border border-gray-400 rounded-md    text-[#01161E] font-sans flex pt-2 text-[7px] "><img className="w-4 h-4 ml-1 pb-1" src="/fonts/google.png" alt="G" /> sign in with google</button>
    <div className="ml-5"></div>
    <button className="w-24 h-7 border border-gray-400  rounded-md    text-[#01161E] font-sans  flex pt-2 text-[6.5px]  "> <img className="w-4 h-4 ml-1 pb-2" src="/fonts/facebook.png" alt="G" />sign in with Facebook</button>

 </div>
  
</div>
        </>
    )
}

export default S