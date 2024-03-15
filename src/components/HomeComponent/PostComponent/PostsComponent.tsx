import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPostOfUserFunction } from "../../../utils/api/methods/PostService/get/getAllPostOfUser";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";
import { Play } from "lucide-react";
import {
  addPostData,
  clearPostData,
  isSinglePostModalOpen,
  clearPostUserData,
  setPostUserData,
} from "../../../utils/ReduxStore/Slice/singlePostSlice";
import PostProfileShimmer from "../../../pages/shimmer/PostProfileShimmer";

const PostsComponent = ({ postLength, render, setRender }: any) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  let { user_id } = useParams();
  const singlePost = useSelector((state: any) => state.persisted.singlePost.singlePost);
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector((state: any) => state.persisted.user);
  const dispatch = useDispatch();

  const handlePostClick = async (item: any) => {
    const responce = await getUserByIdFuntion(item.userId);
    if (responce.status && responce.data) {
      dispatch(clearPostData());
      dispatch(clearPostUserData());
      dispatch(setPostUserData(responce?.data));
      dispatch(addPostData(item));
      dispatch(isSinglePostModalOpen());
    } else {
      toast.error("Api call fail");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user?.userData === undefined) {
          toast.error("user not find");
        } else {          
          const response:any = await getAllPostOfUserFunction(user_id);          
          if (response && response.data.status && response.data.data) {
            const data = response.data.data;
            setPosts(data);
            postLength(data?.length);
          }else{
            setPosts([]);
            postLength(0);
          }
        }
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [singlePost, addPostData, render, user_id]);

  useEffect(() => {
    setRender(!render);
  }, []);

  return (
    <>
      <div className="flex flex-wrap flex-row justify-center mt-5 pb-20 ">
        <div className="grid grid-cols-3 gap-0.5 md:gap-4 p-0.5">
          <>
            {loading ? (
              <PostProfileShimmer />
            ) : posts.length > 0 ? (
              posts.map((item: any) => {
                return (
                  <div
                    className="max-w-64 max-h-64"
                    key={item.id}
                    onClick={() => handlePostClick(item)}
                  >
                    {item.postType == "image" && (
                      <>
                        <img
                          className=" border border-amber-10 w-full h-full object-fill"
                          src={`http://localhost:3002/img/${item.mediaUrl[0]}`}
                          alt=""
                        />
                      </>
                    )}
                    {item.postType == "video" && (
                      <>
                        <video
                          className="border border-amber-10 w-full  object-fill h-64"
                          muted
                          autoPlay={isHovered}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <source
                            className="w-full h-full object-fill"
                            src={`http://localhost:3002/img/${item.mediaUrl[0]}`} // Provide the source URL of the video
                            type="video/mp4" // Set the type of the video file (replace 'mp4' with the actual video format)
                          />
                        </video>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="font-bold text-xl col-span-2 row-start-3 h-full">
                No posts.
              </p>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default PostsComponent;
