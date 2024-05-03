import { Route, Routes } from "react-router-dom";

import HomeComponent from "../pages/admin/HomeComponent";
import ProtectedAuthRoute from "./ProtectedAuthRoute";


const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ProtectedAuthRoute>  <HomeComponent />  </ProtectedAuthRoute>} />
      </Routes>
    </>
  );
};

export default AdminRouter;
