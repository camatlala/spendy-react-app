const express = require('express');
const router = express.Router();
const {
    addTransaction,
    getTransactionsByUser,
    updateTransaction
} = require('../controllers/transactionController');

router.post('/add-transaction', addTransaction);
router.get('/transactions/:userId', getTransactionsByUser);
router.post('/update-transaction/:id', updateTransaction);

module.exports = router;