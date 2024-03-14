import React, { useState } from "react";
import SubCategory from "./SubCategory";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/slices/categorySlice";

function Category({ title, setTitle }) {
  const dispatch = useDispatch();
  const subcategorys = useSelector((state) => state.category);

  const handleAddSubCategory = () => {
    dispatch(add());
  };
  return (
    <div className=" w-full flex flex-col gap-4 items-center border-[1px] border-gray-200 rounded p-4">
      <input
        value={title}
        placeholder="Category"
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl text-center mb-4 focus:outline-none border-b-[1px] border-black"
      ></input>
      {/* <SubCategory />; */}
      {subcategorys.map((item, index) => {
        return <SubCategory key={index} SubCategory={item} />;
      })}
      <div className="flex justify-end w-full my-4">
        <button
          onClick={() => handleAddSubCategory()}
          className="bg-blue-500 border-none text-white p-2 rounded-xl focus:border-none hover:bg-blue-700"
        >
          Add Sub Category
        </button>
      </div>
    </div>
  );
}

export default Category;
