import { Route, Routes } from "react-router-dom";

import SignUp from "../pages/user/SignUp";
import Login from "../pages/user/Login";
import VerifyOtp from "../pages/user/VerifyOtp";
import ForgotPassword from "../pages/user/ForgotPassword";
import ChooseInterest from "../pages/user/ChooseInterest";
import ChangePassword from "../pages/user/ChangePassword";
import AddProfile from "../pages/user/AddProfile";
import Home from "../pages/user/Home";
import Mods from "../pages/user/Mods";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
import S from "../pages/user/S";

const UserRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          // <ProtectedAuthRoute>
          <SignUp />
          // </ProtectedAuthRoute>
        }
      />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      
      <Route
        path="/forgotpassword"
        element={
          // <ProtectedAuthRoute>
          <ForgotPassword />
          // </ProtectedAuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          // <ProtectedAuthRoute>
          <Login />
          // </ProtectedAuthRoute>
        }
      />
      <Route
        path="/chooseinterest"
        element={
          <ProtectedRoute>
            <ChooseInterest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/changepassword"
        element={
          // <ProtectedAuthRoute>
          <ChangePassword />
          // </ProtectedAuthRoute>
        }
      />
      <Route path="/addprofile" element={<AddProfile />} />
      <Route
        path="/selectMod"
        element={
          // <ProtectedRoute>
          <Mods />
          // </ProtectedRoute>
        }
      />

 <Route path="/s"element={ <S/>} />

      {/* <Route path="/logout"/> */}
    </Routes>
  );
};

export default UserRouter;
