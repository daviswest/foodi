const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../models/UserModel");
const dynamoDB = require("../config/db");
const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const sendResetEmail = require("../utils/email");

const TABLE_NAME = "Users";

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(200).json({ message: "If an account exists, a reset email has been sent." });
    }

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail(user.email, resetLink);
    res.status(200).json({ message: "Password reset link sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateParams = {
      TableName: TABLE_NAME,
      Key: { id: user.id },
      UpdateExpression: "set #pw = :p",
      ExpressionAttributeNames: { "#pw": "password" },
      ExpressionAttributeValues: { ":p": hashedPassword },
    };

    await dynamoDB.send(new UpdateCommand(updateParams));
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
