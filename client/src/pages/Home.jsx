import React, { useContext, useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import DatePicker from "rsuite/DatePicker";
import { RxCrossCircled } from "react-icons/rx";

import Category from "../components/Item/Category";
import logo from "../assets/logo.png";
import signature from "../assets/signature.png";

import { useSelector } from "react-redux";

import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";
import Invoice from "../components/Invoices/Invoice";

function addSubItemsAmount(subcategories) {
  return subcategories.map((subcategory) => {
    const totalAmount = subcategory.subItems.reduce((acc, currentItem) => {
      return acc + currentItem.amount;
    }, 0);

    return {
      ...subcategory,
      totalAmount,
    };
  });
}

function Home() {
  // const [itemCount, setitemCount] = useState(1);
  let { user } = useContext(authContext);
  const subcategories = useSelector((state) => state.category);
  // console.log(subcategories);
  const [title, setTitle] = useState("");
  // console.log(total);
  const [review, setReview] = useState(false);
  const [reviewInvoice, setReviewInvoice] = useState(false);
  // const [curr, setCurr] = useState("₹");
  // const [taxRate, setTaxrate] = useState(18.0);
  // const [discountRate, setDiscountrate] = useState(0.0);
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
    invoiceId: "",
    currency: "₹",
    taxRate: 18.0,
    discountRate: 0,
    currentDate: new Date(),
    dueDate: new Date(),
    billtoName: "",
    billtoEmail: "",
    billtoAddress: "",
    billfromName: "Blue Soltech",
    billfromEmail: "info@bluesoltech.com",
    billfromAddress:
      "102, Solaris Business Hub, Bhuyangdev, Sola Road, Ahmedabad, Gujarat 380063",
    note: "",
  });

  const handleGetNewInvoiceID = async () => {
    try {
      const res = await fetch(`${BASE_URL}/invoice/getNewInvoiceId`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setFormData({
        ...formData,
        ["invoiceId"]: result.data.invoiceId,
      });

      if (!res.ok) {
        throw new Error(result.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (formData.invoiceId == "") {
      handleGetNewInvoiceID();
    }
  }, []);

  // console.log(formData);

  // const handleAddItem = () => {
  //   console.log("Handle Add Item Called");
  //   setFormData({
  //     ...formData,
  //     itemList: [...formData.itemList, {}],
  //   });
  // };

  // const renderedItems = Array.from({ length: itemCount }, (_, index) => (
  //   <Item key={index} />
  // ));

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

  const handleSave = async () => {
    try {
      const res = await fetch(`${BASE_URL}/invoice/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formData,
          user: user._id,
          title: title,
          listings: subcategories,
        }),
      });

      const result = await res.json();

      // console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      handleNew();
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/invoice/deleteinvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.invoiceId,
          user: user._id,
        }),
      });

      const result = await res.json();

      // console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      handleNew();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleNew = async () => {
    location.reload();
  };

  let allAmount = addSubItemsAmount(subcategories);
  let subTotal = 0;
  subTotal = allAmount.reduce((acc, item) => {
    return acc + item.totalAmount;
  }, 0);
  let discount = (formData.discountRate / 100) * subTotal;
  let tax = (subTotal - discount) * (formData.taxRate / 100);
  let total = subTotal - discount + tax;
  // console.log(allAmount);
  //print
  const componentRef = useRef();
  const componentInvoiceRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-[95vh] w-full bg-gray-200 flex justify-center items-center">
      <div
        className={
          review
            ? " absolute w-full  h-full bg-black/30 z-[999] backdrop-blur-[2px] flex items-center justify-center"
            : "hidden"
        }
      >
        <div className="relative w-[800px] h-[500px] bg-white border-2 rounded-xl overflow-y-auto p-5">
          <RxCrossCircled
            onClick={() => setReview(false)}
            className="text-2xl hover:text-red-500 absolute right-1 top-1 cursor-pointer"
          />
          <div className="border-b-2 mb-3 flex items-center justify-between p-2">
            <h1 className="text-xl font-light ">Quotation Generator</h1>
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-xl">
                  Download
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          <div ref={componentRef} className="flex flex-col p-2 gap-5">
            <div className="flex flex-col">
              <div className="self-end">
                <img src={logo} className="w-[55px]" alt="" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-2xl">Blue Soltech</p>
                <p className="text-gray-500">
                  Quotation ID: {formData.invoiceId}
                </p>
                {/* <p className="text-gray-500 m-0">
                  Due Date: {formData.dueDate.getDate()}-
                  {formData.dueDate.getMonth() + 1}-
                  {formData.dueDate.getFullYear()}
                </p> */}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex max-w-[30%] flex-col">
                <p className="text-lg  m-0 font-semibold">Billed to:</p>
                <p className="text-sm m-0">{formData.billtoName}</p>
                <p className="text-[11px] text-gray-400 m-0">
                  {formData.billtoEmail}
                </p>
                <p className="text-[11px] text-gray-400 m-0">
                  {formData.billtoAddress}
                </p>
              </div>
              <div className="flex max-w-[30%] flex-col">
                <p className="text-lg m-0 font-semibold">Billed From:</p>
                <p className="text-sm m-0">{formData.billfromName}</p>
                <p className="text-[11px] font-light text-gray-400 m-0">
                  {formData.billfromEmail}
                </p>
                <p className="text-[11px] font-light text-gray-400 m-0">
                  {formData.billfromAddress}
                </p>
              </div>
              <div className="flex max-w-[30%] flex-col">
                <p className="text-lg m-0 font-semibold">Date Of Issue</p>
                <p className="text-sm m-0">
                  {formData.currentDate.getDate()}-
                  {formData.currentDate.getMonth() + 1}-
                  {formData.currentDate.getFullYear()}
                </p>
              </div>
            </div>
            <div className="w-full border-[1px]">
              <h1 className="text-center uppercase font-ligth text-lg">
                {title}
              </h1>
              <p className="text-center text-gray-400 font-light">Quotation</p>
              {allAmount.map((item, index) => {
                return (
                  <div key={index} className="w-full p-2 my-2">
                    <h1 className="text-lg text-start my-2">{item.name}</h1>
                    <table className="w-full border-[1px]">
                      <thead>
                        <tr className="border-[1px]">
                          <th className="border-[1px]">Sr. no.</th>
                          <th className="border-[1px]">Particulars</th>
                          <th className="border-[1px]">Size</th>
                          <th className="border-[1px]">SqFt</th>
                          <th className="border-[1px]">Quantity</th>
                          <th className="border-[1px]">Days</th>
                          <th className="border-[1px]">Details</th>
                          <th className="border-[1px]">Rate</th>
                          <th className="border-[1px]">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.subItems.map((itemList, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center border-[1px]">
                                {Number(index) + 1}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.value}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.size}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.sqft}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.qty}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.days}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.details}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.rate}
                              </td>
                              <td className="text-center border-[1px]">
                                {formData.currency}
                                {itemList.amount}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p className="text-end text-md px-2 border-[1px] my-1">
                      <span className="font-bold">Total:</span>{" "}
                      {formData.currency}
                      {item.totalAmount}
                    </p>
                  </div>
                );
              })}
              <div className="w-full mt-5 border-t-[1px] border-gray-200"></div>
              <div className="flex justify-end">
                <div className="w-[50%] flex flex-col gap-0 p-5">
                  <div className="flex justify-between items-center">
                    <p>Subtotal:</p>
                    <p>
                      {formData.currency}
                      {subTotal}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Discount:</p>
                    <p>
                      -{formData.currency}
                      {discount}({formData.discountRate}%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Tax:</p>
                    <p>
                      {formData.currency}
                      {tax}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">Total:</p>
                    <p className="font-bold text-lg">
                      {formData.currency}
                      {total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="text-justify">{formData.note}</p>
            </div>
            <div className=" w-full flex justify-end">
              <img className="w-[140px]" src={signature} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          reviewInvoice
            ? " absolute w-full  h-full bg-black/30 z-[999] backdrop-blur-[2px] flex items-center justify-center"
            : "hidden"
        }
      >
        <div className="relative w-[800px] h-[500px] bg-white border-2 rounded-xl overflow-y-auto p-5">
          <RxCrossCircled
            onClick={() => setReviewInvoice(false)}
            className="text-2xl hover:text-red-500 absolute right-1 top-1 cursor-pointer"
          />
          <div className="border-b-2 mb-3 flex items-center justify-between p-2">
            <h1 className="text-xl font-light ">Invoice Generator</h1>
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-xl">
                  Download
                </button>
              )}
              content={() => componentInvoiceRef.current}
            />
          </div>
          <div ref={componentInvoiceRef} className="flex flex-col p-2 gap-5">
            <div className="flex flex-col">
              <div className="self-end">
                <img src={logo} className="w-[55px]" alt="" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-2xl">Blue Soltech</p>
                <p className="text-gray-500">
                  Invoice ID: {formData.invoiceId}
                </p>
                <p className="text-gray-500 m-0">
                  Due Date: {formData.dueDate.getDate()}-
                  {formData.dueDate.getMonth() + 1}-
                  {formData.dueDate.getFullYear()}
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex max-w-[30%] flex-col">
                <p className="text-lg m-0 font-semibold">Billed to:</p>
                <p className="text-sm m-0">{formData.billtoName}</p>
                <p className="text-[11px] text-gray-400 m-0">
                  {formData.billtoEmail}
                </p>
                <p className="text-[11px] text-gray-400 m-0">
                  {formData.billtoAddress}
                </p>
              </div>
              <div className="flex max-w-[30%] flex-col">
                <p className="text-lg m-0 font-semibold">Billed From:</p>
                <p className="text-sm m-0">{formData.billfromName}</p>
                <p className="text-[11px] font-light text-gray-400 m-0">
                  {formData.billfromEmail}
                </p>
                <p className="text-[11px] font-light text-gray-400 m-0 ">
                  {formData.billfromAddress}
                </p>
              </div>
              <div className="flex max-w-[30%] flex-col">
                <p className="text-lg m-0 font-semibold">Date Of Issue</p>
                <p className="text-sm m-0">
                  {formData.currentDate.getDate()}-
                  {formData.currentDate.getMonth() + 1}-
                  {formData.currentDate.getFullYear()}
                </p>
              </div>
            </div>
            <div className="w-full border-[1px]">
              <h1 className="text-center uppercase font-ligth text-lg">
                {title}
              </h1>
              <p className="text-center text-gray-400 font-light">Invoice</p>
              {allAmount.map((item, index) => {
                return (
                  <div key={index} className="w-full p-2 my-2">
                    <h1 className="text-lg text-start my-2">{item.name}</h1>
                    <table className="w-full border-[1px]">
                      <thead>
                        <tr className="border-[1px]">
                          <th className="border-[1px]">Sr. no.</th>
                          <th className="border-[1px]">Particulars</th>
                          <th className="border-[1px]">Size</th>
                          <th className="border-[1px]">SqFt</th>
                          <th className="border-[1px]">Quantity</th>
                          <th className="border-[1px]">Days</th>
                          <th className="border-[1px]">Details</th>
                          <th className="border-[1px]">Rate</th>
                          <th className="border-[1px]">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.subItems.map((itemList, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center border-[1px]">
                                {Number(index) + 1}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.value}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.size}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.sqft}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.qty}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.days}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.details}
                              </td>
                              <td className="text-center border-[1px]">
                                {itemList.rate}
                              </td>
                              <td className="text-center border-[1px]">
                                {formData.currency}
                                {itemList.amount}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p className="text-end text-md px-2 border-[1px] my-1">
                      <span className="font-bold">Total:</span>{" "}
                      {formData.currency}
                      {item.totalAmount}
                    </p>
                  </div>
                );
              })}
              <div className="w-full mt-5 border-t-[1px] border-gray-200"></div>
              <div className="flex justify-end">
                <div className="w-[50%] flex flex-col gap-0 p-5">
                  <div className="flex justify-between items-center">
                    <p>Subtotal:</p>
                    <p>
                      {formData.currency}
                      {subTotal}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Discount:</p>
                    <p>
                      -{formData.currency}
                      {discount}({formData.discountRate}%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Tax:</p>
                    <p>
                      {formData.currency}
                      {tax}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">Total:</p>
                    <p className="font-bold text-lg">
                      {formData.currency}
                      {total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-justify">{formData.note}</p>
            </div>
            <div className="flex justify-end">
              <img src={signature} className="w-[140px]" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 h-full w-full xl:w-[95%] flex ">
        <div className="w-[75%] h-full bg-white rounded-xl flex flex-col gap-2 overflow-y-auto ">
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
                disabled
                name="invoiceId"
                value={formData.invoiceId}
                placeholder="Invoice ID"
                className="max-w-[100px] text-center bg-transparent border-b-[1px] border-gray-500 focus:outline-none"
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
            <Category title={title} setTitle={setTitle} />
          </div>
          <div className="min-h-[250px] border-b-gray-300 border-b-[1px] mx-5 p-4 flex justify-end">
            <div className="w-[50%] flex flex-col justify-evenly">
              <div className="flex justify-between">
                <h1 className="font-bold text-lg">Subtotal:</h1>
                <p className="text-sm">
                  {formData.currency}
                  {subTotal}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-bold text-lg">Discount:</h1>
                <p className="text-sm">
                  -{formData.currency}
                  {discount} ({formData.discountRate}%)
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-bold text-lg">Tax (GST):</h1>
                <p className="text-sm">
                  {formData.currency}
                  {tax}
                </p>
              </div>
              <div className="flex justify-between border-t-2 pt-10">
                <h1 className="font-bold text-xl">Total:</h1>
                <p className="text-lg font-bold">
                  {formData.currency}
                  {total}
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-[200px] p-5 relative bottom-0 flex flex-col">
            <label htmlFor="note">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              type="text"
              className="w-full bg-blue-900 rounded-xl text-white p-2 focus:outline-none h-full"
            />
          </div>
        </div>
        <div className="w-[25%] h-full flex flex-col items-center px-3">
          <button
            onClick={() => setReview(true)}
            className="w-full py-2 bg-blue-700 rounded-lg text-white hover:bg-blue-500"
          >
            Review Quotation
          </button>
          <button
            onClick={() => setReviewInvoice(true)}
            className="w-full py-2 bg-blue-700 rounded-lg text-white hover:bg-blue-500 mt-2"
          >
            Review Invoice
          </button>
          <div className="w-full flex justify-between gap-2">
            <button
              onClick={() => handleNew()}
              className="w-fit px-4 h-[44px] bg-green-700 rounded-lg text-white hover:bg-green-500 my-2"
            >
              New Draft
            </button>
            <button
              onClick={() => handleSave()}
              className="w-fit px-4 h-[44px] bg-blue-700 rounded-lg text-white hover:bg-blue-500 my-2"
            >
              Save
            </button>
            <button
              onClick={() => handleDelete()}
              className="w-fit px-4 h-[44px] bg-red-700 rounded-lg text-white hover:bg-red-500 my-2"
            >
              Delete
            </button>
          </div>
          <div className="w-[95%] border-b-[2px] border-gray-300 my-5 "></div>
          <label className="w-full mb-4">Currency:</label>
          <Dropdown
            data={Currency}
            title="INR (Indian Rupee)"
            formData={formData}
            setData={setFormData}
          />
          <label className="w-full my-4">Tax rate:</label>
          <div className="flex items-center w-full">
            <input
              type="number"
              min="0.00"
              max="100.00"
              step="0.01"
              name="taxRate"
              value={formData.taxRate}
              className="w-[85%] h-[40px] rounded-l-lg p-2 focus:outline-none"
              onChange={handleInputChange}
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
              name="discountRate"
              value={formData.discountRate}
              className="w-[85%] h-[40px] rounded-l-lg p-2 focus:outline-none"
              onChange={handleInputChange}
            ></input>
            <div className="w-[15%] h-[41px] text-gray-400 rounded-r-lg text-md bg-gray-100 border-gray-300 border-[1px] flex items-center justify-center">
              %
            </div>
          </div>
          <Invoice setFormData={setFormData} setTitle={setTitle} />
        </div>
      </div>
    </div>
  );
}

export default Home;
