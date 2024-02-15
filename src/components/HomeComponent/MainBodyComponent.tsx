import { useState } from "react";
import useMediaQuery from "../../utils/costumHook/mediaqueri";
import PostScroll from "./PostScrollComponent";
import Story from "./StoryComponent";
import Suggestion from "./SuggestionComponent";
import { SetSidebarOpenFunction } from "src/pages/user/Home";
import ShowStoryComponent from "./StoryComponent/ShowStoryComponent";
import { useSelector } from "react-redux";

interface MainBodyProps {
  setSidebarOpen: (value: boolean) => void;
  setShowStory: (value: number) => void;
  // other props if any
}
const MainBody = ({setSidebarOpen,setShowStory}:MainBodyProps) => {
  setSidebarOpen(true)

  // const [myStory,setMyStory] = useState(false)  
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");


  return (
    <>
      {/* main div */}
      <div className="sm:ml-60 sm:p-7 md:p-2 lg:ml-72 h-[99vh] scrollbar-hide overflow-hidden">
      <div className="w-full overflow-hidden ">
        {/* status */}
        <Story setShowStory={setShowStory}/>       
        {/* sub div for post and suggestion */}
        <div className="lg:mt-5 lg:w-full lg:h-full flex overflow-y-hidden ">
          {/* post */}
          <div className="lg:w-3/4 lg:h-[600px]   overflow-y-auto scrollbar-hide flex items-center    flex-col">
            <div className=" lg:mt-0 md:mt-0    ">

            <PostScroll />
            <PostScroll />
            <PostScroll />
           
            </div>
          </div>
          {/* suggestion */}
          {!isMobile  && !isTablet && (
            <div className="lg:w-1/3 flex lg:h-96">
              <Suggestion />
            </div>
          )}
        </div>
      </div>
      </div>
    
      {/* main div end */}
    </>
  );
};

export default MainBody;
