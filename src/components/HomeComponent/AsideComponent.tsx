import React, { useState } from 'react'
import Sidebar from "./SidebarComponent";
import Footer from "./FooterComponent";
import { useLocation } from 'react-router-dom';


const AsideComponent = ({sidebarOpen,setAddStory,isAddPost,setIsAddPost}:any) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
       <>
        <div className="fixed sm:z-10 h-screen hidden sm:flex ">
          <Sidebar
            open={sidebarOpen}
            setAddStory={setAddStory}
            isAddPost={isAddPost}
            setIsAddPost={setIsAddPost}
          />
        </div>
        {currentPath!='/message' &&  <Footer/> }
    </>
  )
}

export default AsideComponent