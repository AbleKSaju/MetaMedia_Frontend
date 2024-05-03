import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoriesFunction } from "../../../utils/api/methods/StoryService/Story/get";
import { addOtherUserStories } from "../../../utils/ReduxStore/Slice/storySlice";
import { showAllPostFuntion } from "../../../utils/api/methods/PostService/get/showAllPost";
import {
  SubcribeUserToSNSFunction,
  getUserByIdFuntion,
} from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";
import { PostScroll, Story } from "../../../components/HomeComponent";
import CreateMediaComponent from "../../../components/HomeComponent/CreateMediaComponent";
import { GenarateVapIdKeysFunction } from "../../../utils/api/methods/UserService/post";
import PostInHomeShimmer from "../../../pages/shimmer/PostInHomeShimmer";
import InfiniteScroll from "react-infinite-scroll-component";

interface MainBodyProps {
  setShowStory: (value: string) => void;
  setAddStory: (value: boolean) => void;
  setIsAddPost: (value: boolean) => void;
  setIsAddLive: (value: boolean) => void;

  // other props if any
}
const MainBody = ({
  setShowStory,
  setAddStory,
  setIsAddPost,
  setIsAddLive,
}: MainBodyProps) => {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const [postData, setPostData] = useState<any>([]);
  const [vapidPublickey, setVapidPublicKey] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const userData = useSelector((state: any) => state.persisted.user.userData);

  function requestNotificationPermission() {
    return new Promise((resolve: any, reject) => {
      if (Notification.permission !== "granted") {
        Notification.requestPermission()
          .then((permission) => {
            if (permission === "granted") {
              resolve();
            }
          })
          .catch((error) => {
            reject("Error requesting notification permission: " + error);
          });
      } else {
        resolve();
      }
    });
  }

  function generateVapidKeys(data: any) {
    return new Promise((resolve, reject) => {
      GenarateVapIdKeysFunction(data)
        .then((response) => {
          if (response.status) {
            resolve(response.data);
          } else {
          }
        })
        .catch((error) => {
          reject("Error generating VAPID keys: " + error);
        });
    });
  }

  function subscribeUserToSNS(data: any) {
    return new Promise((resolve: any, reject) => {
      SubcribeUserToSNSFunction(data)
        .then((response) => {
          if (response.status) {
            resolve();
          } else {
            reject("Failed to subscribe user to SNS: " + response.message);
          }
        })
        .catch((error) => {
          reject("Error subscribing user to SNS: " + error);
        });
    });
  }

  function urlBase64ToUint8Array(base64String: any) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function getDeviceInfo(key: any) {
    return new Promise((resolve, reject) => {
      try {
        if ("serviceWorker" in navigator && "PushManager" in window) {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready
              .then(async (registration) => {
                let subscription =
                  await registration.pushManager.getSubscription();

                if (!subscription) {
                  subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: key,
                  });
                }

                const deviceToken = subscription.endpoint.split("/").pop();
                const userAgent = navigator.userAgent;
                const deviceType = userAgent.includes("Mac")
                  ? "Mac"
                  : userAgent.includes("Windows")
                  ? "Windows"
                  : "Unknown";

                resolve({ deviceToken, deviceType });
              })
              .catch((error) => {
                reject("Error getting device information: " + error);
              });
          } else {
            reject("Service worker is not ready");
          }
        } else {
          reject("Push messaging is not supported");
        }
      } catch (error) {
        reject("Error getting device information: " + error);
      }
    });
  }

  // Usage in useEffect
  useEffect(() => {
    requestNotificationPermission()
      .then(() => {
        const notifiacation = new Notification("New Message", {
          body: "You have received a new message.",
        });
        const data = { userId: userData.userId };
        return generateVapidKeys(data);
      })
      .then((vapidPublicKey: any) => {
        setVapidPublicKey(vapidPublicKey);
        return getDeviceInfo(urlBase64ToUint8Array(vapidPublicKey));
      })
      .then((deviceInfo: any) => {
        if (deviceInfo) {
          const data = {
            deviceInfo,
            vapidPublicKey: vapidPublickey,
            userId: userData.userId,
          };
          // return subscribeUserToSNS(data);
        } else {
          toast.error("Failed to get device information");
        }
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
        
      });
  }, [userData.userId]);

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

  const handleScroll = () => {
    console.log("HANDLE");
    
    const container = document.querySelector('.scroll-container'); // Assuming .scroll-container is your container element
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight) {
        // User has scrolled to the bottom
        fetchPosts(); // Fetch more posts
      }
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    const container:any = document.querySelector('.scroll-container');
    if (container) {
      console.log("YOYO");
      
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      // Cleanup event listener when the component unmounts
      container.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  useEffect(() => {
    fetchPosts();
  }, [render]);

  const fetchPosts = async () => {
    console.log("fetchPostsfetchPosts");
    const params = {
      page: activePage,
      size: 5,
    };
    const response: any = await showAllPostFuntion();
    if (response.status) {
      setTotalPosts(response.total);
      setActivePage(activePage + 1);
      const postsWithData: any = await Promise.all(
        response?.data?.map(async (post: any) => {
          const userDataResponse = await getUserByIdFuntion(post.userId);
          if (userDataResponse.status) {
            const postDataWithUserData = {
              ...post,
              userData: userDataResponse.data,
            };
            return postDataWithUserData;
          } else {
            return null;
          }
        })
      );
      const filteredPosts = postsWithData.filter((post: any) => post !== null);
      setPostData(filteredPosts);
    } else {
      toast.error("Response error");
    }
  };

  return (
    <>
      {/* main div ------------------------- */}
      <div className=" w-full h-screen flex justify-center md:p-3 ">
        <div className="w-full sm:w-11/12 h-full flex flex-col overflow-y-auto scrollbar-hide">
          {/* story main div ------------------- */}
          <Story setShowStory={setShowStory} setAddStory={setAddStory} />
          {/* story main div ------------------- */}

          {/* create option -------------------- */}
          <CreateMediaComponent
            setAddStory={setAddStory}
            setIsAddPost={setIsAddPost}
            setIsAddLive={setIsAddLive}
          />

          <div className="scroll-container w-full h-[500px] flex-none items-center p-1  gap-2  justify-center ">
            <div className=" flex h-auto flex-col w-full justify-center items-center gap-5"
            >
                {postData.length ? (
                  postData.map((item: any) => {
                    return (
                      <>
                        <div key={item._id}>
                          <PostScroll
                            setRender={setRender}
                            render={render}
                            data={item}
                          />
                        </div>
                      </>
                    );
                  })
                ) : (
                  <PostInHomeShimmer />
                )}
            </div>
          </div>
        </div>
      </div>
      {/* main div ------------------------- */}
    </>
  );
};
export default MainBody;
