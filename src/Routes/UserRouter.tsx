import { Route,Routes } from "react-router-dom"

import SignUp from "../pages/user/SignUp"

import Login from "../pages/user/Login"
import VerifyOtp from "../pages/user/VerifyOtp"
import ForgotPassword from "../pages/user/ForgotPassword"



const UserRouter=()=>{
    return(

   <Routes>

     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/verifyOtp' element={<VerifyOtp/>}/>

     <Route path='/forgotpassword' element={<ForgotPassword/>}/>
     <Route path="/login" element={<Login/>}/>
     



   </Routes>

    )
}

export default UserRouter