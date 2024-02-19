import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getStoriesFunction,addNewHighlightFunction } from "../../../utils/api/methods";
import { toast } from "sonner";

const HighlightListComponent = ({ highlightName, setHighlightList, setHighlightName}: any) => {
  const [highLightData, setHighLightData] = useState([]);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const response: any = await getStoriesFunction();
      setHighLightData(response?.data?.data?.content?.story); // Update state with response
    })();
  }, []);

  const handleClick = (id: string, imgUrl: string) => {
    if (selectedImages.some((item) => item.id === id)) {
      setSelectedImages(selectedImages.filter((item) => item.id !== id));
    } else {
      const newData = { id: id, imgUrl: imgUrl };
      setSelectedImages([...selectedImages, newData]);
    }
  };

  const handleNext = async () => {
    const data = {
      name: highlightName,
      selectedImages,
    };
    const response:any = await addNewHighlightFunction(data);
    setHighlightName("")
    if(response?.data?.status){
      toast.success(response?.data?.message)
      setHighlightList(false)
    }else{
      toast.error(response?.data?.message)
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-20">
      <div className="flex justify-center w-full h-full bg-transparent">
        <div className="fixed top-24 h-[500px] md:h-[700px] w-full sm:w-[500px] md:w-[600px] md:top-10 z-30 flex justify-center border text-white rounded-lg border-teal-900  bg-white">
          <div className="absolute left-3 top-3">
            <X
              className="text-teal-900"
              onClick={() => setHighlightList(false)}
            />
          </div>
          <p className="absolute top-3 font-extrabold text-teal-900 cursor-pointer">
            Select your Highlght
          </p>
          <p
            className="absolute top-3 right-3 cursor-pointer font-extrabold text-teal-900"
            onClick={handleNext}
          >
            Post
          </p>
          <div className="flex-col w-full mt-12 mb-5 overflow-y-scroll scrollbar-hide">
            <div className="w-full px-3 flex justify-center">
              <div className="w-full h-full">
                <div className=" flex flex-wrap flex-row justify-center">
                  <div className="grid grid-cols-3 gap-0.5 md:gap-3">
                    {highLightData.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`max-w-64 ${
                          selectedImages.some(
                            (selectedItem) => selectedItem.id === item?._id
                          )
                            ? "border border-teal-950 opacity-60"
                            : ""
                        }`}
                        onClick={() => handleClick(item?._id, item?.storyUrl)}
                      >
                        <img
                          src={`http://localhost:3003/story/${item?.storyUrl}`}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightListComponent;