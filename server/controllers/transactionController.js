import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { userId, categoryId, type, amount, description, date } = req.body;
    await Transaction.create({
      user_id: String(userId),
      category_id: String(categoryId),
      type,
      amount: parseFloat(amount),
      description,
      date
    });
    res.json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ status: "Error", error });
  }
};

export const getTransactionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ user_id: userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await Transaction.findByIdAndUpdate(id, req.body);
    res.json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ status: "Error", error });
  }
};
