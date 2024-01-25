import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import data from "../../assets/data/ItemList";

function Item() {
  const [category, setCategory] = useState("Sports");
  let subData = data.find((item) => item.value === category).subcategory;

  console.log(subData);

  const [subcategory, setSubCategory] = useState(subData[0].value);
  console.log(subcategory);

  let subClass = subData.find((item) => item.value === subcategory).subcategory;
  const [subclass, setSubClass] = useState(subClass[0].value);

  return (
    <div className="w-full h-auto bg-gray-50 border-[1px] rounded p-3">
      <label className="font-bold text-md ">Category:</label>
      <div className="px-3 py-1">
        <Dropdown data={data} title={category} setData={setCategory} />
      </div>
      <label className="font-bold text-md ">Sub Category:</label>
      <div className="px-3 py-1">
        <Dropdown data={subData} title={subcategory} setData={setSubCategory} />
      </div>
      <label className="font-bold text-md ">Sub Class:</label>
      <div className="px-3 py-1">
        <Dropdown data={subClass} title={subclass} setData={setSubClass} />
      </div>
    </div>
  );
}

export default Item;
