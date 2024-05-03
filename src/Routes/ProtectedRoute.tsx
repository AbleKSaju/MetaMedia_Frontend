import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ path, element }: any) => {
    console.log("I AM PROTECTED ROUTE");
    const token = localStorage.getItem('accesstoken')
        const Navigate = useNavigate();
  
    return (
      <React.Fragment>
        {token ? (
          <Routes><Route path={path} element={element} /></Routes>
        ) : (
          <Link to="/login" />
        )}
      </React.Fragment>
    );
  };

export default ProtectedRoute;
