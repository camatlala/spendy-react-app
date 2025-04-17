const Transaction = require("../models/transaction");

exports.getTransactions = async (req, res) => {
    try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
    } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
    }
};

exports.addTransaction = async (req, res) => {
    try {
    const tx = await Transaction.create(req.body);
    res.json({ status: "Success", tx });
    } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
    const { id } = req.params;
    await Transaction.findByIdAndUpdate(id, req.body);
    res.json({ status: "Success" });
    } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
    }
};
