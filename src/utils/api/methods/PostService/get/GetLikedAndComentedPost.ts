
import { GetLikedAndComentedPost_Api } from '../../../endpoints/common';
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';
export const GetLikedAndComentedPostFunction = (userId:any) => {  
 try {
    console.log(userId,"userIduserIduserId");
    
   return axiosInstance.get(`${GetLikedAndComentedPost_Api}?id=${userId}`);

 } catch (error) {
   return error;
 }
};
