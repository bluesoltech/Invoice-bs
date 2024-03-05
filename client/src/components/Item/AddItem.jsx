import React, { useState } from "react";
import { MdCancel, MdDataSaverOn } from "react-icons/md";
import data from "../../assets/data/items.js";
import { toast } from "react-toastify";

function AddItem({ addPopUp, setAddpopUp, items, setItems }) {
  const [query, setQuery] = useState("");
  const [addedItem, setAddeditem] = useState({});

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    const itemArray = [...items];
    const findItem = items.filter((i) => {
      return i.id.toString() == addedItem.id.toString();
    });
    // console.log(findItem);
    if (findItem.length == 0) {
      itemArray.push(addedItem);
      setItems(itemArray);
      setQuery("");
      setAddeditem({});
    } else {
      toast.error("Items already Exist");
      setQuery("");
      setAddeditem({});
    }

    // console.log(addedItem);
  };
  const renderItemList = () => {
    if (query.length < 4) return <div>Enter atleast 3 characters</div>;
    else {
      const filteredData = data.filter((item) =>
        item.value.toLowerCase().includes(query.toLowerCase())
      );
      return (
        <div className="relative overflow-y-auto h-[80%]">
          {filteredData.length > 0 && (
            <div className="sticky top-0 z-[15] bg-black text-white p-2 border-[1px] mb-1 rounded grid grid-cols-7 gap-2">
              <div className="">Name</div>
              <div className="">Size</div>
              <div className="">Sqft</div>
              <div className="">Qty</div>
              <div className="">Days</div>
              <div className="">Details</div>
              <div className="">Rate</div>
            </div>
          )}
          {filteredData.length == 0 && <div className="">Unable to find</div>}
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-4 items-center border-[1px] mb-1 rounded p-2"
            >
              <input
                type="radio"
                name="items"
                onChange={() => {
                  setAddeditem(item);
                }}
                id={item.value}
                className="absolute right-2"
                value={item}
              ></input>
              <label htmlFor={item.value} className="grid grid-cols-7 gap-2">
                <div className="">{item.value}</div>
                <div className="">{item.size}</div>
                <div className="">{item.sqft}</div>
                <div className="">{item.qty}</div>
                <div className="">{item.days}</div>
                <div className="">{item.details}</div>
                <div className="">{item.rate}</div>
              </label>
            </div>
          ))}
        </div>
      );
    }
  };
  return (
    <div
      className={
        addPopUp
          ? "absolute h-screen w-screen  z-10 top-0 left-0 flex items-center justify-center  "
          : "hidden"
      }
    >
      <div className="bg-white w-[50%] h-[50%] z-10 border-[1px] border-gray-500 rounded-xl p-5">
        <form
          onSubmit={handleAddItemSubmit}
          className="h-full w-full border-gray-200 border-[1px] flex flex-col  p-2"
        >
          <div className="flex items-center justify-between p-2">
            <div className="text-xl">Add Item</div>
            <div className="flex gap-4">
              <button type="submit">
                <MdDataSaverOn
                  onClick={() => setAddpopUp(false)}
                  className="text-3xl text-green-500 hover:text-green-700"
                />
              </button>
              <MdCancel
                onClick={() => setAddpopUp(false)}
                className="text-3xl text-red-500 hover:text-red-700"
              />
            </div>
          </div>
          <div className="w-full h-full p-2">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              className="w-full border-[1px] rounded px-2 py-1 focus:outline-none mb-2"
            />
            {renderItemList()}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
