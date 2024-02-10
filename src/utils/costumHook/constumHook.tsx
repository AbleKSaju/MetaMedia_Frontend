import { useDispatch } from "react-redux";
import {Refresh} from '../api/methods/AuthService/get'
import { addToken } from "../ReduxStore/Slice/tokenSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {axiosPrivet} from '../api/baseUrl/axios.baseUrl'

export const useAccessToken=()=>{
    const dispach=useDispatch()
    const Access=async()=>{
        const responce:any=await Access()
        console.log(responce,'RESSS');
        dispach(addToken(responce.data))
        return responce.data
    }
    return Access
}

export const useAxiosPrivete=()=>{
    const access= useAccessToken()
    const accesToken = useSelector((store: any) => store.token.token);

    useEffect(()=>{
        const requestInterceptor= axiosPrivet.interceptors.request.use(
        
            (config:any)=>{
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accesToken}`;
                  }

                  if(shouldAttachMultipartHeader(config)){
                    config.headers["Content-Type"] = "multipart/form-data";
                    config.isMultipartHeaderAdded = true;
                  }

                  return config
            },
            (error)=>{
                Promise.reject(error)
            }
        )
        


    const responseInterceptor=axiosPrivet.interceptors.response.use(
        (response)=>response,

        async (error)=>{
            const prevRequest = error?.config;

            if(error.responce.status==403 && !prevRequest?.sent){
                prevRequest.sent = true;

                const newAccesstoken=await access();
                console.log('new Acces token in responce',newAccesstoken);
                prevRequest.headers["Authorization"] = `Bearer ${newAccesstoken}`;

                if (prevRequest.isMultipartHeaderAdded) {
                    prevRequest.headers["Content-Type"] = "multipart/form-data";
                  }

            }

            return Promise.reject(error);
        }
    )

    return () => {
        axiosPrivet.interceptors.request.eject(requestInterceptor);
        axiosPrivet.interceptors.response.eject(responseInterceptor);
      };




    },[accesToken,access])

    return axiosPrivet
}

const shouldAttachMultipartHeader = (config:any) => {
    const isPostMethod = config.method === 'post';
    const isPatchMethod = config.method === 'patch';
    const isPutMethod = config.method === 'put';

    const shouldAttach =
      (isPostMethod || isPatchMethod || isPutMethod)
     
    return shouldAttach;
  };