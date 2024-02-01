import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
    console.log("I AM PROTECTED ROUTE");
    const token = useSelector((state: any) => state.persisted.token.token);
    const Navigate = useNavigate();

    if (!token) {
        console.log("NO TOKEN");
        Navigate("/login"); 
        return null; 
    }
    console.log(children, "child");
    return children;
};

export default ProtectedRoute;
