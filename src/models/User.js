import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/passhash.js";

const User = sequelize.define(
  "User",
  {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isPhoneVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    otp: { type: DataTypes.STRING },
    otpExpiresAt: { type: DataTypes.DATE },
    otpData: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await hashPassword(user.password);
        }
      },
    },
  }
);

User.prototype.comparePassword = function (plainPassword) {
  return comparePassword(plainPassword, this.password);
};

export default User;
