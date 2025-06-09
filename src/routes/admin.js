import express from "express";
import { updateLoanStatus } from "../controllers/adminController.js";
const router = express.Router();

router.patch("/:id", updateLoanStatus);

export default router;
