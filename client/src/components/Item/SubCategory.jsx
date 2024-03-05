import React, { useState } from "react";
import DataTable from "./Table";
import AddItem from "./AddItem";

function SubCategory({ setSubCategory, subcategorys, item }) {
  const [addPopUp, setAddpopUp] = useState(false);
  const [items, setItems] = useState([]);

  const handleDeleteSubCategory = () => {
    console.log(item.id);
    const filteredSubCategory = subcategorys.filter((subcategory) => {
      return subcategory.id.toString() != item.id.toString();
    });
    setSubCategory(filteredSubCategory);
  };

  return (
    <div className="w-full border-1 border-gray-400">
      <AddItem
        addPopUp={addPopUp}
        setAddpopUp={setAddpopUp}
        setItems={setItems}
        items={items}
      />
      <div className="flex justify-between p-2">
        <input
          placeholder="SubCategory"
          className="w-auto border-black border-b-[1px] px-2 focus:outline-none"
        ></input>
        <div className="flex gap-3 items-center justify-center">
          <button
            onClick={() => setAddpopUp(true)}
            className="bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-700 focus:outline-none"
          >
            Add Item
          </button>
          <button
            onClick={handleDeleteSubCategory}
            className="bg-red-500 px-2 py-2 rounded-xl text-white hover:bg-red-700"
          >
            Delete SubCategory
          </button>
        </div>
      </div>
      <DataTable items={items} setItems={setItems} />
    </div>
  );
}

export default SubCategory;
