import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    // console.log(data);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      // console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }

      // console.log("result token ", result.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
        },
      });

      // console.log(result, "login data");

      // setLoading(false);
      toast.success(result.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      // setError(true);
      // setLoading(false);
    }
  };
  return (
    <div className="w-[100%] h-[95vh] bg-gray-300 flex flex-col justify-center items-center">
      <div className="w-[300px] h-[240px] bg-white rounded-xl">
        <h1 className="text-center m-2 mb-5 text-xl text-gray-500">
          Login Form
        </h1>
        <div className="w-full flex justify-center items-center">
          <form className="flex flex-col" onSubmit={loginHandler}>
            <label className="text-gray-500 text-sm">Username</label>
            <input
              name="username"
              className="border-[1px] border-gray-400 mb-3 rounded-lg px-2 py-1 text-sm text-gray-500 focus:outline-none"
              value={data.username}
              onChange={handleInputChange}
              required
            ></input>
            <label className="text-gray-500 text-sm">Password</label>
            <input
              name="password"
              value={data.password}
              className="border-[1px] border-gray-400 mb-3 rounded-lg px-2 py-1 text-sm text-gray-500 focus:outline-none"
              onChange={handleInputChange}
              required
            ></input>

            <button
              type="submit"
              className="text-md mt-3 text-gray-500 hover:text-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Link to="/signup">
        <p className="text-[12px] m-2 text-gray-500 hover:text-gray-900">
          Click here to register
        </p>
      </Link>
    </div>
  );
}

export default Login;
