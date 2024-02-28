
import axios from 'axios'

export const AUTH_URL = 'http://localhost:3001/api/auth'; 

export const CHAT_URL = 'http://localhost:3005/api/chat'; 

export const POST_URL = 'http://localhost:3002/api/post'; 

export const USER_URL = 'http://localhost:3000/api/user'; 

export const STORY_URL = 'http://localhost:3003/api/story'; 

export const HIGHLIGHT_URL = 'http://localhost:3003/api/highlight'; 



export const axiosPrivet = axios.create({
    baseURL:AUTH_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials : true,
})

