import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAuthRoute = ({ children }: { children: any }) => {
    const token = useSelector((state: any) => state.persisted.token.token);
    if (token) {
      return children
    }else{
      return <Navigate to="/login"  />
     
    }

  };
  
  export default ProtectedAuthRoute;
