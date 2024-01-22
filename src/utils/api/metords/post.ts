import axios from 'axios'

import {Login_Api} from '../endpoints/common'


export const LoginFuntion=async(data:any)=>{
    try {
        return axios.post(Login_Api,data)
    } catch (error) {
        return error
    }
}