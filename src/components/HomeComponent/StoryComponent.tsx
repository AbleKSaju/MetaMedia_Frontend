import { useState } from "react";
import StoryCard from "./storycardComponent";
import { useSelector } from "react-redux";

// const [stories,setStories]=useState([])
const Story = ({setShowStory,setAddStory}:any) => {
  
  const myStory = useSelector((state:any)=>state.persisted.story.storyData)
  const stories = useSelector((state: any) => state.persisted.story.otherUsersStoryData);

  
  return (
    <>
      <div className=" pt-3 w-[640px]  md:w-[700px] lg:p-1 lg:w-[1140px]  lg:mt-0 ">
        <div className="not-prose relative  rounded-xl  overflow-x-scroll  scrollbar-hide ">
          <div className="relative rounded-xl  ">
            <div className="  shadow-xl   ">
              <div className="flex overflow-y-hidden scrollbar-hide  ">
                { myStory[0] || stories[0] ? <StoryCard setShowStory={setShowStory} setAddStory={setAddStory}/>:""}

                  {/* <StoryCard setShowStory={setShowStory}/>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
