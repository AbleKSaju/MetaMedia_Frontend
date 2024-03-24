import { Route, Routes } from "react-router-dom";
import AsideComponent from "../pages/admin/AsideComponent";
import HomeComponent from "../pages/admin/HomeComponent";
import UsersListComponent from "../pages/admin/UsersListComponent";
import PostListComponents from "../pages/admin/PostListComponents";

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
