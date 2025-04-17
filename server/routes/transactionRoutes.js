const express = require('express');
const router = express.Router();
const {
    addTransaction,
    getTransactionsByUser,
    updateTransaction
} = require('../controllers/transactionController');

// Matches POST /api/transactions
router.post('/', addTransaction);

// Matches GET /api/transactions/:userId
router.get('/:userId', getTransactionsByUser);

// Matches POST /api/transactions/update/:id
router.post('/update/:id', updateTransaction);

export default router;
