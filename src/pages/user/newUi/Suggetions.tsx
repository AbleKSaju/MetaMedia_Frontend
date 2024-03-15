import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { suggetionFuntion } from "../../../utils/api/methods/UserService/get";
import { toast } from "sonner";
import { followUserFunction, getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { editUser } from "../../../utils/ReduxStore/Slice/userSlice";

const Suggetions = () => {
  const [followUser,setFollowUser] = useState(false)
  const [suggetions, setSuggetions]: any = useState([]);
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.persisted.user.userData);
  useEffect(() => {
    (async () => {
      const responce = await suggetionFuntion(userData.userId);

      if (responce.status) {
        setSuggetions(responce.data);
      } else {
        toast.error(responce.message);
      }
    })();
  }, [followUser]);

  const FollowUser = async (id: string) => {
    const data = {
      currentUserId: userData.userId,
      followedUserId: id,
    };
    const response: any = await followUserFunction(data);    
    if (response.data.status) {
      toast.success(response.data.message);
      try {
        const response = await getUserByIdFuntion(userData.userId);
        if (response?.status) {
          dispatch(editUser(response.data.socialConections));
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
        setFollowUser(!followUser)
    }else{
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* suggetions  */}
      <div className="hidden w-2/6 bg-white rounded-tl-xl rounded-bl-xl lg:flex p-5  flex-col">
        <div className="p-2">
          {" "}
          <p className="text-gray-500 text-sm font-roboto font-semibold">
            Suggesions 🖇️{" "}
          </p>
        </div>
        <div className="w-full   flex flex-col items-center  p-1 gap-2">
          {suggetions.length > 0 ? (
            <>
              {suggetions.map((item: any) => {
                return (
                  <>
                    {/* suggetion one div  */}
                    <div className="w-full h-20 rounded-md 0 flex border border-[#d6c9da] bg-[#ece9f0] p-3">
                      <div className="w-1/6 h-full flex items-start pt-2">
                        {item.profile.profileUrl ? (
                          <>
                            <img
                              className="lg:w-10 lg:h-10 rounded-full   "
                              src={`http://localhost:3000/profile/${item?.profile?.profileUrl}`}
                              alt=""
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className="lg:w-10 lg:h-10 rounded-full   "
                              src="https://i.pinimg.com/564x/6d/d0/5c/6dd05c06e029ccff4e31c692cba5a2c7.jpg"
                              alt=""
                            />
                          </>
                        )}
                      </div>
                      <div className="w-5/6 h-full flex items-center pl-2">
                        <div className="w-full h-3/6 flex items-center  pl-3 ">
                          <p className="text-sm text-gray-500 font-roboto font-semibold  ">
                            {item.basicInformation.fullName}
                          </p>
                        </div>

                        <div className="w-full h-3/6 flex items-center  justify-end">
                          <button onClick={()=>FollowUser(item.basicInformation?.userId)}
                           className="w-16 h-6 border border-[#C1506D] rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* suggetion one div  */}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div className="w-full h-20 rounded-md 0 flex border border-[#d6c9da] bg-[#ece9f0] p-3 justify-center items-center">
                <div className="text-[#C1506D]">No Suggetions For you</div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* suggetions  */}
    </>
  );
};

export default Suggetions;
