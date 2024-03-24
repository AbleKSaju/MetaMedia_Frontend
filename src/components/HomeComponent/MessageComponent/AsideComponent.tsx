import { MoreVertical, Users } from "lucide-react";
import profile from "../../../assets/profile.webp";
import { Link, useParams } from "react-router-dom";
import AsideSelectionComponent from "./AsideSelectionComponent";

const AsideComponent = ({
  conversations,
  setewGroup,
  setIsMore,
  isMore,
  setAside,
  setIsGroupChat,
}: any) => {
  // const dispach=useDispatch()
  const { user_id } = useParams();
  const DateToTime = (lastMessageDate: any) => {
    const date = new Date(lastMessageDate);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h12",
      hour12: true,
    });
  };
  console.log(user_id,"user_id");
  

  const handleMoreOption = () => {
    setIsMore(!isMore);
  };

  const handleNewgroup = () => {
    setIsMore(false);
    setewGroup(1);
  };

  return (
    <>
      <div className={`${user_id!="index" ? "hidden" : ""} sm:flex sidebar w-96 bg-[#EBE9EF] min-w-60 flex-col border-r border-gray-300 transition-all`}>
        <div className="logo flex items-center justify-center py- my-7  font-medium flex-col ">
          <div className="w-full h-[70px]  flex justify-between items-center ">
            <div className="w-11/12  h-full flex justify-center items-center text-3xl ml-4">
              Messages
            </div>
            <div className=" h-full w-1/12 justify-center items-center flex mt-2">
              <MoreVertical size={20} onClick={handleMoreOption} />
            </div>
          </div>
          {isMore && (
            <>
              <div className="fixed bg-white w-32 h-10 ml-[9.5%] border border-[#C1506D]  mt-28 rounded-md flex flex-col justify-between">
                <div
                  className="w-full h-full justify-center items-center flex border-[#C1506D] border-b gap-2"
                  onClick={handleNewgroup}
                >
                  <Users size={15} /> <p className="text-sm">New Group</p>
                </div>
              </div>
            </>
          )}

          <AsideSelectionComponent
            setAside={setAside}
            setIsGroupChat={setIsGroupChat}
          />
        </div>
        <div className="overflow-auto scrollbar-hide ">
          {conversations?.length
            ? conversations.map((data: any, index: number) => {
                if (data.email) {
                  return (
                    <div
                      className={`list flex cursor-pointer border-b border-gray-300 transition-all p-2 items-center h-[70px] ${
                        user_id == data.receiverId ? "bg-gray-300" : ""
                      }`}
                      key={index}
                    >
                      <Link to={`/profile/${data?.receiverId}`}>
                        <img
                          src={
                            data?.profile?.startsWith("https://")
                              ? `${data?.profile}`
                              : data?.profile
                              ? `http://localhost:3000/profile/${data?.profile}`
                              : `${profile}`
                          }
                          alt="P"
                          className="rounded-full mr-2 w-[50px] h-[50px]"
                        />
                      </Link>
                      <Link
                        to={`/message/${data.receiverId}`}
                        className="info flex-1"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{data?.name}</span>
                          <span className="font-light text-sm">
                            {data?.email?.slice(0, 20)}...
                          </span>
                        </div>
                      </Link>
                      <span className="text-gray-600 text-xs">
                        {DateToTime(data?.lastUpdate)}
                      </span>
                    </div>
                  );
                } else {
                  return null; // Or some fallback UI if required
                }
              })
            : ""}
          {/* 
          {users?.length
            ? users
                ?.filter((user: any) => user.id !== userData.userId)
                .map((data: any, index: number) => {
                  return (
                    <div
                      className="list flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition-all p-2 items-center h-[70px]"
                      key={index}
                    >
                         <Link to={`/profile/${data?.receiverId}`}>
                      <img
                        src={
                          data?.profile?.startsWith("https://")
                            ? `${data?.profile}`
                            : data?.profile
                            ? `http://localhost:3000/profile/${data?.profile}`
                            : `${profile}`
                        }
                        alt="P"
                        className="rounded-full mr-2 w-[50px] h-[50px]"
                      />
                      </Link>
                      <div
                        className="info flex-1"
                        onClick={() => fetchMessages(data)}
                      >
                        <div className="flex flex-col">
                          <span className=" font-bold">{data?.name}</span>
                          <span className="font-light text-sm">
                            {data?.email.slice(0, 25)}...
                          </span>
                        </div>
                      </div>
                      <span className=" text-gray-600">now</span>
                    </div>
                  );
                })
            : "" } */}
        </div>
      </div>
      {/* {!isMobile && <ChatComponent />} */}
    </>
  );
};

export default AsideComponent;
