import axios from 'axios'
import {getLatAndLong_Api} from '../../../endpoints/common'
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';


export const getLatAndLogFuntion=async(data:string)=>{
console.log(data,'THIS');
const bakendData={id:data}
    const response = await  axiosInstance.post(getLatAndLong_Api,bakendData );

    return response.data


}
