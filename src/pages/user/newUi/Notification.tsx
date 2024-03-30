import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetNotificationOfUserFunction } from "../../../utils/api/methods/ChatService/get/get";
import { toast } from "sonner";

import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { Annoyed } from "lucide-react";
import moment from 'moment';
const Notification = ({ setOpenNotification }: any) => {

  const userData=useSelector((state:any)=>state.persisted.user.userData)
  const [notifications,setNotifications]:any=useState([])




  const wrapperRef: any = useRef(null);
  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenNotification(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotificationOfUser = async () => {
      const response = await GetNotificationOfUserFunction(userData.userId);
      if (response.status) {
        const updatedNotifications:any = await Promise.all(response.data.map(async (notificationItem: any) => {
          try {
            const senderUserDataResponse = await getUserByIdFuntion(notificationItem.sender_id);
            if (senderUserDataResponse.status) {
              return { ...notificationItem, senderUserData: senderUserDataResponse.data };
            } else {
              throw new Error(senderUserDataResponse.message);
            }
          } catch (error:any) {
            toast.error(`Error fetching sender data: ${error.message}`);
            return notificationItem;
          }
        }));
        setNotifications(updatedNotifications);
      } else {
        toast.error(response.message);
      }
    };
    fetchNotificationOfUser();
  }, [userData]);
 
  useEffect(()=>{
console.log(notifications,'--------5555555555');

  },[notifications])
  return (
    <>
      <div
        ref={wrapperRef}
        className="hidden sm:block sm:w-5/12 md:w-5/12 lg:w-3/12 h-full bg-white rounded-md  ml-32 fixed z-20 border m-2 overflow-y-auto scrollbar-hide"
      >
        <p className="text-3xl text-center my-6">Notifications</p>
        <div className="flex flex-col justify-center gap-2 p-1 ">
          {notifications && notifications.length > 0 ? (
            <>
            {notifications.map((item:any)=>{
              return (
                <>

{item.action_type=='like' && (
  <>
{/* one notification ------------ */}
<div className="w-full h-20  flex justify-between  border rounded-md flex-none" key={item._id}>
            <div className="h-full w-3/12 flex justify-normal items-center p-2 ">
              <img
               src={`http://localhost:3000/profile/${item?.senderUserData.profile?.profileUrl}`}
                className="w-[50px] h-[50px]  rounded-full border border-[#C1506D]"
                alt=""
              />
            </div>
            <div className="h-full w-full  flex flex-col">
              <div className="w-full h-1/2  flex pl-2 justify-start items-end">
                <p className="font-semibold">{item?.senderUserData?.basicInformation?.fullName}</p>
              </div>
              <div className="w-full h-1/2   items-start flex flex-col pl-3">
                {item.action_type=='like' && (
                  <>
                  <p className="text-sm">Liked your  post</p>
                  </>
                )}
                
                <p className="text-[10px]"> {moment(item.timestamp).fromNow()}</p>
              </div>
            </div>
            <div className="h-full w-3/12  p-2 flex justify-center items-center">
              <img
                src={`http://localhost:3002/img/${item.action_details.post_image}`}
                className="w-full h-5/6 object-cover"
                alt=""
              />
            </div>
          </div>
 {/* one notification ------------ */}
  </>
)}
{item.action_type=='comment' && (
  <>
  {/* one notification ------------ */}
<div className="w-full h-20  flex justify-between  border rounded-md flex-none" key={item._id}>
            <div className="h-full w-3/12 flex justify-normal items-center p-2 ">
              <img
               src={`http://localhost:3000/profile/${item?.senderUserData.profile?.profileUrl}`}
                className="w-[50px] h-[50px]  rounded-full border border-[#C1506D]"
                alt=""
              />
            </div>
            <div className="h-full w-full  flex flex-col">
              <div className="w-full h-1/2  flex pl-2 justify-start items-end">
                <p className="font-semibold">{item?.senderUserData?.basicInformation?.fullName}</p>
              </div>
              <div className="w-full h-1/2   items-start flex flex-col pl-3">
                                <>
                                
                  <p className="text-sm flex flex-wrap">Commented your  post :{item.action_details.comment.length > 4 ? `${item.action_details.comment.substring(0, 4)}...` : item.action_details.comment}</p>
                

                  </>
            
                
                <p className="text-[10px]"> {moment(item.timestamp).fromNow()}</p>
              </div>
            </div>
            <div className="h-full w-3/12  p-2 flex justify-center items-center">
              <img
                src={`http://localhost:3002/img/${item.action_details.post_image}`}
                className="w-full h-5/6 object-cover"
                alt=""
              />
            </div>
          </div>
 {/* one notification ------------ */}
  
  </>
)}

         


                </>
              )
            })}
            </>
          ):(
            <>
            <div className="w-full h-20  flex justify-between  border rounded-md" >
            <div className="h-full w-full flex justify-center items-center  ">
             <p className="flex text-[#C1506D] text-sm font-semibold"> No Notificatins For you</p>
            </div>
            </div>
            </>
          )}
          

        
        </div>
      </div>
    </>
  );
};

export default Notification;
