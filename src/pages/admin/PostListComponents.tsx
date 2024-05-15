import  { useEffect, useState } from "react";
import { toast } from "sonner";
import { showAllPostFuntion } from "../../utils/api/methods/PostService/get/showAllPost";
import { ChangePostStatusFunction } from "../../utils/api/methods/AdminService/post";

const PostListComponents = () => {
  const [posts, setPosts] = useState<any>([]);
  const [blockPost, setBlockPost] = useState<boolean>(false);
  const [currentPosts, setCurrentPosts] = useState<any>();
  const [searchPost, setSearchPost] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await showAllPostFuntion();
      if (response.status) {
        setPosts(response?.data);
        setCurrentPosts(response?.data);
      } else {
        toast.error("Users not found");
      }
    })();
  }, [blockPost]);

  useEffect(() => {
    (async () => {
      if (searchPost.length !== 0 && searchPost.trim() === "") {
        setCurrentPosts(posts);
      } else {
        const postData = await posts.filter((data: any) => {
          return (
            data.description.toLowerCase().includes(searchPost.toLowerCase()) ||
            data._id.includes(searchPost)
          );
        });
        if (postData.length) {
          setCurrentPosts(postData);
        } else {
          setCurrentPosts([]);
        }
      }
    })();
  }, [searchPost]);

  const ChangePostStatus = async (postId:string)=>{
    const data={
      postId
    }
    console.log(postId,"postId");
    const response:any = await ChangePostStatusFunction(data)
    console.log(response,"ChangeUserStatusFunctionChangeUserStatusFunction");
    if(response.data.status){
      toast.success("Status Changed")
      setBlockPost(!blockPost)
    }
  }

  return (
    <section className="container mx-auto p-6 pt-0 mt-10 font-mono overflow-auto scrollbar-hide">
      <div className="max-w-md mx-full">
        <div className="relative flex items-center w-full h-12 mb-5 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            onChange={(e) => setSearchPost(e?.target?.value)}
            placeholder="Search post.."
          />
        </div>
      </div>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Caption</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentPosts?.map((data: any) => {
                console.log(data,"data?.blocked data?.blocked");
                return (
                  <tr className="text-black font-roboto" key={data._id}>
                    <>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-20 h-20 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-sm"
                              src={
                                data.mediaUrl[0]
                                  ? `https://meta-media.in/api/post/img/${data?.mediaUrl[0]}`
                                  : ``
                              }
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">
                              {data?._id}
                            </p>
                            <p className="text-xs text-gray-600">{}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {data?.userId}
                      </td>
                      <td className="px-4 py-3 text-md border">
                        <span className="px-2 py-1 leading-tight">
                          {data?.description.slice(0, 20)}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-3 text-md border ${
                          data?.blocked ? "text-red-700" : "text-green-700"
                        }`}
                      >
                        {data?.blocked ? "Blocked" : "Active"}
                      </td>
                      <td
                        className={`px-4 py-3 text-md border ${
                          data?.blocked ? "text-green-700" : "text-red-700"
                        }`}
                        onClick={()=>ChangePostStatus(data?._id)}
                      >
                        {data?.blocked ? "Unblock" : "Block"}
                      </td>
                    </>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PostListComponents;
