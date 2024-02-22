import axios from 'axios'
import {SearchLocation_Api} from '../../../endpoints/common'
export const searchLocationFuntion=async(data:string)=>{
console.log(data,'THIS');
const bakendData={
    data:data
}

    const response = await  axios.create({
        baseURL:'http://localhost:3002',
        withCredentials : true,
    }).post(SearchLocation_Api,bakendData );

    return response.data


}

