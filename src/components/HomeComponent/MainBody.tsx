import PostScroll from "./PostScroll";
import Story from "./Story";
import Suggestion from "./Suggestion";
const MainBody = () => {
  return (
    <>
      {/* main div  */}

      <div className=" w-full   overflow-hidden">
        <Story />

        <div className=" lg:mt-5 lg:w-full lg:h-full flex overflow-y-hidden">

          <div className="lg:w-3/4  lg:h-[555px]  justify-center overflow-y-auto  scrollbar-hide flex-col ">

<PostScroll/>   
<PostScroll/>   
<PostScroll/>   
<PostScroll/>   
<PostScroll/>   
<PostScroll/>   
<PostScroll/>   
<PostScroll/>   


    


            
          </div>

          {/* suggetion  */}
          <div className="lg:w-1/3  flex  lg:h-96">
           <Suggestion/>
          </div>
        </div>
      </div>

      {/* status  */}
      {/* post  */}
      {/* suggestion  */}
      {/* main div  end */}
    </>
  );
};

export default MainBody;
