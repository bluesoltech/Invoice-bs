import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import data from "../../assets/data/ItemList";

function Item() {
  const [category, setCategory] = useState("Sports");
  let subData = data.find((item) => item.value === category).subcategory;
  const [subcategory, setSubCategory] = useState(subData[0].value);
  useEffect(() => {
    setSubCategory(subData[0].value);
    subData = data.find((item) => item.value === category).subcategory;
  }, [category]);
  //   const handleInputChange = () => {};
  return (
    <div className="w-full h-auto bg-gray-100 p-3">
      <label className="font-bold text-md ">Category:</label>
      <div className="px-3 py-1">
        <Dropdown data={data} title={category} setData={setCategory} />
      </div>
      <label className="font-bold text-md ">Sub Category:</label>
      <div className="px-3 py-1">
        <Dropdown data={subData} title={subcategory} setData={setSubCategory} />
      </div>
    </div>
  );
}

export default Item;
