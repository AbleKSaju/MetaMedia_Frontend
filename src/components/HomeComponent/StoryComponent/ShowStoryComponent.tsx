import { MoreVertical, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import StorySliderComponent from "./StorySliderComponent";

const ShowStoryComponent = ({ setShowStory }: any) => {

  //   const [stories,setStories] = useState([])

  const stories = useSelector((state:any)=>state.persisted.story.storyData)
  
  return (
    <div className="fixed top-0 left-0 w-full h-[92vh] sm:h-full bg-black bg-opacity-60 z-20">
      <div className="flex justify-center w-full h-full bg-transparent">
        <div className="fixed top-0 sm:top-8 h-[637px] w-full sm:w-[600px] md:w-[700px] lg:w-[900px] md:top-10 z-30 flex justify-center border text-white bg-amber-50 rounded-lg border-teal-900">
          <div className="flex-col w-full h-full justify-center">
            <div className="w-full p-4 flex flex-col justify-center sm:border-b sm:border-b-amber-50 bg-teal-900">
              <div className="w-full h-full ">
                <div className="flex justify-end">
                  <X
                    className="text-amber-50"
                    onClick={() => setShowStory(-1)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full h-[560px]">
              <div className="">
                <StorySliderComponent setShowStory={setShowStory} durationPerImage = {5000}  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowStoryComponent;
