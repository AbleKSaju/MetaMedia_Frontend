import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  SendHorizonal,
} from "lucide-react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdFuntion } from "../../utils/api/methods/UserService/post";
import {
  addPostData,
  clearPostData,
  clearPostUserData,
  isSinglePostModalOpen,
  setPostUserData,
} from "../../utils/ReduxStore/Slice/singlePostSlice";
import { toast } from "sonner";
import { LikePostFuntion } from "../../utils/api/methods/PostService/Post/likePost";
import { SavePostFunction } from "../../utils/api/methods/PostService/Post/savePost";
import { useState } from "react";
import { AddCommentFunction } from "../../utils/api/methods/PostService/Post/addComment";
import { useNavigate } from "react-router-dom";

const PostScroll = ({ data, render, setRender }: any) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector((state: any) => state.persisted.user.userData);

  const hanldeSave = async (postId: string) => {

    const data = {
      postId: postId,
      userId: userData.userId,
    };

    const response = await SavePostFunction(data);
    if (response.status) {
      setRender(!render);
    }
  };

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

  const like = async () => {
    const datas = {
      userId: userData.userId,
      postId: data._id,
    };
    const response = await LikePostFuntion(datas);
    if (response.status) {
      setRender(!render);
    }
  };

  const AddComment = async () => {
    try {      
      const messageData = {
        postId: data._id,
        userId: userData.userId,
        content: comment,
        userName: userData.userName,
        userProfile: userData.profile,
      };

      const response = await AddCommentFunction(messageData);      
      if (response.status) {
        setComment("");
        setRender(!render);
      } else {
        toast.error("erroor");
      }
    } catch (error) {}
  };

  const NavigateToUserProfile=(userId:string)=>{
    Navigate(`/profile/${userId}`)
  }

  return (
    <>
      <div className=" md:p-5 sm:p-3 pt-7 w-full sm:w-full flex justify-center sm:pl-0 lg:p-4  ">
        <div className=" flex flex-col justify-center bg-white shadow-md bg-clip-border rounded-lg lg:w-[520px] lg:h-[800px] border w-[300px] md:w-[450px] sm:w-[330px]">
          <div className="flex p-2 sm:p-4 md:p-3 sm:pl-5">
            <img
              className="lg:w-10 lg:h-10 font-roboto rounded-full lg:ml-6 lg:mt-1 md:ml-3  md:border-2 border-amber-100 border-2 lg:border-2 w-10 h-10 md:w-12 md:h-12 "
              onClick={()=>NavigateToUserProfile(data.userData.basicInformation.userId)}
              src={
                data.userData?.profile?.profileUrl.startsWith("https://graph")
                  ? data.userData?.profile?.profileUrl
                  : `http://localhost:3000/profile/${data.userData?.profile?.profileUrl}`
              }
              alt=""
            />
            <p className="lg:pt-3 lg:pl-4 text-sm md:text-md font-semibold text-black md:pt-4 md:pl-3 p-2 pt-3  pl-5 ">
              {data.userData.basicInformation.fullName}
            </p>
            <p className="lg:pt-4 lg:pl-4 sm:text-sm text-[3px]  font-roboto text-black  md:pt-5  md:pl-0 p-2 pt-4 pl-0  sm:pl-5 sm:pt-4  "></p>
          </div>
          <div
            className="relative md:mx-4 mt-0 overflow-hidden text-gray-700  shadow-lg bg-clip-border rounded-md lg:h-[500px]"
            onClick={() => handlePostClick(data)}
          >
            {data.postType == "image" && (
              <>
                <img
                  className="w-full h-full "
                  src={`http://localhost:3002/img/${data.mediaUrl[0]}`}
                  alt=""
                  loading="lazy"
                />
              </>
            )}
            {data.postType == "video" && (
              <>
                <video
                  className="border border-amber-10 w-full h-full object-fill"
                  controls
                >
                  <source
                    src={`http://localhost:3002/img/${data.mediaUrl[0]}`} // Provide the source URL of the video
                    type="video/mp4" // Set the type of the video file (replace 'mp4' with the actual video format)
                  />
                </video>
              </>
            )}
          </div>
          <div className="flex md:pl-7 lg:pl-7 sm:pl-5   sm:pt-4 sm:p-2 lg:p-6 lg:pt-4 lg:gap-5 sm:gap-2 md:gap-4 pl-4 gap-1 pt-3">
            <div onClick={like}>
              {data.likes.includes(userData.userId) ? (
                <>
                  <Heart
                    style={{ fill: "red" }}
                    color={"red"}
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                </>
              ) : (
                <>
                  <Heart className="h-6 w-6 md:h-8 md:w-8" />
                </>
              )}
            </div>
            <div>
              <MessageCircle
                className="h-6 w-6 md:h-8 md:w-8 text-black "
                onClick={() => handlePostClick(data)}
              />
            </div>
            <div>
              <Send className="text-black h-6 w-6 md:h-8 md:w-8" />
            </div>
            <div
              onClick={() => hanldeSave(data._id)}
              className="lg:pl-74 sm:pl-[52%] md:pl-[58%] pl-40 "
            >
              {data.saved.includes(userData.userId) ? (
                <>
                  <Bookmark
                    style={{ fill: "black" }}
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                </>
              ) : (
                <>
                  <Bookmark className="h-6 w-6 md:h-8 md:w-8" />
                </>
              )}
            </div>
          </div>
          <div className="lg:pl-8 pt-2 pl-5 text-[10px] sm:text-sm md:pl-8 md:pt-2 font-semibold font-roboto text-black sm:pl-8 sm:p-1">
            {data.likes.length} likes
          </div>
          <div className="lg:pl-8 p-2 text-[13px] pl-5 sm:text-md font-semibold text-black md:pl-8 sm:pl-8">
            {data.userData.basicInformation.fullName} :{" "}
            <span className="sm:text-sm pl-1 text-[10px] font-normal text-black md:pl-1 sm:pl-1 ">
              {data?.description}
            </span>
          </div>
          <div className="ml-9 text-[12px] text-gray-500">
            {moment(data.createdAt).fromNow()}
          </div>
          <div className="sm:text-[14px] text-[10px] font-roboto font-normal pl-5  lg:pl-8 p-2 md:pl-8 sm:pl-8">
            {data.comments.length > 0 ? (
              <p onClick={() => handlePostClick(data)}>
                View {data.comments.length} comments
              </p>
            ) : (
              // <p>Add a comment</p>
              ""
            )}
          </div>
          <div className="sm:text-[14px] text-[10px] mb-2 pl-4 px-2 font-roboto font-normal flex lg:pl-8 md:pl-8 sm:pl-8 ">
            <input
              className="w-3/4 outline-none  hover:border-b py-2 border-black "
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              name=""
              id=""
              placeholder=" Add comment..."
            />
            {comment.length !== 0 && comment.trim() !== "" && (
              <SendHorizonal onClick={() => AddComment()} className="" />
            )}
            <div className="sm:pt-2 md:pt-2 lg:p-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostScroll;
