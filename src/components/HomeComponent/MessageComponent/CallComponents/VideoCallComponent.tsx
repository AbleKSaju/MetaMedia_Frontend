import { Camera, CameraOff, Mic, MicOff, PhoneOff, SendHorizonal } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import ReactPlayer from "react-player";
import peer from "../../../../utils/WebRTC/peer";
import { useCallback, useEffect, useState } from "react";

const VideoCallComponent: React.FC = () => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState<any>();
  const [remoteStream, setRemoteStream] = useState();
  const [users,setUsers] = useState(null)
  const [cameraActive, setCameraActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const userData=useSelector((state:any)=>state.persisted.user.userData)

  const socket = useSelector(
    (state: any) => state.persisted.videoCall.socketData
  );

  const handleUserJoined = useCallback(({ name, id }: any) => {
    console.log(`Email ${name} joined room`);
    setUsers(name)
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream: any = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: any) => {
      setRemoteSocketId(from);
      const stream: any = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: any) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: any) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: any) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: any) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: any) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);


  const handleToggleCamera = () => {
    if (myStream) {
      const tracks = myStream.getTracks();
      tracks.forEach(track => {
        if (track.kind === 'video') {
          track.enabled = !cameraActive;
        }
      });
      setCameraActive(prevState => !prevState);
    }
  };

  const handleToggleAudio = () => {
    if (myStream) {
      const tracks = myStream.getTracks();
      tracks.forEach(track => {
        if (track.kind === 'audio') {
          track.enabled = !audioActive;
        }
      });
      setAudioActive(prevState => !prevState);
    }
  };

  return (
    <>
      <main className="flex w-full">
        <div className="flex w-full">
          {/* <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4> */}

          <section className="w-80 h-full overflow-y-auto border-r bg-[#EBE9EF] border-gray-700 ">
            <div className="flex items-center justify-between py-5 px-4 text-black font-medium">
              <p>Participants</p>
              <strong>    {users ? "2" : "1"}</strong>
            </div>
            <hr className="h-0.5 bg-black" />
            <div className="pt-10 pb-5 px-4">
              <div className="member__wrapper flex items-center space-x-2">
                <span className="green__icon bg-green-500 rounded-full h-2 w-2"></span>
                <p className="member_name">{userData?.name}</p>
              </div>
              {users &&
              <div className="member__wrapper flex items-center space-x-2">
                <span className="green__icon bg-green-500 rounded-full h-2 w-2"></span>
                <p className="member_name">{users}</p>
              </div>
              }
            </div>
          </section>
          <section className="w-full relative bg-white overflow-y-auto scrollbar-hide">
            <div className="h-[90vh] mt-2 w-full relative">
              {remoteStream && (
                <ReactPlayer
                  style={{ position: "absolute", top: 0, left: 0 }}
                  height="100%"
                  width="100%"
                  playing
                  url={remoteStream}
                />
              )}
            </div>
            <div className="flex absolute flex-wrap justify-center gap-[2em] right-32 rounded-lg bottom-5 items-center">
              <div className="streams_container w-full flex justify-end">
                <div
                  id=""
                  className="flex justify-center relative items-center border border-[#C1506D] rounded-lg h-[200px] w-[270px] overflow-hidden cursor-pointer"
                >
                  {myStream && (
                    <ReactPlayer
                      height="100%"
                      width="100%"
                      playing
                      url={myStream}
                    />
                  )}
                </div>
              </div>

              <div>
                {myStream && <button onClick={sendStreams}>Send Stream</button>}
                {remoteSocketId && (
                  <button onClick={handleCallUser}>CALL</button>
                )}
                {/* {error && <div>Error: {error}</div>}
       {players.length > 0 ? (
             players.map((player: any) => {
              return (
                <div key={player.uid} className="flex justify-center items-center border border-[#C1506D] rounded-full h-[250px] w-[250px] overflow-hidden cursor-pointer">
                  <video
                    id={`user-${player.uid}`}
                    autoPlay
                    playsInline
                    className="w-full h-full"
                    ref={(videoRef) => {
                      if (videoRef && player.cameraTrack) {
                        player.cameraTrack.play(videoRef);
                      }
                    }}
                  ></video>
                  <audio
                    id={`audio-user-${player.uid}`}
                    autoPlay
                    playsInline
                    ref={(audioRef) => {
                      if (audioRef && player.microphoneTrack) {
                        player.microphoneTrack.play(audioRef);
                      }
                    }}
                  ></audio>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )} */}
              </div>
            </div>
          </section>
          <section>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-[#FADBE1] p-4 flex gap-4">
              <button onClick={handleToggleCamera} className="text-white hover:bg-[#C1506D] bg-[#c65b76] px-4 py-2 rounded focus:outline-none flex items-center justify-center">
              {cameraActive ? <Camera /> : <CameraOff />} 
              </button>
              <button className="text-white bg-red-500 active:bg-purple-600 px-4 py-2 rounded focus:outline-none flex items-center justify-center">
                <PhoneOff />
              </button>
              <button onClick={handleToggleAudio} className="text-white hover:bg-[#C1506D] bg-[#c65b76] px-4 py-2 rounded focus:outline-none flex items-center justify-center">
              {audioActive ? <Mic /> : <MicOff />} 
              </button>
            </div>
          </section>
          {/* <section className="w-[35vw] bg-red-800 right-0 h-screen overflow-y-auto border-l border-gray-700">
            <div className="h-full overflow-y-auto bg-blue-700">
             
            </div>
            <form className="fixed bottom-0 w-full flex bg-[#FADBE1] p-4">
              <input
                type="text"
                name="message"
                placeholder="Send a message..."
                className="w-60 rounded-md bg-white text-black p-3 focus:outline-none placeholder-gray-500"
              />
              <div className="w-20 h-full ml-3 mt-3">
                <SendHorizonal className=" text-center size-7" />
              </div>
            </form>
          </section> */}
        </div>
      </main>
    </>
  );
};

export default VideoCallComponent;
