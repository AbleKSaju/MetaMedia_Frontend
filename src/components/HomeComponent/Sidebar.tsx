import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Home,
  Search,
  LucideMessageSquareText,
  Clapperboard,
  ImagePlus,
  BellRing,
  Settings,
  Menu,
} from "lucide-react";
import { LogoutFunction } from "../../utils/api/methods/AuthService/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { useDispatch } from "react-redux";
import useMediaQuery from "../../utils/costumHook/mediaqueri";
import { set } from "mongoose";


const   Sidebar = ({setSelectedMenu,selectedMenu,open}:any) => {

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1025px)");




  const dispatch = useDispatch()
  const Navigate=useNavigate()
  // const [selectedMenu, setSelectedMenu]: any = useState(null);
  console.log(open,"open");
  
  const HandleSidebarClick = (index: any) => {
    setSelectedMenu(index);
  };
  const handleLogout=async (e:any)=>{
    e.preventDefault()
    const response:any=await LogoutFunction()
    console.log(response,"RRR");
    if(response?.data?.status){
      dispatch(clearToken())
      toast.success(response?.data?.message)
      console.log("navigate to login");
      Navigate('/login')
    }else{
      toast.error("Logout error")
    }
  }

  // const showAndHideSidebar = () => {
  //   const bar = document.getElementById("bar") as HTMLInputElement;
  //   console.log(bar);
    
  //   bar.click();
  // };

  // const [sideBar,setSideBar] = useState(1)

  // console.log(sideBar,"SIDEBAR");
// =======


//   useEffect(()=>{
//     if(isMobile){
//       setOpen(false)
//     }else if(isTablet){
//       setOpen(false)
//     }else if(isLaptop){
//       setOpen(true)

//     }
//   },[isLaptop,isMobile,isTablet])









  return (
    <>
      <div
        className={` ${
          open ? "w-60" : "w-20 "

        } bg-[#07312E] h-screen p-5  rounded-tr-lg rounded-br-lg pt-8 relative duration-300 `}

      >
        {/* <Menu/> */}
        <svg
        id="bar"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`absolute cursor-pointer -right-0 text-amber-50 top-9 w-7 mr-1 mt-[750px]
            ${!open && "rotate-180"}`}
          // onClick={() => setOpen(!open)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>

        <div className="flex gap-x-4 items-center">
          <motion.div
            whileHover={{
              scale: 0.7,
              transition: { ease: "easeInOut", duration: 1.2 },
            }}
          >
            <img
              src="./src/assets/meta-new.png"
              className={`cursor-pointer duration-700    ${
                open && "rotate-[360deg] h-[120px] ml- rounded-full "
              }`}
            />
          </motion.div>
        </div>
        <ul className="pt-6">






          {/* home */}
        <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-[#042F2C] text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${0 === 0 && "bg-light-white"} ${
              selectedMenu === 0 && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
            onClick={() => HandleSidebarClick(0)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <Home className="text-[#042F2C] " />
              ) : (
                <Home  />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 0 ? (
              <div className="text-[#042F2C] ">  Home</div>
               ) : (
                <div >   Home</div>
                )}
           
            </span>
          </li>







{/* search  */}

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-[#042F2C] text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${1 === 1 && "bg-light-white"} ${
              selectedMenu === 1 && "bg-amber-50 rounded-xl text-[#042F2C]"
            }`}
            onClick={() => HandleSidebarClick(1)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 1 ? (
                <Search className="text-[#042F2C]" />
              ) : (
                <Search />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 1 ? (
              <div className="text-[#042F2C]">  Search</div>
               ) : (
                <div >   Search</div>
                )}
           
            </span>
            
          </li>





{/* message  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-[#042F2C] text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${2 === 2 && "bg-light-white"} ${
              selectedMenu === 2 && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
            onClick={() => HandleSidebarClick(2)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 2 ? (
                <LucideMessageSquareText className="text-[#042F2C]"
                  
                />
              ) : (
                <LucideMessageSquareText />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 2 ? (
              <div className="text-[#042F2C]">  Message</div>
               ) : (
                <div >   Message</div>
                )}
           
            </span>
            
          </li>




          {/* post  */}

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-[#042F2C] text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${3 === 3 && "bg-light-white"} ${
              selectedMenu === 3 && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
            onClick={() => HandleSidebarClick(3)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
               
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 3 ? (
                <Clapperboard className="text-[#042F2C]" />
              ) : (
                <Clapperboard />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 3 ? (
              <div className="text-[#042F2C]">  Posts</div>
               ) : (
                <div >   Posts</div>
                )}
           
            </span>
            
          </li>



{/* create  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-[#042F2C] text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${5 === 5 && "bg-light-white"} ${
              selectedMenu === 5 && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
            onClick={() => HandleSidebarClick(5)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 1.7,
                
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 5 ? (
                <ImagePlus  className="text-[#042F2C]" />
              ) : (
                <ImagePlus />
              )}
            </motion.div>

            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 5 ? (
              <div className="text-[#042F2C]">  Create</div>
               ) : (
                <div >   Create</div>
                )}
           
            </span>
            
           
          </li>


{/* notification  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-[#042F2C] text-white text-xl font-sans font-semibold items-center gap-x-4
         ${6 === 6 && "bg-light-white"} ${
              selectedMenu === 6 && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
            onClick={() => HandleSidebarClick(6)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
               
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 6 ? (
                <BellRing className="text-[#042F2C]"   />
              ) : (
                <BellRing />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 6 ? (
              <div className="text-[#042F2C]">  Notification</div>
               ) : (
                <div >   Notification</div>
                )}
           
            </span>
            
           
          </li>


{/* settings  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-white hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${7 === 7 && "bg-light-white"} ${
              selectedMenu === 7 && "bg-white rounded-xl text-black "
            }`}
            onClick={() => HandleSidebarClick(7)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
               
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 7 ? (
                <Settings className="text-black"   />
              ) : (
                <Settings />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 7 ? (
              <div className="text-black">Settings</div>
               ) : (
                <div > Settings</div>
                )}
           
            </span>
            
           
          </li>


{/* profile  */}
<li
            className={`flex mt-5  rounded-md p-2 cursor-pointer hover:bg-white hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${4 === 4 && "bg-light-white"} ${
              selectedMenu === 4 && "bg-white rounded-xl text-black "
            }`}
            onClick={() => HandleSidebarClick(4)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 1.7,
                
                transition: { ease: "easeInOut", duration: 0.9 },
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 4 ? (
                <img
                  className= {`w-8 h-8 rounded-full text-black  `}
                  src="https://i.pinimg.com/564x/53/12/21/531221133b6028752e2a523b6d8cdc5d.jpg"
                />
              ) : (
                <img
                  className="w-8 h-8 rounded-full "
                  src="https://i.pinimg.com/564x/53/12/21/531221133b6028752e2a523b6d8cdc5d.jpg"
                />
              )}
            </motion.div>

            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 4 ? (
              <div className="text-black">  Profile</div>
               ) : (
                <div >   Profile</div>
                )}
           
            </span>
            
          </li>


         
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
