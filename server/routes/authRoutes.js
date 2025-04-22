import express from "express";
import { register, login } from "../controllers/authController.js";
import { updateUserSettings } from '../controllers/authController.js';

const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.post('/update-settings', updateUserSettings);

export default router;