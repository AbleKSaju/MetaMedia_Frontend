import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearImages } from "../../../../utils/ReduxStore/Slice/postSlice";
import { toast } from "sonner";
import { AddPostFuntion } from "../../../../utils/api/methods/PostService/Post/addPost";
import { Base64 } from "js-base64";
import { searchLocationFuntion } from "../../../../utils/api/methods/PostService/Post/searchLocaation";
import { getLatAndLogFuntion } from "../../../../utils/api/methods/PostService/Post/getLatAndLog";
import { useNavigate } from "react-router-dom";
import { getUsersByNameFunction } from "../../../../utils/api/methods/UserService/post";
import profile from "../../../../assets/profile.webp";
const AddPostDetailsBody = ({
  setIsAddPost,
  setPostState,
  addPost,
  setAddPost,
  render,
  setRender,
}: any) => {
  const post = useSelector((state: any) => state.persisted.post);
  const user = useSelector((state: any) => state.persisted.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isLocation, setIslocation] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc]: any = useState(null);
  const [text, setText] = useState("");
  const [imglength, setImageLength] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hideLike, setHideLike] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsvideo] = useState(false);
  const [vedioFile, setVideoFile]: any = useState([]);
  const [vedioUrl, setVedioUrl]: any = useState(null);
  const [hideComment, setHideComment] = useState(false);
  const [location, setLocation] = useState("");
  const [responceLocation, setResponceLocatoin] = useState([]);
  const [tageUser, setTagUsers] = useState("");
  const [resTagUser, setResTagUsers] = useState([]);
  const [selectedLocationlatAndLog, setSelectedLocationlatAndLog]: any =
    useState("");
  const [isSelected, setIsSelcted] = useState(false);
  const [tagedUserData, setTagedUserData]: any = useState([]);
  const maxLength = 500;

  useEffect(() => {
    try {
      if (post?.images && post?.images[0]?.length > 0) {
        setImageLength(post.images[0].length);
        setSelectedImageSrc(post.images[0][0]);
        setSelectedImageIndex(0);
        setIsImage(true);

        setSelectedImageSrc(post.images[0][selectedImageIndex]);
      } else if (post.videos.length > 0) {
        setVideoFile(post.videos[0]);
        const videoURL = URL.createObjectURL(post.videos[0]);
        if (videoURL) {
          setVedioUrl(videoURL);
          setIsvideo(true);
        } else {
        }
      }
    } catch (error) {
      console.log("ERROR FROM CATCH ", error);
    }
  }, [post]);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  useEffect(() => {}, [tagedUserData]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const tagToggleDropdown = () => {
    setIsTagOpen(!isTagOpen);
  };
  const handleBack = () => {
    dispatch(clearImages());
    setPostState(1);
  };

  const searchLocationToggle = () => {
    setIslocation(!isLocation);
  };

  const hancleHideLike = () => {
    setHideLike(!hideLike);
  };
  const handleCommenthide = () => {
    setHideComment(!hideComment);
  };

  const handleNext = () => {
    setSelectedImageIndex(selectedImageIndex + 1);
    setSelectedImageSrc(post.images[0][selectedImageIndex + 1]);
  };

  const handlePrev = () => {
    setSelectedImageIndex(selectedImageIndex - 1);
    setSelectedImageSrc(post.images[0][selectedImageIndex - 1]);
  };

  function generateRandomFilename() {
    // Generate a random number and convert it to base 36
    let random = Math.random().toString(36).substring(7);

    // Get the current timestamp
    let timestamp = new Date().getTime();

    // Concatenate the random number and timestamp to create the filename
    return "file_" + random + "_" + timestamp;
  }

  function base64toFile(base64StringArray: any) {
    // Create an array to store the file objects
    let files = [];

    // Iterate over each Base64 string in the array
    for (let i = 0; i < base64StringArray.length; i++) {
      let base64String = base64StringArray[i];
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
      let filename = generateRandomFilename(); // Generate a random filename

      // Decode the Base64 string
      let byteCharacters = Base64.atob(base64Data);

      let byteNumbers = new Array(byteCharacters.length);
      for (let j = 0; j < byteCharacters.length; j++) {
        byteNumbers[j] = byteCharacters.charCodeAt(j);
      }
      let byteArray = new Uint8Array(byteNumbers);

      // Create a File from the decoded binary data
      let file = new File([byteArray], filename + ".jpg", {
        type: "application/octet-stream",
      });

      // Push the file object to the array
      files.push(file);
    }

    return files;
  }

  useEffect(() => {
    const getData = setTimeout(async () => {
      const res = await searchLocationFuntion(location);
      setResponceLocatoin(res);
    }, 1000);

    return () => clearTimeout(getData);
  }, [location]);

  useEffect(() => {
    const getUser = setTimeout(async () => {
      const res = await getUsersByNameFunction(tageUser);
      if (res.status) {
        setResTagUsers(res.data);
      }
    }, 1000);

    return () => clearTimeout(getUser);
  }, [tageUser]);

  const selectLocation = async (data: any) => {
    const responce = await getLatAndLogFuntion(data.mapbox_id);
    const savedPlace = {
      name: data.name,
      lat: responce,
    };

    setSelectedLocationlatAndLog({});
    setSelectedLocationlatAndLog(savedPlace);
    setIslocation(false);
    setIsSelcted(true);
  };

  const AddPost = async () => {
    const tagedUserIds = await tagedUserData.map(
      (userData: any) => userData.userId
    );

    let media, postType: string;

    if (isImage) {
      const files = base64toFile(post.images[0]);
      media = files;
      postType = "image";
    } else {
      media = vedioFile;
      postType = "video";
    }

    if (!user.userData) {
      toast.error("Please login to make this post");
      navigate("login");
      return;
    }

    if (text.trim() === "") {
      toast.error("Add a caption for your post");
      return;
    }

    const latData = {
      name: selectedLocationlatAndLog?.name,
      latitude: selectedLocationlatAndLog?.lat?.latitude,
      longitude: selectedLocationlatAndLog?.lat?.longitude,
    };

    const data: any = {
      userId: user.userData.userId,
      description: text,
      likes: [],
      comments: [],
      media: media,
      shareCount: 0,
      tags: tagedUserIds,
      location: JSON.stringify({ latData }),
      reports: [],
      postCropSize: post.aspectRatio,
      postType: postType,
      showComment: hideComment,
      showLikes: hideLike,
    };

    try {
      const res: any = await AddPostFuntion({ data });
      if (res.status) {
        setRender(!render);
        setAddPost(!addPost);
        setPostState(false);
        navigate(`/profile/${user?.userData?.userId}`);
        setIsAddPost(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const serchLocation = async (data: string) => {
    setLocation(data);
  };

  const selectTagPeople = (user: any) => {
    const userId = user.basicInformation.userId;
    if (!tagedUserData.some((data: any) => data.userId === userId)) {
      const data = {
        userId: userId,
        name: user.basicInformation.fullName,
        profile: user.profile.profileUrl,
      };
      toast.success(`Tagged ${user.basicInformation.fullName}`);
      setTagedUserData((prevState: any) => [...prevState, data]);
    } else {
      toast.error("This user is already selected");
    }
  };
  const deselectTagPeople = (userId: any) => {
    const updatedTagedUserData = tagedUserData.filter(
      (user: any) => user.userId !== userId
    );
    setTagedUserData(updatedTagedUserData);
  };

  return (
    <>
      <div className="fixed top-3 bottom-3 md:h-5/6 w-full md:top-16 z-10 sm:ml-4 sm:w-4/6 flex justify-center border text-white rounded-lg border-gray-500  bg-white">
        <div className="flex-col w-full  h-full ">
          <div className="w-full p-5 flex justify-center sm:border-b sm:border-b-gray-200">
            <div className="flex justify-between w-full">
              <p className="text-black">
                <ArrowLeft onClick={handleBack} />
              </p>
              <p className="font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
                Create new post
              </p>
              <p
                className={
                  text
                    ? "text-black font-bold text-md cursor-pointer"
                    : "text-white font-normal text-md"
                }
                onClick={text ? AddPost : undefined}
              >
                Post
              </p>
            </div>
          </div>

          <div className="w-full h-5/6 flex">
            <div className="w-full h-full flex flex-col md:flex-row">
              <div className="md:w-4/6">
                <div className="w-full h-full">
                  {isImage && (
                    <>
                      <img
                        className="w-full h-full object-cover"
                        src={selectedImageSrc}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </>
                  )}
                  {isVideo && (
                    <>
                      <video
                        src={vedioUrl}
                        className="w-full h-full object-contain"
                        controls
                      />
                    </>
                  )}
                </div>
              </div>
              <div className=" w-full md:w-2/6 p-2 ">
                <div className="w-full h-full flex flex-col">
                  <div className="hidden md:flex text-black p-5">
                    <div className="">
                      <img
                        className="w-10 h-10 rounded-full "
                        src={
                          user.userData.profile?.startsWith(
                            "https://graph.facebook.com/"
                          )
                            ? `${user.userData.profile}`
                            : user.userData.profile
                            ? `http://localhost:3000/profile/${user.userData.profile}`
                            : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="pl-3 pt-3 text-md font-semibold text-black ">
                      {user.userData.userName}
                    </div>
                  </div>
                  <div className="text-black md:mt-4 w-full md:h-full border shadow-lg rounded-md md:p-1 overflow-x-hidden flex-col">
                    <textarea
                      className="w-full h-16 md:h-5/6 pl-2 outline-none resize-none"
                      value={text}
                      onChange={handleChange}
                      placeholder="Write a  caption .."
                    />
                    <div className="text-sm text-black md:mt-1 text-end">
                      {text.length}/{maxLength}
                    </div>
                  </div>
                  <div className="w-full rounded-md shadow-lg h-1/6 border border-b-gray-100 mt-2 overflow-visible">
                    <div className="relative text-black pt-3 pb-3 flex items-center">
                      {/* Dropdown */}
                      <div
                        className="flex relative justify-center items-center "
                        onClick={searchLocationToggle}
                      >
                        <div className="flex">
                          <button
                            id="dropdownToggleButton"
                            className="text-black   focus:outline-none  font-medium rounded-lg text-sm  pl-2 text-center inline-flex items-center"
                            type="button"
                          >
                            {isSelected ? (
                              <>{selectedLocationlatAndLog?.name}</>
                            ) : (
                              <>Location</>
                            )}
                          </button>
                        </div>
                        <div className="absolute left-64">
                          <MapPin size={16} />
                        </div>
                      </div>

                      {/* Dropdown menu */}
                      <div
                        id="dropdownToggle"
                        className={`absolute z-10 bg-red-900 ${
                          isLocation ? "" : "hidden"
                        } divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-white border top-full left-0 mt-1`}
                      >
                        {!isSelected ? (
                          <>
                            <ul
                              className=" p-3 space-y-1 text-sm text-black dark:text-black overflow-y-auto h-20 md:h-40"
                              aria-labelledby="dropdownToggleButton"
                            >
                              <li>
                                <>
                                  {responceLocation.length > 0 ? (
                                    <ul>
                                      {responceLocation.map(
                                        (item: any, index: number) => (
                                          <li
                                            key={index}
                                            onClick={() => selectLocation(item)}
                                          >
                                            <div className="flex items-center px-4 py-2 border-b cursor-pointer">
                                              {item.name}
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    <p>search your location</p>
                                  )}
                                </>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <>
                            <ul
                              className="p-3 space-y-1 text-sm text-black dark:text-black overflow-y-auto h-52"
                              aria-labelledby="dropdownToggleButton"
                            >
                              <li>
                                <ul>{selectedLocationlatAndLog?.name}</ul>
                              </li>
                            </ul>
                          </>
                        )}
                        <input
                          type="text"
                          className="flex items-center p-3 text-sm border   font-medium  w-full  outline-none border-t  rounded-b-lg bg-gray-50   hover:underline hover:w-full "
                          placeholder="Search location .."
                          onChange={(e) => serchLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full rounded-md shadow-lg h-1/6 border border-b-gray-100  mt-2 overflow-visible">
                    <div className="text-black pt-3 pb-3 flex justify-between items-center">
                      {/* Dropdown */}
                      <div className="relative h-full">
                        <div className="flex justify-between">
                          <button
                            id="dropdownToggleButton"
                            onClick={tagToggleDropdown}
                            className="text-black   focus:outline-none  font-medium rounded-lg text-sm  pl-2 text-center inline-flex items-center"
                            type="button"
                          >
                            Tag People
                            <svg
                              className="w-2.5 h-2.5 ms-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          <div className="absolute left-64">
                            <p className=" border rounded-full w-5 h-5 flex items-center text-center p-1 text-black">
                              {tagedUserData.length}
                            </p>
                          </div>
                        </div>

                        {/* Dropdown menu */}
                        <div
                          id="dropdownToggle"
                          className={`fixed z-10 ${
                            isTagOpen ? "" : "hidden"
                          } divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-white border md:right-60 mt-1`}
                        >
                          <ul
                            className="text-sm text-black dark:text-black overflow-y-auto h-16 md:h-32"
                            aria-labelledby="dropdownToggleButton"
                          >
                            {/* Render selected tagged users */}
                            <p className="hidden sm:flex justify-center">
                              Tagged
                            </p>
                            <li className="border-gray-100 border rounded">
                              {tagedUserData.length > 0 && (
                                <>
                                  {tagedUserData.map(
                                    (user: any, index: any) => {
                                      return (
                                        <li
                                          key={index}
                                          className="border-b overflow-auto shadow-md rounded"
                                        >
                                          <div className="flex items-center justify-between px-2 py-0.5 md:py-2">
                                            <img
                                              className="w-5 h-5 rounded-full"
                                              src={
                                                user?.profile?.startsWith(
                                                  "https://graph"
                                                )
                                                  ? `${user?.profile}`
                                                  : `http://localhost:3000/profile/${user?.profile}`
                                              }
                                              alt={`image`}
                                            />
                                            {user.name}
                                            {/* Add a button or icon to deselect the user */}
                                            <button
                                              className=" text-black font-bold p-1"
                                              onClick={() =>
                                                deselectTagPeople(user.userId)
                                              }
                                            >
                                              X
                                            </button>
                                          </div>
                                        </li>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </li>

                            {/* Render remaining users */}
                            <li>
                              {resTagUser && resTagUser.length > 0 && (
                                <>
                                  {resTagUser.map((user: any, index) => (
                                    <li
                                      key={index}
                                      className="border-b "
                                      onClick={() => selectTagPeople(user)}
                                    >
                                      <a
                                        href="#"
                                        className="flex items-center px-4 py-0.5 md:py-2"
                                      >
                                        <img
                                          className="w-4 h-4 me-2 rounded-full"
                                          src={profile}
                                          alt={`image`}
                                        />
                                        {user.basicInformation.fullName}
                                      </a>
                                    </li>
                                  ))}
                                </>
                              )}
                            </li>
                          </ul>
                          <a
                            href="#"
                            className="flex items-center p-0.5 md:p-2 text-sm font-medium  border-t  rounded-b-lg bg-gray-50   hover:underline"
                          >
                            <input
                              type="text"
                              className="w-full h-full p-1 outline-none bg-gray-50 hover:underline "
                              onChange={(e) => setTagUsers(e.target.value)}
                              placeholder="search user .."
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full rounded-md shadow-lg h-1/6 border border-b-gray-100  mt-2 overflow-visible">
                    <div className="text-black pt-3 pb-3 text- flex justify-between items-center">
                      {/* Dropdown */}
                      <div className="relative">
                        <button
                          id="dropdownToggleButton"
                          onClick={toggleDropdown}
                          className="text-black   focus:outline-none  font-medium rounded-lg text-sm  pl-2 text-center inline-flex items-center"
                          type="button"
                        >
                          Advance Settings
                          <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>
                        {/* Dropdown menu */}
                        <div
                          id="dropdownToggle"
                          className={`absolute z-10 ${
                            isOpen ? "" : "hidden"
                          } bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-white border top-full left-0`}
                        >
                          <ul
                            className="p-1 md:p-3 text-sm  text-black dark:text-black"
                            aria-labelledby="dropdownToggleButton"
                          >
                            <li className="flex md:flex-col justify-between items-">
                              <div className="flex p-1 rounded ">
                                <label
                                  className="relative inline-flex items-center w-full cursor-pointer"
                                  onClick={hancleHideLike}
                                >
                                  <input
                                    type="checkbox"
                                    defaultValue=""
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-white-600" />
                                  <span className="md:ms-3 text-sm md:font-medium text-gray-900 ">
                                    Hide Like
                                  </span>
                                </label>
                              </div>
                              <div className="flex p-1 rounded">
                                <label
                                  className="relative inline-flex items-center w-full cursor-pointer"
                                  onClick={handleCommenthide}
                                >
                                  <input
                                    type="checkbox"
                                    defaultValue=""
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-white-600" />
                                  <span className="md:ms-3 text-sm md:font-medium text-gray-900 ">
                                    Hide Comment
                                  </span>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            {selectedImageIndex > 0 ? (
              <>
                <ArrowBigLeft className="text-black m-2" onClick={handlePrev} />
              </>
            ) : (
              <div className="text-black"> </div>
            )}
            {selectedImageIndex < imglength - 1 ? (
              <>
                <ArrowBigRight
                  className="text-black m-2"
                  onClick={handleNext}
                />
              </>
            ) : (
              <>
                <div className="text-black"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostDetailsBody;
