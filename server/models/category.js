const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
  type: { // 'income' or 'expense'
    type: String,
    required: true,
    enum: ['income', 'expense'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
