import { useEffect, useState } from "react";
import React from 'react';


  const VideoPreview = ({ croppedVideo }:any) => {
    console.log("I am VideoPreview");
    
    const videoUrl = React.useMemo(() => URL.createObjectURL(croppedVideo), [croppedVideo]);
  
    return (
      <video src={videoUrl} controls />
    );
  };
  const CreateStoryComponent = ({ croppedImage, caption, setCaption }:any) => {
    console.log(croppedImage,"croppedImagecroppedImage");
    
    return (
      <div>
        <div className="flex justify-center h-[400px] md:h-[600px]">
          <div className="flex flex-col justify-around items-center h-full w-full">
            <div className="rounded-lg shadow-lg w-[500px] h-[450px] flex border border-teal-900 flex-col justify-between relative p-8">
              {croppedImage?.type?.startsWith('video/')  ? (
                <VideoPreview croppedVideo={croppedImage} />
              ) : (
                <img src={croppedImage} alt="" className="w-full h-full" />
              )}
            </div>
            <div className="mb-10">
              <input
                type="text"
                placeholder="Add a caption"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                className="w-72 h-10 p-2 rounded-lg border border-teal-900 outline-none focus:border-2 text-teal-900"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateStoryComponent;