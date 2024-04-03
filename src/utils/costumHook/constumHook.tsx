import axios from "axios";
import { addToken } from "../ReduxStore/Slice/tokenSlice";
import { useDispatch } from "react-redux";
export const addNewToken=(newAccessToken:any)=>{
  const dispatch=useDispatch()
  dispatch(addToken(newAccessToken));

}
// const accessToken = useSelector((state: any) => state.persisted.user.userData);
const axiosInstance = axios.create({
  withCredentials: true, // Enables the sending of cookies with cross-origin requests
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  config => {
    // const accessToken = useSelector((state: any) => state.persisted.token.token);
    const accessToken = localStorage.getItem('accesstoken')
    console.log(accessToken,"accessTokenaccessToken");
  if (accessToken) {
    console.log("EMMMMMTTTT");
    
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
},
error => {
  return Promise.reject(error);
}
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("In interceptor response" , response);
    return response;
  },
  async (error) => {
    console.log("In interceptor error " , error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("inside iff")
      try {
        const route:any = 'http://localhost:3001/api/auth/refresh'
        console.log("ROute ==>" ,route);
        const refreshResponse = await axiosInstance.post(route);
        console.log(refreshResponse,"refreshResponserefreshResponse");
        
        const newAccessToken = refreshResponse.data.accessToken;
        console.log("New Accesstoken set to localstorage ==>" , newAccessToken);
        localStorage.setItem('accesstoken', newAccessToken); // Update in storage
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        addNewToken(newAccessToken)
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log(err);
        alert("Login again")
        // Handle refresh token failure (e.g., prompt user to re-authenticate)
        console.error('Refresh token failed:', err);
        // Consider redirecting to login page or displaying an error message
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// const shouldAttachMultipartHeader = (config: any) => {
//   const isPostMethod = config.method === "post";
//   const isPatchMethod = config.method === "patch";
//   const isPutMethod = config.method === "put";

//   const shouldAttach = isPostMethod || isPatchMethod || isPutMethod;

//   return shouldAttach;
// };
