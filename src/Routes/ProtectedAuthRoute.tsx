import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAuthRoute = ({ children }: { children: any }) => {
    const Navigate = useNavigate();
    console.log("I AM PROTECTED ROUTE");
    const token = useSelector((state: any) => state.persisted.token.token);
    console.log(token, "udaaaaa");
  
    if (token) {
      console.log("Yes TOKEN");
      Navigate('/');
      return null; // Add this line to prevent rendering children
    }
  
    return children;
  };
  
  export default ProtectedAuthRoute;
  