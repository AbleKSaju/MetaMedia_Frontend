import { ArrowLeft, ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Cropper from "react-easy-crop";
import { useEffect, useState } from "react";
import {
  clearImages,
  addImage,
  setAspectRatio,
  clearAspectRatio,
} from "../../../../utils/ReduxStore/Slice/postSlice";
import { Scaling, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const CropImageBody = ({ setPostState }: any) => {
  const post = useSelector((state: any) => state.persisted.post);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedImageSrc, setSelectedImageSrc] = useState(post.images[0]);
  const [aspect, setAspect]: any = useState([1 / 1]);
  const [openSelectSize, setOpenSelectSize] = useState(false);
  const [imglength, setImageLength] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [croppedImages, setCroppedImages]: any = useState([]); // Store cropped images here
  const [croppedImage, setCroppedImage] = useState("");
  const [isfinish, setIsfinish] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setImageLength(post.images.length);
    setSelectedImageIndex(0);
    setSelectedImageSrc(post.images[selectedImageIndex]);
  }, [post]);

  //handle zoom in
  const handleZoomIn = () => {
    if (zoom < 3) {
      setZoom(zoom + 0.1);
    }
  };
  //handle zoom out
  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1);
    }
  };
  //change the aspect ratio
  const changeSize = (size: any) => {
    dispatch(clearAspectRatio());
    dispatch(setAspectRatio(aspect));
    setAspect(size);
  };

  //crop the image
  const handleCropComplete = async (
    croppedArea: { x: number; y: number; width: number; height: number },
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    try {
      const croppedImag = await getCroppedImage(
        selectedImageSrc,
        croppedArea,
        croppedAreaPixels
      );

      await setCroppedImage(croppedImag);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const getCroppedImage = (
    imageSrc: any,
    croppedArea: any,
    croppedAreaPixels: any
  ): any => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const ctx: any = canvas.getContext("2d");

        // Set canvas size based on cropped area dimensions
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        // Draw the cropped image onto the canvas
        ctx?.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        // Convert the cropped image to base64 format
        const croppedImageBase64: any = canvas.toDataURL("image/jpeg"); // Change 'image/jpeg' to 'image/png' if needed

        resolve(croppedImageBase64);
      };
      image.onerror = (error) => reject(error);
    });
  };

  //open the small modal of aspect size
  const openSize = () => {
    setOpenSelectSize(!openSelectSize);
  };

  const handleBack = () => {
    dispatch(clearImages());
    setPostState(1);
  };

  useEffect(() => {
    if (isfinish) {
      dispatch(clearImages());
      dispatch(addImage(croppedImages));
      dispatch(clearAspectRatio());
      dispatch(setAspectRatio(aspect));
      setPostState(3);
    }
  }, [croppedImages, isfinish]);
  // Function to switch to next image
  const switchToNextImage = async () => {
    if (selectedImageIndex < imglength - 1) {
      await setCroppedImages([...croppedImages, croppedImage]);
      setCroppedImage("");
      setSelectedImageIndex(selectedImageIndex + 1);
      setSelectedImageSrc(post.images[selectedImageIndex + 1]); // Update selected image source
      setCrop({ x: 0, y: 0 }); // Reset crop for the new image
      setZoom(1); // Reset zoom for the new image
    }
  };

  const switchToPrevImage = () => {
    if (selectedImageIndex > 0) {
      setCroppedImages(croppedImages.slice(0, -1));
      setSelectedImageIndex(selectedImageIndex - 1);
      setSelectedImageSrc(post.images[selectedImageIndex - 1]); // Update selected image source
      setCrop({ x: 0, y: 0 }); // Reset crop for the new image
      setZoom(1); // Reset zoom for the new image
    }
  };

  // Function to handle proceeding to next step
  const handleNextStep = async () => {
    await setCroppedImages([...croppedImages, croppedImage]);
    await setIsfinish(true);
  };

  return (
    <>
      <div className="fixed top-32 md:h-5/6 w-full md:top-16 z-10   sm:w-2/4   flex justify-center border text-white rounded-lg border-gray-500  bg-white">
        <div className="flex-col w-full h-full ">
          <div className="w-full p-4 flex justify-center sm:border-b sm:border-b-gray-200">
            <div className="flex justify-between w-full">
              <p className="text-black">
                <ArrowLeft onClick={handleBack} />
              </p>
              <p className="font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
                Crop
              </p>
              {selectedImageIndex === imglength - 1 ? (
                <p
                  className="text-black font-bold text-md"
                  onClick={handleNextStep}
                >
                  Next
                </p>
              ) : (
                <>
                  <p></p>
                </>
              )}
            </div>
          </div>

          <div className="w-full h-full ">
            <div className="flex justify-center w-full h-[400px] md:h-[600px] flex-col ">
              <div className="w-full h-[90%] flex justify-center">
                <Cropper
                  image={selectedImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                  style={{
                    containerStyle: {
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      backgroundColor: "white",
                    },
                    mediaStyle: {
                      width: "",
                      height: "",
                      display: "block",
                    },
                    cropAreaStyle: {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                />
              </div>
              <div className="w-full flex justify-between pb-9 rounded ">
                {selectedImageIndex > 0 ? (
                  <div
                    className="text-black pl-6 pt-2"
                    onClick={switchToPrevImage}
                  >
                    <ArrowBigLeft />
                  </div>
                ) : (
                  <>
                    {" "}
                    <div></div>
                  </>
                )}
                <div className="flex ">
                  <ZoomOut
                    className="text-black mt-2 "
                    onClick={handleZoomOut}
                  />
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e: any) => {
                      setZoom(e.target.value);
                    }}
                    className="zoom-range"
                  />
                  <ZoomIn className="text-black mt-2" onClick={handleZoomIn} />
                  <div className=" pl-8 w-10 h-10  " onClick={openSize}>
                    <Scaling className="text-black mt-3" />
                  </div>
                </div>
                {openSelectSize && (
                  <>
                    <div className="fixed bg-white flex-col w-20 h-20 right-0 bottom-12 md:right-1/3 border rounded p-1.5">
                      <div
                        className="p-1 w-full flex justify-center border rounded text-black "
                        onClick={() => changeSize([1 / 1])}
                      >
                        1:1
                      </div>
                      <div
                        className="p-1 w-full flex justify-center border rounded text-black"
                        onClick={() => changeSize([4 / 5])}
                      >
                        4:5
                      </div>
                    </div>
                  </>
                )}

                {selectedImageIndex < imglength - 1 ? (
                  <div
                    className="text-black pr-6 pt-2"
                    onClick={switchToNextImage}
                  >
                    <ArrowBigRight />
                  </div>
                ) : (
                  <>
                    {" "}
                    <div></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropImageBody;
