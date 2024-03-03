const Notification=()=>{
    return (
        <>
       <div className="hidden sm:block sm:w-5/12 md:w-5/12 lg:w-3/12 h-full bg-white rounded-md  ml-32 fixed z-20 border m-2 overflow-y-auto scrollbar-hide">
<div className="flex flex-col justify-center gap-2 p-1 ">


    {/* one notification ------------ */}
    <div className="w-full h-20  flex justify-between  border rounded-md" >
  <div className="h-full w-3/12 flex justify-normal items-center p-2 ">
    <img src="https://i.pinimg.com/564x/d7/9f/5b/d79f5bd264164c6eb4f41ca6a0e109aa.jpg" className="w-[50px] h-[50px] fixed rounded-full border border-[#C1506D]" alt="" />
  </div>
  <div className="h-full w-full  flex flex-col">
    <div className="w-full h-1/2  flex pl-2 justify-start items-end">
<p className="font-semibold">__razik__</p>
    </div>
    <div className="w-full h-1/2   items-start flex flex-col pl-3">
        <p className="text-sm">tagged you in a post</p>
        <p className="text-[10px]">2d ago</p>

    </div>


  </div>
  <div className="h-full w-3/12  p-2 flex justify-center items-center">
    <img src="https://i.pinimg.com/564x/8f/cc/f2/8fccf21527cf27d9ac0692f377592e3d.jpg" className="w-full h-5/6 object-cover" alt="" />
  </div>

    </div>
    {/* one notification ------------ */}

     {/* one notification ------------ */}
     <div className="w-full h-20  flex justify-between  border rounded-md" >
  <div className="h-full w-3/12 flex justify-normal items-center p-2 ">
    <img src="https://i.pinimg.com/564x/d7/9f/5b/d79f5bd264164c6eb4f41ca6a0e109aa.jpg" className="w-[50px] h-[50px] fixed rounded-full border border-[#C1506D]" alt="" />
  </div>
  <div className="h-full w-full  flex flex-col">
    <div className="w-full h-1/2  flex pl-2 justify-start items-end">
<p className="font-semibold">__razik__</p>
    </div>
    <div className="w-full h-1/2   items-start flex flex-col pl-3">
        <p className="text-sm">tagged you in a post</p>
        <p className="text-[10px]">2d ago</p>

    </div>


  </div>
  <div className="h-full w-3/12  p-2 flex justify-center items-center">
    <img src="https://i.pinimg.com/564x/8f/cc/f2/8fccf21527cf27d9ac0692f377592e3d.jpg" className="w-full h-5/6 object-cover" alt="" />
  </div>

    </div>
    {/* one notification ------------ */}

    


</div>
       </div>
        </>
    )
}

export default Notification