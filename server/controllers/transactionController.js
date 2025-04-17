const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
    try {
    const { userId, categoryId, type, amount, description, date } = req.body;

    await Transaction.create({
        user_id: new mongoose.Types.ObjectId(userId),
        category_id: new mongoose.Types.ObjectId(categoryId),
        type,
        amount: parseFloat(amount),
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
        
        const transactions = await Transaction.find({ user_id: userId })
        .populate('category_id') // to include category name/type in response
        .exec();

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
    };
