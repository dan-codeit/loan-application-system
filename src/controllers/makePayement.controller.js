// src/controllers/paymentController.js

export const makePaymentHandler = async (req, res) => {
  // payment logic here
  return res.status(200).json({ message: "Payment successful" });
};
export const getPaymentHistory = async (req, res) => {
  // Mock payment history
  const history = [
    { id: 1, amount: 100, method: "credit_card", status: "completed" },
    { id: 2, amount: 50, method: "paypal", status: "completed" },
  ];

  return res.status(200).json(history);
};
