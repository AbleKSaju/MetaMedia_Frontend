

import axios from 'axios';
import { getUserPosts_Api } from '../../../endpoints/common';
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';
export const getAllPostOfUserFunction = (userId:any) => {  
 try {
   return axiosInstance.get(`${getUserPosts_Api}?id=${userId}`);

 } catch (error) {
   return error;
 }
};
