import { useState } from "react";
import AddPostDetailsBody from "./AddPostDetailsBody"
import CreatePostModalBody from "./CreatePostmodalBody"
import CropImageBody from "./CropimageBody"

const MainModalBorderPost=({setIsAddPost,addPost,setAddPost,render,setRender}:any)=>{
    const [postState,setPostState]=useState(1)

    return (
        <>
<div className="absolute z-20 w-full h-full flex justify-center items-center backdrop-blur bg-opacity-50 bg-black">
         {postState === 1 && <CreatePostModalBody setIsAddPost={setIsAddPost} setPostState={setPostState} />}
        {postState === 2 && <CropImageBody setPostState={setPostState} />}
        {postState === 3 && <AddPostDetailsBody setIsAddPost={setIsAddPost} setPostState={setPostState} addPost={addPost} setAddPost={setAddPost} setRender={setRender} render={render}/>}
</div>
        </>
    )
}

export default MainModalBorderPost