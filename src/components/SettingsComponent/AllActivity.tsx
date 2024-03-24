import { ChevronRight, CircleUser, Heart, MessageCircle, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { GetLikedAndComentedPostFunction } from "../../utils/api/methods/PostService/get/GetLikedAndComentedPost";
import { getUserByIdFuntion } from "../../utils/api/methods/UserService/post";
import { addPostData, clearPostData, clearPostUserData, isSinglePostModalOpen, setPostUserData } from "../../utils/ReduxStore/Slice/singlePostSlice";
import { Link, useLocation, useParams } from "react-router-dom";

const AllActivity = () => {
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const [saved, setSaved] = useState<any>();
  const [posts, setPosts] = useState<any>();
  const [comments, setComments] = useState<any>();
const dispatch=useDispatch()
const {pathname}=useLocation()
const singlePost = useSelector((state: any) => state.persisted.singlePost.singlePost);
useEffect(() => {
    (async () => {
      const response: any = await GetLikedAndComentedPostFunction(
        userData.userId
      );

      if (response.data?.status) {
        const postsWithData: any = await Promise.all(
          response?.data?.post?.map(async (post: any) => {
            const userDataResponse = await getUserByIdFuntion(post.userId);
            if (userDataResponse.status) {
              const postDataWithUserData = {
                ...post,
                userData: userDataResponse.data,
              };
              return postDataWithUserData;
            } else {
              return null;
            }
          })
        );
        const filteredPosts = postsWithData.filter(
          (post: any) => post !== null
        );
        setPosts(filteredPosts);
      }

      if (response.data.status) {
        setPosts(response.data?.post);
        setComments(response.data?.comment)
        setSaved(response.data?.saved)
      } else {
        toast.error(response.data.message);
      }
    })();
  }, [singlePost]);
  const handlePostClick = async (item: any) => {
    const response = await getUserByIdFuntion(item.userId);    

    if (response.status) {
      dispatch(clearPostData());
      dispatch(clearPostUserData());
      dispatch(setPostUserData(response.data));
      dispatch(addPostData(item));
      dispatch(isSinglePostModalOpen());
    } else {
      toast.error("Api call fail");
    }
  };
  const fullPath = pathname.split('/');
const path = fullPath.pop();
  
  return (
    <>
      <div className="hidden sm:flex lg:ml-3 justify-center w-full overflow-hidden">  
      <div
    className="relative w-72 sm:w-[450px] md:w-[850px] h-[400px] sm:h-[500px] md:h-[700px] rounded-lg overflow-scroll scrollbar-hide"
  >
    <div className="flex justify-around mt-3 pb-3 border-b border-black">
      <Link to="/settings/allActivity/likes" className={`${path=="likes" ? "underline font-bold":""} flex `}>
        <Heart
          size={15}
          className={` w-full h-full`}
        />{" "}
        &nbsp;
        <p>Likes</p>
      </Link>
      <Link to="/settings/allActivity/comments" className={` ${path=="comments" ? "underline font-bold":""} flex `}>
        <MessageCircle
          size={15}
          className={`  w-full h-full `}
        />{" "}
        &nbsp;
        <p>Comment</p>
      </Link>
      <Link to="/settings/allActivity/saved" className={` ${path=="saved" ? "underline font-bold":""} flex `}>
        <CircleUser
          size={15}
          className={`  w-full h-full `}
        />{" "}
        &nbsp;
        <p>Saved</p>
      </Link>
    </div>

    <div className="flex flex-wrap overflow-y-auto">
      {path == "likes" && posts?.length ? (
        posts.map((data: any, index: number) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
            <div className="h-full">
              <img src={`http://localhost:3002/img/${data.mediaUrl[0]}`} alt=""
              onClick={()=>handlePostClick(data)}
              className="w-full h-full rounded-md" />
            </div>
          </div>
        ))
      ) : !posts?.length && path == "likes" && <p className="w-full h-96 flex justify-center items-center ">No Posts Found.</p> }

      {path == "comments" && comments?.length ? (
        comments.map((data: any, index: number) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
            <div className="h-full">
              <img src={`http://localhost:3002/img/${data.mediaUrl[0]}`} alt=""
              onClick={()=>handlePostClick(data)}
              className="w-full h-full rounded-md" />
            </div>
          </div>
        ))
      ) : !comments?.length && path == "comments" && <p className="w-full h-96 flex justify-center items-center ">No comments Found.</p> }

      {path == "saved" && saved?.length ? (
        saved.map((data: any, index: number) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
            <div className="h-full">
              <img src={`http://localhost:3002/img/${data.mediaUrl[0]}`} alt=""
              onClick={()=>handlePostClick(data)}
              className="w-full h-full rounded-md" />
            </div>
          </div>
        ))
      ) : !saved?.length && path == "saved" && <p className="w-full h-96 flex justify-center items-center ">No saved Found.</p> }

    </div>
  </div>
  </div>
  </>
  );
};

export default AllActivity;
