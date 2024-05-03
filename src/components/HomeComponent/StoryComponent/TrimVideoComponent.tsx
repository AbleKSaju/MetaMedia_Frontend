import {
    BigPlayButton,
    ControlBar,
    LoadingSpinner,
    Player,
    PlayToggle,
  } from "video-react";
  import "video-react/dist/video-react.css";
  import { useEffect, useRef, useState } from "react";
  import { useDispatch } from "react-redux";
  import { FFmpeg } from "@ffmpeg/ffmpeg";
  import { toBlobURL, fetchFile } from "@ffmpeg/util";
  import { toast } from "sonner";
  import { Slider, Spin } from "antd";
  import { Button } from "antd";

import { addVideo, clearVideos } from "../../../utils/ReduxStore/Slice/postSlice";

  function sliderValueToVideoTime(duration: any, sliderValue: any) {
    return Math.round((duration * sliderValue) / 100);
  }

const TrimVideoComponent=({croppedImage}:any)=>{
    const ffmpegRef = useRef(new FFmpeg());
    const ffmpeg = ffmpegRef.current;
    const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
    const [videoFile, setVideoFile] = useState(croppedImage);
    const [videoPlayerState, setVideoPlayerState]: any = useState();
    const [videoPlayer, setVideoPlayer]: any = useState();
    const [gifUrl, setGifUrl] = useState();
    const [sliderValues, setSliderValues] = useState([0, 100]);
    const [processing, setProcessing] = useState(false);
    console.log(setVideoFile,gifUrl);
    
useEffect(() => {
    // loading ffmpeg on startup
    const load = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      setFFmpegLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    const min = sliderValues[0];
    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        // looping logic
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState]);

  useEffect(() => {
    if (!videoFile) {
      setVideoPlayerState(undefined);
      setSliderValues([0, 100]);
      setVideoPlayerState(undefined);
      setGifUrl(undefined);
    }
  }, [videoFile]);



  return (
    <>
        <div className="w-full h-[650px]  bg-black bg-opacity-65 flex flex-col ">
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-white w-full h-full flex flex-col justify-between rounded-lg">

            <div className="w-full h-full flex justify-center items-center ">
              <Spin
                spinning={processing || !ffmpegLoaded}
                tip={
                  !ffmpegLoaded
                    ? "Waiting for FFmpeg to load..."
                    : "Processing..."
                }
              >
                {videoFile ? (
                  <VideoPlayer
                    src={URL.createObjectURL(videoFile)}
                    onPlayerChange={(videoPlayer: any) => {
                      setVideoPlayer(videoPlayer);
                    }}
                    onChange={(videoPlayerState: any) => {
                      setVideoPlayerState(videoPlayerState);
                    }}
                  />
                ) : (
                  <h1>Upload a video</h1>
                )}

                <div className={"slider-div"}>
                  <h3 className="  w-full flex justify-center p-5">
                    Cut Video
                  </h3>
                  <Slider
                    disabled={!videoPlayerState}
                    value={sliderValues}
                    range={true}
                    min={0} // Set minimum value to 0 seconds
                    max={60} // Set maximum value to 60 seconds
                    onChange={(values) => {
                      // Ensure the selected range does not exceed 60 seconds
                      if (values[1] - values[0] > 60) {
                        values[1] = values[0] + 60;
                      }
                      setSliderValues(values);
                    }}
                    tooltip={{
                      formatter: (value) => `${value} s`, // Display time in seconds
                    }}
                  />
                </div>

                <div className={"conversion-div"}>
                  <VideoConversionButton
                    onConversionStart={() => {
                      setProcessing(true);
                    }}
                    onConversionEnd={() => {
                      setProcessing(false);
                    }}
                    ffmpeg={ffmpeg}
                    videoPlayerState={videoPlayerState}
                    sliderValues={sliderValues}
                    videoFile={videoFile}
                    onGifCreated={(girUrl: any) => {
                      setGifUrl(girUrl);
                    }}
                  />
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default TrimVideoComponent;



function VideoPlayer({
    src,
    onPlayerChange = () => {},
    onChange = () => {},
    startTime = undefined,
  }: any) {
    const [player, setPlayer]: any = useState(null);
    const [playerState, setPlayerState]: any = useState(null);
  
    useEffect(() => {
      if (playerState) {
        onChange(playerState);
      }
    }, [playerState]);
  
    useEffect(() => {
      onPlayerChange(player);
  
      if (player) {
        player.subscribeToStateChange(setPlayerState);
      }
    }, [player]);
  
    return (
      <div className="flex justify-center items-center  h-[500px] w-[500px] ">
        <Player
          width={200}
          height={200}
          ref={(player: any) => {
            setPlayer(player);
          }}
          startTime={startTime}
        >
          <source
            className="bg-red-900 p-5 w-full h-full object-contain  "
            src={src}
          />
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar autoHide={false} disableDefaultControls={true}>
            <PlayToggle />
          </ControlBar>
        </Player>
      </div>
    );
  }
  
  function VideoConversionButton({
    videoPlayerState,
    sliderValues,
    videoFile,
    ffmpeg,
    onConversionStart = () => {},
    onConversionEnd = () => {},
    onVideoTrimmed = () => {},
  }: any) {
    const dispatch = useDispatch();
    const trimAndSaveVideo = async () => {
      try {  
        // Starting the conversion process
        onConversionStart(true);
  
        const inputFileName = "input.mp4";
        const outputFileName = "output.mp4";
        toast.success(outputFileName);
  
        // Writing the video file to memory
        await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));
  
        const [min, max] = sliderValues;
        const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
        const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);
  
        // Trimming the video with FFmpeg command
        const res = await ffmpeg.exec([
          "-i",
          inputFileName,
          "-ss",
          `${minTime}`,
          "-to",
          `${maxTime}`,
          "-f",
          "mp4",
          outputFileName,
        ]);
        const trimmedVideoData = await ffmpeg.readFile("output.mp4");
        const data: any = new Uint8Array(trimmedVideoData as ArrayBuffer);
  
        const blob = new Blob([trimmedVideoData], { type: "video/mp4" });
        const file: any = new File([blob], "trimmed_video.mp4", {
          type: "video/mp4",
        });  
        // Creating a blob URL for the trimmed video
        const trimmedVideoUrl = URL.createObjectURL(
          new Blob([data.buffer], { type: "video/mp4" })
        );
  
        // Pass the trimmed video URL to the parent component
        onVideoTrimmed(trimmedVideoUrl);
        
      dispatch(clearVideos());
      dispatch(addVideo(file));
                 // Ending the conversion process
        onConversionEnd(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="w-full  flex justify-center">
        <Button onClick={() => trimAndSaveVideo()}>Save Trimmed Video</Button>
      </div>
    );
  }
  