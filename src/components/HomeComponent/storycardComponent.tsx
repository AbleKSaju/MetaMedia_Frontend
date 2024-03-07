import useMediaQuery from "../../utils/costumHook/mediaqueri";
import { useSelector } from "react-redux";
import profile from '../../assets/profile.webp'

const StoryCard = ({ setShowStory, setAddStory }: any) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1025px)");

  const myStory = useSelector((state: any) => state.persisted.story.storyData);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const stories = useSelector(
    (state: any) => state.persisted.story.otherUsersStoryData
  );
  console.log(myStory,"myStory");
  console.log(myStory?.[0]?.[0]?.storyUrl.startsWith('https://'),"myStory?.[0]?.[0]?.storyUrl.startsWith('video/'");
  console.log(userData?.profile.startsWith('https://graph'),"userData?.profile");
  
  console.log(myStory?.[0]?.[0]?.storyUrl,":myStory?.[0]?.[0]?.storyUrlmyStory?.[0]?.[0]?.storyUrl");
  console.log(myStory?.[0]?.[0]?.storyUrl.startsWith('https://graph'),"myStory?.[0]?.[0]?.storyUrl.startsWith('https://graph')");
  

  const renderSidebar = () => {
    if (isMobile) {
      return (
        <div className="flex-none scrollbar-hide">
          <div className="flex flex-col items-center  justify-center sm:w-28 sm:h-28 w-[75px] h-24 mr-1 ">
            <div className="relative flex flex-col justify-center overflow-hidden scrollbar-hide">
              <div className="rounded-full w-[70px] h-[70px] sm:h-[85px] sm:w-[85px] md:w-[105px] md:h-[105px] bg-amber-100 flex items-center justify-center">
                <img
                  className="rounded-full w-[65px] h-[65px] sm:h-20 sm:w-20 md:w-24 md:h-24"
                  src="https://i.pinimg.com/564x/8c/5b/21/8c5b21a8824a4400c72d422711f32f22.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isTablet) {
      return (
        <div className="tablet-sidebar">
          <div className="flex-none scrollbar-hide">
            <div className="flex flex-col items-center justify-center w-28 h-24 mr-1">
              <div className="relative flex flex-col justify-center overflow-hidden scrollbar-hide">
                <div className="rounded-full h-[90px] w-[90px] bg-amber-100 flex items-center justify-center">
                  <img
                    className="rounded-full h-20 w-20"
                    src="https://i.pinimg.com/564x/8c/5b/21/8c5b21a8824a4400c72d422711f32f22.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isLaptop) {
      return (
        <>
          {
            <div className="flex-none px-2 scrollbar-hide ">
              <div className="flex flex-col items-center justify-center lg:gap-x-5 w-36 h-40 ">
                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden lg:py-6 sm:py-1 scrollbar-hide ">
                  <div className="relative mx-auto max-w-lg rounded-lg w-24 h-32 lg:w-32 lg:h-40 ">
                    <div className="w-full h-full rounded-md">
                      <div className="w-full h-full bg-[#042F2C] relative rounded-lg">
                        <div
                          onClick={() =>
                            !myStory.length
                              ? setAddStory(true)
                              : setShowStory(userData.userId)
                          }
                        >
                          <img
                            className="h-28 w-full rounded-lg blur-[1px]"
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
                            alt=""
                          />
                        </div>
                        <div className="rounded-full h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-50">
                          <img
                            className="rounded-full p-0.5 h-16 w-16 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            src={
                              userData?.profile.startsWith('https://graph') ?
                              profile
                              :myStory?.[0]?.[0]?.storyUrl.startsWith('https://') ? 
                            `http://localhost:3000/profile/${userData?.profile}`
                           
                                : userData?.profile ?
                                `http://localhost:3000/profile/${userData?.profile}`
                                : profile
                            }
                            alt="S"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {stories[0].length !== 0 &&
            stories[0].map((value: any,index:number) => {
              return (
                <div className="flex-none px-2 scrollbar-hide" key={index}>
                  <div className="flex flex-col items-center justify-center lg:gap-x-5 w-36 h-40 ">
                    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden lg:py-6 sm:py-1 scrollbar-hide ">
                      <div className="relative mx-auto max-w-lg rounded-lg w-24 h-32 lg:w-32 lg:h-40 ">
                        <div className="w-full h-full rounded-md">
                          <div className="w-full h-full bg-[#042F2C] relative rounded-lg">
                            <div>
                              <img
                                onClick={() => setShowStory(value.userId)}
                                className="h-28 w-full rounded-lg blur-[1px]"
                                src={`${
                                  stories && !value.data[0]?.storyUrl.startsWith('https://')
                                    ? `http://localhost:3003/story/${value.data[0]?.storyUrl}`
                                    : value?.profile ?
                                     `http://localhost:3000/profile/${value?.profile}`
                                     : profile
                                }`}
                                alt=""
                              />
                              <div className="rounded-full h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-50">
                                <img
                                  className="rounded-full p-0.5 h-16 w-16 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                  src={`${
                                    stories && !value.data[0]?.storyUrl.startsWith('https://' && value?.profile)
                                      ? `http://localhost:3000/profile/${value?.profile}`
                                      : "https://www.shutterstock.com/image-vector/gray-avatar-icon-design-photo-600nw-1274338147.jpg"
                                  }`}
                                  alt="S"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      );
    }
  };

  return renderSidebar();
};

export default StoryCard;
