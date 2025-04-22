import express from "express";
import {
    addTransaction,
    getTransactionsByUser,
    updateTransaction
} from "../controllers/transactionController.js";
import { getTransactionsByMonth } from '../controllers/transactionController.js';

const router = express.Router();
router.post("/", addTransaction);
router.get("/:userId", getTransactionsByUser);
router.post("/update/:id", updateTransaction);
router.get('/month/filter', getTransactionsByMonth);

export default router;
