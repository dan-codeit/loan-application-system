import db from "../models/index.js";
const { LoanApplication } = db;

export const updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const application = await LoanApplication.findByPk(id);
    if (!application) return res.status(404).json({ error: "Not found" });
    application.status = status;
    await application.save();
    req.io.emit("loan-status-updated", application);
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
