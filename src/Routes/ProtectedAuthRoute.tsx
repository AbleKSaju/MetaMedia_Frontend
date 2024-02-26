import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAuthRoute = ({ children }: { children: any }) => {
    // const Navigate = useNavigate();
    console.log("I AM PROTECTED ROUTE");
    const token = useSelector((state: any) => state.persisted.token.token);
    console.log(token, "udaaaaa");
    console.log(children, "children");
  
    if (token) {
      console.log("Yes TOKEN");
      return children
    }else{
      console.log("I AM ELSE");
      return <Navigate to="/login"  />
     
    }

  };
  
  export default ProtectedAuthRoute;
  
//   const ProtectedRoute = ({children}:{children:any}) => {
//     const user = useSelector((stor:any) => stor?.token?.token); 
//     if(!user) {
//         UseSomthingWentWrong()
//         return <Navigate to="/tutor/login"  />
//     }
//  return children

// };

// export default ProtectedRoute;
