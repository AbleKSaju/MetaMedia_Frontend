

import axios from 'axios';
import { getUserPosts_Api } from '../../../endpoints/common';
export const getAllPostOfUserFunction=async(userId:any)=>{

try {

    

   const responce = await  axios.create({
      baseURL:'http://localhost:3002',
      withCredentials : true,
  }).get(`${getUserPosts_Api}?id=${userId}`)

   return responce.data

    
} catch (error) {
    
}
    


}