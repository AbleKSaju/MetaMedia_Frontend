import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteHighlightFunction } from '../../../utils/api/methods/StoryService/Highlight/post';
import { toast } from 'sonner';

const HighlightSliderComponent = ({openHighlight,setOpenHighlight,durationPerImage,setHighlightList,setHighlightName,setDeleteHighlight}:any) => {
    const [watchedStory, setWatchedStory] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading,setLoading] = useState(0)
    
    const highlights = useSelector((state: any) => state.persisted.highlight.highlightData);  
    const userData = useSelector((state: any) => state.persisted.user.userData);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
      const nextImage = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === highlights[openHighlight]?.media.length - 1 ? 0 : prevIndex + 1
        );
        setLoading(0)
      };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? highlights[openHighlight]?.media.length - 1 : prevIndex - 1
        );
        setLoading(0)
      };
     
      useEffect(() => {
        if (!isOpen) {
          console.log(loading, "loadingloading");
          const interval = setInterval(() => {
            setLoading((prevIndex) =>
              prevIndex == 100 ? 0 : prevIndex + 5.5
            );
          }, 250); 
          return () => clearInterval(interval);
        }else{
          setLoading(0)
        }
      }, [isOpen, loading]);
    
      useEffect(() => {
        if (!isOpen) {
          setWatchedStory(currentIndex);
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === highlights[openHighlight]?.media.length - 1 ? 0 : prevIndex + 1
            );
            setLoading(0)
          }, 5000);
          return () => clearInterval(interval);
        }
      }, [isOpen, currentIndex, highlights[openHighlight]?.media.length]);
 
      const addNewHighlight = async () => {        
        const name = highlights[openHighlight].name
        console.log(name,"namename");
        
        setHighlightList(true)
        setHighlightName(name)
        setIsOpen(false)
        setLoading(0)
      };  

      const deleteHighlight=async()=>{
        const name = highlights[openHighlight].name
        const currentImage = highlights[openHighlight]?.media[currentIndex];
        const data = {
          name:name,
          image:currentImage
        }
        const response:any = await DeleteHighlightFunction(data)
        if (response?.data?.status) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }        
        setDeleteHighlight(true)
        setOpenHighlight(-1)
        setIsOpen(false)        
      }

  return (
    <div className="flex justify-center items-center w-full h-[500px] mt-5 relative">
    <div className="flex justify-center w-full absolute top-2">
    {
  highlights[openHighlight]?.media.map((_: any, index: number) => (
    <div
      key={index}
      className={`w-full h-2 rounded-full mx-0.5 ${
        index >= watchedStory ? "bg-amber-50" : "bg-teal-700"
      }`}
 
    >
   <div
        className={`h-2 rounded-full ${
          index === watchedStory ? "bg-teal-700" : ""
        }`}
        style={{ width: `${loading}%`, transition: `${loading ? "width 0.5s ease-in-out":""}` }} 
      ></div>
    </div>
  ))
}

    </div>
    <Link to="/profile">
      <img
        className={`w-10 absolute h-10 top-5 left-2 border-2 border-teal-900 rounded-full  text-black  `}
        src={
          userData.profile?.startsWith("https://graph.facebook.com/")
            ? `${userData.profile}`
            : userData.profile
            ? `http://localhost:3000/profile/${userData.profile}`
            : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
        }
      />
    </Link>
    <div className="absolute top-7 right-1">
      <MoreVertical onClick={toggleDropdown} className="text-amber-50 mr-3" />
      {isOpen && (
        <div className="absolute top-6 right-0 w-40 bg-teal-900 rounded-tr-none rounded-lg shadow-lg z-10 border">
          <ul>
            <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer"
               onClick={addNewHighlight}>
              add
            </li>
            <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
              forward
            </li>
            <li
              className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer"
              onClick={deleteHighlight}
            >
              delete
            </li>
          </ul>
        </div>
      )}
    </div>
    {highlights[openHighlight]?.media?.length > 1 && (
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={nextImage}
      >
        <ChevronRight />
      </button>
    )}
    {highlights[openHighlight]?.media?.length > 1 && (
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={prevImage}
      >
        <ChevronLeft />
      </button>
    )}
    {
      highlights[openHighlight]?.media.map((highlight: any, index: number) => (
        <>
          <img
            key={index}
            src={`http://localhost:3003/story/${highlight}`}
            alt=""
            className={`w-full h-full border-2 rounded-lg border-teal-800 ${
              index === currentIndex ? "" : "hidden"
            }`}
          />
          <div className="absolute -bottom-8 font-medium shadow-black cursor-pointer">
            <p
              className={`text-teal-900  ${
                index === currentIndex ? "" : "hidden"
              }`}
            >
              {highlights[openHighlight].name}
            </p>
          </div>
        </>
      ))}
  </div>
  )
}

export default HighlightSliderComponent