import { Route,Routes } from "react-router-dom"

import SignUp from "../pages/user/SignUp"

import Login from "../pages/user/Login"


const UserRouter=()=>{
    return(

   <Routes>

     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/verifyOtp' element={<SignUp/>}/>


 <Route path="/login" element={<Login/>}/>


   </Routes>

    )
}

export default UserRouter