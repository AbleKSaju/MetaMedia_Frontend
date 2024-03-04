import { useState } from "react";
import StoryCard from "./storycardComponent";
import { useSelector } from "react-redux";
import profile from '../../assets/profile.webp'


// const [stories,setStories]=useState([])
const Story = ({setShowStory,setAddStory}:any) => {
  
  const myStory = useSelector((state: any) => state.persisted.story.storyData);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const stories = useSelector((state: any) => state.persisted.story.otherUsersStoryData);
  console.log(myStory,"myStorymyStorymyStorymyStory");
  
  
  return (
    <>
        <div className="w-[95vw] sm:[98vw] md:w-[74vw] lg:w-[60vw] h-[190px] sm:h-[250px] border items-center rounded-lg ">
            <div className=" flex overflow-x-auto p-4 h-full scrollbar-hide gap-6 items-center">
              <div className="flex-none flex items-center mr-4 ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                      <img
                        className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                        onClick={() =>
                          !myStory.length
                            ? setAddStory(true)
                            : setShowStory(userData.userId)
                        }
                        src={
                          userData?.profile.startsWith('https://graph') ?
                          profile
                          :myStory?.[0]?.[0]?.storyUrl.startsWith('https://') ? 
                        `http://localhost:3000/profile/${userData?.profile}`
                        :
                          myStory?.[0]?.[0]?.storyUrl
                            ? `http://localhost:3003/story/${myStory?.[0]?.[0]?.storyUrl}`
                            : userData?.profile ?
                            `http://localhost:3000/profile/${userData?.profile}`
                            : profile
                        }
                        alt="S"
                      />
                    </div>
                  </div>
                </div>
                {stories[0]?.length !== 0 &&
                stories[0]?.map((value: any,index:number) => {
                  return(
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-full border-[#C1506D] justify-center mr-2 sm:mr-7">
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] border flex justify-center items-center rounded-full">
                      <img
                        className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] rounded-full"
                        onClick={() => setShowStory(value.userId)}
                        src={`${
                          stories && !value.data[0]?.storyUrl.startsWith('https://')
                            ? `http://localhost:3003/story/${value.data[0]?.storyUrl}`
                            : value?.profile ?
                             `http://localhost:3000/profile/${value?.profile}`
                             : profile
                        }`}
                        alt="S"
                      />
                    </div>
                  </div>
                </div>
              )})}
              </div>
            </div>
          </div>
      {/* <div className=" pt-3 w-[640px]  md:w-[700px] lg:p-1 lg:w-[1140px]  lg:mt-0 ">
        <div className="not-prose relative  rounded-xl  overflow-x-scroll  scrollbar-hide ">
          <div className="relative rounded-xl  ">
            <div className="  shadow-xl   ">
              <div className="flex overflow-y-hidden scrollbar-hide  ">
                { myStory[0] || stories[0] ? <StoryCard setShowStory={setShowStory} setAddStory={setAddStory}/>:""}

              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Story;
