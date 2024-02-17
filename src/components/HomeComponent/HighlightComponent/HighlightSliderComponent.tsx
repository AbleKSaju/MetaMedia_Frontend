import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HighlightSliderComponent = ({openHighlight}:any) => {
    const [watchedStory, setWatchedStory] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const highlights = useSelector((state: any) => state.persisted.highlight.highlightData);
    
    console.log(highlights[openHighlight].name,"highlights[openHighlight]?.length");
     
    const userData = useSelector((state: any) => state.persisted.user.userData);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const nextImage = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === highlights[openHighlight].media.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? highlights[openHighlight].media.length - 1 : prevIndex - 1
        );
      };
  return (
    <div className="flex justify-center items-center w-full h-[500px] mt-5 relative">
    <div className="flex justify-center w-full absolute top-2">
      {
        highlights[openHighlight].media.map((_: any, index: number) => (
          <div
            key={index}
            className={`w-full h-2  rounded-full mx-0.5 ${
              index >= watchedStory ? "bg-amber-50" : "bg-teal-700"
            }`}
          ></div>
        ))}
    </div>
    <Link to="/profile">
      <img
        className={`w-10 absolute h-10 top-5 left-2 border-2 border-teal-900 rounded-full  text-black  `}
        src={
          userData.profile.startsWith("https://graph.facebook.com/")
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
            <li className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg rounded-b-none border-b cursor-pointer">
              forward
            </li>
            <li
              className="py-2 px-4 hover:bg-teal-800 hover:text-amber-50 rounded-lg cursor-pointer"
            //   onClick={deleteStory}
            >
              delete
            </li>
          </ul>
        </div>
      )}
    </div>
    {highlights[openHighlight].media?.length > 1 && (
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={nextImage}
      >
        <ChevronRight />
      </button>
    )}
    {highlights[openHighlight].media?.length > 1 && (
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={prevImage}
      >
        <ChevronLeft />
      </button>
    )}
    {
      highlights[openHighlight].media.map((highlight: any, index: number) => (
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