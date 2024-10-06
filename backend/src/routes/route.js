import express from "express";
import { register, login } from "../controller/controller.js";
import { validationRules } from "../validation/validation..js";

const router = express.Router();

router.get("/test", () => {
  console.log("testServer Detected");
});

router.post("/register", validationRules(), register);
router.post("/login", login);
export default router;
