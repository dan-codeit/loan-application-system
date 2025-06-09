import db from "../models/index.js";
const { LoanApplication } = db;

export const submitLoan = async (req, res) => {
  try {
    const { amount, notes } = req.body;
    const application = await LoanApplication.create({
      userId: req.session.userId,
      amount,
      notes,
      status: "submitted",
    });
    //req.io.emit("loan-submitted", application);
    res.status(201).json({
      message: "Loan application submitted successfully",
      applicationId: application.id,
      status: application.status,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const apps = await LoanApplication.findAll({
      where: { userId: req.session.userId },
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
