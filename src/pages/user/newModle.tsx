import {
  Home,
  Search,
  Mail,
  Clapperboard,
  Bell,
  ListCollapse,
  MoreVertical,
  Radio,
  Image,
  Film,
  MoreVerticalIcon,
  MoreHorizontal,
  Bookmark,
  Send,
  MessageCircle,
  Heart
} from "lucide-react";
import { useState } from "react";
import { SuggestOneFriend } from "../../components/HomeComponent";
import { color } from "framer-motion";

const NewModel = () => {
  const [sideBarIndex, setsideBarIndex] = useState(1);
  const [createIndex, setCreateIndex] = useState(1);

  const handleIndex = (index: number) => {
    setsideBarIndex(index);
  };

  const handleCreateIndex = (index: number) => {
    setCreateIndex(index);
  };

  return (
    <>
      <div className="fixed w-screen h-screen bg-[#ece9f0] flex justify-center items-center">
        <div className="w-full h-full flex flex-col-reverse sm:flex-row justify-between overflow-y-auto ">
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
                  className={`bg-[#FADBE1] w-10 h-10 sm:${
                    sideBarIndex === 5 ? "w-14 h-14" : "w-12 h-12"
                  } rounded-full flex justify-center items-center`}
                >
                  {sideBarIndex == 5 ? (
                    <>
                      <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                        <Bell className="text-white size-6 sm:size-6 " />{" "}
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
                <div className="bg-[#FADBE1] w-10 h-10 sm:w-12 sm:h-12  rounded-full flex justify-center items-center ">
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

          {/* main div ------------------------- */}
          <div className="w-full h-screen flex justify-center p-3 ">
            <div className="w-full sm:w-11/12 h-full flex flex-col overflow-y-auto gap-4 scrollbar-hide">
              {/* story main div ------------------- */}
              <div className="w-[95vw] sm:[98vw] md:w-[74vw] lg:w-[60vw] h-[190px] sm:h-[250px] border items-center rounded-lg ">
                <div className=" flex overflow-x-auto p-4 h-full scrollbar-hide gap-6 items-center">
                  <div className="flex-none flex items-center mr-4 ">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                          <img
                            className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                            src="https://i.pinimg.com/564x/2b/e6/78/2be678c7417a633a1c03f9e8d7ed8655.jpg"
                            alt="Profile Picture"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* story main div ------------------- */}

              {/* create option -------------------- */}
              <div className="bg-white rounded-md w-full h-[290px] sm:h-[390px]  flex justify-between flex-col">
                {/* sepration 1  */}
                <div className="w-full h-[130px]  flex justify-between  ">
                  <div className="w-full h-[110px]  flex items-center pl-5 gap-2 ">
                    <img
                      src="https://i.pinimg.com/564x/4f/13/a0/4f13a073215546acc81a2f8a236f4cba.jpg"
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
                        createIndex === 1
                          ? "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#C1506D] text-white border-3"
                          : "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#FADBE1] text-gray-500"
                      } flex justify-center items-center`}
                      onClick={() => handleCreateIndex(1)}
                    >
                      <Image className={`size-5 sm:size-6`} />
                    </div>
                    <div
                      className={`${
                        createIndex === 2
                          ? "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#C1506D] text-white border-3"
                          : "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#FADBE1] text-gray-500"
                      } flex justify-center items-center`}
                      onClick={() => handleCreateIndex(2)}
                    >
                      <Film className="  size-5 sm:size-6" />
                    </div>
                    <div
                      className={`${
                        createIndex === 3
                          ? "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#C1506D] text-white border-3"
                          : "sm:w-11 sm:h-11 w-8 h-8 rounded-full bg-[#FADBE1] text-gray-500"
                      } flex justify-center items-center`}
                      onClick={() => handleCreateIndex(3)}
                    >
                      <Radio className=" size-5 sm:size-6" />
                    </div>
                  </div>
                  <div className="sm:w-3/12 w-6/12  flex justify-center items-center">
                    {createIndex == 1 && (
                      <button className="sm:w-24 rounded-md sm:h-10 h-8 w-16 bg-[#C1506D] text-white font-roboto font-medium sm:font-semibold">
                        Post
                      </button>
                    )}
                    {createIndex == 2 && (
                      <button className="sm:w-24  rounded-md sm:h-10 h-8 w-16 bg-[#C1506D] text-white font-roboto font-medium sm:font-semibold">
                        Story
                      </button>
                    )}
                    {createIndex == 3 && (
                      <button className="sm:w-24  rounded-md sm:h-10 h-8 w-16 bg-[#C1506D] text-white font-roboto  font-medium sm:font-semibold">
                        Live
                      </button>
                    )}
                  </div>
                </div>
                {/* sepration 2  */}
              </div>
              {/* create option -------------------- */}

              {/* post showing ---------------------- */}
              <div className=" w-full h-[500px]  flex-none items-center p-1  gap-2  justify-center ">
              
<div className="flex flex-col justify-center items-center gap-5">
  
    

{/* -----------------singel post---------------------------- */}
<div className=" md:p-5  sm:p-3 p-7 w-screen sm:w-full flex justify-center  sm:pl-0   lg:p-4   ">
        <div className=" flex  flex-col justify-center  bg-white shadow-md bg-clip-border rounded-lg lg:w-[464px] lg:h-[800px] border w-[300px] md:w-[450px] sm:w-[330px]">

          <div className="flex p-2 sm:p-4 pl-5 md:p-3 sm:pl-5 ">
            <img
              className="lg:w-10 lg:h-10 font-roboto  rounded-full lg:ml-6 lg:mt-1 md:ml-3  md:border-2 border-[#C1506D] border-2  lg:border-2 w-10 h-10 md:w-12 md:h-12 "
              src="https://i.pinimg.com/564x/aa/f7/39/aaf7399b8e31d1cbc707794b38edf86b.jpg"
              alt=""
            />
            <p className="lg:pt-3 lg:pl-4 text-sm md:text-md font-semibold text-[#07312E] md:pt-4 md:pl-3 p-2 pt-3  pl-5 ">
              __raszik
            </p>
            <p className="lg:pt-4 lg:pl-4 sm:text-sm text-[3px]  font-roboto text-[#07312E]  md:pt-5  md:pl-0 p-2 pt-4 pl-0  sm:pl-5 sm:pt-4  ">
             
             
            </p>
            <p className="lg:ml-[210px] lg:text-lg font-bold  text-[#07312E] md:pt-2 pl-10 lg:pl-0 pt-3 md:pl-52 sm:pl-24 ">
              ...
            </p>
          </div>
          <div className="relative mx-4 mt-0 overflow-hidden text-gray-700  shadow-lg bg-clip-border  rounded-md lg:h-[500px]">
            <img

              className="w-full h-full "
              src="https://i.pinimg.com/564x/aa/f7/39/aaf7399b8e31d1cbc707794b38edf86b.jpg"
              alt=""
            />
          </div>
          <div className="flex md:pl-7 lg:pl-7 sm:pl-5   sm:pt-4 sm:p-2 lg:p-6 lg:pt-4 lg:gap-5 sm:gap-2 md:gap-4 pl-4 gap-1 pt-3">
          <div >
                          <Heart
                          
                            color="red"
                            size={30}
                          />
                        </div>

            <div>
            
              <MessageCircle className="text-[#07312E] " />
            </div>
            <div>
             
              <Send  className="text-[#07312E]" />
            </div>
            <div className="lg:pl-64 sm:pl-[55%] md:pl-[62%] pl-28 " >
              <Bookmark className="text-[#07312E]" />
            </div>
          </div>

          <div className="lg:pl-8 pt-2 pl-5 text-[10px] sm:text-sm md:pl-8 md:pt-2 font-semibold font-roboto text-[#07312E] sm:pl-8 sm:p-1">
            7 likes 
          </div>

          <div className="lg:pl-8 p-2 text-[13px] pl-5 sm:text-md font-semibold text-[#07312E] md:pl-8 sm:pl-8">
           __razik :
            <span className="sm:text-sm pl-1 text-[10px] font-normal text-[#07312E] md:pl-1 sm:pl-1 ">
             hello this is my new post
            </span>
          </div>

          <div className="sm:text-[14px] text-[10px] font-roboto font-normal pl-5  lg:pl-8 p-2 md:pl-8 sm:pl-8">
          
        <p >View 7 comments</p>
      
          </div>
         <div className="ml-9 text-[12px] text-gray-500"> 2h ago</div>
          <div className="sm:text-[14px] text-[10px] mb-2 pl-4 p-2 font-roboto font-normal lg:pl-8 md:pl-8 sm:pl-8 " >
            <input
              className="w-3/4     outline-none  hover:border-b py-2 border-[#07312E] "
              type="text"
              name=""
              id=""
              placeholder=" Add comment..."
            />

            <div className="sm:pt-2 md:pt-2 lg:p-0" > 
            </div>
          </div>
        </div>
      </div>
{/* -----------------singel post---------------------------- */}
{/* -----------------singel post---------------------------- */}
<div className=" md:p-5  sm:p-3 p-7 w-screen sm:w-full flex justify-center  sm:pl-0   lg:p-4   ">
        <div className=" flex  flex-col justify-center  bg-white shadow-md bg-clip-border rounded-lg lg:w-[464px] lg:h-[800px] border w-[300px] md:w-[450px] sm:w-[330px]">

          <div className="flex p-2 sm:p-4 pl-5 md:p-3 sm:pl-5 ">
            <img
              className="lg:w-10 lg:h-10 font-roboto  rounded-full lg:ml-6 lg:mt-1 md:ml-3  md:border-2 border-[#C1506D] border-2  lg:border-2 w-10 h-10 md:w-12 md:h-12 "
              src="https://i.pinimg.com/564x/aa/f7/39/aaf7399b8e31d1cbc707794b38edf86b.jpg"
              alt=""
            />
            <p className="lg:pt-3 lg:pl-4 text-sm md:text-md font-semibold text-[#07312E] md:pt-4 md:pl-3 p-2 pt-3  pl-5 ">
              __raszik
            </p>
            <p className="lg:pt-4 lg:pl-4 sm:text-sm text-[3px]  font-roboto text-[#07312E]  md:pt-5  md:pl-0 p-2 pt-4 pl-0  sm:pl-5 sm:pt-4  ">
             
             
            </p>
            <p className="lg:ml-[210px] lg:text-lg font-bold  text-[#07312E] md:pt-2 pl-10 lg:pl-0 pt-3 md:pl-52 sm:pl-24 ">
              ...
            </p>
          </div>
          <div className="relative mx-4 mt-0 overflow-hidden text-gray-700  shadow-lg bg-clip-border  rounded-md lg:h-[500px]">
            <img

              className="w-full h-full "
              src="https://i.pinimg.com/564x/aa/f7/39/aaf7399b8e31d1cbc707794b38edf86b.jpg"
              alt=""
            />
          </div>
          <div className="flex md:pl-7 lg:pl-7 sm:pl-5   sm:pt-4 sm:p-2 lg:p-6 lg:pt-4 lg:gap-5 sm:gap-2 md:gap-4 pl-4 gap-1 pt-3">
          <div >
                          <Heart
                          
                            color="red"
                            size={30}
                          />
                        </div>

            <div>
            
              <MessageCircle className="text-[#07312E] " />
            </div>
            <div>
             
              <Send  className="text-[#07312E]" />
            </div>
            <div className="lg:pl-64 sm:pl-[55%] md:pl-[62%] pl-28 " >
              <Bookmark className="text-[#07312E]" />
            </div>
          </div>

          <div className="lg:pl-8 pt-2 pl-5 text-[10px] sm:text-sm md:pl-8 md:pt-2 font-semibold font-roboto text-[#07312E] sm:pl-8 sm:p-1">
            7 likes 
          </div>

          <div className="lg:pl-8 p-2 text-[13px] pl-5 sm:text-md font-semibold text-[#07312E] md:pl-8 sm:pl-8">
           __razik :
            <span className="sm:text-sm pl-1 text-[10px] font-normal text-[#07312E] md:pl-1 sm:pl-1 ">
             hello this is my new post
            </span>
          </div>

          <div className="sm:text-[14px] text-[10px] font-roboto font-normal pl-5  lg:pl-8 p-2 md:pl-8 sm:pl-8">
          
        <p >View 7 comments</p>
      
          </div>
         <div className="ml-9 text-[12px] text-gray-500"> 2h ago</div>
          <div className="sm:text-[14px] text-[10px] mb-2 pl-4 p-2 font-roboto font-normal lg:pl-8 md:pl-8 sm:pl-8 " >
            <input
              className="w-3/4     outline-none  hover:border-b py-2 border-[#07312E] "
              type="text"
              name=""
              id=""
              placeholder=" Add comment..."
            />

            <div className="sm:pt-2 md:pt-2 lg:p-0" > 
            </div>
          </div>
        </div>
      </div>
{/* -----------------singel post---------------------------- */}
{/* -----------------singel post---------------------------- */}
<div className=" md:p-5  sm:p-3 p-7 w-screen sm:w-full flex justify-center  sm:pl-0   lg:p-4   ">
        <div className=" flex  flex-col justify-center  bg-white shadow-md bg-clip-border rounded-lg lg:w-[464px] lg:h-[800px] border w-[300px] md:w-[450px] sm:w-[330px]">

          <div className="flex p-2 sm:p-4 pl-5 md:p-3 sm:pl-5 ">
            <img
              className="lg:w-10 lg:h-10 font-roboto  rounded-full lg:ml-6 lg:mt-1 md:ml-3  md:border-2 border-[#C1506D] border-2  lg:border-2 w-10 h-10 md:w-12 md:h-12 "
              src="https://i.pinimg.com/564x/aa/f7/39/aaf7399b8e31d1cbc707794b38edf86b.jpg"
              alt=""
            />
            <p className="lg:pt-3 lg:pl-4 text-sm md:text-md font-semibold text-[#07312E] md:pt-4 md:pl-3 p-2 pt-3  pl-5 ">
              __raszik
            </p>
            <p className="lg:pt-4 lg:pl-4 sm:text-sm text-[3px]  font-roboto text-[#07312E]  md:pt-5  md:pl-0 p-2 pt-4 pl-0  sm:pl-5 sm:pt-4  ">
             
             
            </p>
            <p className="lg:ml-[210px] lg:text-lg font-bold  text-[#07312E] md:pt-2 pl-10 lg:pl-0 pt-3 md:pl-52 sm:pl-24 ">
              ...
            </p>
          </div>
          <div className="relative mx-4 mt-0 overflow-hidden text-gray-700  shadow-lg bg-clip-border  rounded-md lg:h-[500px]">
            <img

              className="w-full h-full "
              src="https://i.pinimg.com/564x/aa/f7/39/aaf7399b8e31d1cbc707794b38edf86b.jpg"
              alt=""
            />
          </div>
          <div className="flex md:pl-7 lg:pl-7 sm:pl-5   sm:pt-4 sm:p-2 lg:p-6 lg:pt-4 lg:gap-5 sm:gap-2 md:gap-4 pl-4 gap-1 pt-3">
          <div >
                          <Heart
                            style={{fill:"red"}}
                            color="red"
                            size={30}
                          />
                        </div>

            <div>
            
              <MessageCircle className="text-[#07312E] " />
            </div>
            <div>
             
              <Send  className="text-[#07312E]" />
            </div>
            <div className="lg:pl-64 sm:pl-[55%] md:pl-[62%] pl-28 " >
              <Bookmark className="text-[#07312E]" />
            </div>
          </div>

          <div className="lg:pl-8 pt-2 pl-5 text-[10px] sm:text-sm md:pl-8 md:pt-2 font-semibold font-roboto text-[#07312E] sm:pl-8 sm:p-1">
            7 likes 
          </div>

          <div className="lg:pl-8 p-2 text-[13px] pl-5 sm:text-md font-semibold text-[#07312E] md:pl-8 sm:pl-8">
           __razik :
            <span className="sm:text-sm pl-1 text-[10px] font-normal text-[#07312E] md:pl-1 sm:pl-1 ">
             hello this is my new post
            </span>
          </div>

          <div className="sm:text-[14px] text-[10px] font-roboto font-normal pl-5  lg:pl-8 p-2 md:pl-8 sm:pl-8">
          
        <p >View 7 comments</p>
      
          </div>
         <div className="ml-9 text-[12px] text-gray-500"> 2h ago</div>
          <div className="sm:text-[14px] text-[10px] mb-2 pl-4 p-2 font-roboto font-normal lg:pl-8 md:pl-8 sm:pl-8 " >
            <input
              className="w-3/4     outline-none  hover:border-b py-2 border-[#07312E] "
              type="text"
              name=""
              id=""
              placeholder=" Add comment..."
            />

            <div className="sm:pt-2 md:pt-2 lg:p-0" > 
            </div>
          </div>
        </div>
      </div>
{/* -----------------singel post---------------------------- */}


        
    </div>     


                
              </div>
              {/* post showing ---------------------- */}
            </div>
          </div>
          {/* main div ------------------------- */}

          {/* suggetions  */}
          <div className="hidden w-2/6 bg-white rounded-tl-xl rounded-bl-xl lg:flex p-5  flex-col">
            <div className="p-2">
              {" "}
              <p className="text-gray-500 text-sm font-roboto font-semibold">
                Suggesions 🖇️{" "}
              </p>
            </div>
            <div className="w-full   flex flex-col items-center  p-1 gap-2">
              {/* suggetion one div  */}
              <div className="w-full h-20 rounded-md 0 flex border border-[#d6c9da] bg-[#ece9f0] p-3">
                <div className="w-1/6 h-full flex items-start pt-2">
                  <img
                    className="lg:w-10 lg:h-10 rounded-full   "
                    src="https://i.pinimg.com/564x/6d/d0/5c/6dd05c06e029ccff4e31c692cba5a2c7.jpg"
                    alt=""
                  />
                </div>
                <div className="w-5/6 h-full flex items-center pl-2">
                  <div className="w-full h-3/6 flex items-center  pl-3 ">
                    <p className="text-sm text-gray-500 font-roboto font-semibold  ">
                      __razik_
                    </p>
                  </div>

                  <div className="w-full h-3/6 flex items-center  justify-end">
                    <button className="w-16 h-6 border border-[#C1506D] rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              {/* suggetion one div  */}

              {/* suggetion one div  */}
              <div className="w-full h-20 rounded-md 0 flex border border-[#d6c9da] bg-[#ece9f0] p-3">
                <div className="w-1/6 h-full flex items-start pt-2">
                  <img
                    className="lg:w-10 lg:h-10 rounded-full   "
                    src="https://i.pinimg.com/564x/6d/d0/5c/6dd05c06e029ccff4e31c692cba5a2c7.jpg"
                    alt=""
                  />
                </div>
                <div className="w-5/6 h-full flex items-center pl-2">
                  <div className="w-full h-3/6 flex items-center  pl-3 ">
                    <p className="text-sm text-gray-500 font-roboto font-semibold  ">
                      __razik_
                    </p>
                  </div>

                  <div className="w-full h-3/6 flex items-center  justify-end">
                    <button className="w-16 h-6 border border-[#C1506D] rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              {/* suggetion one div  */}

              {/* suggetion one div  */}
              <div className="w-full h-20 rounded-md 0 flex border border-[#d6c9da] bg-[#ece9f0] p-3">
                <div className="w-1/6 h-full flex items-start pt-2">
                  <img
                    className="lg:w-10 lg:h-10 rounded-full   "
                    src="https://i.pinimg.com/564x/6d/d0/5c/6dd05c06e029ccff4e31c692cba5a2c7.jpg"
                    alt=""
                  />
                </div>
                <div className="w-5/6 h-full flex items-center pl-2">
                  <div className="w-full h-3/6 flex items-center  pl-3 ">
                    <p className="text-sm text-gray-500 font-roboto font-semibold  ">
                      __razik_
                    </p>
                  </div>

                  <div className="w-full h-3/6 flex items-center  justify-end">
                    <button className="w-16 h-6 border border-[#C1506D] rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              {/* suggetion one div  */}
              {/* suggetion one div  */}
              <div className="w-full h-20 rounded-md 0 flex border border-[#d6c9da] bg-[#ece9f0] p-3">
                <div className="w-1/6 h-full flex items-start pt-2">
                  <img
                    className="lg:w-10 lg:h-10 rounded-full   "
                    src="https://i.pinimg.com/564x/6d/d0/5c/6dd05c06e029ccff4e31c692cba5a2c7.jpg"
                    alt=""
                  />
                </div>
                <div className="w-5/6 h-full flex items-center pl-2">
                  <div className="w-full h-3/6 flex items-center  pl-3 ">
                    <p className="text-sm text-gray-500 font-roboto font-semibold  ">
                      __razik_
                    </p>
                  </div>

                  <div className="w-full h-3/6 flex items-center  justify-end">
                    <button className="w-16 h-6 border border-[#C1506D] rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              {/* suggetion one div  */}
            </div>
          </div>
          {/* suggetions  */}
        </div>
      </div>
    </>
  );
};

export default NewModel;
