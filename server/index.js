import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./route/auth.js";
import invoiceRoute from "./route/invoice.js";
import profileRoute from "./route/profile.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is Working..");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Database is Connected");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/profile", profileRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is Running on Port " + port);
});
