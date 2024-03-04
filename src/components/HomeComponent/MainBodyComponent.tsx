import { useEffect, useState } from "react";
import useMediaQuery from "../../utils/costumHook/mediaqueri";
import PostScroll from "./PostScrollComponent";
import Story from "./StoryComponent";
import Suggestion from "./SuggestionComponent";
import { SetSidebarOpenFunction } from "../../pages/user/Home";
import ShowStoryComponent from "./StoryComponent/ShowStoryComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoriesFunction } from "../../utils/api/methods/StoryService/Story/get";
import { addOtherUserStories } from "../../utils/ReduxStore/Slice/storySlice";

import { showAllPostFuntion } from "../..//utils/api/methods/PostService/get/showAllPost";
import { toast } from "sonner";
import { getUserByIdFuntion } from "../../utils/api/methods/UserService/post";

interface MainBodyProps {
  setSidebarOpen: (value: boolean) => void;
  setShowStory: (value: string) => void;
  setAddStory: (value: boolean) => void;
  // other props if any
}
const MainBody = ({
  setSidebarOpen,
  setShowStory,
  setAddStory,
}: MainBodyProps) => {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    (async () => {
      console.log("getStoriesFunction");
      const response: any = await getAllStoriesFunction();
      console.log(response,"getAllStoriesFunction");
      
      if (response) {
        dispatch(addOtherUserStories(response?.data?.data));
      } else {
        dispatch(addOtherUserStories([]));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const responce: any = await showAllPostFuntion();
      if (responce.status) {
        const postsWithData: any = await Promise.all(
          responce?.data?.map(async (post: any) => {
            const userDataResponse = await getUserByIdFuntion(post.userId);
            if (userDataResponse.status) {
              const postDataWithUserData = {
                ...post,
                userData: userDataResponse.data,
              };
              return postDataWithUserData;
            } else {
              // Handle error while fetching user data
              return null;
            }
          })
        );

        const filteredPosts = postsWithData.filter(
          (post: any) => post !== null
        );

        setPostData(filteredPosts);
      } else {
        toast.error("Responce error");
      }
    })();
  }, [render]);

  setSidebarOpen(true);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  return (
    <>



    
      <div className="sm:ml-60 sm:p-7 md:p-2 lg:ml-72 h-[99vh] scrollbar-hide overflow-hidden">
        <div className="w-full overflow-hidden ">
          <Story setShowStory={setShowStory} setAddStory={setAddStory} />
          <div className="lg:mt-5 lg:w-full lg:h-full flex overflow-y-hidden ">
            <div className="lg:w-3/4 lg:h-[600px]   overflow-y-auto scrollbar-hide flex items-center    flex-col">
              <div className=" lg:mt-0 md:mt-0    ">
                {postData.length > 0 && (
                  <>
                    {postData.map((item: any) => {
                      return (
                        <>
                          <PostScroll
                            setRender={setRender}
                            render={render}
                            data={item}
                          />
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {!isMobile && !isTablet && (
              <div className="lg:w-1/3 flex lg:h-96">
                <Suggestion />
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default MainBody;
