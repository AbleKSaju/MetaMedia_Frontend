

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import Sidebar from "../../components/HomeComponent/Sidebar";
import Story from "../../components/HomeComponent/Story";
import axios from 'axios'


const Home = () => {

    const [image,setImage]=useState('')




    const imageHandle=async(e:any)=>{
        e.preventDefault();

        const url='http://localhost:3001/api/auth/img'
       const responce:any=await axios.create({withCredentials:true}).get(url)

       console.log(responce,'RESSS');
       setImage(responce.data.image)
       console.log(image,'IMG')

    }
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="h-screen flex-1 p-7 ">
          {/* story     */}
          <div className="w-full   bg-blue-300 h-56  ">
            <Story />
          </div>

          <button className="w-10 bg-black text-yellow-100" onClick={imageHandle}>Img</button>
          {image &&   (<img src={image} alt="image" className="w-32 h-32"  />)}
        

          {/* story     */}

          <div className="flex">
            {/* main post  */}
            <div className="w-8/12 bg-green-200 h-[560px]">main</div>
            {/* main post  */}

            {/* suggestions  */}
            <div className="w-4/12 bg-yellow-400 h-[560px]">Suggestion</div>
            {/* suggestions  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
