import { Route,Routes } from "react-router-dom"

import SignUp from "../pages/user/SignUp"

import Login from "../pages/user/Login"
import VerifyOtp from "../pages/user/VerifyOtp"
import ForgotPassword from "../pages/user/ForgotPassword"
import ChooseInterest from "../pages/user/ChooseInterest"
import ChangePassword from "../pages/user/ChangePassword"
import AddProfile from "../pages/user/AddProfile"



const UserRouter=()=>{
    return(

   <Routes>

     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/verifyOtp' element={<VerifyOtp/>}/>
     <Route path='/forgotpassword' element={<ForgotPassword/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/chooseinterest" element={<ChooseInterest/>}/>
     <Route path="/changepassword" element={<ChangePassword/>}/>
     <Route path="/addprofile" element={<AddProfile/>}/>
     


   </Routes>

    )
}

export default UserRouter