const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  type: String, // 'income' or 'expense'
});

module.exports = mongoose.model('Category', categorySchema);