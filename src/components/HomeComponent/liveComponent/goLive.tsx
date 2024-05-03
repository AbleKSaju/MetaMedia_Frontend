import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt, ZegoUser } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "sonner";

const Golive = () => {

    const { roomId }:any = useParams();

const userData:any = useSelector((state: any) => state.persisted.user.userData);
const live = useSelector((state: any) => state.persisted.live);

const hostRef = useRef(null);
const navigate=useNavigate()

console.log(live,'THIS IS LIVEEEEE');

useEffect(() => {
  const initializeHost = async () => {
    const appID = 1878520769;
    const serverSecret = "eb1a1d6a1ed09b1a277bbf4b1f765d0e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
     `${userData.userName}`
    );

    let role = ZegoUIKitPrebuilt.Audience

    const isUserHost = live?.liveUser?.some((user:any) => user.hostId == userData.userId);
    if (isUserHost) {
      role = ZegoUIKitPrebuilt.Host;
    }

    let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomId +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
     window.location.protocol + '//' + 
     window.location.host + window.location.pathname +
      '?roomID=' +
      roomId +
      '&role=Audience',
  });

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Join the room as host
    zp.joinRoom({
      container: hostRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config:{
            role
        }
      },
      sharedLinks,
      onLeaveRoom: handleBack,
      onUserJoin: (users: ZegoUser[]) => {()=>hanldeUser(users)} 
      
    });

    
  };

  initializeHost(); // Initialize the host when component mounts
   
 
}, [roomId]);

const handleBack=()=>{
  navigate('/')
}

    return (
      <>
      <div className="fixed z-30 w-full  h-10 flex justify-end items-center p-5 "><X color="white" onClick={handleBack}/></div>
        <div className='w-screen h-screen fixed bg-black bg-opacity-65 z-20 flex flex-col'>
           
           <div ref={hostRef} style={{ width: '100vw', height: '100vh' }}></div>
      
        </div>
      </>
    );
};

export default Golive;
