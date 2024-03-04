import { MoreVertical, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import StorySliderComponent from "./StorySliderComponent";
import NewStorySliderComponent from "./NewStorySliderComponent";

const ShowStoryComponent = ({
  showStory,
  setShowStory,
  deleteStory,
  setDeleteStory,
}: any) => {
  //   const [stories,setStories] = useState([])

  // const stories = useSelector((state:any)=>state.persisted.story.storyData)

  return (
    <div className="fixed z-20 inset-0  w-full h-full backdrop-blur bg-opacity-50 bg-black flex flex-col p-5 ">
        <div className="flex justify-end">
          <X
            className="text-white  cursor-pointer"
            onClick={() => setShowStory("")}
          />
        </div>
      <div className="w-full h-10 flex flex-col justify-center">
        <div className="flex justify-center w-full h-full ">
          <div className="h-[800px] w-[800px]">
            <StorySliderComponent showStory={showStory} setShowStory={setShowStory} deleteStory={deleteStory} setDeleteStory={setDeleteStory}  />
            {/* <NewStorySliderComponent showStory={showStory} setShowStory={setShowStory} deleteStory={deleteStory} setDeleteStory={setDeleteStory}  /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowStoryComponent;
