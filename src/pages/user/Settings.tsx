import React from "react";

interface SettingsProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({ setSidebarOpen }) => {
  setSidebarOpen(false);
  return (
    <>
      <div className="flex">
        <div className="sm:ml-20 fixed border-r border-teal-900 h-[100vh]">
          <div className="w-[100vw] sm:w-64 sm:mt-3 ">
            <div className="flex justify-center">
              <img
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mt-5"
                src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk="
                alt="DP"
              />
            </div>
            <p className="text-center font-bold text-lg mt-3">Alia Bhatt</p>
            <p className="text-center mt-3">
              𝒜𝓈𝓌𝒾𝓃 <br />
              ♡ sdaffssd
              <br />
              19sdfdsfd✨ <br />
              ♡ dsfsdgfsgfds
              <br />
            </p>
          </div>
          <div className="w-[100vw] sm:w-64  absolute bottom-16 sm:bottom-3 bg-amber-50">
            <div className="grid grid-cols-12 grid-rows-12 w-full text-center text-teal-900 bg-amber-50 font-medium text-lg">
              <div className="col-span-12 row-span-2 col-start-1 row-start-1 w-full border-b-4 py-2 sm:px-2 mt-1 border-white ">
                Edit Profile
              </div>
              <div className="col-span-12 row-span-2 col-start-1 row-start-3 w-full border-b-4 py-2 sm:px-2 mt-1 border-white ">
                Activity
              </div>
              <div className="col-span-12 row-span-2 col-start-1 row-start-5 w-full border-b-4 py-2 sm:px-2 mt-1 border-white ">
                Security
              </div>
              <div className="col-span-12 row-span-2 col-start-1 row-start-7 w-full border-b-4 py-2 sm:px-2 mt-1 border-white ">
                Security
              </div>
              <div className="col-span-12 row-span-2 col-start-1 row-start-9 w-full border-b-4 py-2 sm:px-2 mt-1 border-white ">
                Contact us
              </div>
              <div className="col-span-12 row-span-2 col-start-1 row-start-11 w-full border-b-4 py-2 sm:px-2 mt-1 border-white ">
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 w-40 ml-20 bg-red-400">
        </div>
      </div>
      <div className="h-20 w-20 bg-red-400">

</div>
    </>
  );
};

export default Settings;
