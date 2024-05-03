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
    <div className="flex flex-col h-[400px] relative">
      <div className="w-[600px hidden md:flex">
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
                  backgroundColor: "black",
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
      <div className="w-[600px md:hidden flex">
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
                  height: "80%",
                  overflow: "hidden",
                  backgroundColor: "black",
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
                className="p-2 w-14  md:w-24 flex justify-center border rounded text-black "
                onClick={() => setAspect([1 / 1])}
              >
                1:1
              </div>
              <div
                className="p-2 w-14 md:w-24 flex justify-center border rounded text-black"
                onClick={() => setAspect([4 / 5])}
              >
                4:5
              </div>
            </div>
            <button className= "text-[#C1506D] absolute focus:outline-none focus:ring-2 focus:ring-offset-2 bottom-3 right-5 font-bold border border-black px-3 rounded-full" onClick={cropImage}>Crop</button>
      </div>
    </div>
  );
};

export default CropImageComponent;
