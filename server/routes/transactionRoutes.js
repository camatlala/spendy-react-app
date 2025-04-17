const express = require("express");
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    updateTransaction,
} = require("../controllers/transactionController");

router.get("/:userId", getTransactions);
router.post("/", addTransaction);
router.post("/:id", updateTransaction);

module.exports = router;