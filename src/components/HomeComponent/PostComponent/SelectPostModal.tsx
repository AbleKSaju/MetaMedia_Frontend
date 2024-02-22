import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { X } from "lucide-react";
const SelectPostModal = () => {
  const [CamaraOn, setCamaraOn] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const openGallery = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input element not found");
    }
  };
  const getImage = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(formData.get("file"), "JJJ");
    //    set url to the redux and open the nexxt page
  };

  const openCamara = () => {
    setCamaraOn(true);
  };

  return (
    <>
      {!CamaraOn ? (
        <>
          <div className=" bg-transparent  flex justify-center p-16 overflow-hidden ">
            <div className="  w-2/3 h-2/3  flex justify-center sm:border rounded-lg sm:border-gray-200 sm:h-[650px] ">
              <div className="flex-col w-full   ">
                <div className="w-full  p-4 flex justify-center sm:border-b sm:border-b-gray-200 	">
                  <div className="">
                    <p className="font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
                      Create New post
                    </p>
                  </div>
                </div>

                <div className="flex justify-center p-4  mt-10 sm:p-8">
                  <img
                    className="sm:w-72 sm:h-72 h-52 w-52 animate-bounce  "
                    src="https://i.pinimg.com/564x/74/cc/77/74cc772d81d7dae27041a65f1cd9ac8b.jpg"
                    alt=""
                  />
                </div>
                <div className="sm:p-5"></div>
                <div className="flex justify-center sm:pt-5 pt-20 p-10">
                  <div className="flex  gap-6 ">
                    <input
                      type="file"
                      name="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={getImage}
                      accept="image/*, video/*"
                    />
                    <button
                      className="bg-teal-800 text-white p-2 text-[10px] sm:text-[15px] rounded-lg w-28 h-10 sm:w-40"
                      onClick={openGallery}
                    >
                      {" "}
                      Select from gallary
                    </button>
                    <button
                      className="bg-teal-800 text-white p-2 text-[10px] sm:text-[15px] rounded-lg w-28 h-10 sm:w-40 "
                      onClick={openCamara}
                    >
                      Take a picture{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <CamaraModal
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            setCamaraOn={setCamaraOn}
          />
        </>
      )}
    </>
  );
};

export default SelectPostModal;

const CamaraModal = ({ imgSrc, setImgSrc, setCamaraOn }: any) => {
  const closeTheCamara = () => {
    setCamaraOn(false);
  };
  const webcamRef: any = useRef(null);
  const capture = useCallback(() => {
    const imageSrc: any = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
  const retake = () => {
    setImgSrc(null);
  };
  const takePicture = () => {
    capture();
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };
  const selectImage = () => {
    //add url to redux and open the next page
    setImgSrc(null);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <X onClick={closeTheCamara} />
          <div className="mx-auto max-w-md">
            <div className=" py-8 text-base flex justify-center text-gray-600">
              {imgSrc ? (
                <img className="w-80 h-80 rounded " src={imgSrc} alt="" />
              ) : (
                <>
                  <Webcam
                    className=" inset-0 w-80 h-80 object-cover rounded "
                    ref={webcamRef}
                  />
                </>
              )}
            </div>
            <div className="flex justify-center gap-6">
              {imgSrc ? (
                <>
                  <button
                    className="bg-teal-800 w-32 text-white text-lg  font-semibold rounded"
                    onClick={retake}
                  >
                    Retake
                  </button>
                  <button
                    className="bg-teal-800 w-32 text-white text-lg  font-semibold rounded "
                    onClick={selectImage}
                  >
                    Select
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-teal-800 w-32 text-white text-lg  font-semibold rounded"
                    onClick={takePicture}
                  >
                    Click
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
