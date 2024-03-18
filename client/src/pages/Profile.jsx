import React, { useContext, useState } from "react";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

function Profile() {
  let { user } = useContext(authContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    gstin: "",
    pan: "",
    phone: "",
    email: "",
    state: "",
    statecode: "",
    logo: {},
    bank: "",
    acno: "",
    ifsc: "",
    oaddress: "",
  });

  // console.log(userData);

  const handleChange = (e) => {
    if (e.target.name == "logo") {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "bluesoltech-invoice");
      data.append("cloud_name", "dfqfaxxqv");

      fetch("https://api.cloudinary.com/v1_1/dfqfaxxqv/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            ...userData,
            ["logo"]: data,
          });
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/profile/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          userData: userData,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center pt-5 w-full">
      <div className="bg-blue-900 rounded-xl md:w-[50vw] h-[90vh] flex flex-col p-2 overflow-y-auto">
        <h1 className="text-center text-xl text-white uppercase">Profile</h1>
        <form
          className="my-5 flex flex-col gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className="text-center text-white/60 text-lg">
            Personal Information
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white font-thin">
              Business Name:
            </label>
            <input
              value={userData.name}
              onChange={(e) => handleChange(e)}
              name="name"
              required
              type="text"
              id="name"
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-white font-thin">
              Business Address:
            </label>
            <textarea
              value={userData.address}
              onChange={(e) => handleChange(e)}
              name="address"
              required
              type="text"
              id="address"
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-[48%] flex flex-col gap-2">
              <label htmlFor="gstin" className="text-white font-thin">
                GSTIN:
              </label>
              <input
                value={userData.gstin}
                onChange={(e) => handleChange(e)}
                name="gstin"
                required
                type="number"
                id="gstin"
                className="p-1 rounded focus:outline-none"
              />
            </div>
            <div className="w-[48%] flex flex-col gap-2">
              <label htmlFor="pan" className="text-white font-thin">
                PAN:
              </label>
              <input
                value={userData.pan}
                onChange={(e) => handleChange(e)}
                name="pan"
                required
                type="text"
                id="pan"
                className="p-1 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[48%] flex flex-col gap-2">
              <label htmlFor="phone" className="text-white font-thin">
                Phone:
              </label>
              <input
                value={userData.phone}
                onChange={(e) => handleChange(e)}
                name="phone"
                required
                type="number"
                id="phone"
                className="p-1 rounded focus:outline-none"
              />
            </div>
            <div className="w-[48%] flex flex-col gap-2">
              <label htmlFor="email" className="text-white font-thin">
                E-mail:
              </label>
              <input
                value={userData.email}
                onChange={(e) => handleChange(e)}
                name="email"
                required
                type="email"
                id="email"
                className="p-1 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[48%] flex flex-col gap-2">
              <label htmlFor="state" className="text-white font-thin">
                State:
              </label>
              <input
                value={userData.state}
                onChange={(e) => handleChange(e)}
                name="state"
                required
                type="text"
                id="state"
                className="p-1 rounded focus:outline-none"
              />
            </div>
            <div className="w-[48%] flex flex-col gap-2">
              <label htmlFor="statecode" className="text-white font-thin">
                Code:
              </label>
              <input
                value={userData.statecode}
                onChange={(e) => handleChange(e)}
                name="statecode"
                required
                type="number"
                id="statecode"
                className="p-1 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-center my-5 gap-5">
            {/* <label
              htmlFor="logo"
              className=" cursor-pointer flex flex-col items-center"
            >
              <div className="rounded-full bg-white p-1 hover:bg-gray-300 w-fit">
                <TbWorldUpload className="text-2xl font-light text-black" />
              </div>
            </label> */}
            <p className="text-white hover:text-gray-300">Upload Logo:</p>
            <p className="text-white/50 text-[11px]">
              {userData?.logo?.original_filename}
            </p>
            <input
              onChange={(e) => handleChange(e)}
              accept=".jpg, .jpeg, .png"
              name="logo"
              id="logo"
              required
              type="file"
              className=""
            />
          </div>
          <p className="text-center text-white/60 text-lg">Bank Details</p>
          <div className="flex flex-col gap-2">
            <label htmlFor="bank" className="text-white font-thin">
              Bank Name:
            </label>
            <input
              value={userData.bank}
              onChange={(e) => handleChange(e)}
              name="bank"
              required
              type="text"
              id="bank"
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="acno" className="text-white font-thin">
              Account Number:
            </label>
            <input
              value={userData.acno}
              onChange={(e) => handleChange(e)}
              name="acno"
              required
              type="number"
              id="acno"
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ifsc" className="text-white font-thin">
              IFSC Code:
            </label>
            <input
              value={userData.ifsc}
              onChange={(e) => handleChange(e)}
              name="ifsc"
              required
              type="text"
              id="ifsc"
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="oaddress" className="text-white font-thin">
              Coorporate Office Address:
            </label>
            <textarea
              value={userData.oaddress}
              onChange={(e) => handleChange(e)}
              name="oaddress"
              required
              type="text"
              id="oaddress"
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex justify-end mt-10">
            <button
              required
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
