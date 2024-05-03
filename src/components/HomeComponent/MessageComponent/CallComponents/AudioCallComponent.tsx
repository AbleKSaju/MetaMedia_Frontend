import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const AudiCall=()=>{
    
    let { callId }: any = useParams();
    const containerRef = useRef(null);
    const userData = useSelector((state: any) => state.persisted.user.userData)
    const userID = userData.userId;
    const userName = userData.userName;
    const navigate = useNavigate();
    
    const handleLeaveRoom = () => {
        navigate(`/message/index`);
    }
  

    useEffect(() => {
        if (!containerRef.current) return; 
        const MyAudioCallMeet = async () => { 
            try {
                const appID = 162876950;
                const serverSecret = "0db746a382bd06442f99610401bea5b1";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest( 
                    appID,
                    serverSecret,
                    callId,
                    Date.now().toString(),
                    userName
                );
                const zp = ZegoUIKitPrebuilt.create(kitToken);                
                zp.joinRoom({
                    container: containerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.GroupCall
                    },
                    turnOnCameraWhenJoining: false, 
                    showMyCameraToggleButton: false,
                    showPreJoinView: false,
                    turnOnMicrophoneWhenJoining: true,
                    onLeaveRoom: handleLeaveRoom,
                    
                });
            } catch (error) {
                console.error('Error generating kit token:', error);
            }
        }
        MyAudioCallMeet();
    }, [callId, userID, userName, navigate]);
    return (
        <>
       <div className="w-full h-full bg-red-500" ref={containerRef} />
        </>
    )
}

export default AudiCall