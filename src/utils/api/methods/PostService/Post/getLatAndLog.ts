import axios from 'axios'
import {getLatAndLong_Api} from '../../../endpoints/common'
export const getLatAndLogFuntion=async(data:string)=>{
console.log(data,'THIS');
const bakendData={
    id:data
}

    const response = await  axios.create({
        baseURL:'http://localhost:3002',
        withCredentials : true,
    }).post(getLatAndLong_Api,bakendData );

    return response.data


}
