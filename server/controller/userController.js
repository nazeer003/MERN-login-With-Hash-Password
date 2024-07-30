import express from "express";
import { UserModel } from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashpassword });
    const result = await newUser.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ errors: [{ msg: "User Not Registered" }] });
    }
    const isPasswordOK = await bcrypt.compare(password, userExist.password);
    if (!isPasswordOK) {
      return res.status(400).json({ errors: [{ msg: "Wrong Password" }] });
    }
    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    const user = { ...userExist._doc, password: undefined };
    return res.status(200).json({ success: true, user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export { Register, Login };
