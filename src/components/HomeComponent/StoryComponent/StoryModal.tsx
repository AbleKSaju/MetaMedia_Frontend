import { useState } from "react";
import ChooseImageComponent from "./ChooseImageComponent";
import { ArrowLeft, X } from "lucide-react";
import CropImageComponent from "./CropImageComponent";
import CreateStoryComponent from "./CreateStoryComponent";
import { toast } from "sonner";
import { AddStoryFunction } from "../../../utils/api/methods";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStory } from "../../../utils/ReduxStore/Slice/storySlice";


const StoryModal = ({ setAddStory }: any) => {
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropImage,setCropImage] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  // console.log(storyData,"storyDatastoryDatastoryData");
  
  function base64StringToFormDataImageFile(croppedImage:any, fileName:any, fileType:any) {
    croppedImage = croppedImage.replace(/^data:image\/\w+;base64,/, "");
    const byteCharacters = atob(croppedImage);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });
    const formData = new FormData();
    formData.append("image", blob, fileName);
    return formData;
}
  
  // Example usage:
  // const base64String = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRYZGRgZHBgYGBwYGhgYGBoYGBgaGhoZGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHBISGjQh...3000 more characters";
  
  const submitHandler=async()=>{
    if(caption && croppedImage){
      const fileName = "image.jpg";
      const fileType = "image/jpeg";
      const formData = base64StringToFormDataImageFile(croppedImage, fileName, fileType);
      const response: any = await AddStoryFunction({ image: formData, caption: caption });
      console.log(response,"resswwwsssssss");
      console.log(response.data,"resswwwsssssss");
      console.log(response.data.story,"STORresswwwsssssss");
      console.log(response.data.story.content,"conSTORresswwwsssssss");
      const data = response.data.story.content.story
      console.log(data,"IAMDATA");
      
      if(response?.data?.status){
        setCropImage(false)
        setCroppedImage(null)
        setImageUrl(null)
        setSelectedFile(null)
        setAddStory(false)
        dispatch(addStory(data))
        Navigate('/')
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }else{
      toast.error("Content not found")
    }
  }
  return (
<div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-20">
  <div className="flex justify-center w-full h-full bg-transparent ">
    <div className="fixed top-24 h-[500px] md:h-[700px] w-full sm:w-[500px] md:w-[600px] md:top-10 z-30 flex justify-center border text-white rounded-lg border-teal-900  bg-white">        
    <div className="flex-col w-full  ">
          <div className="w-full  p-4 flex justify-center sm:border-b sm:border-b-teal-900">
            <div className="w-full h-full">
              {cropImage && <ArrowLeft size={30} onClick={()=>{setCropImage(false);setCroppedImage(null);}} className="absolute text-teal-900"/>}
              {cropImage && !selectedFile && <p onClick={()=>setCropImage(true)} className= "text-teal-900 absolute right-5 font-bold">Next</p> }
              <p onClick={submitHandler} className= "text-teal-900 absolute right-5 font-bold">{ caption && croppedImage && <p>Post</p> }</p> 
              {!selectedFile ? <X onClick={() => setAddStory(false)} className="text-teal-900 absolute right-5"/>: <p onClick={()=>setCropImage(true)} className={`${cropImage?"hidden":" text-teal-900 absolute right-5 font-bold"}`}>Next</p> }
                <p className="text-center mb-5 sm:mb-20 md:mb-0 font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
                  Create new story
                </p>
            </div>
          </div>
          {!cropImage && <ChooseImageComponent selectedFile={selectedFile} setSelectedFile={setSelectedFile} setImageUrl={setImageUrl}/>}
          {cropImage && !croppedImage && <CropImageComponent selectedFile={selectedFile} imageUrl={imageUrl} setCroppedImage={setCroppedImage}/>}
          {croppedImage && cropImage && <CreateStoryComponent croppedImage={croppedImage} caption={caption} setCaption={setCaption}/> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;