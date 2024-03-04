import { useEffect, useState } from "react";
import ChooseImageComponent from "./ChooseImageComponent";
import { ArrowLeft, X } from "lucide-react";
import CropImageComponent from "./CropImageComponent";
import CreateStoryComponent from "./CreateStoryComponent";
import { toast } from "sonner";
import { AddStoryFunction } from "../../../utils/api/methods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { AddVideoToStoryFunction } from "../../../utils/api/methods/StoryService/Story/post";

const StoryModal = ({ setAddStory }: any) => {
  
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [cropImage,setCropImage] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const [back,setBack] = useState(false)
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate()
  const userData = useSelector((state: any) => state.persisted.user.userData);

  console.log(selectedFile,"selectedFile");
  useEffect(()=>{
    console.log(selectedFile?.type,"BOOL")

    if(selectedFile?.type?.startsWith('video/') && back==false){
      console.log("setIsVideosetIsVideosetIsVideo");
      setIsVideo(true)
      setCroppedImage(selectedFile)
      setCropImage(true)
    }
},[setSelectedFile,cropImage])
const video = croppedImage

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

const getSignatureForUpload = async (folder:string) => {
  try {
    const res = await axios.post("http://localhost:3003/api/story/getSignature", { folder });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const uploadFile = async ( timestamp:any, signature:any) => {
  console.log("i am uploadFile");
  console.log(timestamp);
  console.log(signature,"SIG");
  
  const data = new FormData()
  data.append("file", video);
  data.append("timestamp", timestamp);
  data.append("signature", signature);
  data.append("api_key", "849696175549166");
  data.append("folder", "stories");
  try {
    const cloudName="dton3lr3o"
    let resourceType='video'
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    console.log(api,"apiapiapi");
    const res = await axios.post(api, data)
    console.log(res.data,"res.datares.data");
    const { secure_url } = res.data;
    console.log(secure_url);
    console.log("File upload success ...");
    return secure_url;
  } catch (error) {
    console.log(error,"er");
  }
}

  const submitHandler=async()=>{
    if(caption && croppedImage){
      if(croppedImage?.type?.startsWith('video/')){
        setLoading(true)
        const { timestamp: videoTimestamp, signature: videoSignature } = await getSignatureForUpload('stories');
console.log(videoTimestamp, videoSignature,"videoTimestamp, videoSignature");

        const videoUrl = await uploadFile( videoTimestamp, videoSignature);
        console.log(videoUrl,"videoUrlvideoUrlvideoUrlvideoUrl");     
        const data={
          profile:userData.profile,
          caption:caption,
          imageUrl:videoUrl
        }
        console.log(data,"datadatadatadatadatadatadata");
        
        const response: any = await AddVideoToStoryFunction(data);
        setLoading(false)
        if(response?.status){
          setCropImage(false)
          setCroppedImage(null)
          setImageUrl(null)
          setSelectedFile(null)
          setAddStory(false)
          Navigate('/')
          toast.success(response?.message)
        }else{
          toast.error(response?.message)
        }
      }else{
        const fileName = "image.jpg";
        const fileType = "image/jpeg";
        const formData = base64StringToFormDataImageFile(croppedImage, fileName, fileType);
        const response: any = await AddStoryFunction({ image: formData, caption: caption, profile: userData.profile });
        if(response?.status){
          setCropImage(true)
          setCroppedImage(null)
          setImageUrl(null)
          setSelectedFile(null)
          setAddStory(false)
          Navigate('/')
          toast.success(response.message)
        }else{
          toast.error(response.message)
        }
      }
    }else{
      toast.error("Data not found")
    }
  }

  return (
<div className="fixed top-0 left-0 w-full h-full backdrop-blur bg-opacity-50 bg-black z-20">
  <div className="flex justify-center w-full h-full bg-transparent ">
    <div className="fixed top-24 h-[500px] md:h-[700px] w-full sm:w-[500px] md:w-[600px] md:top-10 z-30 flex justify-center border text-white rounded-lg border-teal-900  bg-white">        
    <div className="flex-col w-full  ">
          <div className="w-full  p-4 flex justify-center sm:border-b sm:border-b-teal-900">
            <div className="w-full h-full">
              {cropImage && <ArrowLeft size={30} onClick={()=>{setCropImage(false);setCroppedImage(null);setBack(true)}} className="absolute text-teal-900"/>}
              {/* {cropImage && !selectedFile &&÷ <p onClick={()=>setCropImage(true)} className= "text-teal-900 absolute right-5 font-bold">Next</p> } */}
              <p onClick={submitHandler} className="text-teal-900 absolute right-5 font-bold"> {caption.trim() && croppedImage && <p>Post</p>}</p>{!selectedFile ? <X onClick={() => setAddStory(false)} className="text-teal-900 absolute right-5"/>: <p onClick={()=>{setCropImage(true);setBack(false);}} className={`${cropImage?"hidden":" text-teal-900 absolute right-5 font-bold"}`}>Next</p> }
                <p className="text-center mb-5 sm:mb-20 md:mb-0 font-sans font-bold sm:font-semibold text-[#042F2C] text-md sm:text-lg">
                  Create new story
                </p>
            </div>
          </div>
          {!cropImage && <ChooseImageComponent selectedFile={selectedFile} setSelectedFile={setSelectedFile} setImageUrl={setImageUrl}/>}
          {cropImage && !croppedImage && !isVideo && <CropImageComponent selectedFile={selectedFile} imageUrl={imageUrl} setCroppedImage={setCroppedImage}/>}
          {croppedImage && cropImage && <CreateStoryComponent croppedImage={croppedImage} caption={caption} setCaption={setCaption}/> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;