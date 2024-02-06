import { useState } from "react";
import { motion } from "framer-motion";

import {
  Home,
  Search,
  LucideMessageSquareText,
  Clapperboard,
  ImagePlus,
  BellRing,
} from "lucide-react";
import { LogoutFunction } from "../../utils/api/metords/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { useDispatch } from "react-redux";

const   Sidebar = ({setSelectedMenu,selectedMenu}:any) => {
  const dispatch = useDispatch()
  const Navigate=useNavigate()
  const [open, setOpen] = useState(true);
  // const [selectedMenu, setSelectedMenu]: any = useState(null);
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
  return (
    <>
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } bg-[#042F2C] h-screen p-5  rounded-tr-[50px] rounded-br-lg pt-8  duration-300 block   `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`absolute cursor-pointer -right-0 text-amber-50 top-9 w-7 mr-1 mt-[750px]
            ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
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
              src="./src/assets/logo.png"
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
                <Home className="text-black" />
              ) : (
                <Home  />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 0 ? (
              <div className="text-black">  Home</div>
               ) : (
                <div >   Home</div>
                )}
           
            </span>
          </li>







{/* search  */}

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-white hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${1 === 1 && "bg-light-white"} ${
              selectedMenu === 1 && "bg-white rounded-xl text-black"
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
                <Search className="text-black" />
              ) : (
                <Search />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 1 ? (
              <div className="text-black">  Search</div>
               ) : (
                <div >   Search</div>
                )}
           
            </span>
            
          </li>





{/* message  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-white hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${2 === 2 && "bg-light-white"} ${
              selectedMenu === 2 && "bg-white rounded-xl text-black "
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
                <LucideMessageSquareText className="text-black"
                  
                />
              ) : (
                <LucideMessageSquareText />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 2 ? (
              <div className="text-black">  Message</div>
               ) : (
                <div >   Message</div>
                )}
           
            </span>
            
          </li>




          {/* post  */}

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-amber-50 hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${3 === 3 && "bg-light-white"} ${
              selectedMenu === 3 && "bg-white rounded-xl text-black "
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
                <Clapperboard className="text-black" />
              ) : (
                <Clapperboard />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 3 ? (
              <div className="text-black">  Posts</div>
               ) : (
                <div >   Posts</div>
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




{/* create  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-white hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${5 === 5 && "bg-light-white"} ${
              selectedMenu === 5 && "bg-white rounded-xl text-black "
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
                <ImagePlus  className="text-black" />
              ) : (
                <ImagePlus />
              )}
            </motion.div>

            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 5 ? (
              <div className="text-black">  Create</div>
               ) : (
                <div >   Create</div>
                )}
           
            </span>
            
           
          </li>


{/* notification  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-white hover:rounded-xl hover:text-black text-white text-xl font-sans font-semibold items-center gap-x-4
         ${6 === 6 && "bg-light-white"} ${
              selectedMenu === 6 && "bg-white rounded-xl text-black "
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
                <BellRing className="text-black"   />
              ) : (
                <BellRing />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
            {selectedMenu === 6 ? (
              <div className="text-black">  Notification</div>
               ) : (
                <div >   Notification</div>
                )}
           
            </span>
            
           
          </li>
         
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
