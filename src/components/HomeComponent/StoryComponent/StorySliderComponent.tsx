import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle, MoreVertical } from "lucide-react";
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
  const [video,setVideo] = useState<boolean>(false)
  const [currentStory,setCurrentStory] = useState<any>([])
  const [currentProfile,setCurrentProfile] = useState("")
  const durationPerImage = 5000;
  
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const myStory = useSelector((state: any) => state.persisted.story.storyData);
  const stories = useSelector((state: any) => state.persisted.story.otherUsersStoryData);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (myStory[0]?.length == 0 && stories[0]?.length == 0) {
      setShowStory("");
    }else{
      const story = stories[0]?.filter((value:any)=>value.userId == showStory)  
      if (story?.length) {
        setCurrentStory(story[0].data);
        setCurrentProfile(story[0]?.profile);
      }else{
        setCurrentStory(myStory[0])
        setCurrentProfile(userData?.profile);
      } 
    }
  }, [myStory,stories,currentIndex,showStory]);

  const nextUser = () => {
    setShowStory("")
    const index = stories[0]?.findIndex((value:any) => value.userId === showStory);
    if (index !== -1 && index + 1 < stories[0]?.length) {
        const nextUserId = stories[0][index + 1].userId; 
        setShowStory(nextUserId)
        setLoading(0)
        setCurrentIndex(0)
      }
    }
    const prevUser = () => {
      setShowStory("")
      const index = stories[0]?.findIndex((value:any) => value.userId === showStory);      
    if (index !== -1 && index - 1 < stories[0]?.length) {      
        const nextUserId = stories[0][index - 1].userId;         
        setShowStory(nextUserId)
        setLoading(0)
        setCurrentIndex(0)
    }
  }

  const nextImage = () => {

    if (currentIndex < currentStory?.length - 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === currentStory.length - 1 ? 0 : prevIndex + 1
      );
      setLoading(0);
    } else {
      const index = stories[0]?.findIndex((value:any) => value.userId === showStory);
      if (index !== 0 && index + 1 < stories[0]?.length) {
        if(index== -1 ){
          setCurrentIndex(0)
        }else{
          const nextUserId = stories[0][index + 1].userId; 
          setShowStory(nextUserId)
          setLoading(0)
          setCurrentIndex(0)
        }
      }else{        
        setCurrentIndex(0)
      }
    }
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentStory.length - 1 : prevIndex - 1
    );
    setLoading(0);
  };

  console.log(video,"videovideovideovideo");
  

  useEffect(() => {
    if (!isOpen && !video) {
      const interval = setInterval(() => {
        setLoading((prevIndex) => (prevIndex == 100 ? 0 : prevIndex + 5.5));
      }, 250);
      return () => clearInterval(interval);
    } else {
      setLoading(0);
    }
  }, [isOpen, loading,video]);


  useEffect(() => {
    if (!isOpen && !video) {
      setWatchedStory(currentIndex);
      const interval = setInterval(() => {
        nextImage()
        setLoading(0);
      }, durationPerImage);
      return () => clearInterval(interval);
    }
  }, [isOpen, currentIndex, durationPerImage,currentStory, myStory, stories]);


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
      setIsOpen(false);
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
    <div className="flex justify-center items-center w-full h-[500px] mt-5 relative">
      <div className="flex justify-center w-full absolute top-2">
        {currentStory.map((_: any, index: number) => (
          <>
              <Link to={`/profile/${userData?.userId}`} onClick={()=>setShowStory("")}>
                <img
                  className={`w-10 absolute h-10 top-5 left-2 border-2 border-teal-900 rounded-full  text-black  `}
                  src={
                    currentProfile
                      ? `http://localhost:3000/profile/${currentProfile}`
                      : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  }
                />
              </Link>
              {!video &&
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
              }
          </>
        ))}
      </div>
      <div className="absolute top-7 right-1 z-20">
        <MoreVertical onClick={toggleDropdown} className="text-amber-50 mr-3" />
        {isOpen && (
          <div className="absolute top-6 right-0 w-40 bg-teal-900 rounded-tr-none rounded-lg shadow-lg z-10 border">
            <ul>
              <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
                forward
              </li>
              {userData.userId == showStory ? 

              <li
                className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer"
                onClick={deleteStories}
              >
                delete
              </li>
             :    
             <li
             className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer"
             onClick={deleteStories}
           >
             Download
           </li>
            }
            </ul>
          </div>
        )}
      </div>

      
      <button
          className="fixed right-20 top-1/2 transform -translate-y-1/2"
          onClick={nextUser}
        >
          <ChevronRightCircle size={30} className="text-white"/>
        </button>

        <button
          className="fixed left-20 top-1/2 transform -translate-y-1/2"
          onClick={prevUser}
        >
          <ChevronLeftCircle size={30} className="text-white"/>
        </button>

        
      {currentStory?.length > 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={nextImage}
        >
          <ChevronRight />
        </button>
      )}
      {currentStory?.length > 1 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={prevImage}
        >
          <ChevronLeft />
        </button>
      )}
      {currentStory?.map((story: any, index: number) =>{        
         return( 
         <>
         {story?.storyUrl?.startsWith('https://') && currentIndex ==index ?
        ( <video src={`${story?.storyUrl}`} controls muted autoPlay onLoadedData={()=>setVideo(true)} onEnded={nextImage}></video>) 
        :
          <img
          key={index}
          src={`http://localhost:3003/story/${story?.storyUrl}`}
          alt=""
          onLoad={()=>setVideo(false)}
          className={`w-full h-full border-2 rounded-lg border-teal-800 ${
            index === currentIndex ? "" : "hidden"
          }`}
          />
        }
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
      )
      } )} 
    </div>
  );
};

export default StorySliderComponent;
