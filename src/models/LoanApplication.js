import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // ✅ Import sequelize directly

const LoanApplication = sequelize.define("LoanApplication", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM("draft", "submitted", "approved", "rejected"),
    defaultValue: "draft",
  },
  notes: { type: DataTypes.TEXT, allowNull: true },
});

export default LoanApplication;
