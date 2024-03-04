import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SetSidebarOpenFunction } from "../../pages/user/Home";
import { showAllPostFuntion } from "../../utils/api/methods/PostService/get/showAllPost";
import { getUserByIdFuntion } from "../../utils/api/methods/UserService/post";
import { useDispatch } from "react-redux";
import {
  addPostData,
  clearPostData,
  clearPostUserData,
  isSinglePostModalOpen,
  setPostUserData,
} from "../../utils/ReduxStore/Slice/singlePostSlice";

const Post: React.FC<SetSidebarOpenFunction> = ({ setSidebarOpen }) => {
  const [posts, setPosts]: any = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const showPosts = async () => {
      const responce = await showAllPostFuntion();

      if (responce.status) {
        console.log("THIS IS I POSTS", responce.data);

        setPosts(responce.data);
      } else {
        toast.error("Eroor happence");
      }
    };
    showPosts();
  }, []);

  const handlePostClick = async (item: any) => {
    const responce = await getUserByIdFuntion(item.userId);
    dispatch(clearPostData());
    dispatch(clearPostUserData());
    dispatch(setPostUserData(responce.data));
    dispatch(addPostData(item));
    dispatch(isSinglePostModalOpen());
  };
  useEffect(() => {
    console.log("post updatedd,", posts);
  }, [posts]);
  setSidebarOpen(true);
  return (
    <>
      <div className=" scrollbar-hide w-full h-full justify-center sm:p-5 pt-10  overflow-y-auto gap-2">
        <div className="flex flex-wrap gap-2 ">
          <div className="w-full flex flex-wrap h-1/6 sm:h-2/6 justify-items-start lg:h-80 gap-1 sm:gap-2 sm:p-2 p-1 ">
            {posts &&
              posts.length > 0 &&
              posts?.map((item: any) => (
                <div className="w-72  h-hull" onClick={()=>handlePostClick(item)}>
                  <img
                    src={`http://localhost:3002/img/${item.mediaUrl[0]}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            
          </div>
        </div>
      </div>
      {/* <div className="w-screen h-full flex justify-between p-1 overflow-hidden scrollbar-hidden">
        <div className="hidden sm:block sm:w-3/6 md:w-1/5 sm:ml-16 lg:ml-0 lg:w-1/5 h-full scrollbar-hidden"></div>
        <div className=" w-full h-full flex  justify-center lg:justify-center overflow-x-hidden">
        <div className="flex flex-wrap justify-center md:justify-start md:ml-16 lg:ml-  w-full h-full">
    {posts && posts.length > 0 && (
        <>
            {posts.map((item:any) => (
                <div key={item._id} className="w-[145px] h-[145px] sm:w-2/6 sm:h-2/6 md:w-[240px] md:h-[240px] lg:w-72lg:h-80 bg-red-100 m-1 border" onClick={()=>handlePostClick(item)}>
                    <img src={`http://localhost:3002/img/${item.mediaUrl[0]}`} className="w-full h-full object-cover" alt="" />
                </div>
            ))}
        </>
    )}
</div>
        </div>
       </div> */}
    </>
  );
};

export default Post;
