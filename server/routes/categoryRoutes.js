import express from "express";
import { getCategoriesByType } from "../controllers/categoryController.js";

const router = express.Router();
router.get("/:type", getCategoriesByType);

export default router;
