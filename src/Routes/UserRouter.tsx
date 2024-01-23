import { Route,Routes } from "react-router-dom"

import SignUp from "../pages/user/SignUp"

import Login from "../pages/user/Login"
import VerifyOtp from "../pages/user/VerifyOtp"



const UserRouter=()=>{
    return(

   <Routes>

     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/verifyOtp' element={<VerifyOtp/>}/>
     <Route path="/login" element={<Login/>}/>
     

   </Routes>

    )
}

export default UserRouter