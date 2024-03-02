const NewSignUp=()=>{
    return (
        <>
        <div className="h-screen w-screen  flex fixed">
            <div className="hidden md:block w-5/12 h-full"></div>
            
            <div className="w-full md:w-7/12 h-full  flex justify-center md:justify-start items-center md:pl-7">

<div className="w-full sm:w-8/12 md:w-10/12 lg:w-8/12 h-5/6  flex justify-between flex-col items-center">
    <div className="w-full h-36   flex justify-center md:justify-start  md:items-start items-center">
    <h1 className="text-[#C1506D]  font-semibold font-sans text-2xl  md:text-center md:text-2xl  pl-5     ">Get Started Now</h1>
    </div>
    <div className="w-full h-32   flex  justify-center p-5 flex-col gap-2">
        <label className="pl-1 font-semibold text-[#C1506D]">Name</label>
        <input type="text" placeholder="name" className="outline-none border border-[#C1506D] rounded-md pl-2 h-10" />
    </div>
    <div className="w-full h-32   flex  justify-center p-5 flex-col gap-2">
        <label className="pl-1 font-semibold text-[#C1506D]">Email</label>
        <input type="email" placeholder="email" className="outline-none border border-[#C1506D] rounded-md pl-2 h-10" />
    </div>
    <div className="w-full h-32   flex  justify-center p-5 flex-col gap-2">
        <label className="pl-1 font-semibold text-[#C1506D]">Password</label>
        <input type="password" placeholder="****" className="outline-none border border-[#C1506D] rounded-md pl-2 h-10" />
    </div>
    <div className="w-full h-36   flex justify-center items-center p-5">
    <button className="w-full h-10 border border-[#C1506D] bg-[#C1506D] rounded-md    text-white font-sans   font-bold text-sm  ">Sign Up</button>
   
    </div>
    <div className="w-full h-32   flex justify-evenly items-center">
    <div className="inline-flex items-center justify-center w-full">
    <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded "/>
    <div className="absolute px-4  bg-white text-[#C1506D] ">
       or
    </div>
</div>

    </div>
    <div className="w-full h-32   flex justify-evenly items-center">
  <div className="w-5/12 border h-10 rounded-md border-[#C1506D] flex items-center pl-2 justify-center ">
    <img src="/fonts/google.png" className="w-6 h-6 rounded-full object-fill" alt="" />
    <p className="text-sm pl-2">Sign in with google</p>
  </div>
  <div className="w-5/12 border h-10 rounded-md border-[#C1506D] items-center flex pl-2 justify-center">
    <img src="/fonts/facebook.png" className="w-6 h-6 rounded-full object-fill" alt="" />
    <p className="text-sm pl-2">Sign in with Facebook</p>
  </div>

    </div>

</div>
          
            </div>

        </div>
        
        </>
    )
}
export default NewSignUp