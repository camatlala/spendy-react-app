import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    },
    category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    },
  type: String, // 'income' or 'expense'
    amount: Number,
    description: String,
    date: String,
});

export default mongoose.model('Transaction', transactionSchema);
