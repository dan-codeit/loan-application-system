import express from "express";
import {
  submitLoan,
  getMyApplications,
} from "../controllers/loanController.js";
const router = express.Router();

router.post("/loan", submitLoan);
router.get("/loan-details", getMyApplications);

export default router;
