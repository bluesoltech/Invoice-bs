import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import data from "../../assets/data/ItemList";

function Item({ id, curr, setFormData }) {
  const [itemData, setItemData] = useState({
    id: id,
    category: "",
    subCategory: "",
    subClass: "",
    item: "",
    size: "",
    sqft: "",
    qty: 0,
    day: "",
    detail: "",
    rate: 0,
    total: 0,
  });
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subClass, setSubClass] = useState(null);
  const [item, setItem] = useState(null);

  const handleCategoryChange = () => {
    const subData = data.find((item) => item.value === category)?.subcategory;
    return subData;
  };
  const handleSubCategoryChange = () => {
    if (
      data
        .find((item) => item.value === category)
        .subcategory.find((item) => item.value === subCategory) == undefined
    ) {
      setSubCategory(null);
      setSubClass(null);
      return;
    }
    const subClass = data
      .find((item) => item.value === category)
      .subcategory.find((item) => item.value === subCategory)?.subcategory;
    return subClass;
  };
  const handleSubClassChange = () => {
    if (
      data
        .find((item) => item.value === category)
        .subcategory.find((item) => item.value === subCategory) == undefined
    ) {
      setSubCategory(null);
      setSubClass(null);
      return;
    }
    if (
      data
        .find((item) => item.value === category)
        .subcategory.find((item) => item.value === subCategory)
        .subcategory.find((item) => item.value === subClass) == undefined
    ) {
      setSubClass(null);
      return;
    }
    const itemList = data
      .find((item) => item.value === category)
      .subcategory.find((item) => item.value === subCategory)
      .subcategory.find((item) => item.value === subClass).items;
    return itemList;
  };

  useEffect(() => {
    if (item == null) return;
    const itemData = data
      .find((item) => item.value === category)
      .subcategory.find((item) => item.value === subCategory)
      .subcategory.find((item) => item.value === subClass)
      .items.find((i) => i.value === item);

    // console.log(itemData);
    setItemData({
      ...itemData,
      ["day"]: itemData.days,
      ["detail"]: itemData.details,
      ["qty"]: itemData.qty,
      ["rate"]: itemData.rate,
      ["size"]: itemData.size,
      ["sqft"]: itemData.sqft,
      ["total"]: itemData.qty * itemData.rate,
    });
  }, [item]);

  useEffect(() => {
    setFormData((data) => ({
      ...data,
      itemList: [...data.itemList, itemData],
    }));
  }, [itemData]);

  const handleInputChange = (e) => {
    setItemData((itemData) => ({
      ...itemData,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name == "qty") {
      const total = e.target.value * itemData.rate;
      setItemData((itemData) => ({
        ...itemData,
        ["total"]: total,
      }));
    }
    if (e.target.name == "rate") {
      const total = e.target.value * itemData.qty;
      setItemData((itemData) => ({
        ...itemData,
        ["total"]: total,
      }));
    }
  };

  return (
    <div className="w-full h-auto bg-gray-50 border-[1px] rounded p-3">
      <label className="font-bold text-md ">Category:</label>
      <div className="px-3 py-1">
        <Dropdown data={data} title="Category" setData={setCategory} />
      </div>
      {category && (
        <div>
          <label className="font-bold text-md ">Sub Category:</label>
          <div className="px-3 py-1">
            <Dropdown
              data={handleCategoryChange()}
              title="Sub Category"
              setData={setSubCategory}
            />
          </div>
        </div>
      )}
      {subCategory && (
        <div>
          <label className="font-bold text-md ">Sub Class:</label>
          <div className="px-3 py-1">
            <Dropdown
              data={handleSubCategoryChange()}
              title="Sub Class"
              setData={setSubClass}
            />
          </div>
        </div>
      )}
      {subClass && (
        <div>
          <label className="font-bold text-md ">Select Item</label>
          <div className="px-3 py-1">
            <Dropdown
              data={handleSubClassChange()}
              title="Select Item"
              setData={setItem}
            />
          </div>
        </div>
      )}
      {item && (
        <div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-md ">Size</label>
              <div className="px-3 py-1">
                <input
                  value={itemData.size}
                  name="size"
                  placeholder="Size?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div>
              <label className="font-bold text-md ">SqFt</label>
              <div className="px-3 py-1">
                <input
                  value={itemData.sqft}
                  name="sqft"
                  placeholder="SqFt?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div>
              <label className="font-bold text-md ">Quantity</label>
              <div className="px-3 py-1">
                <input
                  value={itemData.qty}
                  type="number"
                  required
                  name="qty"
                  placeholder="Quantity?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div>
              <label className="font-bold text-md ">Days</label>
              <div className="px-3 py-1">
                <input
                  value={itemData.day}
                  name="day"
                  placeholder="Days?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div>
              <label className="font-bold text-md ">Details</label>
              <div className="px-3 py-1">
                <input
                  value={itemData.detail}
                  name="detail"
                  placeholder="Details?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div>
              <label className="font-bold text-md ">Rate</label>
              <div className="px-3 py-1 flex">
                {curr}
                <input
                  value={itemData.rate}
                  type="number"
                  required
                  name="rate"
                  placeholder="Rate?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5 bg-white rounded">
            <label className="text-lg mr-3 font-bold">Amount:</label>
            <span className="text-lg">
              {curr} <span className="text-black">{itemData.total}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
