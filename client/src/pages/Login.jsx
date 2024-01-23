import React from "react";

function Login() {
  const loginHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-[100%] h-[95vh] bg-gray-300 flex justify-center items-center">
      <div className="w-[300px] h-[240px] bg-white rounded-xl">
        <h1 className="text-center m-2 mb-5 text-xl text-gray-500">
          Login Form
        </h1>
        <div className="w-full flex justify-center items-center">
          <form className="flex flex-col" onSubmit={loginHandler}>
            <label className="text-gray-500 text-sm">Username</label>
            <input className="border-[1px] border-gray-400 mb-3 rounded-lg px-2 py-1 text-sm text-gray-500 focus:outline-none"></input>
            <label className="text-gray-500 text-sm">Password</label>
            <input className="border-[1px] border-gray-400 mb-3 rounded-lg px-2 py-1 text-sm text-gray-500 focus:outline-none"></input>

            <button
              type="submit"
              className="text-md mt-3 text-gray-500 hover:text-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
