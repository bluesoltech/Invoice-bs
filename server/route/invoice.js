import express from "express";
import {
  save,
  getInvoices,
  getNewInvoiceId,
  deleteInvoice,
} from "../controller/invoiceController.js";
const router = express.Router();

router.post("/save", save);
router.post("/getinvoice", getInvoices);
router.post("/deleteinvoice", deleteInvoice);
router.post("/getNewInvoiceId", getNewInvoiceId);

export default router;
