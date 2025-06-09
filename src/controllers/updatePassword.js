import User from "../models/User.js";

export const updatePassword = async (req, res) => {
  const userId = req.session.userId;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.password = newPassword; // hashed via beforeSave hook
  await user.save();

  res.json({ message: "Password updated successfully" });
};
