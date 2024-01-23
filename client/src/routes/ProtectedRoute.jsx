import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  let { token } = useContext(authContext);

  if (token == "null") {
    token = null;
  }

  const accessibleRoute = token ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );

  return accessibleRoute;
};

export default ProtectedRoute;
