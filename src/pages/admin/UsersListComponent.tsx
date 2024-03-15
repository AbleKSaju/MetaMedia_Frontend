import { useEffect, useState } from "react";
import { getAllUsersFunction } from "../../utils/api/methods/UserService/get";
import { getAllUsersDataFunction } from "../../utils/api/methods/UserService/get";
import { toast } from "sonner";
import profile from "../../assets/profile.webp";
import { ChangeUserStatusFunction } from "../../utils/api/methods/AdminService/post";

const UsersListComponent = () => {
  const [users, setUsers] = useState<any>([]);
  const [currentUsers, setCurrentUsers] = useState<any>();
  const [searchUser, setSearchUser] = useState<string>("");
  const [blockUser,setBlockUser] = useState(false)
  console.log();
  

  useEffect(() => {
    (async () => {
      const response = await getAllUsersDataFunction();
      if (response.status) {
        setUsers(response?.data);
        setCurrentUsers(response?.data);
      } else {
        toast.error("Users not found");
      }
    })();
  }, [blockUser]);

  useEffect(() => {
    (async () => {
      if (searchUser.length !== 0 && searchUser.trim() === "") {
        setCurrentUsers(users);
      } else {
        const usersData = await users.filter((data: any) => {
          return (
            data.fullName.toLowerCase().includes(searchUser.toLowerCase()) ||
            data.id.includes(searchUser)
          );
        });
        if (usersData.length) {
          setCurrentUsers(usersData);
        } else {
          setCurrentUsers([]);
        }
      }
    })();
  }, [searchUser]);

  const ChangeUserStatus = async (userId:any)=>{
    const data={
      userId
    }
    console.log(userId,"stats");
    const response:any = await ChangeUserStatusFunction(data)
    console.log(response,"ChangeUserStatusFunctionChangeUserStatusFunction");
    if(response.data.status){
      toast.success("Status Changed")
      setBlockUser(!blockUser)
    }
  }
  

  return (
    <section className="container mx-auto p-6 pt-0 mt-10 font-mono overflow-auto scrollbar-hide cursor-pointer">
      <div className="max-w-md mx-full ">
        <div className="relative flex items-center w-full h-12 mb-5 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            onChange={(e) => setSearchUser(e?.target?.value)}
            placeholder="Search user.."
          />
        </div>
      </div>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentUsers?.map((data: any, index: number) => {
                console.log(data.blocked,"BBLL");
                
                return (
                  <tr className="text-black font-roboto" key={data.fullName}>
                    <>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-10 h-10 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={
                                data.profile?.startsWith(
                                  "https://graph.facebook.com/"
                                )
                                  ? `${data?.profile}`
                                  : data?.profile
                                  ? `http://localhost:3000/profile/${data?.profile}`
                                  : `${profile}`
                              }
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">
                              {data?.fullName}
                            </p>
                            <p className="text-xs text-gray-600">{data?.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {data?.email}
                      </td>
                      <td className="px-4 py-3 text-md border">
                        <span className="px-2 py-1 leading-tight">
                          {data?.mobile}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-3 text-md border ${
                          data?.blocked ? "text-red-700" : "text-green-700"
                        }`}
                      >
                        {data?.blocked ? "Blocked" : "Active"}
                      </td>
                      <td
                        className={`px-4 py-3 text-md border ${
                          data?.blocked ? "text-green-700" : "text-red-700"
                        }`}
                        onClick={()=>ChangeUserStatus(data?.id)}
                      >
                        {data?.blocked ? "Unblock" : "Block"}
                      </td>
                    </>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UsersListComponent;
