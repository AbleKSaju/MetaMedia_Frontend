import { X } from "lucide-react";
import StorySliderComponent from "./StorySliderComponent";

const ShowStoryComponent = ({
  showStory,
  setShowStory,
  deleteStory,
  setDeleteStory,
}: any) => {
  console.log("I AM STORY");
  
  return (
    <div className="fixed z-20 inset-0 w-full h-full backdrop-blur bg-opacity-50 bg-black flex flex-col p-5 ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowStoryComponent;
