import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import DatePicker from "rsuite/DatePicker";
import Item from "../components/Item/Item";

function Home() {
  const [itemCount, setitemCount] = useState(1);
  const [curr, setCurr] = useState("₹");
  const [taxRate, setTaxrate] = useState(18.0);
  const [discountRate, setDiscountrate] = useState(0.0);
  const Currency = [
    {
      symbol: "₹",
      value: "INR (Indian Rupee)",
    },
    {
      symbol: "$",
      value: "USD (United States Dollar)",
    },
    {
      symbol: "£",
      value: "GBP (British Pound Sterling)",
    },
    {
      symbol: "¥",
      value: "JPY (Japanese Yen)",
    },
    {
      symbol: "$",
      value: "CAD (Canadian Dollar)",
    },
  ];

  const [formData, setFormData] = useState({
    invoiceId: 1,
    currency: curr,
    taxRate: taxRate,
    discountRate: discountRate,
    currentDate: null,
    dueDate: null,
    billtoName: "",
    billtoEmail: "",
    billtoAddress: "",
    billfromName: "",
    billfromEmail: "",
    billfromAddress: "",
    itemList: [],
  });

  // const handleAddItem = () => {
  //   console.log("Handle Add Item Called");
  //   setFormData({
  //     ...formData,
  //     itemList: [...formData.itemList, {}],
  //   });
  // };

  const renderedItems = Array.from({ length: itemCount }, (_, index) => (
    <Item key={index} id={index} curr={curr} setFormData={setFormData} />
  ));

  const handleInputChange = (e) => {
    // console.log("Hi", e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCurrCalendarInputChange = (date) => {
    setFormData({
      ...formData,
      ["currentDate"]: date,
    });
  };
  const handleDueCalendarInputChange = (date) => {
    setFormData({
      ...formData,
      ["dueDate"]: date,
    });
  };
  const handleCalendarClean = (e) => {
    // console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: null,
    });
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    if (itemCount > 0) setitemCount(itemCount - 1);
  };
  const handleAddItem = (e) => {
    e.preventDefault();
    setitemCount(itemCount + 1);
  };

  return (
    <div className="h-[95vh] w-full bg-gray-200 flex justify-center items-center">
      <div className="p-4 h-full w-full xl:w-[80%] flex ">
        <div className="w-[80%] h-full bg-white rounded-xl flex flex-col gap-2 overflow-y-auto ">
          <div className="min-h-[150px]  flex justify-between items-center border-b-gray-300 border-b-[1px] mx-5">
            <div className="flex flex-col m-8">
              <div className="my-2">
                <label>Current Date: </label>
                <DatePicker
                  oneTap
                  name="currentDate"
                  value={formData.currentDate}
                  onSelect={handleCurrCalendarInputChange}
                  onClean={handleCalendarClean}
                  className=""
                />
              </div>
              <div className="my-2">
                <label className="">Due Date: </label>
                <DatePicker
                  oneTap
                  name="currentDate"
                  value={formData.dueDate}
                  onSelect={handleDueCalendarInputChange}
                  className=""
                />
              </div>
            </div>
            <div className="flex m-8">
              <input
                type="number"
                name="invoiceId"
                value={formData.invoiceId}
                placeholder="Invoice ID"
                className="max-w-[65px] bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="min-h-[250px] flex justify-between items-center border-b-gray-300 border-b-[1px] mx-5">
            <div className="m-8 flex flex-col gap-4 w-full">
              <label className="font-bold text-md">Bill To:</label>
              <div className="">
                <input
                  name="billtoName"
                  value={formData.billtoName}
                  placeholder="Who is the invoice/quotation for?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="">
                <input
                  name="billtoEmail"
                  value={formData.billtoEmail}
                  placeholder="What's their Email?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="">
                <input
                  name="billtoAddress"
                  value={formData.billtoAddress}
                  placeholder="What's their Address?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div className="m-8 flex flex-col gap-4 w-full">
              <label className="font-bold text-md">Bill From:</label>
              <div className="">
                <input
                  name="billfromName"
                  value={formData.billfromName}
                  placeholder="Who is the invoice/quotation from?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="">
                <input
                  name="billfromEmail"
                  value={formData.billfromEmail}
                  placeholder="What's your Email?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="">
                <input
                  name="billfromAddress"
                  value={formData.billfromAddress}
                  placeholder="What's your Address?"
                  className="w-full bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="border-b-gray-300 border-b-[1px] mx-5 p-4">
            <div className=" w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg gap-2">
              {renderedItems}
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddItem}
                className="bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-700"
              >
                Add Item
              </button>
              <button
                onClick={handleDeleteItem}
                className="ml-4 bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-700"
              >
                Remove Last Item
              </button>
            </div>
          </div>
          <div className="min-h-[250px] border-b-gray-300 border-b-[1px] mx-5 p-4"></div>
          <div className="min-h-[100px] bg-blue-500 relative bottom-0"></div>
        </div>
        <div className="w-[20%] h-full flex flex-col items-center px-3">
          <button className="w-full h-[44px] bg-blue-700 rounded-lg text-white hover:bg-blue-500">
            Review Quotation
          </button>
          <div className="w-[95%] border-b-[2px] border-gray-300 my-5 "></div>
          <label className="w-full mb-4">Currency:</label>
          <Dropdown
            data={Currency}
            title="INR (Indian Rupee)"
            setData={setCurr}
          />
          <label className="w-full my-4">Tax rate:</label>
          <div className="flex items-center w-full">
            <input
              type="number"
              min="0.00"
              max="100.00"
              step="0.01"
              value={taxRate}
              className="w-[85%] h-[40px] rounded-l-lg p-2 focus:outline-none"
              onChange={(e) => {
                setTaxrate(e.target.value);
              }}
            ></input>
            <div className="w-[15%] h-[41px] text-gray-400 rounded-r-lg text-md bg-gray-100 border-gray-300 border-[1px] flex items-center justify-center">
              %
            </div>
          </div>
          <label className="w-full my-4">Discount rate:</label>
          <div className="flex items-center w-full">
            <input
              type="number"
              min="0.00"
              max="100.00"
              step="0.01"
              value={discountRate}
              className="w-[85%] h-[40px] rounded-l-lg p-2 focus:outline-none"
              onChange={(e) => {
                setDiscountrate(e.target.value);
              }}
            ></input>
            <div className="w-[15%] h-[41px] text-gray-400 rounded-r-lg text-md bg-gray-100 border-gray-300 border-[1px] flex items-center justify-center">
              %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
