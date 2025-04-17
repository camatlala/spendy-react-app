import express from 'express';
import {
    addTransaction,
    getTransactionsByUser,
    updateTransaction,
} from '../controllers/transactionController.js';

const router = express.Router();

// Matches POST /api/transactions
router.post('/', addTransaction);

// Matches GET /api/transactions/:userId
router.get('/:userId', getTransactionsByUser);

// Matches POST /api/transactions/update/:id
router.post('/update/:id', updateTransaction);

export default router;
