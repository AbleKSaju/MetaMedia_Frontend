import { useState } from "react";
import StoryCard from "./storycardComponent";

// const [stories,setStories]=useState([])
const Story = () => {
  const [myStory,setMyStory]=useState<any>(true)
  return (
    <>
      <div className=" pt-3  w-[640px]  md:w-[700px] lg:p-1 lg:w-[1140px]  lg:mt-0 ">
        <div className="not-prose relative  rounded-xl  overflow-x-scroll  scrollbar-hide ">
          <div className="relative rounded-xl  ">
            <div className="  shadow-xl   ">
              <div className="flex overflow-y-hidden scrollbar-hide  ">
                {
                  myStory && <StoryCard myStory={myStory}/>
                }
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
