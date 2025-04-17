import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: String,
  type: String, // 'income' or 'expense'
});

export default mongoose.model('Category', categorySchema);