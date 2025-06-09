import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";

import LoanApplication from "./LoanApplication.js";
import User from "./User.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.User = User;
db.LoanApplication = LoanApplication;

// Define associations
db.User.hasMany(db.LoanApplication, { foreignKey: "userId" });
db.LoanApplication.belongsTo(db.User, { foreignKey: "userId" });

export { sequelize };
export default db;
