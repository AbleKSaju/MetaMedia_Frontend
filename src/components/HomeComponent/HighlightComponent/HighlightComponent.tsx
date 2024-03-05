import { Plus } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';

const Highlight = ({setOpenHighlight, index, highlight, extra, setAddHighlight }:any) => {
  
    return (
        <>
        {!extra && highlight.media[0] ? 
      <div className="highlight-item" onClick={()=>setOpenHighlight(index)}>
        <img
          className="rounded-full border-2 border-black w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-24 lg:h-24 opacity-90"
          src={`http://localhost:3003/story/${highlight?.media[0]}`}
          alt="HL"
        />
      </div>
       :
        <div className="highlight-item">
        <button onClick={()=>setAddHighlight(true)} className="rounded-full border-2 flex justify-center items-center border-black w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-24 lg:h-24">
            <Plus className={`w-10 h-10 lg:w-20 lg:h-20`}/>
        </button>
      </div>
     }
    </>
    );
  };

export default Highlight



{/* <div className="lg:px-20 mt-3 flex justify-center lg:pt-0 md:pt-6 bg-red-500">
<div className=" col-span-full flex w-full justify-around lg:mt-4">
  
  <div className="">
    <img
      className="rounded-full border-2 border-teal-900 w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-28 lg:h-28"
      src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
      alt="HL"
    />
  </div>
  <div className="">
    <img
      className="rounded-full border-2 border-teal-900 w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-28 lg:h-28"
      src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
      alt="HL"
    />
  </div>
  <div className="">
    <img
      className="rounded-full border-2 border-teal-900 w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-28 lg:h-28"
      src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
      alt="HL"
    />
  </div>
  <div className="">
    <img
      className="rounded-full border-2 border-teal-900 w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-28 lg:h-28"
      src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
      alt="HL"
    />
  </div>
  <div className="">
    <img
      className="rounded-full border-2 border-teal-900 w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-28 lg:h-28"
      src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
      alt="HL"
    />
  </div>
</div>
</div> */}