import { Route,Routes } from "react-router-dom"
import Login from "../pages/user/Login"

const UserRouter=()=>{
    return(

   <Routes>
 <Route path="/login" element={<Login/>}/>

   </Routes>

    )
}

export default UserRouter