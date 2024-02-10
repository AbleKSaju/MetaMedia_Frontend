import useMediaQuery from "../../utils/costumHook/mediaqueri";

import PostScroll from "./PostScroll";
import Story from "./Story";
import Suggestion from "./Suggestion";

const MainBody = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1025px)");

  return (
    <>
      {/* main div */}
      <div className="w-full overflow-hidden ">
        {/* status */}
        <Story />
       
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
    
      {/* main div end */}
    </>
  );
};

export default MainBody;
