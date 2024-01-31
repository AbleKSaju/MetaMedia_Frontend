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

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu]: any = useState(null);

  const HandleSidebarClick = (index: any) => {
    setSelectedMenu(index);
  };
  return (
    <>
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } bg-teal-900 h-screen p-5  rounded-tr-[50px] rounded-br-lg pt-8 relative duration-300 `}
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
              src="./src/assets/logo-color.png"
              className={`cursor-pointer duration-700    ${
                open && "rotate-[360deg] h-[120px] ml-7 rounded-full "
              }`}
            />
          </motion.div>
        </div>
        <ul className="pt-6">
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
   ${0 === 0 && "bg-light-white"} ${
              selectedMenu === 0 && "bg-teal-700 rounded-xl "
            }`}
            onClick={() => HandleSidebarClick(0)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                rotate: -360,
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <Home className={(!open && "hidden") || ""} />
              ) : (
                <Home />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Home
            </span>
          </li>
          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${1 === 1 && "bg-light-white"} ${
              selectedMenu === 1 && "bg-teal-700 rounded-xl "
            }`}
            onClick={() => HandleSidebarClick(1)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                rotate: -360,
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <Search className={(!open && "hidden") || ""} />
              ) : (
                <Search />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Search
            </span>
          </li>

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${2 === 2 && "bg-light-white"} ${
              selectedMenu === 2 && "bg-teal-700 rounded-xl "
            }`}
            onClick={() => HandleSidebarClick(2)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                rotate: -360,
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <LucideMessageSquareText
                  className={(!open && "hidden") || ""}
                />
              ) : (
                <LucideMessageSquareText />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Message
            </span>
          </li>

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${3 === 3 && "bg-light-white"} ${
              selectedMenu === 3 && "bg-teal-700 rounded-xl "
            }`}
            onClick={() => HandleSidebarClick(3)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                rotate: -360,
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <Clapperboard className={(!open && "hidden") || ""} />
              ) : (
                <Clapperboard />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Posts
            </span>
          </li>

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${4 === 4 && "bg-light-white"} ${
              selectedMenu === 4 && "bg-teal-700 rounded-xl "
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
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://i.pinimg.com/564x/53/12/21/531221133b6028752e2a523b6d8cdc5d.jpg"
                />
              ) : (
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://i.pinimg.com/564x/53/12/21/531221133b6028752e2a523b6d8cdc5d.jpg"
                />
              )}
            </motion.div>

            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Profile
            </span>
          </li>

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${5 === 5 && "bg-light-white"} ${
              selectedMenu === 5 && "bg-teal-700 rounded-xl "
            }`}
            onClick={() => HandleSidebarClick(5)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 1.7,
                rotate: -360,
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <ImagePlus className={(!open && "hidden") || ""} />
              ) : (
                <ImagePlus />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Create
            </span>
          </li>

          <li
            className={`flex mt-5 rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:rounded-xl text-amber-50 text-xl font-sans font-semibold items-center gap-x-4 
         ${6 === 6 && "bg-light-white"} ${
              selectedMenu === 6 && "bg-teal-700 rounded-xl "
            }`}
            onClick={() => HandleSidebarClick(6)}
          >
            <motion.div
              whileHover={{
                scale: 1.6,
                rotate: 360,
                transition: { ease: "easeInOut", duration: 0.9 },
              }}
              whileTap={{
                scale: 0.8,
                rotate: -360,
                borderRadius: "100%",
              }}
            >
              {selectedMenu === 0 ? (
                <BellRing className={(!open && "hidden") || ""} />
              ) : (
                <BellRing />
              )}
            </motion.div>
            <span className={`${!open && "hidden"} origin-left duration-700`}>
              Notification
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
