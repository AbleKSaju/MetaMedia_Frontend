import {
  Camera,
  CameraOff,
  Circle,
  Mic,
  MicOff,
  PhoneOff,
} from "lucide-react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import peer from "../../../../utils/WebRTC/peer";
import { useCallback, useEffect, useState } from "react";

const VideoCallComponent: React.FC = () => {
  console.log("VideoCallComponent");
  
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState<any>();
  const [remoteStream, setRemoteStream] = useState();
  const [users, setUsers] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [streaming, setStreaming] = useState(false);

  const userData = useSelector((state: any) => state.persisted.user.userData);

  const socket = useSelector(
    (state: any) => state.persisted.videoCall.socketData
  );

  const handleUserJoined = useCallback(({ name, id }: any) => {
    console.log(`Email ${name} joined room`);
    if (name) {
      setUsers(name);
    }
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

  useEffect(() => {
    if (remoteSocketId) {
      handleCallUser();
    }
  }, [remoteSocketId]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: any) => {
      console.log("handleIncommingCallhandleIncommingCall");
      setRemoteSocketId(from);
      const stream: any = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("Getting stream");
      
      console.log(stream,"streamstream");
      
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
      sendStreams();
      setStreaming(true);
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    console.log("handleNegoNeededhandleNegoNeeded");
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    console.log("EFFECT");
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
      const user: any = localStorage.getItem("currentReceiver");
      console.log(user, "useruser");
      setUsers(user);
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
      tracks.forEach((track: any) => {
        if (track.kind === "video") {
          track.enabled = !cameraActive;
        }
      });
      setCameraActive((prevState) => !prevState);
    }
  };

  const handleToggleAudio = () => {
    if (myStream) {
      const tracks = myStream.getTracks();
      tracks.forEach((track: any) => {
        if (track.kind === "audio") {
          track.enabled = !audioActive;
        }
      });
      setAudioActive((prevState) => !prevState);
    }
  };

  return (
    <>
      <main className="flex w-full">
        <div className="flex w-full">
          {/* <section className="w-[500px] h-full overflow-y-auto border-r bg-[#EBE9EF] border-gray-700">
          <div className="flex items-center justify-between py-5 px-4 text-black font-medium">
            <p>Participants</p>
            <strong>{remoteSocketId ? "2" : "1"}</strong>
          </div>
          <hr className="h-0.5 bg-black" />
          <div className="pt-10 pb-5 px-4">
            <div className="member__wrapper flex items-center space-x-2">
              <span className="green__icon bg-green-500 rounded-full h-2 w-2"></span>
              <p className="member_name">{userData?.name}</p>
            </div>
            {users && (
              <div className="member__wrapper flex items-center space-x-2">
                <span className="green__icon bg-green-500 rounded-full h-2 w-2"></span>
                <p className="member_name">{users}</p>
              </div>
            )}
          </div>
        </section> */}

          <section className="w-full relative verflow-y-auto scrollbar-hide">
            <div className="fixed top-10 left-10 text-[#C1506D]">
              <p className=" mb-2 font-bold">
               Participants : &nbsp;
                <strong>{remoteSocketId ? "2" : "1"}</strong>
              </p>
              <div className="flex  items-center gap-2">
              <Circle size={18} className="bg-green-600 rounded-full "/> 
              <p>{userData?.name}</p>
              </div>
              <div className="flex  items-center gap-2">
              {users && <Circle size={18} className="bg-green-600 rounded-full "/> }
              <p>{users ? users : ""}</p>
              </div>
            </div>

            <div className=" w-full h-full relative">
              {myStream && !streaming && (
                <div className="fixed bottom-1/2 left-1/2 -translate-x-1/2 text-white z-30">
                  <button
                    onClick={sendStreams}
                    className="bg-[#C1506D]  rounded-lg p-2"
                  >
                    Send Stream
                  </button>
                </div>
              )}
              {remoteStream && (
                <ReactPlayer
                  style={{ position: "absolute", top: 0, left: 0 }}
                  height="100%"
                  width="100%"
                  playing
                  url={remoteStream}
                  onPlay={() => setStreaming(true)}
                />
              )}
            </div>
            <div className="flex fixed flex-wrap h-full gap-[2em] rounded-lg bottom-10  w-[85%] items-center">
              <div className="streams_container w-full h-full flex justify-end items-end ">
                <div
                  id=""
                  className="flex relative items-center border border-[#C1506D] rounded-lg h-[200px] w-[270px] overflow-hidden cursor-pointer"
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
              <div></div>
            </div>
          </section>
          <section>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg p-4 flex gap-4">
              <button
                onClick={handleToggleCamera}
                className="text-white bg-[#C1506D] px-4 py-4 rounded-full focus:outline-none flex items-center justify-center"
              >
                {cameraActive ? <Camera /> : <CameraOff />}
              </button>
              <button className="text-white bg-red-600 active:bg-purple-600 px-4 py-2 rounded-full focus:outline-none flex items-center justify-center">
                <PhoneOff />
              </button>
              <button
                onClick={handleToggleAudio}
                className="text-white bg-[#C1506D] px-4 py-2 rounded-full focus:outline-none flex items-center justify-center"
              >
                {audioActive ? <Mic /> : <MicOff />}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default VideoCallComponent;
