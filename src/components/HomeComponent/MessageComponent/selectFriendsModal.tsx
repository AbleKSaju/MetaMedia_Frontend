import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { addMembers } from "../../../utils/ReduxStore/Slice/newGropSlice";
import { CreateNewGroupFuntion } from "../../../utils/api/methods/ChatService/post/post";
const SelectFriendsModal = ({ setewGroup }: any) => {
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const GroupData = useSelector((state: any) => state.persisted.group);
  const [friends, setFriends] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();
  const handleX = () => {
    setewGroup(0);
  };

  const hanldeSelect = (user: any) => {
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.findIndex(
        (selectedUser: any) =>
          selectedUser.basicInformation.userId === user.basicInformation.userId
      );
      if (selectedIndex !== -1) {
        const updatedSelected = [
          ...prevSelected.slice(0, selectedIndex),
          ...prevSelected.slice(selectedIndex + 1),
        ];
        return updatedSelected;
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const handleCreate = async () => {
    dispatch(addMembers(selected));
    const userIds = selected.map((user: any) => user.basicInformation.userId);
    const data = {
      title: GroupData.title,
      description: GroupData.description,
      members: userIds,
      image: GroupData.file,
      admin: GroupData.admin,
      adminName: userData.userName,
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("members", JSON.stringify(data.members));
    formData.append("admin", data.admin);
    formData.append("adminName", data.adminName);
    formData.append("image", data.image);

    const response = await CreateNewGroupFuntion(formData);
    setewGroup(0);
  };

  const handleSearch = (text: string) => {
    setSearchText(text); // Update search text state
  };

  // Filtered friends based on search text
  const filteredFriends = friends.filter((user) =>
    user.basicInformation.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const response = await getUserByIdFuntion(userData.userId);
      if (response.status) {
        const followersDataPromises =
          response.data.socialConections.followers.map(
            async (follower: any) => {
              const followerResponse = await getUserByIdFuntion(
                follower.userId
              );
              if (followerResponse.status) {
                return followerResponse.data;
              }
              return null;
            }
          );

        Promise.all(followersDataPromises)
          .then((followersData) => {
            const filteredFollowersData = followersData.filter(
              (followerData) => followerData !== null
            );
            setFriends(filteredFollowersData);
          })
          .catch((error) => {
            console.error("Error fetching follower data:", error);
            toast.error("Failed to fetch follower data");
          });
      }
    })();
  }, [userData.userId, setewGroup]);

  return (
    <div className="bg-black w-screen h-screen fixed bg-opacity-65 backdrop-blur-[2px] z-10 flex justify-center items-center flex-col">
      <div className="bg-white border w-5/12 h-4/6 flex flex-col rounded-md">
        <div className="h-12 w-full flex justify-center items-center font-semibold border-b border-[#C1506D]">
          <div className="w-11/12 flex justify-center">Select friends</div>
          <div className="flex justify-end">
            <X size={21} onClick={handleX} />
          </div>
        </div>
        <div className="w-full h-full flex flex-col p-2">
          <div className="w-full relative p-3 flex justify-center items-center">
            <div className="absolute inset-y-0 left-36 pl-3 flex items-center pointer-events-none">
              <Search size={24} color="grey" />
            </div>
            <input
              type="text"
              className="w-812 h-10 pl-10 pr-3 border-b border-[#C1506D] outline-none"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="w-full  h-full overflow-y-auto scrollbar-hide  flex flex-col items-center ">
            <div className="w-full h-full overflow-hidden flex items-center">
              <div className="w-full flex-col flex overflow-y-auto h-5/6 items-center">
                {filteredFriends.length > 0 ? (
                  filteredFriends.map((user: any) => (
                    <div
                      key={user.basicInformation.userId}
                      className="w-9/12 h-16 border flex justify-between border-[#C1506D] rounded-md mt-2 flex-none"
                      style={{
                        backgroundColor: selected.find(
                          (selectedUser: any) =>
                            selectedUser.basicInformation.userId ===
                            user.basicInformation.userId
                        )
                          ? "#ffe4e6"
                          : "transparent", // Change 'lightgray' to the desired background color
                      }}
                    >
                      <div className="w-3/12 flex justify-center items-center">
                        <img
                          src={`http://localhost:3000/profile/${user?.profile?.profileUrl}`}
                          className="w-14 h-14 rounded-full border border-[#C1506D]"
                          alt=""
                        />
                      </div>
                      <div className="w-6/12 flex justify-start items-center">
                        <p className="font-semibold text-[#C1506D]">
                          {user.basicInformation.fullName}
                        </p>
                      </div>
                      <div className="w-3/12 flex justify-center items-center">
                        {selected.find(
                          (selectedUser: any) =>
                            selectedUser.basicInformation.userId ===
                            user.basicInformation.userId
                        ) ? (
                          <button
                            className="text-[12px] border border-[#C1506D] p-2 h-7 w-14 flex justify-center items-center font-semibold text-white bg-[#C1506D] rounded-md"
                            onClick={() => hanldeSelect(user)}
                          >
                            Selected
                          </button>
                        ) : (
                          <button
                            className="text-[12px] border border-[#C1506D] p-2 h-7 w-14 flex justify-center items-center font-semibold text-white bg-[#C1506D] rounded-md"
                            onClick={() => hanldeSelect(user)}
                          >
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No matching friends found</p>
                )}
              </div>
            </div>
          </div>
          {selected.length > 0 && (
            <div className="w-full h-10 flex justify-center items-center">
              {" "}
              <button
                className="text-sm border border-[#C1506D] p-2 h-7 w-14 flex justify-center items-center  font-semibold text-[#C1506D] rounded-md"
                onClick={handleCreate}
              >
                Create
              </button>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectFriendsModal;
