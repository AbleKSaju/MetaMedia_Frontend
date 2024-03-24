import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import Cropper from "react-easy-crop";

const CropImageComponent = ({ selectedFile ,imageUrl,setCroppedImage,setTrimVideo}: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect]: any = useState([1 / 1]);
  const [croppedAreaPixels,setCroppedAreaPixels] = useState<any>('')

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
    const cropImage = async () => {
        if (!croppedAreaPixels) {
          return;
        }
    
        const canvas = document.createElement('canvas');
        const image = new Image();
        image.src = imageUrl;
        await new Promise<void>(resolve => {
          image.onload = () => {
            resolve();
          };
        });
        
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx:any = canvas.getContext('2d');
        ctx.drawImage(
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
    
        const croppedImageBase64:any = canvas.toDataURL('image/jpeg');
        setTrimVideo(true)
        setCroppedImage(croppedImageBase64)
  }

  const handleZoomIn = () => {
    if (zoom < 3) {
      setZoom(zoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1);
    }
  };
  return (
    <div className="flex flex-col h-[600px] relative">
      <div className="w-[600px]">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
              containerStyle: {
                  width: "100%",
                  height: "500px",
                  overflow: "hidden",
                  backgroundColor: "teal",
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
      <div className="w-full h-20 rounded absolute bottom-0">
        <div className="flex justify-center items-center">
        <ZoomOut className="text-black mt-2" onClick={handleZoomOut} />
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
          className="zoom-range "
        />
        <ZoomIn className="text-black mt-2" onClick={handleZoomIn} />
        </div>
            <div className=" flex justify-center w-full h-12 border rounded p-1.5">
              <div
                className="p-2 w-24 flex justify-center border rounded text-black "
                onClick={() => setAspect([1 / 1])}
              >
                1:1
              </div>
              <div
                className="p-2 w-24 flex justify-center border rounded text-black"
                onClick={() => setAspect([4 / 5])}
              >
                4:5
              </div>
            </div>
            <button className= "text-teal-900 absolute hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bottom-3 right-5 font-bold border border-teal-900 px-3 rounded-full" onClick={cropImage}>Crop</button>
      </div>
    </div>
  );
};

export default CropImageComponent;

// import CreatePostModalBody from "./CreatePostmodalBody";
// import { ArrowLeft } from "lucide-react";
// import Cropper from "react-easy-crop";
// import { useState } from "react";

// import { AdvancedImage } from "@cloudinary/react";

// import { scale } from "@cloudinary/url-gen/actions/resize";

// import { Scaling, ZoomIn, ZoomOut } from "lucide-react";
// import { toast } from "sonner";

// const CropImageBody = () => {
//   const [imgSrc, setImgSrc] = useState({
//     src1: "https://i.pinimg.com/564x/23/44/4c/23444cbdc9b6130cb8d7e3dc65f226ed.jpg",
//     src2: "https://i.pinimg.com/564x/36/6a/b6/366ab65c58dcf82d507a462dcd6b8258.jpg",
//   });
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [selectedImageSrc, setSelectedImageSrc] = useState(imgSrc.src2);
//   const [isImg, setIsImg] = useState(true);
//   const [isVedio, setIsVedio] = useState(false);
//   const [aspect, setAspect]: any = useState([1 / 1]);
//   const [openSelectSize, setOpenSelectSize] = useState(false);
//   const [croppedImage, setCroppedImage] = useState(null);

//   //handle zoom in
//   const handleZoomIn = () => {
//     if (zoom < 3) {
//       setZoom(zoom + 0.1);
//     }
//   };
//   //handle zoom out
//   const handleZoomOut = () => {
//     if (zoom > 1) {
//       setZoom(zoom - 0.1);
//     }
//   };
//   //change the aspect ratio
//   const changeSize = (size: any) => {
//     setAspect(size);
//   };

//   //crop the image
//   const handleCropComplete = (
//     croppedArea: { x: number; y: number; width: number; height: number },
//     croppedAreaPixels: { x: number; y: number; width: number; height: number }
//   ) => {
//     console.log("Cropped Area:", croppedArea);
//     console.log("Cropped Area Pixels:", croppedAreaPixels);
//   };

//   //open the small modal of aspect size
//   const openSize = () => {
//     setOpenSelectSize(!openSelectSize);
//   };

//   //save the image and open next modal
//   const handleNext = () => {};

//   return (
//     <>
//       <div className="flex-col w-full h-full ">
//         <div className="w-full p-4 flex justify-center sm:border-b sm:border-b-gray-200">
//           <div className="flex justify-between w-full">
//             <p className="text-black">
//               <ArrowLeft />
//             </p>
//             <p className="font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
//               Crop
//             </p>
//             <p className="text-teal-800 font-bold text-md">Next</p>
//           </div>
//         </div>

//         <div className="w-full h-full   ">
//           <div className="flex justify-center w-full h-[560px] flex-col ">
//             <div className="w-full h-full flex justify-center   ">
//               <Cropper
//                 image={selectedImageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={aspect}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={handleCropComplete}
//                 style={{
//                   containerStyle: {
//                     position: "relative",
//                     width: "100%",
//                     height: "100%",
//                     overflow: "hidden",
//                     backgroundColor: "white",
//                   },
//                   mediaStyle: {
//                     width: "",
//                     height: "",
//                     display: "block",
//                   },
//                   cropAreaStyle: {
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                   },
//                 }}
//               />
//             </div>

//             <div className="w-full flex justify-center pb-9 mt-2 rounded ">
//               <ZoomOut className="text-black mt-2 " onClick={handleZoomOut} />
//               <input
//                 type="range"
//                 value={zoom}
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 aria-labelledby="Zoom"
//                 onChange={(e: any) => {
//                   setZoom(e.target.value);
//                 }}
//                 className="zoom-range"
//               />
//               <ZoomIn className="text-black mt-2" onClick={handleZoomIn} />

//               <div className=" pl-8 w-10 h-10  " onClick={openSize}>
//                 <Scaling className="text-black mt-3" />
//               </div>
//               {openSelectSize && (
//                 <>
//                   <div className="fixed  flex-col  w-24 h-24 ml-96 border  rounded bg-white p-1.5">
//                     <div
//                       className="p-2 w-full flex justify-center border rounded text-black "
//                       onClick={() => changeSize([1 / 1])}
//                     >
//                       1:1
//                     </div>
//                     <div
//                       className="p-2 w-full flex justify-center border rounded text-black"
//                       onClick={() => changeSize([4 / 5])}
//                     >
//                       4:5
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CropImageBody
