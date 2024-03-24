

import axios from 'axios';
import { getUserPosts_Api } from '../../../endpoints/common';
export const getAllPostOfUserFunction = (userId:any) => {  
 try {
   return axios.create({ withCredentials: true }).get(`${getUserPosts_Api}?id=${userId}`);

 } catch (error) {
   return error;
 }
};
