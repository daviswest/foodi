const express = require("express");
const { check } = require("express-validator");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getAuthenticatedUser,
} = require("../controllers/authController");

const {
  forgotPassword,
  resetPassword,
} = require("../controllers/passwordController");

const authMiddleware = require("../middlewares/authMiddleware");
const { authLimiter, passwordLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

const registerValidation = [
  check("name")
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  
  check("email")
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email must be valid and up to 255 characters"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
];

router.post("/login", authLimiter, loginUser);
router.post("/register", authLimiter, registerValidation, registerUser);
router.post("/forgot-password", passwordLimiter, forgotPassword);
router.post("/reset-password", passwordLimiter, resetPassword);
router.get("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getAuthenticatedUser);

module.exports = router;
