import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetGroupDataByIdFunction,
  GetGroupMessagesFunction,
} from "../../../utils/api/methods/ChatService/get/get";
import { toast } from "sonner";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";

const GroupDetails = ({ setISGroupDetais }: any) => {
  const { group_id } = useParams();

  const [selectIndex, setSelectIndex] = useState(0);
  const [groupData, setGroupData]: any = useState(null);
  const [messages, setMessages]: any = useState([]);
  const [userDetails, setUserDetails] = useState<any>({});



  useEffect(() => {
    (async () => {
      const response = await GetGroupDataByIdFunction(group_id);
      if (response.status) {
        console.log('Grop data');
        
        setGroupData(response.data);
      } else {
        toast.error("Group data not found");
        setISGroupDetais(false);
      }
    })();
  }, [group_id]);
  
  useEffect(() => {
    (async () => {
      const response = await GetGroupMessagesFunction(group_id);
      if (response.status) {
        console.log('MES');
        
        setMessages(response.data);
      } else {
        toast.error("No messages found");
      }
    })();
  }, [group_id]);

  useEffect(() => {
    if (groupData && groupData.members.length > 0) {
      const fetchUserDetails = async () => {
        const userDetailsPromises = groupData.members.map(async (memberId:any) => {
          const response = await getUserByIdFuntion(memberId);
          if (response.status) {
            return response.data;
          } else {
          
            return null;
          }
        });
  
        // Wait for all user details requests to complete
        const userDetails = await Promise.all(userDetailsPromises);
        setUserDetails(userDetails);
      };
  
      fetchUserDetails();
    }
  }, [groupData]);
 

  useEffect(()=>{
 
    console.log(userDetails,'UUSER');
    
  },[userDetails])




  return (
    <>
      <div className="z-50 fixed w-screen h-screen bg-black bg-opacity-65  flex flex-col ">
        <div className="w-full h-10 flex justify-end items-center p-5">
          <X color="white" onClick={()=>setISGroupDetais(false)} />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-5/12 h-5/6 bg-white border rounded-md  overflow-y-auto">
            {/* over flow here   */}

            <div className="w-full   h-12 flex justify-around items-center border-b">
              <div onClick={() => setSelectIndex(0)}>
                <p className=" border-b-2 border-b-[#C1506D]">Details</p>
              </div>
              <div onClick={() => setSelectIndex(1)}>
                <p className=" border-b-2 border-b-[#C1506D]">Members</p>
              </div>
            </div>

            {/* over flow here   */}

            {/* details  */}
            {groupData && (
              <>
                {selectIndex == 0 && (
                  <>
                    <div className="w-full h-5/6  flex flex-col">
                      <div className="w-full h-36  flex items-center justify-around mt-7">
                        <div className=" w-full h-full flex justify-center items-center ">
                          <img
                            src={`http://localhost:3005/Chat/${groupData.profile}`}
                            className="w-28 h-28 object-fill rounded-full"
                            alt=""
                          />
                        </div>
                        <div className=" w-full h-full flex items-start  flex-col ">
                          <div className="h-1/2 w-full pt-8 flex justify-start">
                            <p className="text-xl font-semibold ">
                              {groupData.name}
                            </p>
                          </div>
                          <div className="w-full h-12 flex ">
                            <p className="w-full h-full flex flex-wrap">
                              {groupData.description}{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full  h-5/6  flex flex-wrap p-2 gap-2 justify-start mt-5 ">
                        {messages.length > 0 && (
                        
                          <>
                           {messages.map((item: any) => {
                              return (
                                <>
{
                                item.type == "image" && (
                                  <>
                                    <div className="w-[187px] h-44 bg-green-100">
                                      <img
                                        src={`http://localhost:3005/Chat/${item.content}`}
                                        className="w-full h-full object-cover"
                                        alt=""
                                      />
                                    </div>
                                  </>
                                )
                              }
                              {
                                item.type == "video" && (
                                  <>
                                    <div className="w-[187px] h-44 bg-green-100">
                                      <video
                                        controls
                                        muted
                                        src={`http://localhost:3005/Chat/${item.content}`}
                                        className="w-full h-full object-cover"
                                      ></video>
                                    </div>
                                  </>
                                )
                              }

                                </>
                              )
                            })}
                          
                          
                          </>
                        
                        )}
                      </div>
                    </div>
                  </>
                )}
                {/* details  */}
              </>
            )}

{groupData && (
  <>
    {/* members  */}
    {selectIndex === 1 && (
      <>
        <div className="w-full h-5/6 flex justify-center p-2">
          <div className="w-10/12 flex flex-col items-center gap-1 ">
           
              {groupData.members.length > 0 && userDetails.length > 0 && (
                <>
                  {groupData.members.map((memberId: any, index: number) => {
                    const memberDetails = userDetails.find((user:any) => user.basicInformation.userId === memberId);
                    return (
                        <div className="w-full h-20 flex-none p-2 gap-2 ">
                      <div key={index} className="w-full h-full flex items-center border rounded-md p-2">
                        <div className="w-3/12 h-full flex justify-center items-center">
                          <img
                            src={`http://localhost:3000/profile/${memberDetails.profile.profileUrl}`}
                            className="w-14 h-14 object-fill rounded-full"
                            alt=""
                          />
                        </div>
                        <div className="w-7/12 h-full flex justify-start items-center">
                          {memberDetails.basicInformation.fullName}
                        </div>
                        {memberId === groupData.admins[0] && (
                          <div className="w-2/12">
                            <div className="w-16 h-6 border border-[#C1506D] rounded-md flex justify-center items-center text-sm text-[#C1506D]">
                              admin
                            </div>
                          </div>
                        )}
                      </div>
                      </div>
                    );
                  })}
                </>
              )}
           
          </div>
        </div>
      </>
    )}
    {/* members  */}
  </>
)}
                      


            
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
