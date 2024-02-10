import { motion } from "framer-motion";

import {
  Home,
  Search,
  LucideMessageSquareText,
  Clapperboard,
  ImagePlus,
  BellRing,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open}:any) => {
  const location = useLocation();
  // const activePath = "/path/to/target";
  console.log(location.pathname, "PATHNAME");


  return (
    <>
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } bg-[#07312E] h-screen p-5 z-30  rounded-tr-lg rounded-br-lg pt-8 relative duration-300 `}
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
              src="../src/assets/meta-new.png"
              className={`cursor-pointer duration-700    ${
                open && "rotate-[360deg] h-[120px] ml- rounded-full "
              }`}
            />
          </motion.div>
        </div>
        <ul className="pt-6">
          {/* home */}
          <Link
            to="/"
            className={`flex mt-5 rounded-md p-2 cursor-pointer  text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${0 === 0 && "bg-light-white"} ${
          location.pathname === "/" && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
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
              {location.pathname === "/" ? (
                <Home className="text-[#042F2C] " />
              ) : (
                <Home />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/" ? (
                <div className="text-[#042F2C] "> Home</div>
              ) : (
                <div> Home</div>
              )}
            </span>
          </Link>

          {/* search  */}

          <Link
            to="/search"
            className={`flex mt-5 rounded-md p-2 cursor-pointer  text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${1 === 1 && "bg-light-white"} ${
          location.pathname === "/search" && "bg-amber-50 rounded-xl text-[#042F2C]"
            }`}
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
              {location.pathname === "/search" ? (
                <Search className="text-[#042F2C]" />
              ) : (
                <Search />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/search" ? (
                <div className="text-[#042F2C]"> Search</div>
              ) : (
                <div> Search</div>
              )}
            </span>
          </Link>

          {/* message  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer  text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${2 === 2 && "bg-light-white"} ${
              location.pathname === "/message" && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
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
              {location.pathname === "/message" ? (
                <LucideMessageSquareText className="text-[#042F2C]" />
              ) : (
                <LucideMessageSquareText />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/message" ? (
                <div className="text-[#042F2C]"> Message</div>
              ) : (
                <div> Message</div>
              )}
            </span>
          </li>

          {/* post  */}

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer  text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${3 === 3 && "bg-light-white"} ${
              location.pathname === "/post" && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
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
              {location.pathname === "/post" ? (
                <Clapperboard className="text-[#042F2C]" />
              ) : (
                <Clapperboard />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/post" ? (
                <div className="text-[#042F2C]"> Posts</div>
              ) : (
                <div> Posts</div>
              )}
            </span>
          </li>

          {/* create  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer  text-amber-50 text-xl font-sans font-semibold items-center gap-x-4
         ${5 === 5 && "bg-light-white"} ${
              location.pathname === "/create" && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
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
              {location.pathname === "/create" ? (
                <ImagePlus className="text-[#042F2C]" />
              ) : (
                <ImagePlus />
              )}
            </motion.div>

            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/create" ? (
                <div className="text-[#042F2C]"> Create</div>
              ) : (
                <div> Create</div>
              )}
            </span>
          </li>

          {/* notification  */}
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer  text-white text-xl font-sans font-semibold items-center gap-x-4
         ${6 === 6 && "bg-light-white"} ${
              location.pathname === "/notification" && "bg-amber-50 rounded-xl text-[#042F2C] "
            }`}
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
              {location.pathname === "/notification" ? (
                <BellRing className="text-[#042F2C]" />
              ) : (
                <BellRing />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/notification" ? (
                <div className="text-[#042F2C]"> Notification</div>
              ) : (
                <div> Notification</div>
              )}
            </span>
          </li>

          {/* settings  */}
          <Link
            to="/settings"
            className={`flex mt-5 rounded-md p-2 cursor-pointer text-white text-xl font-sans font-semibold items-center gap-x-4
         ${7 === 7 && "bg-light-white"} ${
              location.pathname === "/settings" && "bg-white rounded-xl text-black "
            }`}
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
              {location.pathname === "/settings" ? (
                <Settings className="text-black" />
              ) : (
                <Settings />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left `}>
              {location.pathname === "/settings" ? (
                <div className="text-black">Settings</div>
              ) : (
                <div> Settings</div>
              )}
            </span>
          </Link>

          {/* profile  */}
          <Link
            to="profile"
            className={`flex mt-5  rounded-md p-2 cursor-pointer text-white text-xl font-sans font-semibold items-center gap-x-4
         ${4 === 4 && "bg-light-white"} ${
              location.pathname === "/profile" && "bg-white rounded-xl text-black "
            }`}
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
              {location.pathname === "/profile" ? (
                <img
                  className={`w-8 h-8 rounded-full text-black  `}
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
              {location.pathname === "/profile" ? (
                <div className="text-black"> Profile</div>
              ) : (
                <div> Profile</div>
              )}
            </span>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
