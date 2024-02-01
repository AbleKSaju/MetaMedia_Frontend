import axios from "axios";
const BASE_URL = 'http://localhost:3001'; 
// export default()=>axios.create({
//         withCredentials:true
//     })

export const axiosPrivet = axios.create({
    baseURL:BASE_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials : true,
})

