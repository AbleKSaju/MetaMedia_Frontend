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
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isSinglePostModalClose,
  clearPostData,
  clearPostUserData,
  addPostData,
  isSinglePostModalOpen,
} from "../../../utils/ReduxStore/Slice/singlePostSlice";
import { LikePostFuntion } from "../../../utils/api/methods/PostService/Post/likePost";
import { toast } from "sonner";
import { AddCommentFunction } from "../../../utils/api/methods/PostService/Post/addComment";
import { ReportPostFunction } from "../../../utils/api/methods/PostService/Post/reportPost";
import { AddReplayToCommentFunction } from "../../../utils/api/methods/PostService/Post/addReplayToComment";
import { DeletePostFuntion } from "../../../utils/api/methods/PostService/Post/deletePost";
import { useNavigate } from "react-router-dom";
import { UpdateCommentFuntion } from "../../../utils/api/methods/PostService/Post/updateComent";
import { DeleteCommentFuntion } from "../../../utils/api/methods/PostService/Post/deleteComment";
import { DeleteReplayFunction } from "../../../utils/api/methods/PostService/Post/deleteReplay";
import { SavePostFunction } from "../../../utils/api/methods/PostService/Post/savePost";

const SinglePostModal = ({ render, setRender }: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const singlePost = useSelector(
    (state: any) => state.persisted.singlePost.singlePost
  );
  const Navigate = useNavigate();
  const isSinglePostModal = useSelector(
    (state: any) => state.persisted.singlePost.isSinglePostModal
  );
  const postUserData = useSelector(
    (state: any) => state.persisted.singlePost.postUserData
  );
  const [commentId, setCommentId] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [date, setDate] = useState("");
  const [isReplay, setIsReplay] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [postCretedDate, setPostCreaetedDate]: any = useState(
    singlePost.createdAt
  );
  const [replayUserName, setReplayUserName] = useState("");
  const [dotModal, setDotModal] = useState(false);
  const [images, setImages] = useState(singlePost.mediaUrl);
  const [postUser, setPostUser] = useState(postUserData);
  const [liked, setLiked] = useState(false);
  const [text, setText] = useState("");
  const [isReportModal, setIsReportModal] = useState(false);
  const [visibleCommentOptions, setVisibleCommentOptions] = useState(null);
  const [isDotOpen, setIsDotOpen] = useState(false);

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
    setRender(!render);
  };

  function getTimeAgo(createdAt: any) {
    return moment(createdAt).fromNow();
  }

  useEffect(() => {
    setRender(!render);
  }, []);
  const like = async () => {
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
    }
  };

  const handleComment = async () => {
    if (text.trim() == "") {
      toast.error("Please Enter a comment");
    } else {
      const data = {
        postId: singlePost._id,
        userId: userData.userId,
        content: text,
        userName: userData.userName,
        userProfile: userData.profile,
      };

      const responce = await AddCommentFunction(data);
      if (responce.status) {
        setText("");
        dispatch(clearPostData());
        dispatch(clearPostUserData());
        dispatch(addPostData(responce.data));
        dispatch(isSinglePostModalOpen());
      } else {
        toast.error("erroor");
      }
    }
  };

  const hanldeDelete = async () => {
    const data = {
      postId: singlePost._id,
    };
    const responce = await DeletePostFuntion(data);
    console.log(responce, "this is responce");

    if (responce.status) {
      toast.success("Deleted");
      dispatch(clearPostData());
      dispatch(clearPostUserData());
      dispatch(isSinglePostModalClose());
      Navigate(`/profile/${userData.userId}`);
    } else {
      toast.error("failed");
    }
  };

  const handleDot = () => {
    setDotModal(!dotModal);
  };

  const hanndleReport = () => {
    setIsReportModal(!isReportModal);
  };

  const reportApiCal = async (text: any) => {
    const data = {
      postId: singlePost._id,
      userId: userData.userId,
      content: text,
    };

    const responce = await ReportPostFunction(data);
    if (responce.status) {
      setDotModal(false);
      setIsReportModal(false);
    } else {
      toast.error("api call fail");
    }
  };

  const handleReplayToComment = async () => {
    if (text.trim() == "") {
      toast.error("Enter some thing");
    } else {
      const texted = replayUserName + text;
      const data = {
        postId: singlePost._id,
        commentId: commentId,
        content: texted,
        userId: userData.userId,
      };
      const responce = await AddReplayToCommentFunction(data);
      if (responce.status) {
        setText("");
        setIsReplay(false);
        dispatch(clearPostData());
        dispatch(addPostData(responce.data));
        dispatch(isSinglePostModalOpen());
      }
    }
  };

  const replayClick = (item: any) => {
    setIsReplay(!isReplay);
    setCommentId(item._id);
    setReplayUserName(`@${item.userName}:`);
    setText("");
  };

  useEffect(() => {
    if (!isReplay) {
      setText("");
    }
  }, [isReplay]);

  const handleReplayDot = (commentId: any) => {
    setIsDotOpen(!isDotOpen);
    setVisibleCommentOptions(commentId);
  };

  const handleComentEdit = (item: any) => {
    setCommentId(item._id);
    setIsUpdateComment(!isUpdateComment);
    setIsReplay(false);
    setText(item.content);
  };


  const updateComment = async () => {
    if (text.trim() == "") {
      toast.error("Enter Something");
    } else {
      const data = {
        postId: singlePost._id,
        commentId: commentId,
        comment: text,
      };

      const responce = await UpdateCommentFuntion(data);
      if (responce.status) {
        setText("");
        setIsReplay(false);
        setIsUpdateComment(false);
        dispatch(clearPostData());
        dispatch(addPostData(responce.data));
        dispatch(isSinglePostModalOpen());
      }
    }
  };

  useEffect(() => {
    if (!isUpdateComment) {
      setText("");
    }
  }, [isUpdateComment]);

  const handleDeleteComment = async (item: any) => {
    const data = {
      postId: singlePost._id,
      commentId: item._id,
    };
    const responce = await DeleteCommentFuntion(data);

    if (responce.status) {
      setText("");
      setIsReplay(false);
      setIsUpdateComment(false);
      dispatch(clearPostData());
      dispatch(addPostData(responce.data));
      dispatch(isSinglePostModalOpen());
    } else {
      toast.error(responce.message);
    }
  };

  const deleteReplay = async (comment: any, replay: any) => {
    const data = {
      postId: singlePost._id,
      commentId: comment._id,
      replayId: replay._id,
    };

    const responce: any = await DeleteReplayFunction(data);

    if (responce.status) {
      setText("");
      setIsReplay(false);
      setIsUpdateComment(false);
      dispatch(clearPostData());
      dispatch(addPostData(responce.data));
      dispatch(isSinglePostModalOpen());
    } else {
      toast.error(responce.message);
    }
  };

  const hanldeSave = async () => {
    const data = {
      postId: singlePost._id,
      userId: userData.userId,
    };

    const responce = await SavePostFunction(data);
    if (responce.status) {
      setText("");
      setIsReplay(false);
      setIsUpdateComment(false);
      dispatch(clearPostData());
      dispatch(addPostData(responce.data));
      dispatch(isSinglePostModalOpen());
    } else {
      toast.error(responce.message);
    }
  };

  const NavigateToUserProfile = (userId: string) => {
    console.log(userId, "userIduserIduserIduserId");
    Navigate(`/profile/${userId}`);
    dispatch(isSinglePostModalClose());
    dispatch(clearPostData());
    dispatch(clearPostUserData());
    setRender(!render);
  };

  return (
    <>
      <div className="fixed z-20 w-full h-screen bg-black bg-opacity-85 flex flex-col md:p-5 overflow-y-auto">
        <div className="w-full absolute top-3 sm:relative z-30 md:z-0 h-10 flex justify-end ">
          <X className="text-white cursor-pointer" onClick={handleModalClose} />
        </div>
        {dotModal && (
          <div className=" absolute w-[85%] hidden md:flex top-24 justify-end ">
            <div className="flex bg-white border  rounded-lg shadow-xl w-64 h-52 flex-col justify-evenly cursor-pointer">
              {userData.userId == singlePost.userId ? (
                <>
                  <div
                    className="w-full border h-14 flex items-center justify-center font-medium text-sm "
                    onClick={hanldeDelete}
                  >
                    Delete
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-full border h-14 flex items-center justify-center font-medium text-sm "
                    onClick={hanndleReport}
                  >
                    Report
                  </div>
                </>
              )}
              <div className="w-full border h-14 flex items-center justify-center font-medium text-sm">
                Go to Post
              </div>
              <div className="w-full border h-14 flex items-center justify-center font-medium text-sm">
                Share To
              </div>
              <div
                className="w-full border h-14 flex items-center justify-center font-medium text-sm"
                onClick={handleDot}
              >
                Cancel
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-full flex justify-between overflow-y-auto md:overflow-hidden scrollbar-hide">
          <div className="h-full w-full flex justify-center items-center rounded-sm ">
            <div className="w-full md:w-5/6 h-full flex-col md:flex-row flex rounded">
              <div className="h-96 md:h-full w-full md:w-1/2 flex justify-center items-center bg-white">
                <div className="relative w-full h-full flex object-cover items-center ">
                  <div className="flex justify-start" onClick={imageLeftClick}>
                    {images.length > 1 && (
                      <button className="absolute text-black w-6 rounded-full h-6 bg-white bg-opacity-50 p-0.5">
                        <>
                          <ChevronLeft size={20} />
                        </>
                      </button>
                    )}
                  </div>
                  {singlePost.postType == "image" && (
                    <>
                      <img
                        className="object-contain opacity-100 w-full h-full "
                        src={`http://localhost:3002/img/${images[imageIndex]}`}
                        alt=""
                      />
                    </>
                  )}
                  {singlePost.postType == "video" && (
                    <>
                      <video
                        className="border border-black w-full h-full object-contain"
                        controls
                      >
                        <source
                          src={`http://localhost:3002/img/${singlePost.mediaUrl[0]}`} // Provide the source URL of the video
                          type="video/mp4" // Set the type of the video file (replace 'mp4' with the actual video format)
                        />
                      </video>
                    </>
                  )}

                  <div className="flex justify-end " onClick={imageRightClick}>
                    {images.length > 1 && (
                      <>
                        <button className="absolute text-black w-6 rounded-full h-6 bg-white p-0.5 bg-opacity-50">
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isReportModal && (
                <>
                  <div className="fixed w-screen h-screen  bg-black bg-opacity-70  flex justify-center pt-20 right-4  ">
                    <div className=" w-96 h-96 flex flex-col   bg-white border rounded-lg  shadow-lg cursor-pointer">
                      <div className="p-2 border-b w-full h-1/6 flex  justify-center items-center font-bold text-sm rounded">
                        Why are you reporting this post?
                      </div>

                      <div
                        className="p-2 border-b w-full h-1/6 flex justify-center items-center  text-sm rounded"
                        onClick={() => reportApiCal("its a spam .?")}
                      >
                        its a spam .?
                      </div>
                      <div
                        className="p-2 border-b w-full h-1/6 flex justify-center items-center  text-sm rounded"
                        onClick={() =>
                          reportApiCal("Suicide, self-injury guidelines")
                        }
                      >
                        Suicide, self-injury guidelines
                      </div>
                      <div
                        className="p-2 border-b w-full h-1/6 flex justify-center items-center  text-sm rounded"
                        onClick={() =>
                          reportApiCal("being bullied or harassed?")
                        }
                      >
                        being bullied or harassed?
                      </div>
                      <div
                        className="p-2 border-b w-full h-1/6 flex justify-center items-center  text-sm rounded"
                        onClick={() =>
                          reportApiCal("Nudity or sexual activity")
                        }
                      >
                        Nudity or sexual activity
                      </div>
                      <div
                        className="p-2 border-b w-full h-1/6 flex justify-center items-center  text-sm rounded"
                        onClick={hanndleReport}
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="h-full w-full md:w-1/2 border flex flex-col rounded-sm bg-white">
                <div className="w-full h-28 flex md:hidden flex-col justify-around border-t ">
                  <div className="w-full h-2/6  flex justify-between">
                    <div className="w-5/6 h-full   flex ">
                      <div className="w-2/6 h-full flex justify-evenly  items-center">
                        <div onClick={like}>
                          {liked ? (
                            <>
                              <Heart
                                style={{ fill: "red" }}
                                color={"red"}
                                className="ml-2 h-7 w-7 md:h-8 md:w-9"
                              />
                            </>
                          ) : (
                            <>
                              <Heart className="ml-2 h-7 w-7 md:h-8 md:w-9" />
                            </>
                          )}
                        </div>
                        <div>
                          <MessageCircle className="ml-2 h-7 w-7 md:h-8 md:w-9" />
                        </div>
                        <div>
                          <Send className="ml-2 h-7 w-6 md:h-8 md:w-9" />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6 flex justify-center items-center">
                      <Bookmark
                        size={27}
                        color="black"
                        style={{
                          fill: singlePost?.saved?.includes(userData.userId)
                            ? "black"
                            : undefined,
                        }}
                        onClick={hanldeSave}
                      />
                    </div>
                  </div>
                  <div className="w-full h-2/6 flex flex-col pl-5">
                    <div className="font-semibold text-sm">
                      {singlePost.likes.length} likes
                    </div>
                    <div className="text-[13px] pl-1">{date}</div>
                  </div>
                </div>
                <div className="w-full h-16 mt-3 flex justify-between border-b border-gray-100 shadow-sm">
                  <div className="h-full w-1/6 flex items-center justify-center">
                    <img
                      onClick={() =>
                        NavigateToUserProfile(postUser.basicInformation.userId)
                      }
                      className="w-8 h-8 md:w-12 md:h-12 border-2 border-black rounded-full"
                      src={`http://localhost:3000/profile/${postUser?.profile?.profileUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="h-full w-full   flex justify-start  items-center ">
                    <div className="flex flex-col p-2">
                      <p className="font-semibold ">
                        {postUser?.basicInformation?.fullName}
                      </p>
                      {singlePost?.description}
                    </div>
                  </div>
                  <div className="h-full w-1/6 hidden md:flex justify-center items-center">
                    <div className="text-sm" onClick={handleDot}>
                      <MoreHorizontal />
                    </div>
                  </div>
                </div>
                {/* one comment  */}

                {/* one comment end */}

                <div className=" w-full h-full overflow-y-scroll md:flex flex-col scrollbar-hide">
                  {singlePost?.comments?.length > 0 ? (
                    <>
                      {singlePost.comments
                        .slice()
                        .reverse()
                        .map((item: any) => {
                          return (
                            <>
                              <div
                                key={item._id}
                                className="flex justify-between w-full items-center border-b "
                              >
                                <div className="h-full w-1/6  flex justify-center items-start p-1">
                                  <img
                                    className="w-6 md:w-10 h-6 md:h-10 rounded-full"
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
                                  <div className="flex  w-40  h-full justify-between items-center gap-2">
                                    <p className="text-[13px]">
                                      {moment(item.createdAt).fromNow()}
                                    </p>
                                    <div
                                      className="font-medium text-[12px]"
                                      onClick={() => replayClick(item)}
                                    >
                                      Replay
                                    </div>
                                    <div>
                                      {userData.userId == item.userId && (
                                        <MoreHorizontal
                                          className="w-5 "
                                          onClick={() =>
                                            handleReplayDot(item._id)
                                          }
                                        />
                                      )}
                                    </div>
                                    {isDotOpen &&
                                      visibleCommentOptions === item._id && (
                                        <div className="fixed w-16 h-10 bg-white border flex justify-between items-center flex-col mt-5 ml-48 rounded-md">
                                          <div
                                            className="w-full h-5 flex justify-center items-center text-sm border-b"
                                            onClick={() =>
                                              handleComentEdit(item)
                                            }
                                          >
                                            edit
                                          </div>
                                          <div
                                            className="w-full h-5 flex justify-center items-center text-sm"
                                            onClick={() =>
                                              handleDeleteComment(item)
                                            }
                                          >
                                            delete
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                  {item.replay.length > 0 && (
                                    <>
                                      {item.replay.map((replay: any) => {
                                        return (
                                          <>
                                            <div className="flex flex-col  mt-2 ">
                                              <div className=" h-10  ml-5 w-8/12   flex justify-between border p-2 rounded-md">
                                                <div className="w-5/12 flex justify-start items-center">
                                                  <img
                                                    src="https://i.pinimg.com/736x/ae/ea/57/aeea57bf10e83de82769db03e9210a17.jpg"
                                                    className="w-8 h-8 object-cover rounded-full border "
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="w-full scrollbar-hide flex justify-start items-center flex-wrap overflow-y-auto text-sm">
                                                  {replay.content}
                                                </div>
                                                {replay.userId ==
                                                  userData.userId && (
                                                  <>
                                                    <div
                                                      className="border flex justify-center items-center text-sm p-2 rounded-md border-[#]"
                                                      onClick={() =>
                                                        deleteReplay(
                                                          item,
                                                          replay
                                                        )
                                                      }
                                                    >
                                                      delete
                                                    </div>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </>
                                        );
                                      })}
                                    </>
                                  )}
                                </div>
                                <div className="h-full w-1/6 flex justify-center items-start p-1 pt-2"></div>
                              </div>
                            </>
                          );
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
                <div className=" h-16 md:h-60 flex flex-col justify-end">
                  <div className="w-full h-28 hidden md:flex flex-col justify-around border-t">
                    <div className="w-full h-2/6  flex justify-between">
                      <div className="w-5/6 h-full   flex ">
                        <div className="w-2/6 h-full flex justify-evenly  items-center">
                          <div onClick={like}>
                            {liked ? (
                              <>
                                <Heart
                                  style={{ fill: "red" }}
                                  color={"red"}
                                  className="ml-2 h-7 w-7 md:h-8 md:w-9"
                                />
                              </>
                            ) : (
                              <>
                                <Heart className="ml-2 h-7 w-7 md:h-8 md:w-9" />
                              </>
                            )}
                          </div>
                          <div>
                            <MessageCircle className="ml-2 h-7 w-7 md:h-8 md:w-9" />
                          </div>
                          <div>
                            <Send className="ml-2 h-7 w-6 md:h-8 md:w-9" />
                          </div>
                        </div>
                      </div>
                      <div className="w-1/6 flex justify-center items-center">
                        <Bookmark
                          size={27}
                          color="black"
                          style={{
                            fill: singlePost?.saved?.includes(userData.userId)
                              ? "black"
                              : undefined,
                          }}
                          onClick={hanldeSave}
                        />
                      </div>
                    </div>
                    <div className="w-full h-2/6 flex flex-col pl-5">
                      <div className="font-semibold text-sm">
                        {singlePost.likes.length} likes
                      </div>
                      <div className="text-[13px] pl-1">{date}</div>
                    </div>
                  </div>
                  <div className=" bottom-0 z-40 fixed md:relative bg-white w-full h-12 md:h-14 border-t flex justify-start items-end p-1">
                    <div className="p-2">
                      <Smile />
                    </div>
                    <input
                      type="text"
                      className="w-full h-full p-2 outline-none "
                      placeholder="Add a comment.. "
                      value={isReplay ? `${replayUserName} ${text}` : text}
                      onChange={(e) =>
                        setText(
                          e.target.value.replace(`${replayUserName} `, "")
                        )
                      }
                    />
                    {isReplay ? (
                      <>
                        {text?.length != 0 ? (
                          <>
                            {" "}
                            <p
                              className="text-sm font-semibold p-2"
                              onClick={handleReplayToComment}
                            >
                              replay
                            </p>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </>
                    ) : (
                      <>
                        {isUpdateComment ? (
                          <>
                            {text?.length != 0 ? (
                              <>
                                {" "}
                                <p
                                  className="text-sm font-semibold p-2"
                                  onClick={updateComment}
                                >
                                  update
                                </p>
                              </>
                            ) : (
                              <div></div>
                            )}
                          </>
                        ) : (
                          <>
                            {text?.length != 0 ? (
                              <>
                                {" "}
                                <p
                                  className="text-sm font-semibold p-2"
                                  onClick={handleComment}
                                >
                                  post
                                </p>
                              </>
                            ) : (
                              <div></div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="h-full w-10 flex items-center ">
            <button className="w-9 h-9 p-1.5 opacity-100 bg-white rounded-full hidden">
              <ChevronRight />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SinglePostModal;
