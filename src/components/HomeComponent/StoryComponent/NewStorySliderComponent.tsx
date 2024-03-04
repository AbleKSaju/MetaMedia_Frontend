import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MoreHorizontal,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { deleteStoryFunction } from "../../../utils/api/methods";

interface ImageSliderProps {
  setShowStory: any;
  deleteStory: boolean;
  setDeleteStory: any;
  showStory: string;
}

const NewStorySliderComponent = ({
  showStory,
  setShowStory,
  deleteStory,
  setDeleteStory,
}: ImageSliderProps) => {
  const [watchedStory, setWatchedStory] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(0);
  const [video, setVideo] = useState<boolean>(false);
  const [currentStory, setCurrentStory] = useState<any>([]);
  const [currentProfile, setCurrentProfile] = useState("");
  const durationPerImage = 5000;

  const userData = useSelector((state: any) => state.persisted.user.userData);
  const myStory = useSelector((state: any) => state.persisted.story.storyData);
  const stories = useSelector(
    (state: any) => state.persisted.story.otherUsersStoryData
  );

  const toggleDropdown = () => {
    setIsModalOpen(!isModalOpen);
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
      } else {
        setCurrentStory(myStory[0]);
        setCurrentProfile(userData?.profile);
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

  console.log(video, "videovideovideovideo");

  useEffect(() => {
    if (!isModalOpen && !video) {
      const interval = setInterval(() => {
        setLoading((prevIndex) => (prevIndex == 100 ? 0 : prevIndex + 5.5));
      }, 250);
      return () => clearInterval(interval);
    } else {
      setLoading(0);
    }
  }, [isModalOpen, loading, video]);

  useEffect(() => {
    if (!isModalOpen && !video) {
      setWatchedStory(currentIndex);
      const interval = setInterval(() => {
        nextImage();
        setLoading(0);
      }, durationPerImage);
      return () => clearInterval(interval);
    }
  }, [
    isModalOpen,
    currentIndex,
    durationPerImage,
    currentStory,
    myStory,
    stories,
  ]);

  const deleteStories: any = async () => {
    const data = {
      userId: userData.userId,
      storyId: myStory[0]?.[currentIndex]._id,
    };
    const response: any = await deleteStoryFunction(data);
    setLoading(0);
    if (response?.data?.status) {
      toast.success(response.data.message);
      setDeleteStory(!deleteStory);
      setIsModalOpen(false);
      setCurrentIndex(0);
      if (currentIndex < currentStory?.length - 1) {
        setCurrentIndex((prevIndex) =>
          prevIndex === currentStory.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        setShowStory("");
      }
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="fixed z-20 inset-0  w-screen h-screen bg-black bg-opacity-85 flex flex-col p-5 ">
        <div className="w-full h-10 flex justify-end ">
          <X
            className="text-white cursor-pointer"
            onClick={() => setShowStory("")}
          />
        </div>
        {isModalOpen && (
          <div className=" fixed  w-5/6 flex top-24 justify-end ">
            <div className="flex bg-white border  rounded-lg shadow-xl w-64 h-52 flex-col justify-evenly cursor-pointer">
              <div className="w-full border h-14 flex items-center justify-center font-medium text-sm ">
                Report
              </div>
              <div className="w-full border h-14 flex items-center justify-center font-medium text-sm">
                Go to Post
              </div>
              <div className="w-full border h-14 flex items-center justify-center font-medium text-sm">
                Share To
              </div>
              <div className="w-full border h-14 flex items-center justify-center font-medium text-sm">
                Cansel
              </div>
            </div>
          </div>
        )}

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
                  <div className="flex justify-start">
                    <button className="absolute  text-black w-6 rounded-full h-6 bg-white bg-opacity-50 p-0.5">
                      <ChevronLeft size={20} />
                    </button>
                  </div>
                  <img
                    className="object-contain opacity-100 w-full h-full"
                    src={`http://localhost:3002/img/${userData?.[0]}`}
                    alt=""
                  />

                  <div
                    className="flex justify-end "
                    //  onClick={imageRightClick}
                  >
                    <button className="absolute text-black w-6 rounded-full h-6 bg-white p-0.5 bg-opacity-50">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStorySliderComponent;
