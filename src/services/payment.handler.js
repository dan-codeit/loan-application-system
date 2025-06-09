export async function makePaymentHandler(req, res) {
  try {
    const { amount, method } = req.body;
    // Mock payment processing
    if (!amount || !method) {
      return res.status(400).json({ error: "Amount and method are required" });
    }

    // Simulate payment success
    const paymentResult = {
      id: "pay_12345",
      amount,
      method,
      status: "success",
      timestamp: new Date(),
    };

    // Emit event to notify about the payment
    req.app.get("io").emit("payment-success", paymentResult);

    res.status(200).json(paymentResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
