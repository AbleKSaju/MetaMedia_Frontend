import { Route,Routes } from "react-router-dom"
import SignUp from "../pages/user/SignUp"

const UserRouter=()=>{
    return(

   <Routes>
     <Route path='/signup' element={<SignUp/>}/>


   </Routes>

    )
}

export default UserRouter