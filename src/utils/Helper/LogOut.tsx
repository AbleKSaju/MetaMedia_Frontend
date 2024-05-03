import React, { useEffect } from "react";
import { persistor } from "../ReduxStore/Store/Store";
import { toast } from "sonner";
import { clearUser } from "../ReduxStore/Slice/userSlice";
import { clearToken } from "../ReduxStore/Slice/tokenSlice";
import { LogoutFunction } from "../api/methods";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logoutFunction();
  }, []);
  
  const logoutFunction = async () => {
    console.log("logoutFunctionlogoutFunction");
    
    const response: any = await LogoutFunction();
    if (response?.data?.status) {
      dispatch(clearToken());
      dispatch(clearUser());
      localStorage.removeItem("accesstoken");
      toast.success(response?.data?.message);
      navigate("/login");
    } else {
      toast.error("Logout error");
    }
    persistor.purge();
  };

  return <div>LogOut</div>;
};

export default LogOut;
