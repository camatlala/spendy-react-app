import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user_id: String,
  category_id: String,
  type: String,
  amount: Number,
  description: String,
  date: String
});

export default mongoose.model("Transaction", TransactionSchema);