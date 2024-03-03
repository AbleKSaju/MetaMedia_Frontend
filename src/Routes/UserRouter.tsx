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
import S from "../pages/user/S";
import AddPostModal from "../components/HomeComponent/AddPostcomponent";
import SizeSelectModal from "../components/HomeComponent/SizeSelectModal";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isSinglePostModalClose } from "../utils/ReduxStore/Slice/singlePostSlice";
import SinglePostModal from "../components/HomeComponent/PostComponent/SinglePostModal";
import NewModel from "../pages/user/newModle";
import NewSignUp from "../pages/user/NewSignUp";
import NewLogin from "../pages/user/newLogin";

const UserRouter = () => {
  const isSinglePostModal = useSelector((state: any) => state.persisted.singlePost.isSinglePostModal);
  const dispach=useDispatch()
  const [render,setRender]:any=useState(false)
  useEffect(() => {
    if(isSinglePostModal==undefined){
     dispach(isSinglePostModalClose())
    }
   }, [isSinglePostModal]);
   return (
    <>
    {isSinglePostModal && ( <> <SinglePostModal setRender={setRender} render={render} /> </> )}
    <Routes>
      <Route path="/*" element={<ProtectedAuthRoute> <Home setRender={setRender} render={render}/> </ProtectedAuthRoute> }/>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chooseinterest" element={<ChooseInterest />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/addprofile" element={<AddProfile />} />
      <Route path="/selectMod" element={<Mods />} />
      <Route path="/s" element={<S />} />
      <Route path="/size" element={<SizeSelectModal/>} />
      <Route path="/selectPost" element={<SinglePostModal/>} />
      <Route path="/new/*" element={<NewModel/>} />
      <Route path="/newSignUp" element={<NewSignUp />}/>
      <Route path="/newLogin" element={<NewLogin />}/>





    </Routes>
    </>
  );
};

export default UserRouter;
