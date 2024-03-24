

import axios from 'axios';
import { GetLikedAndComentedPost_Api, getUserPosts_Api } from '../../../endpoints/common';
export const GetLikedAndComentedPostFunction = (userId:any) => {  
 try {
    console.log(userId,"userIduserIduserId");
    
   return axios.create({ withCredentials: true }).get(`${GetLikedAndComentedPost_Api}?id=${userId}`);

 } catch (error) {
   return error;
 }
};
