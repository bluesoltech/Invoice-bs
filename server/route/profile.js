import express from "express";
import { save, get } from "../controller/profileController.js";
const router = express.Router();

router.post("/save", save);
router.post("/get", get);

export default router;
