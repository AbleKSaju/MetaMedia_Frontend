import { useCallback, useRef, useState } from "react";
import { Camera, ImagePlus } from 'lucide-react';
import Webcam from "react-webcam";
import { log } from "console";

const AddPostModal = () => {
    const [imgSrc, setImgSrc] = useState(null);
    const webcamRef:any = useRef(null);
    const [showCamera, setShowCamera] = useState(false);

    const capture = useCallback(() => {
        const imageSrc:any = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const openGallery = () => {
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.click();
        } else {
            console.error("File input element not found");
        }
    };

    const getImage = (e:any) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        // Handle the form data here
    };

    const openCamera = () => {
        setShowCamera(true);
    };

    const closeCamera = () => {
        setShowCamera(false);
    };

    const handleImageSelect = (selectedImgSrc:any) => {
        setImgSrc(selectedImgSrc);

    };

    return (
        <>
            <div className="sm:grid grid-cols-12 grid-rows-12 gap-0 flex justify-center">
                <div className="sm:col-span-8 sm:row-span-8 col-start-3 sm:col-start-3 row-start-1 sm:row-start-3 border rounded-lg shadow-xl" onClick={showCamera ? closeCamera : undefined}>
                    <div className="col-span-8 col-start-1 sm:col-start-3 row-start-1 sm:row-start-3 bg-[#07312E] rounded-lg w-full h-14 sm:h-20 items-center flex justify-center">
                        <p className="text-white font-roboto text-lg font-semibold text-center">Create New Post</p>
                    </div>

                    <div className="flex-col sm:flex-row flex justify-center p-10 sm:p-20">
                        {showCamera && (
                            <ShowCamera capture={capture} webcamRef={webcamRef} setImgSrc={setImgSrc} imgSrc={imgSrc} onSelect={handleImageSelect} setShowCamera={setShowCamera} />
                        )}
                        <div className="col-span-3 row-span-5 col-start-3 row-start-5" onClick={openGallery}>
                            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-white dark:bg-white dark:border">
                                <div className="flex justify-center flex-col sm:w-40 sm:h-52 items-center">
                                    <div className="p-5 text-[#07312E]"><ImagePlus size={50} /></div>
                                    <div className="overflow-hidden text-md text-[#07312E] font-medium">Select from gallery</div>
                                </div>
                            </div>
                            <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={getImage} />
                        </div>
                        <div className="p-5"></div>

                        <div className="col-span-3 row-span-5 col-start-3 row-start-5">
                            <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-white dark:bg-white dark:border" onClick={openCamera}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* <Webcam className="absolute inset-0 w-full h-full object-cover" ref={webcamRef} /> */}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">

                                </div>
                                {!showCamera && (
                                    <div className="relative flex justify-center flex-col sm:w-40 sm:h-52 items-center z-10">
                                        <div className="p-5 text-white relative z-20"><Camera size={50} /></div>
                                        <div className="overflow-hidden text-md text-balck font-medium relative z-20">Take a picture</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ShowCamera = ({ capture, webcamRef, setImgSrc, imgSrc, onSelect ,setShowCamera}:any) => {
    const takePicture = () => {
        capture(); // Call the capture function from props
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    };

    const retake = () => {
        setImgSrc(null);
    };

    const selectImage = () => {
        onSelect(imgSrc);
        console.log(imgSrc,'yhis iisss');
        
        setImgSrc(null); 
        setShowCamera(null)
        
    };

    return (
        <>
            <div className="fixed z-10 flex flex-col justify-center overflow-hidden">
                <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 w-96 h-96 border border-black">
                    <div className="mx-auto max-w-md">
                        <div className="divide-y divide-gray-300/50">
                            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                                {imgSrc ? (
                                    <img src={imgSrc} alt="Captured" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        {/* <Webcam className="absolute inset-0 w-full h-full object-cover" ref={webcamRef} /> */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    {/* Button to take a picture */}
                    {imgSrc ? (
                        <div className="flex gap-4">
                            <button className="bg-teal-900 w-20 h-8 rounded-lg shadow-xl text-white font-medium" onClick={retake}>Re-take</button>
                            <button className="bg-teal-900 w-20 h-8 rounded-lg shadow-xl text-white font-medium" onClick={selectImage}>Select</button>
                        </div>
                    ) : (
                        <>
                            <button className="bg-teal-900 w-20 h-8 rounded-lg shadow-xl text-white font-medium" onClick={takePicture}>Capture</button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddPostModal;
