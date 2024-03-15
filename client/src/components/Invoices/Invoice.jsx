import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import { update } from "../../redux/slices/categorySlice";
import { useDispatch } from "react-redux";

import { RxReload } from "react-icons/rx";

function Invoice({ setFormData, setTitle, setTaxrate, setDiscountrate }) {
  const dispatch = useDispatch();
  const [invoiceList, setInvoiceList] = useState([]);
  const [query, setQuery] = useState("");
  let { user } = useContext(authContext);

  const handleInvoiceListRender = async () => {
    try {
      const res = await fetch(`${BASE_URL}/invoice/getinvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      const result = await res.json();

      //   console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      setInvoiceList(result.data);
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInvoiceRender = (invoice) => {
    const data = {
      invoiceId: invoice.invoiceID,
      currency: invoice.currency,
      taxRate: invoice.taxRate,
      discountRate: invoice.discountRate,
      currentDate: new Date(invoice.currentDate),
      dueDate: new Date(invoice.dueDate),
      billtoName: invoice.billtoName,
      billtoEmail: invoice.billtoEmail,
      billtoAddress: invoice.billtoAddress,
      billfromName: invoice.billfromName,
      billfromEmail: invoice.billfromEmail,
      billfromAddress: invoice.billfromAddress,
      note: invoice.note,
    };
    // console.log(data);
    setFormData(data);
    setTitle(invoice.title);
    dispatch(update(invoice.items));
  };

  const renderedList = invoiceList.filter((invoice) => {
    return invoice.invoiceID.toString() == query;
  });

  //   console.log(renderedList);

  useEffect(() => {
    handleInvoiceListRender();
  }, []);

  return (
    <div className="relative w-full bg-white mt-5 h-full overflow-y-auto overflow-x-hidden p-2 rounded">
      <div className="flex gap-5">
        <input
          type="number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here"
          className="w-full border-[1px] p-2 rounded focus:outline-none"
        ></input>
        <button
          onClick={() => {
            handleInvoiceListRender();
          }}
          className="bg-blue-500 hover:bg-blue-700 p-2 rounded-full"
        >
          <RxReload className="text-xl text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-2 py-2">
        {renderedList.length == 0 &&
          query == "" &&
          invoiceList.map((invoice, index) => {
            return (
              <div
                onClick={() => handleInvoiceRender(invoice)}
                key={index}
                className="bg-blue-100 hover:bg-blue-300 p-2 rounded flex justify-between items-center text-md font-normal cursor-pointer"
              >
                <p>{invoice.invoiceID}</p>
                <p className="m-0">{invoice.billtoName}</p>
              </div>
            );
          })}
        {renderedList.length == 0 && query.length > 0 && (
          <div>Searching...</div>
        )}
        {renderedList.length > 0 &&
          renderedList.map((invoice, index) => {
            return (
              <div
                onClick={() => handleInvoiceRender(invoice)}
                key={index}
                className="bg-blue-100 hover:bg-blue-300 p-2 rounded flex justify-between items-center text-md font-normal cursor-pointer"
              >
                <p>{invoice.invoiceID}</p>
                <p className="m-0">{invoice.billtoName}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Invoice;
