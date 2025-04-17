import Transaction from '../models/Transaction';

export async function addTransaction(req, res) {
    try {
    const { userId, categoryId, type, amount, description, date } = req.body;

    await Transaction.create({
        user_id: userId,
        category_id: categoryId,
        type,
        amount,
        description,
        date,
    });

    res.json({ status: 'Success' });
    } catch (error) {
    res.status(500).json({ status: 'Error', error });
    }
}

export async function getTransactionsByUser(req, res) {
    try {
    const userId = req.params.userId;

    const transactions = await Transaction.find({ user_id: userId }).populate('category_id');

    res.json(transactions);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}

export async function updateTransaction(req, res) {
    try {
    const id = req.params.id;

    await Transaction.findByIdAndUpdate(id, req.body);

    res.json({ status: 'Success' });
    } catch (error) {
    res.status(500).json({ status: 'Error', error });
    }
}
