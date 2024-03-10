import {
  MoreVertical,
  Radio,
  Image,
  Film,
  Bookmark,
  Send,
  MessageCircle,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { toast } from "sonner";
import { getAllStoriesFunction } from "../../../utils/api/methods/StoryService/Story/get";
import { addOtherUserStories } from "../../../utils/ReduxStore/Slice/storySlice";
import { showAllPostFuntion } from "../../../utils/api/methods/PostService/get/showAllPost";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";
import { PostScroll, Story } from "../../../components/HomeComponent";
import CreateMediaComponent from "../../../components/HomeComponent/CreateMediaComponent";

interface MainBodyProps {
  setShowStory: (value: string) => void;
  setAddStory: (value: boolean) => void;
  setIsAddPost: (value: boolean) => void;
  setIsAddLive: (value: boolean) => void;

  // other props if any
}
const MainBody = ({  setShowStory, setAddStory, setIsAddPost,setIsAddLive }: MainBodyProps) => {

    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const [postData, setPostData] = useState([]);


    useEffect(() => {
      (async () => {
        const response: any = await getAllStoriesFunction();        
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


  return (
    <>
      {/* main div ------------------------- */}
      <div className="w-full h-screen flex justify-center p-3 ">
        <div className="w-full sm:w-11/12 h-full flex flex-col overflow-y-auto gap-4 scrollbar-hide">
          {/* story main div ------------------- */}
          <Story setShowStory={setShowStory} setAddStory={setAddStory}/>
          {/* story main div ------------------- */}

          {/* create option -------------------- */}
          
            <CreateMediaComponent setAddStory={setAddStory} setIsAddPost={setIsAddPost} setIsAddLive={setIsAddLive} />
          
            {/* sepration 2 
          </div>
          {/* create option -------------------- */}

          {/* post showing ---------------------- */}

          <div className=" w-full h-[500px]  flex-none items-center p-1  gap-2  justify-center ">
            <div className="flex flex-col justify-center items-center gap-5">
              {/* -----------------singel post---------------------------- */}
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
              {/* -----------------singel post---------------------------- */}
            </div>
          </div>
          {/* post showing ---------------------- */}
        </div>
      </div>
      {/* main div ------------------------- */}
    </>
  )
}
export default MainBody
