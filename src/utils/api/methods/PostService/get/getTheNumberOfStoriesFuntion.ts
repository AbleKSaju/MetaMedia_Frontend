
import { getTheNumberOfStories_Api } from '../../../endpoints/common';
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';
export const getTheNumberOfStoriesFuntion = () => {  
 try {    
   return axiosInstance.get(getTheNumberOfStories_Api);
 } catch (error) {
   return error;
 }
};
