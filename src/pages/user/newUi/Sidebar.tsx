import { useState } from "react";
import {
    Home,
    Search,
    Mail,
    Clapperboard,
    Bell,
    ListCollapse,
  } from "lucide-react";
const NewSideBar=({sideBarIndex,setsideBarIndex}:any)=>{
   
    const handleIndex = (index: number) => {
        setsideBarIndex(index);
      };
    
    return (
        <>
        {/* sidebar ------------------------ */}
        <div className="w-full  sm:h-full sm:w-[140px]  md:w-[150px] lg:w-[170px]   h-1/6 bg-white flex sm:flex-col justify-between rounded-tr-[30px] rounded-br-[30px] border-black shadow-md shadow-[#FADBE1] ">
            {/* sidebar empty fist part  */}
            <div className="hidden sm:block  h-1/6"></div>
            {/* sidebar empty fist part  */}

            {/* sidebar content main part  */}
            <div className="bg-white h-full w-full flex sm:flex-col justify-center ">
              {/* home  */}
              <div
                className="h-full w-full flex justify-center items-center"
                onClick={() => handleIndex(1)}
              >
                <div
                  className={`bg-[#FADBE1] w-10 h-10   ${
                    sideBarIndex === 1 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                >
                  {sideBarIndex === 1 ? (
                    <div className="rounded-full w-5/6 h-5/6 sm:w-[45px] sm:h-[45px] flex justify-center items-center bg-[#C1506D]">
                      <Home className="text-white size-6 sm:size-7" />
                    </div>
                  ) : (
                    <Home className="text-gray-600 size-6 sm:size-7" />
                  )}
                </div>
              </div>
              {/* home  */}
              {/* search */}
              <div
                className="h-full w-full flex justify-center items-center"
                onClick={() => handleIndex(2)}
              >
                <div
                  className={`bg-[#FADBE1] w-10 h-10 ${
                    sideBarIndex === 2 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                >
                  {sideBarIndex === 2 ? (
                    <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                      <Search className="text-white size-6 sm:size-6" />
                    </div>
                  ) : (
                    <Search className="text-gray-600 size-6 sm:size-7" />
                  )}
                </div>
              </div>
              {/* search */}
              {/* post  */}
              <div
                className=" h-full w-full flex justify-center  items-center"
                onClick={() => handleIndex(3)}
              >
                <div
                  className={`bg-[#FADBE1] w-10 h-10 ${
                    sideBarIndex === 3 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                >
                  {sideBarIndex == 3 ? (
                    <>
                      <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                        <Clapperboard className="text-white size-6 sm:size-6 " />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <Clapperboard className="text-gray-600 size-6 sm:size-7 " />{" "}
                    </>
                  )}
                </div>
              </div>
              {/* post  */}
              {/* message */}
              <div
                className=" h-full w-full flex justify-center  items-center"
                onClick={() => handleIndex(4)}
              >
                <div
                  className={`bg-[#FADBE1] w-10 h-10 ${
                    sideBarIndex === 4 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                >
                  {sideBarIndex == 4 ? (
                    <>
                      <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                        <Mail className="text-white size-6 sm:size-6 " />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <Mail className="text-gray-600 size-6 sm:size-7 " />{" "}
                    </>
                  )}
                </div>
              </div>
              {/* message  */}

              {/* notification  */}
              <div
                className="hidden h-full w-full sm:flex justify-center  items-center"
                onClick={() => handleIndex(5)}
              >
                <div
                  className={`bg-[#FADBE1] w-10 h-10 ${
                    sideBarIndex === 5 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                >
                  {sideBarIndex == 5 ? (
                    <>
                      <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                        <Bell className="text-white size-6 sm:size-7 " />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <Bell className="text-gray-600 size-6 sm:size-7 " />{" "}
                    </>
                  )}
                </div>
              </div>
              {/* notifiactoin  */}
              {/* profile  */}
              <div
                className=" h-full w-full flex justify-center  items-center"
                onClick={() => handleIndex(6)}
              >
                <div className="bg-[#FADBE1] w-10 h-10   rounded-full flex justify-center items-center ">
                  <img
                    src="https://i.pinimg.com/564x/66/af/ad/66afadeda60eb0192a850b46bc75f78a.jpg"
                    className="w-full h-full rounded-full border-2 border-[#C1506D] object-cover"
                    alt=""
                  />
                </div>
              </div>
              {/* profile  */}
            </div>
            {/* sidebar content main part  */}

            {/* sidebar content setting part  */}
            <div className="hidden   h-2/6 sm:flex justify-center items-end p-8">
              {/* more  */}
              <div className=" h-full w-full flex justify-center  items-end ">
                <div
                  className={`bg-[#FADBE1] w-10 h-10 ${
                    sideBarIndex === 6 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                  onClick={() => handleIndex(6)}
                >
                  {sideBarIndex == 6 ? (
                    <>
                      <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                        <ListCollapse className="text-white size-6 sm:size-6 " />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <ListCollapse className="text-gray-600 size-6 sm:size-6 " />{" "}
                    </>
                  )}
                </div>
              </div>
              {/* more  */}
            </div>

            {/* sidebar content setting part  */}
          </div>
          {/* sidebar --------------------------*/}
        </>
    )
}

export default NewSideBar