import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPostOfUserFunction } from "../../../utils/api/methods/PostService/get/getAllPostOfUser";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";
import {addPostData,clearPostData,isSinglePostModalOpen,clearPostUserData,setPostUserData} from '../../../utils/ReduxStore/Slice/singlePostSlice'
const PostsComponent = ({isAddPost ,render,setRender}:any) => {  

  const [posts,setPosts]=useState([])
  const singlePost = useSelector((state: any) => state.persisted.singlePost.singlePost);
  
  const user = useSelector((state:any)=>state.persisted.user)
  useEffect(()=>{
    if(user == undefined){
      toast.error("no user fund")
    }
  },[])
 const navigate=useNavigate()
 const dispatch=useDispatch()

 const handlePostClick=async(item:any)=>{



const responce=await getUserByIdFuntion(item.userId)


if(responce.status){

  dispatch(clearPostData())
  dispatch(clearPostUserData())
  dispatch(setPostUserData(responce.data))
  dispatch(addPostData(item))
  dispatch(isSinglePostModalOpen())

}else{
  toast.error('Api call fail')
}

 
 }

useEffect(()=>{
  const fetchData = async () => {
    try {
      if (user?.userData == undefined) {
        toast.error("user  not find")
        // return navigate('/login');
      } else {
        const response = await getAllPostOfUserFunction(user.userData.userId);
        console.log(response,'this is respoce form the get all post requst');
        console.log(response.data,'this   form the get all post requst');

        
        if(response.status){
const data=response.data

          setPosts(data)
          navigate(`/profile/${user.userData.userId}`);        }

        
            
        
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle error
    }
  };

  fetchData(); // Call the async function immediately

},[user,isAddPost,singlePost,addPostData,render])   


useEffect(()=>{
  console.log(posts,'this is posts ');
  console.log(posts.length,'this is posts lenght');
  setRender(!render)
  
},[])


  return (
    <>
      <div className="flex flex-wrap flex-row justify-center mt-5 pb-20">
        <div className="grid grid-cols-3 gap-0.5 md:gap-4 p-0.5">

       
<>
{posts.length > 0 && posts.map((item:any) => {
  console.log(item, "JJJJJJJ");
return (
  
    <div className="max-w-64  max-h-64" key={item.id} onClick={()=>handlePostClick(item)}> {/* Adding a key to each mapped element */}
      <img className=" border border-amber-10 w-full h-full object-fill"
        src={`http://localhost:3002/img/${item.mediaUrl[0]}`}
        alt=""
      />
    </div>
)

})}

</>


          
          
          
         
         
         
        </div>
      </div>
    </>
  );
};



export default PostsComponent;   
