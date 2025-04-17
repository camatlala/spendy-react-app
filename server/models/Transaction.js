import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    category_id: {
    type: Schema.Types.ObjectId,
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

export default model('Transaction', transactionSchema);
