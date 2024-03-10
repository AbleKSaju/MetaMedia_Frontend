import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";

const Golive = () => {

    const { roomId }:any = useParams();

const userData = useSelector((state: any) => state.persisted.user.userData);
const live = useSelector((state: any) => state.persisted.live);

const hostRef = useRef(null);


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
      'rashik muhammed'
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
      sharedLinks
      
    });
  };

  initializeHost(); // Initialize the host when component mounts
  
}, [roomId]);


    return (
        <div className='w-screen h-screen fixed bg-black bg-opacity-65 z-20 flex flex-col'>
           
           <div ref={hostRef} style={{ width: '100vw', height: '100vh' }}></div>
      
        </div>
    );
};

export default Golive;
