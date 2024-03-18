import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

function Header() {
  const { user, token, dispatch } = useContext(authContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="w-full bg-blue-900 h-[25px] relative top-0 flex justify-end gap-5 px-10 text-white">
      <Link to="/">
        <p>Billing</p>
      </Link>
      <Link to="/profile">
        <p className="">Profile</p>
      </Link>
      {user && token && (
        <p
          onClick={handleLogout}
          className="text-white hover:underline cursor-pointer "
        >
          SignOut
        </p>
      )}
    </div>
  );
}

export default Header;
