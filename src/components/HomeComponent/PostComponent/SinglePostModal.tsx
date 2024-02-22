import {
  ChevronLeft,
  ChevronRight,
  X,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isSinglePostModalClose,
  clearPostData,
  clearPostUserData,
  addPostData,
  isSinglePostModalOpen,
} from "../../../utils/ReduxStore/Slice/singlePostSlice";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { color } from "framer-motion";
import { LikePostFuntion } from "../../../utils/api/methods/PostService/Post/likePost";
import { toast } from "sonner";
import { AddCommentFunction } from "../../../utils/api/methods/PostService/Post/addComment";
const SinglePostModal = ({ render, setRender }: any) => {
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const singlePost = useSelector(
    (state: any) => state.persisted.singlePost.singlePost
  );
  const isSinglePostModal = useSelector(
    (state: any) => state.persisted.singlePost.isSinglePostModal
  );
  const postUserData = useSelector(
    (state: any) => state.persisted.singlePost.postUserData
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [date, setDate] = useState("");
  const [postCretedDate, setPostCreaetedDate]: any = useState(
    singlePost.createdAt
  );
  const [images, setImages] = useState(singlePost.mediaUrl);
  const [postUser, setPostUser] = useState(postUserData);
  const [liked, setLiked] = useState(false);
  const [text, setText] = useState("");

  const imageRightClick = () => {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const imageLeftClick = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timeAgo = getTimeAgo(postCretedDate);

    setDate(timeAgo);
  }, [singlePost]);

  useEffect(() => {
    if (singlePost.likes.includes(userData.userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, []);
  const handleModalClose = () => {
    dispatch(isSinglePostModalClose());
    dispatch(clearPostData());
    dispatch(clearPostUserData());
  };

  function getTimeAgo(createdAt: any) {
    return timeAgo.format(new Date(createdAt));
  }

  useEffect(() => {
    setRender(!render);
  }, []);
  const like = async () => {
    // const {postId,userId} =req.body
    const data = {
      userId: userData.userId,
      postId: singlePost._id,
    };
    const responce = await LikePostFuntion(data);
    if (responce.status) {
      setLiked(!liked);

      dispatch(clearPostData());
      dispatch(clearPostUserData());
      dispatch(addPostData(responce.data));
      dispatch(isSinglePostModalOpen());
    } else {
      toast.error(responce.message);
    }
  };

  const handleComment=async()=>{
    toast.success('k')
    const data = { 
        postId:singlePost._id,
         userId:userData.userId,
         content:text ,
         userName:userData.userName,
         userProfile:userData.profile
         };

         const responce =await AddCommentFunction(data)
         if(responce.status){
            toast.success('sucesss')
            setText('')
            dispatch(clearPostData());
      dispatch(clearPostUserData());
      dispatch(addPostData(responce.data));
      dispatch(isSinglePostModalOpen());
         }else{
            toast.error("erroor")
         }


  }
  

  return (
    <>
      <div className="fixed z-20 inset-0  w-screen h-screen  bg-black bg-opacity-85   flex flex-col p-5 ">
        <div className="w-full h-10 flex justify-end ">
          <X className="text-white cursor-pointer" onClick={handleModalClose} />
        </div>
        <div className="w-full h-full flex justify-between ">
          <div className="h-full w-10 flex items-center ">
            <button className="w-9 h-9 p-1.5 opacity-100 bg-white rounded-full">
              <ChevronLeft />
            </button>
          </div>
          <div className="h-full w-full flex justify-center items-center p-6  rounded-sm  ">
            <div className="w-5/6 h-full flex  rounded">
              <div className="h-full w-1/2 flex justify-center items-center bg-white">
                <div className="relative w-full h-full flex object-cover items-center ">
                  <div className="flex justify-start" onClick={imageLeftClick}>
                    <button className="absolute  text-black w-6 rounded-full h-6 bg-white bg-opacity-50 p-0.5">
                      <ChevronLeft size={20} />
                    </button>
                  </div>
                  <img
                    className="object-contain opacity-100 w-full h-full"
                    src={`http://localhost:3002/img/${images[imageIndex]}`}
                    alt=""
                  />

                  <div className="flex justify-end " onClick={imageRightClick}>
                    <button className="absolute text-black w-6 rounded-full h-6 bg-white p-0.5 bg-opacity-50">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-full w-1/2 bg-white border flex flex-col justify-between rounded-sm">
                <div className="w-full  h-1/6 flex justify-between border-b border-gray-100 shadow-sm">
                  <div className="h-full w-1/6 flex items-center justify-center">
                    <img
                      className="w-12 h-12 border-2 border-amber-100 rounded-full"
                      src={`http://localhost:3000/profile/${postUser?.profile?.profileUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="h-full w-full   flex justify-start  items-center ">
                    <div className="flex flex-col p-2">
                      <p className="font-semibold ">
                        {postUser?.basicInformation?.fullName}
                      </p>
                      <p className="">{postUser?.basicInformation?.userName}</p>
                    </div>
                  </div>
                  <div className="h-full w-1/6  flex justify-center items-center">
                    <div className="text-sm">
                      <MoreHorizontal />
                    </div>
                  </div>
                </div>
                <div className=" w-full  h-full overflow-y-auto flex flex-col p-1">
                  {/* one comment  */}
                  <div className="flex justify-between w-full  items-center border-b ">
                    <div className="h-full w-1/6  flex justify-center items-start p-1">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`http://localhost:3000/profile/${postUser?.profile?.profileUrl}`}
                        alt=""
                      />
                    </div>
                    <div className="h-full w-full flex flex-col p-1 overflow-hidden">
                      <div className="text-sm font-semibold">
                        {postUser?.basicInformation?.fullName}
                      </div>
                      <div className="flex flex-col overflow-wrap: break-word; text-gray-900">
                        {singlePost?.description}
                      </div>
                      <div className="flex  w-3/6  h-full justify-between items-center">
                        <p className="text-[13px] text-gray-400">{timeAgo.format(new Date(postCretedDate))}</p>
                        <div className="font-medium text-sm text-gray-700">
                          Replay
                        </div>
                        <div>
                          <MoreHorizontal className="w-5 " />
                        </div>
                      </div>
                    </div>
                    <div className="h-full w-1/6 flex justify-center items-start p-1 pt-2">
                      <Heart className="w-4" />
                    </div>
                  </div>
                  {/* one comment end */}
                  {singlePost?.comments?.length > 0 ? (
                      <>
                      {console.log('JJJJJJJ')
                      }

                      {singlePost.comments.map((item:any)=>{
                        {/* one comment  */}
                        return (
<>
{console.log(item,"JJJJTHIS")
}

                      <div key={item._id} className="flex justify-between w-full  items-center border-b ">
                      <div className="h-full w-1/6  flex justify-center items-start p-1">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`http://localhost:3000/profile/${item?.profile}`}
                          alt=""
                        />
                      </div>
                      <div className="h-full w-full flex flex-col p-1 overflow-hidden">
                        <div className="text-sm font-semibold">
                          {item.userName}
                        </div>
                        <div className="flex flex-col overflow-wrap: break-word;">
                          {item.content}
                        </div>
                        <div className="flex  w-3/6  h-full justify-between items-center">
                          <p className="text-[13px]">{timeAgo.format(new Date(item.createdAt))}</p>
                          <div className="font-medium text-sm">Replay</div>
                          <div>
                            <MoreHorizontal className="w-5 " />
                          </div>
                        </div>
                      </div>
                      <div className="h-full w-1/6 flex justify-center items-start p-1 pt-2">
                        <Heart className="w-4" />
                      </div>
                    </div>
                    {/* one comment end */}


                    </>
                    )
                      })}
                      
                    </>
                  ) : (
                    <>
                      <div className="h-full w-full items-center  flex flex-col justify-center p-1">
                        <p className="font-bold ">No Comments Yet </p>
                        <p>Start the conversation .</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full  h-2/6 flex flex-col justify-between border-t">
                  <div className="w-full h-2/6  flex justify-between">
                    <div className="w-5/6 h-full   flex ">
                      <div className="w-2/6 h-full flex justify-evenly  items-center">
                        <div onClick={like}>
                          <Heart
                            style={{ fill: liked ? "red" : "white" }}
                            color={liked ? "red" : undefined}
                            size={30}
                          />
                        </div>
                        <div>
                          <MessageCircle size={29} />
                        </div>
                        <div>
                          <Send size={25} />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6 flex justify-center items-center">
                      <Bookmark size={27} />
                    </div>
                  </div>
                  <div className="w-full h-2/6 flex flex-col pl-5">
                    <div className="font-semibold text-sm">
                      {singlePost.likes.length} likes
                    </div>
                    <div className="text-[13px] pl-1">{date}</div>
                  </div>
                  <div className="w-full h-2/6  border-t flex justify-start items-center p-1">
                    <div className="p-2">
                      <Smile />
                    </div>
                    <input
                      type="text"
                      className="w-full h-full p-2 outline-none "
                      placeholder="Add a comment.. "
                      value={text}
                      onChange={(e)=>setText(e.target.value)}
                    />
                    {text.length != 0 ? ( <> <p className="text-sm font-semibold p-2"onClick={handleComment}>post</p></>):(<div></div>)}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-10 flex items-center ">
            <button className="w-9 h-9 p-1.5 opacity-100 bg-white rounded-full">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostModal;
