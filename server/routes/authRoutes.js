import express from "express";
import { signup, login, getMe, logout } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;
