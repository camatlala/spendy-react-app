import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: String,
  type: String
});

export default mongoose.model("Category", CategorySchema);
