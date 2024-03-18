import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  statecode: {
    type: Number,
    required: true,
  },
  gstin: {
    type: Number,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  logo: {
    type: Object,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  acno: {
    type: String,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  oaddress: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Profile", ProfileSchema);
