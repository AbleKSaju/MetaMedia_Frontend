import { useState } from "react";
import PostsComponent from "./PostsComponent";

const Profile = () => {
    const [postComponent,setPostComponent]=useState(true)
  return (
    <>
      <div className="p-4 ">
        <div className="flex justify-center mt-5">
          <div className=" w-32 h-32">
            <img
              className=" w-full h-full rounded-full border border-teal-800"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="Profile"
            />
          </div>
        </div>
        <div className="h-[50vh] ">
          <div className="grid grid-cols-4 grid-rows-3 gap-4 mt-3">
            <div className="col-span-2 col-start-2 row-start-1 text-center font-mediu cursor-pointer">
              kendalljenner
            </div>
            <div className=" flex flex-col w-50 col-span-4 row-span-3 row-start-2 ml-4">
              <p>Kendall</p>
              <p className="font-light">
                dsjsdkhh jsdjkhdjshk jhdsjkdsd jkfjdsfdbj gdgdfggd
              </p>
            </div>
            <div className="col-span-full col-start-1 row-start-5 flex justify-around border-y border-teal-800 cursor-pointer py-2">
              <div className=" flex flex-col">
                <p className="text-center font-medium">20</p>
                <p className="font-light">Post</p>
              </div>
              <div className=" flex flex-col">
                <p className="text-center font-medium">200</p>
                <p className="font-light">followers</p>
              </div>
              <div className=" flex flex-col">
                <p className="text-center font-medium">200</p>
                <p className="font-light">following</p>
              </div>
            </div>
            <div className="row-start-6 col-span-full flex justify-around w-full mt-4">
              <div className="">
                <img
                  className="rounded-full border-2 border-teal-800 w-16 h-16"
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
                  alt="HL"
                />
              </div>
              <div className="">
                <img
                  className="rounded-full border-2 border-teal-800 w-16 h-16"
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
                  alt="HL"
                />
              </div>
              <div className="">
                <img
                  className="rounded-full border-2 border-teal-800 w-16 h-16"
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
                  alt="HL"
                />
              </div>
              <div className="">
                <img
                  className="rounded-full border-2 border-teal-800 w-16 h-16"
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
                  alt="HL"
                />
              </div>
            </div>
          </div>
        <div className="flex justify-around mt-10 font-medium cursor-pointer">
            <p onClick={() => setPostComponent(true)} className={postComponent ? "underline font-extrabold" : ""}>posts</p>
            <p onClick={() => setPostComponent(false)} className={!postComponent ? "underline font-extrabold" : ""}>saved</p>
        </div>
        </div>
      </div>
      {/* {postComponent && <PostsComponent/>} */}
      <div className="flex flex-wrap flex-row justify-between mt-5 pb-20">
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
    <div className="border-2 border-teal-800">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
  </div>
      </div>
        <div className="fixed bottom-0 border-y border-teal-800 sm:hidden w-full flex justify-around items-center p-4 z-10 bg-white">
          <p className="">H</p>
          <p className="">S</p>
          <p className="">P</p>
          <p className="">M</p>
          <p className="">P</p>
        </div>
    </>
  );
};

export default Profile;
