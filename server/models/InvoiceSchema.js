import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  invoiceID: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  taxRate: {
    type: Number,
    required: true,
  },
  discountRate: {
    type: Number,
    required: true,
  },
  currentDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    // required: true,
  },
  billtoName: {
    type: String,
    required: true,
  },
  billtoEmail: {
    type: String,
    // required: true,
  },
  billtoAddress: {
    type: String,
    // required: true,
  },
  billfromName: {
    type: String,
    required: true,
  },
  billfromEmail: {
    type: String,
    // required: true,
  },
  billfromAddress: {
    type: String,
    // required: true,
  },
  note: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Invoice", InvoiceSchema);
