import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  ChevronRightCircle,
  MoreVertical,
} from "lucide-react";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStoryFunction } from "../../../utils/api/methods";
import { toast } from "sonner";

interface ImageSliderProps {
  setShowStory: any;
  deleteStory: boolean;
  setDeleteStory: any;
  showStory: string;
}

const StorySliderComponent = ({
  showStory,
  setShowStory,
  deleteStory,
  setDeleteStory,
}: ImageSliderProps) => {
  const [watchedStory, setWatchedStory] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(0);
  const [video, setVideo] = useState<boolean>(false);
  const [hideTrains, setHideTrain] = useState<boolean>(false);
  const [currentStory, setCurrentStory] = useState<any>([]);
  const [currentProfile, setCurrentProfile] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const durationPerImage = 5000;

  const userData = useSelector((state: any) => state.persisted.user.userData);
  const myStory = useSelector((state: any) => state.persisted.story.storyData);
  const stories = useSelector((state: any) => state.persisted.story.otherUsersStoryData);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLoadedData = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    if (myStory[0]?.length == 0 && stories[0]?.length == 0) {
      setShowStory("");
    } else {
      const story = stories[0]?.filter(
        (value: any) => value.userId == showStory
      );
      if (story?.length) {
        setCurrentStory(story[0].data);
        setCurrentProfile(story[0]?.profile);
        setCurrentUser(story[0]?.userId);
      } else {
        setCurrentStory(myStory[0]);
        setCurrentProfile(userData?.profile);
        setCurrentUser(userData?.userId);
      }
    }
  }, [myStory, stories, currentIndex, showStory]);

  const nextUser = () => {
    setShowStory("");
    const index = stories[0]?.findIndex(
      (value: any) => value.userId === showStory
    );
    if (index !== -1 && index + 1 < stories[0]?.length) {
      const nextUserId = stories[0][index + 1].userId;
      setShowStory(nextUserId);
      setLoading(0);
      setCurrentIndex(0);
    }
  };

  const prevUser = () => {
    setShowStory("");
    const index = stories[0]?.findIndex(
      (value: any) => value.userId === showStory
    );
    if (index !== -1 && index - 1 < stories[0]?.length) {
      const nextUserId = stories[0][index - 1].userId;
      setShowStory(nextUserId);
      setLoading(0);
      setCurrentIndex(0);
    }
  };

  const nextImage = () => {
    if (currentIndex < currentStory?.length - 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === currentStory.length - 1 ? 0 : prevIndex + 1
      );
      setLoading(0);
    } else {
      const index = stories[0]?.findIndex(
        (value: any) => value.userId === showStory
      );
      if (index !== 0 && index + 1 < stories[0]?.length) {
        if (index == -1) {
          setCurrentIndex(0);
        } else {
          const nextUserId = stories[0][index + 1].userId;
          setShowStory(nextUserId);
          setLoading(0);
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex(0);
      }
    }
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentStory.length - 1 : prevIndex - 1
    );
    setLoading(0);
  };

  useEffect(() => {
    if (!isOpen && !hideTrains) {
      const interval = setInterval(() => {
        setLoading((prevIndex) => (prevIndex == 100 ? 0 : prevIndex + 5.5));
      }, 250);
      return () => clearInterval(interval);
    } else {
      setLoading(0);
    }
  }, [isOpen, loading, hideTrains]);

  useEffect(() => {
    if (!isOpen && !hideTrains) {
      setWatchedStory(currentIndex);
      const interval = setInterval(() => {
        nextImage();
        setHideTrain(true);
        setLoading(0);
      }, durationPerImage);
      return () => clearInterval(interval);
    }
  }, [isOpen, currentIndex, durationPerImage, currentStory, myStory, stories]);

  const deleteStories: any = async () => {
    const data = {
      userId: userData.userId,
      storyId: myStory[0]?.[currentIndex]._id,
    };
    const response: any = await deleteStoryFunction(data);
    setLoading(0);
    if (response?.data?.status) {
      setDeleteStory(!deleteStory);
      setIsOpen(false);
      setCurrentIndex(0);
      if (currentIndex < currentStory?.length - 1) {
        setCurrentIndex((prevIndex) =>
          prevIndex === currentStory.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        setShowStory("");
      }
    }
  };

  return (
    <div className="flex justify-center w-full h-full mt-32 md:mt-14 sm:mt-5 mb-36 relative">
      <div className="flex justify-center w-full sm:w-[500px] md:w-full h-40 absolute top-2">
        {currentStory.map((_: any, index: number) => {
          console.log(currentStory, "currentStorycurrentStory");

          return (
            <>
              <Link
                to={`/profile/${currentUser}`}
                onClick={() => setShowStory("")}
              >
                <img
                  className={`w-10 absolute h-10 top-5 left-2 border-2 border-[#C1506D] rounded-full  text-black  `}
                  src={
                    currentProfile
                      ? `http://localhost:3000/profile/${currentProfile}`
                      : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  }
                />
              </Link>
              {!hideTrains && (
                <div
                  key={index}
                  className={`w-full sm:w-96 md:w-full h-1 rounded-full mx-0.5 ${
                    index >= watchedStory ? "bg-amber-50" : "bg-[#C1506D]"
                  }`}
                >
                  <div
                    className={`h-1 rounded-full ${
                      index === watchedStory ? "bg-[#C1506D]" : ""
                    }`}
                    style={{
                      width: `${loading}%`,
                      transition: `${loading ? "width 0.5s ease-in-out" : ""}`,
                    }}
                  ></div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="absolute top-7 right-1 z-20">
        {userData.userId == showStory && (
          <MoreVertical
            onClick={toggleDropdown}
            className="text-amber-50 mr-3"
          />
        )}
        {isOpen && userData.userId == showStory && (
          <div className="absolute top-6 right-0 w-40 bg-[#FADBE1] rounded-tr-none border-black rounded-lg shadow-lg z-10 border">
            <ul>
              {userData.userId == showStory ? (
                <li
                  className="py-2 px-4 hover:bg-[#C1506D] rounded-t-none text-black hover:text-amber-50 rounded-lg cursor-pointer"
                  onClick={deleteStories}
                >
                  Delete
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        )}
      </div>

      <button
        className="hidden md:flex fixed right-0 md:right-20 top-1/2 transform -translate-y-1/2"
        onClick={nextUser}
      >
        <ChevronRightCircle size={30} className="text-white" />
      </button>

      <button
        className="hidden md:flex fixed left-0 md:left-20 top-1/2 transform -translate-y-1/2"
        onClick={prevUser}
      >
        <ChevronLeftCircle size={30} className="text-white" />
      </button>

      {currentStory?.length > 1 && (
        <button
          className="fixed md:absolute right-0 top-1/2 md:h-60 flex md:justify-start transform -translate-y-1/2 z-10"
          onClick={nextImage}
        >
          <ChevronRight className="text-white" />
        </button>
      )}
      {currentStory?.length > 1 && (
        <button
          className="fixed md:absolute left-0 top-1/2 md:h-60 flex md:justify-start transform -translate-y-1/2 z-10"
          onClick={prevImage}
        >
          <ChevronLeft className="text-white" />
        </button>
      )}
      {currentStory?.map((story: any, index: number) => {
        const isCurrentVideo =
          story?.storyUrl?.startsWith("https://") && currentIndex === index;
        const isCurrentPhoto =
          !story?.storyUrl.startsWith("https") && currentIndex === index;
        if (isCurrentVideo && !hideTrains) {
          setHideTrain(true);
        }
        if (isCurrentPhoto && hideTrains) {
          setHideTrain(false);
        }
        return (
          <>
            {isCurrentVideo ? (
              <>
                {!videoLoaded && (
                  <p className="">
                    <ThreeDots
                      visible={true}
                      height="80"
                      width="80"
                      color="#C1506D"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </p>
                )}
                <video
                  src={story?.storyUrl}
                  controls
                  muted
                  autoPlay
                  onPlayCapture={() => setVideoLoaded(true)}
                  // onLoadStart={setHideTrain(true)}
                  onLoad={() => setHideTrain(true)}
                  onLoadedData={handleLoadedData}
                  onEnded={nextImage}
                  style={{ display: videoLoaded ? "block" : "none" }}
                ></video>
              </>
            ) : (
              <img
                src={`http://localhost:3003/story/${story?.storyUrl}`}
                alt=""
                // onLoad={()=>setHideTrain(false)}
                // onLoad={() => setVideo(false)}
                className={` h-[40%] sm:h-[70%] md:h-[80%] w-42 md:w-full border-2 rounded-lg border-black  ${
                  index === currentIndex ? "" : "hidden"
                }`}
              />
            )}
            <div className="absolute -bottom-8 font-medium shadow-black cursor-pointer">
              <p
                className={`text-white  ${
                  index === currentIndex ? "" : "hidden"
                }`}
              >
                {story.caption}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default StorySliderComponent;
