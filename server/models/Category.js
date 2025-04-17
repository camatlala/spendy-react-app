import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
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

export default model('Category', categorySchema);
