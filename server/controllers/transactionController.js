import Transaction from "../models/Transaction.js";
import User from '../models/User.js';

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

export async function getTransactionsByMonth(req, res) {
    try {
        const { userId, monthIndex } = req.query;

        const user = await User.findById(userId);
        if (!user || !user.monthStartDay) {
        return res.status(400).json({ error: 'User or month start not found' });
        }
    
        const today = new Date();
        const targetMonth = new Date(today.getFullYear(), today.getMonth() - monthIndex);
        const startDay = user.monthStartDay;

        const start = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), startDay);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1);

        const transactions = await Transaction.find({
        user_id: userId,
        date: {
            $gte: start.toISOString().split('T')[0],
            $lt: end.toISOString().split('T')[0],
        },
    });

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching monthly transactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

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
