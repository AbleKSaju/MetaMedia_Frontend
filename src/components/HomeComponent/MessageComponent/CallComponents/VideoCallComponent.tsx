import { Camera, Mic, PhoneOff, SendHorizonal } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";



const VideoCallComponent: React.FC = () => {
  const [client, setClient] = useState<any>(null);
  const [localTracks, setLocalTracks] = useState<any>([]);
  const [players, setPlayers] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const token = null;

  useEffect(() => {
    const joinRoomInit = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      const uid = Math.floor(Math.random()*10000);
      try {
        await agoraClient.join("b56527dc778946b0ace2fb95b11bdf43", "123", token, uid);
        agoraClient.on('user-published', handleUserPublished);
        agoraClient.on('user-left', handleUserLeft);
        setClient(agoraClient);
        joinStream(uid);
      } catch (error) {
        setError(error?.message);
      }
    };
    joinRoomInit();
  }, []);

  const joinStream = async (uid: any) => {
    try {
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks([microphoneTrack, cameraTrack]);
      setPlayers((prev: any) => [...prev, { uid, cameraTrack, microphoneTrack }]);
      await client.publish([microphoneTrack, cameraTrack]);
    } catch (error) {
      console.error("Error creating or playing tracks:", error);
    }
  };

  const handleUserPublished = async (user: any, mediaType: any) => {
    try {
      await client.subscribe(user, mediaType);
      setPlayers((prev: any) => [...prev, { uid: user.uid, cameraTrack: user.videoTrack, microphoneTrack: user.audioTrack }]);
    } catch (error) {
      console.error("Error subscribing to user:", error);
    }
  };

  const handleUserLeft = async (user: any, mediaType: any) => {
    try {
      const uid = user.uid;
      setPlayers((prevPlayers: any) => {
        const updatedPlayers = prevPlayers.filter((player: any) => player.uid !== uid);
        return updatedPlayers;
      });
    } catch (error) {
      console.error("Error handling user left:", error);
    }
  };




console.log(players,"playersplayers");

  return (
    <>
      <main className="flex">
        <div className="flex w-full">
          <section className="w-80 h-full overflow-y-auto border-r border-gray-700 ">
            <div className="flex items-center justify-between py-5 px-4 text-black font-medium">
              <p>Participants</p>
              <strong>27</strong>
            </div>
            <hr className="h-0.5 bg-black" />
            <div className="pt-10 pb-5 px-4">
              <div className="member__wrapper flex items-center space-x-2">
                <span className="green__icon bg-green-500 rounded-full h-2 w-2"></span>
                <p className="member_name">Sulammita</p>
              </div>
              <div className="member__wrapper flex items-center space-x-2">
                <span className="green__icon bg-green-500 rounded-full h-2 w-2"></span>
                <p className="member_name">Dennis Ivy</p>
              </div>
            </div>
          </section>
          <section className="w-full overflow-y-auto scrollbar-hide">
            <div className="h-[65vh] w-full bg-blue-800"></div>
            <div className="flex flex-wrap justify-center gap-[2em] items-center mt-[25px] mb-[200px]">
              <div className="streams_container">
                <h1
                  id=""
                  className="flex justify-center items-center border border-[#C1506D] rounded-full h-[250px] w-[250px] overflow-hidden cursor-pointer"
                >
                  1
                </h1>
              </div>
              {error && (
                <div>
                    Error: {error}. It seems to be unrelated to the Agora SDK. It might be caused by network.
                </div>
            )}
       
       <div>
       {error && <div>Error: {error}</div>}
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
          )}
    </div>
            </div>
          </section>
          <section>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-[#FADBE1] p-4 flex gap-4">
              <button className="text-white hover:bg-[#C1506D] bg-[#c65b76] px-4 py-2 rounded focus:outline-none flex items-center justify-center">
                <Camera />
              </button>
              <button className="text-white bg-red-500 active:bg-purple-600 px-4 py-2 rounded focus:outline-none flex items-center justify-center">
                <PhoneOff />
              </button>
              <button className="text-white hover:bg-[#C1506D] bg-[#c65b76] px-4 py-2 rounded focus:outline-none flex items-center justify-center">
                <Mic />
              </button>
            </div>
          </section>
          <section className="w-[35vw] right-0 h-screen overflow-y-auto border-l border-gray-700">
            <div className="h-full overflow-y-auto">
              <div className="message__wrapper flex gap-4 p-4">
                <div className="message__body__bot text-gray-400 max-w-prose">
                  <strong className="message__author__bot text-pink-600">
                    {" "}
                    Mumble Bot
                  </strong>
                  <p className="message__text__bot">
                    Welcome to the room, Don't be shy, say helroom, Don't be
                    shy, say helroom, Don't be shy, say helroom, Don't be shy,
                    say hello!
                  </p>
                </div>
              </div>
              <div className="message__wrapper flex gap-4 p-4">
                <div className="message__body__bot text-gray-400 max-w-prose">
                  <strong className="message__author__bot text-pink-600">
                    {" "}
                    Mumble Bot
                  </strong>
                  <p className="message__text__bot">
                    Dennis Ivy just entered the room!
                  </p>
                </div>
              </div>
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
          </section>
        </div>
      </main>
    </>
  );
};

export default VideoCallComponent;
