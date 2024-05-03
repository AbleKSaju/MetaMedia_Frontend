import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react'; // Import useRef and useEffect

const VIdeoCallZegoComponent = () => {
        let { roomId }: any = useParams();
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
            const MyVideoCallMeet = async () => { 
                try {
                    const appID = 1876044134;
                    const serverSecret = "22d3e800214e22bd94e4003f0e23824a";
                    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest( 
                        appID,
                        serverSecret,
                        roomId,
                        Date.now().toString(),
                        userName
                    );
                    
                    const zp = ZegoUIKitPrebuilt.create(kitToken);
                    
                    zp.joinRoom({
                        container: containerRef.current,
                        scenario: {
                            mode: ZegoUIKitPrebuilt.GroupCall
                        },
                        turnOnCameraWhenJoining: true,
                        turnOnMicrophoneWhenJoining: true,
                        onLeaveRoom: handleLeaveRoom
                    });
                } catch (error) {
                    console.error('Error generating kit token:', error);
                }
            }
            MyVideoCallMeet();
        }, [roomId, userID, userName, navigate]);
    
        return (
            <>
                <div className="w-full h-full" ref={containerRef} />
            </>
        );
        
}

export default VIdeoCallZegoComponent