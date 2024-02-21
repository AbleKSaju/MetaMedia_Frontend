import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStoryFunction } from "../../../utils/api/methods";
import { addStory } from "../../../utils/ReduxStore/Slice/storySlice";
import { toast } from "sonner";

interface ImageSliderProps {
  setShowStory: any;
  deleteStory: boolean;
  setDeleteStory: any;
}

const StorySliderComponent = ({
  setShowStory,
  deleteStory,
  setDeleteStory,
}: ImageSliderProps) => {
  const stories = useSelector((state: any) => state.persisted.story.storyData);

  const [watchedStory, setWatchedStory] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(0);
  const durationPerImage = 5000;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (stories[0].length == 0) {
      setShowStory(-1);
    }
  }, [stories]);

  const userData = useSelector((state: any) => state.persisted.user.userData);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories[0].length - 1 ? 0 : prevIndex + 1
    );
    setLoading(0);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories[0].length - 1 : prevIndex - 1
    );
    setLoading(0);
  };

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setLoading((prevIndex) => (prevIndex == 100 ? 0 : prevIndex + 5.5));
      }, 250);
      return () => clearInterval(interval);
    } else {
      setLoading(0);
    }
  }, [isOpen, loading]);

  useEffect(() => {
    if (!isOpen) {
      setWatchedStory(currentIndex);
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === stories[0].length - 1 ? 0 : prevIndex + 1
        );
        setLoading(0);
      }, durationPerImage);
      return () => clearInterval(interval);
    }
  }, [isOpen, currentIndex, durationPerImage, stories[0].length]);

  const deleteStories: any = async () => {
    const data = {
      userId: userData.userId,
      storyId: stories[0]?.[currentIndex]._id,
    };
    const response: any = await deleteStoryFunction(data);
    setLoading(0);

    if (response?.data?.status) {
      toast.success(response.data.message);
      setDeleteStory(!deleteStory);
      setIsOpen(false);
      setCurrentIndex(0);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[500px] mt-5 relative">
      <div className="flex justify-center w-full absolute top-2">
        {stories[0].map((_: any, index: number) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full mx-0.5 ${
              index >= watchedStory ? "bg-amber-50" : "bg-teal-700"
            }`}
          >
            <div
              className={`h-2 rounded-full ${
                index === watchedStory ? "bg-teal-700" : ""
              }`}
              style={{
                width: `${loading}%`,
                transition: `${loading ? "width 0.5s ease-in-out" : ""}`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <Link to="/profile">
        <img
          className={`w-10 absolute h-10 top-5 left-2 border-2 border-teal-900 rounded-full  text-black  `}
          src={
            userData.profile?.startsWith("https://graph.facebook.com/")
              ? `${userData.profile}`
              : userData.profile
              ? `http://localhost:3000/profile/${userData.profile}`
              : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
          }
        />
      </Link>
      <div className="absolute top-7 right-1">
        <MoreVertical onClick={toggleDropdown} className="text-amber-50 mr-3" />
        {isOpen && (
          <div className="absolute top-6 right-0 w-40 bg-teal-900 rounded-tr-none rounded-lg shadow-lg z-10 border">
            <ul>
              <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
                forward
              </li>
              <li
                className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer"
                onClick={deleteStories}
              >
                delete
              </li>
            </ul>
          </div>
        )}
      </div>
      {stories[0]?.length > 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={nextImage}
        >
          <ChevronRight />
        </button>
      )}
      {stories[0]?.length > 1 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
          onClick={prevImage}
        >
          <ChevronLeft />
        </button>
      )}
      {stories[0].map((story: any, index: number) => (
        <>
          <img
            key={index}
            src={`http://localhost:3003/story/${story?.storyUrl}`}
            alt=""
            className={`w-full h-full border-2 rounded-lg border-teal-800 ${
              index === currentIndex ? "" : "hidden"
            }`}
          />
          <div className="absolute -bottom-8 font-medium shadow-black cursor-pointer">
            <p
              className={`text-teal-900  ${
                index === currentIndex ? "" : "hidden"
              }`}
            >
              {story.caption}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default StorySliderComponent;
