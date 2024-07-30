import express from "express";
import { Register,Login } from "../controller/userController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name should not be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password length should be 5-30"),
  ],
  Register
);

router.post(
  "/login",
  [
    
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password length should be 5-30"),
  ],Login
  
);

export { router as Router };
