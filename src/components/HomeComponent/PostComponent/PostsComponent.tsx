import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPostOfUserFunction } from "../../../utils/api/methods/PostService/get/getAllPostOfUser";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";
import {
  addPostData,
  clearPostData,
  isSinglePostModalOpen,
  clearPostUserData,
  setPostUserData,
} from "../../../utils/ReduxStore/Slice/singlePostSlice";
const PostsComponent = ({ isAddPost, render, setRender }: any) => {
  const [posts, setPosts] = useState([]);
  let { user_id } = useParams();
  const singlePost = useSelector(
    (state: any) => state.persisted.singlePost.singlePost
  );


  

  const user = useSelector((state: any) => state.persisted.user);

  const dispatch = useDispatch();

  const handlePostClick = async (item: any) => {
    const responce = await getUserByIdFuntion(item.userId);

    if (responce.status) {
      dispatch(clearPostData());
      dispatch(clearPostUserData());
      dispatch(setPostUserData(responce.data));
      dispatch(addPostData(item));
      dispatch(isSinglePostModalOpen())
    } else {
      toast.error("Api call fail");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.userData == undefined) {
          toast.error("user  not find");
          // return navigate('/login');
        } else {
          const response = await getAllPostOfUserFunction(user_id);
          console.log(response.data, "this   form the get all post requst");

          if (response.status) {
            const data = response.data;
            setPosts(data);
          }
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [user, isAddPost, singlePost, addPostData, render ,user_id]);

  useEffect(() => {
    console.log(posts, "this is posts ");
    console.log(posts.length, "this is posts lenght");
    setRender(!render);
  }, []);

  return (
    <>
      <div className="flex flex-wrap flex-row justify-center mt-5 pb-20 ">
        <div className="grid grid-cols-3 gap-0.5 md:gap-4 p-0.5">
          <>
            {posts.length > 0 ?
              posts.map((item: any) => {
                return (
                  <div
                    className="max-w-64 max-h-64"
                    key={item.id}
                    onClick={() => handlePostClick(item)}
                  >
                    {/* Adding a key to each mapped element */}
                    <img
                      className=" border border-amber-10 w-full h-full rounded-md object-fill"
                      src={`http://localhost:3002/img/${item.mediaUrl[0]}`}
                      alt=""
                    />
                  </div>
                );
              }):
              ( <p className="font-bold text-xl col-span-2 row-start-3 h-full">No posts.</p> )}
          </>
        </div>
      </div>
    </>
  );
};

export default PostsComponent;
