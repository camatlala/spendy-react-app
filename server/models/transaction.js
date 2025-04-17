const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    },
    type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
    },
    amount: {
    type: Number,
    required: true,
    },
    description: String,
    date: {
    type: String,
    required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);