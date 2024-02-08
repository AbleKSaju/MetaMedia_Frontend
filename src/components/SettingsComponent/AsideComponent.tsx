import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { clearToken } from '../../utils/ReduxStore/Slice/tokenSlice';
import { LogoutFunction } from '../../utils/api/methods';
import { Edit2 } from 'lucide-react';

const Aside = ({selectedSettings,setSelectedSettings}:any) => {
    const dispatch = useDispatch()
    const Navigate=useNavigate()

    const HandleSettingsClick = (index: any) => {
        setSelectedSettings(index);
      };

console.log(selectedSettings,"selectedSettings");


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
      <div className="sm:ml-20 flex justify-center border-r border-teal-900 h-[99vh]">
          <div className="w-[100vw] sm:w-64 lg:w-[400px] sm:mt-3 ">
            <div className="flex justify-center">
              <img
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mt-5"
                src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk="
                alt="DP"
              />
            </div>
            <p className="text-center font-bold text-lg mt-8">Alia Bhatt</p>
            <p className="text-center mt-3">
              𝒜𝓈𝓌𝒾𝓃 <br />
              ♡ sdaffssd
              <br />
              19sdfdsfd✨ <br />
              ♡ dsfsdgfsgfds
              <br />
            </p>
          </div>
            <div className="w-[100vw] sm:w-64 lg:w-[320px] absolute bottom-16 sm:bottom-3 cursor-pointer">
              <div className="grid grid-cols-12 grid-rows-12 text-center text-teal-900 bg-amber-50 mx-5 sm:mx-0  font-medium text-lg">
              <div onClick={() => HandleSettingsClick(0)} className={`${selectedSettings === 0 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-1 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}>
                Edit Profile
              </div>
              <div  onClick={() => HandleSettingsClick(1)} className={`${selectedSettings === 1 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-3 w-full  py-2 md:py-2.5 sm:px-2 mt-1`}>
                Activity
              </div>
              <div   onClick={() => HandleSettingsClick(2)} className={`${selectedSettings === 2 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-5 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}>
                Security
              </div>
              <div  onClick={() => HandleSettingsClick(3)} className={`${selectedSettings === 3 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-7 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}>
                Notification
              </div>
              <div  onClick={() => HandleSettingsClick(4)} className={`${selectedSettings === 4 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-9 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}>
                Contact us
              </div>
              <div  onClick={() => HandleSettingsClick(5)} className={`${selectedSettings === 5 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-11 w-full py-2 md:py-2.5 sm:px-2 mt-1`}>
                Logout
              </div>
            </div>
          </div>
         </div>
  )
}

export default Aside