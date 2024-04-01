import { Route, Routes } from "react-router-dom";

import HomeComponent from "../pages/admin/HomeComponent";


const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeComponent />} />
      </Routes>
    </>
  );
};

export default AdminRouter;
