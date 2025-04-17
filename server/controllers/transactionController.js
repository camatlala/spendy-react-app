const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
    try {
    const { userId, categoryId, type, amount, description, date } = req.body;

    await Transaction.create({
        user_id: userId,
        category_id: categoryId,
        type,
        amount,
        description,
        date,
    });

    res.json({ status: 'Success' });
    } catch (error) {
    res.status(500).json({ status: 'Error', error });
    }
};

exports.getTransactionsByUser = async (req, res) => {
    try {
    const userId = req.params.userId;

    const transactions = await Transaction.find({ user_id: userId }).populate('category_id');

    res.json(transactions);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
    const id = req.params.id;

    await Transaction.findByIdAndUpdate(id, req.body);

    res.json({ status: 'Success' });
    } catch (error) {
    res.status(500).json({ status: 'Error', error });
    }
};
