import React, { useState } from "react";
import SubCategory from "./SubCategory";

function Category({ formData, setFormData }) {
  const [title, setTitle] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [counter, setCounter] = useState(0);
  // console.log(subcategory);
  const handleAddSubCategory = () => {
    const renderSubCategory = [...subcategory];
    renderSubCategory.push({ id: counter });
    setCounter(counter + 1);
    setSubCategory(renderSubCategory);
  };
  return (
    <div className=" w-full flex flex-col gap-4 items-center border-[1px] border-gray-200 rounded p-4">
      <input
        value={title}
        placeholder="Category"
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl mb-4 focus: outline-none border-b-[1px] border-black"
      ></input>
      {/* <SubCategory />; */}
      {subcategory.map((item, index) => {
        return (
          <SubCategory
            key={index}
            item={item}
            subcategorys={subcategory}
            setSubCategory={setSubCategory}
          />
        );
      })}
      <div className="flex justify-end w-full my-4">
        <button
          onClick={handleAddSubCategory}
          className="bg-blue-500 border-none text-white p-2 rounded-xl focus:border-none hover:bg-blue-700"
        >
          Add Sub Category
        </button>
      </div>
    </div>
  );
}

export default Category;
