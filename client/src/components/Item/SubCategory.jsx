import React, { useEffect, useState } from "react";
import DataTable from "./Table";
import AddItem from "./AddItem";

import { useDispatch } from "react-redux";
import { remove, save } from "../../redux/slices/categorySlice";

import { IoIosAddCircle } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";

function SubCategory({ SubCategory }) {
  // console.log(SubCategory);
  const [addPopUp, setAddpopUp] = useState(false);
  const dispatch = useDispatch();
  const [items, setItems] = useState(SubCategory.subItems);
  const [name, setName] = useState(SubCategory.name);

  const handleDeleteSubCategory = (id) => {
    dispatch(remove(id));
  };

  useEffect(() => {
    const id = SubCategory.id;
    dispatch(save({ id, name, items }));
  }, [name, items]);

  // const handleSaveSubCategory = (id) => {
  //   // console.log(items);
  //   dispatch(save({ id, name, items }));
  // };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="SubCategory"
          className="w-auto text-center border-black border-b-[1px] px-2 focus:outline-none"
        ></input>
        <div className="flex gap-3 items-center justify-center">
          <button onClick={() => setAddpopUp(true)} className="">
            <IoIosAddCircle className="text-blue-500 hover:text-blue-700 text-3xl" />
          </button>
          <button
            onClick={() => handleDeleteSubCategory(SubCategory.id)}
            className=""
          >
            <IoTrashBinSharp className="text-red-500 hover:text-red-700 text-3xl" />
          </button>
          {/* <button
            onClick={() => handleSaveSubCategory(SubCategory.id)}
            className="bg-blue-500 px-2 py-2 rounded-xl text-white hover:bg-blue-700"
          >
            Save Changes
          </button> */}
        </div>
      </div>
      <DataTable items={SubCategory.subItems} setItems={setItems} />
    </div>
  );
}

export default SubCategory;
