import { useEffect, useState } from "react";
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

const Post = () => {
  const [posts, setPosts]: any = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const showPosts = async () => {
      const response = await showAllPostFuntion();
      if (response.status) {
        setPosts(response.data);
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
  return (
    <>
      <div className=" scrollbar-hide w-full h-full flex justify- sm:p-5 pt-10  overflow-y-auto gap-2">
        <div className="flex flex-wrap gap-2 ">
          <div className="w-full flex flex-wrap h-1/6 sm:h-2/6 justify-center md:justify-around lg:h-80 gap-1 sm:gap-3 sm:p-2 p-1 ">
            {posts &&
              posts.length > 0 &&
              posts?.map((item: any) => {
                if(!item.blocked) {
                  return (
                    <div
                      className="w-72  h-72"
                      onClick={() => handlePostClick(item)}
                    >
                      {item.postType == "image" && (
                        <>
                          <img
                            className="w-full h-full object-cover "
                            src={`http://localhost:3002/img/${item.mediaUrl[0]}`}
                            alt=""
                          />
                        </>
                      )}
                      {item.postType == "video" && (
                        <>
                          <video
                            className="border border-amber-10 w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                          >
                            <source
                              src={`http://localhost:3002/img/${item.mediaUrl[0]}`} // Provide the source URL of the video
                              type="video/mp4" // Set the type of the video file (replace 'mp4' with the actual video format)
                            />
                          </video>
                        </>
                      )}
                    </div>
                  )}}
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
