import User from "../model/model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, mobile, password } = req.body;

    const registered = await User.findOne({ email });
    if (!registered) {
      const pass = req.body.password;
      const hashedPassword = await bcrypt.hash(pass, 10);
      const newUser = new User({
        name,
        email,
        mobile,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User Registered Successfully" });
    } else {
      res.status(400).json({ message: "User Already Registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
