import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
// import ProtectedProfileRoute from "./ProtectedProfileRoute";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routers;
