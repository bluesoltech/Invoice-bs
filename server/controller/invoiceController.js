import Invoice from "../models/InvoiceSchema.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 10);

export const save = async (req, res) => {
  const { user, formData, title, listings } = req.body;
  try {
    // Validate required fields
    if (
      !formData.invoiceId ||
      !title ||
      !formData.billfromName ||
      !formData.billtoName
    ) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    // Prepare the update document
    const updateDoc = {
      user: user,
      invoiceID: formData.invoiceId,
      currency: formData.currency,
      taxRate: formData.taxRate,
      discountRate: formData.discountRate,
      currentDate: formData.currentDate,
      dueDate: formData.dueDate,
      billtoName: formData.billtoName,
      billtoEmail: formData.billtoEmail,
      billtoAddress: formData.billtoAddress,
      billfromName: formData.billfromName,
      billfromEmail: formData.billfromEmail,
      billfromAddress: formData.billfromAddress,
      note: formData.note,
      title: title,
      items: listings,
    };

    // Use findOneAndUpdate to either update the existing invoice or insert a new one if it doesn't exist
    const invoice = await Invoice.findOneAndUpdate(
      { invoiceID: formData.invoiceId },
      updateDoc,
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if one doesn't exist
      }
    );

    // Success response
    res
      .status(200)
      .json({ success: true, message: "Success", invoice: invoice });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteInvoice = async (req, res) => {
  const { user, id } = req.body;

  try {
    // Find the invoice to verify it belongs to the user
    const invoice = await Invoice.findOne({ invoiceID: id, user: user });

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Access Denied" });
    }
    await Invoice.deleteOne({ invoiceID: id });
    res
      .status(200)
      .json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    console.log(error);
    // Handle potential errors, such as database connectivity issues
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const { userId } = req.body; // assuming the user id is available in the request
    // console.log(userId);
    const invoices = await Invoice.find({ user: userId });
    // console.log(invoices);
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getNewInvoiceId = async (req, res) => {
  try {
    let newInvoiceId = nanoid();
    let invoice = await Invoice.findOne({ invoiceID: newInvoiceId });

    while (invoice) {
      newInvoiceId = nanoid();
      invoice = await Invoice.findOne({ invoiceID: newInvoiceId });
    }

    res.status(200).json({ success: true, data: { invoiceId: newInvoiceId } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
