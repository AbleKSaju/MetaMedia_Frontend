import { ImagePlus, X } from "lucide-react";
import React, { useState } from "react";

const StoryModal = ({ setAddStory }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  return (
<div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-20">
  <div className="flex justify-center w-full h-full bg-transparent ">
    <div className="fixed top-24 h-[500px] md:h-[700px] w-full sm:w-[500px] md:w-[600px] md:top-10 z-30 flex justify-center border text-white rounded-lg border-teal-900  bg-white">        
    <div className="flex-col w-full  ">
          <div className="w-full  p-4 flex justify-center sm:border-b sm:border-b-teal-900   ">
            <div className="w-full h-full">
             {!selectedFile && <X
                className="text-teal-900 absolute right-5 "
                onClick={() => setAddStory(false)}
              />}
              <p className="text-center mb-5 sm:mb-20 md:mb-0 font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
                Create new story
              </p>
            </div>
          </div>
          <div className="flex justify-center h-[400px] md:h-[600px]">
            <div
              className="flex justify-center items-center h-full w-full"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="rounded-lg shadow-lg w-[500px] h-[450px] flex border border-teal-900 flex-col justify-between relative p-8">
               {selectedFile && <X size={26} className="absolute right-2 top-2 text-teal-900" onClick={()=>setSelectedFile(null)}/>}
                {!selectedFile && <p className="text-center text-teal-900">Drag photos and videos here</p> }
                {!selectedFile && <ImagePlus width={80} height={200} className="self-center text-teal-900"/>}
                {selectedFile ? (
                  <>
                    <p className="mb-4 text-teal-900">File: {selectedFile.name}</p>
                    {selectedFile.type.startsWith("image") ? (
                      <div className="flex justify-center">

                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected"
                          className=" w-72 h-80"
                        />
                      </div>
                    ) : selectedFile.type.startsWith("video") ? (
                      <video
                        src={URL.createObjectURL(selectedFile)}
                        controls
                        className="max-w-full h-auto"
                      />
                    ) : (
                      <p className="text-red-800">Unsupported file type</p>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center">

                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-center bg-teal-800 bottom-0 text-white font-semibold px-1 w-40 py-2 rounded-lg"
                  >
                    Choose File
                  </label>
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            </div>
          </div>
          {/* <div className="flex justify-center sm:pt-5 pt-20 p-10">
            <div className="flex gap-6 ">
              <input
                type="file"
                name="file"
                id="fileInput"
                style={{ display: "none" }}
                // onChange={getImage}
                accept="image/*, video/*"
              />
              <button
                className="bg-teal-800 text-white p-2 text-[10px] sm:text-[15px] rounded-lg w-28 h-10 sm:w-40"
                // onClick={openGallery}
              >
                {" "}
                Select from gallary
              </button>
              <button
                className="bg-teal-800 text-white p-2 text-[10px] sm:text-[15px] rounded-lg w-28 h-10 sm:w-40 "
                // onClick={openCamara}
              >
                Take a picture{" "}
              </button>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
