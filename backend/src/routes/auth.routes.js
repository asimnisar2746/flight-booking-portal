import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {
  getME,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(registerValidator(), validate, registerUser);
router.route("/login").post(loginValidator(), validate, loginUser);
router.post("/logout", (req, res) => {
  return res.status(200).json({
    message: "Logged out successfully",
  });
});

// protected routes

router.route("/dashboard").get(authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

router.route("/profile").get(authMiddleware, getME);

export default router;
