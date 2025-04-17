export async function addTransaction(req, res) {
    try {
        const { userId, categoryId, type, amount, description, date } = req.body;
        
        await Transaction.create({
        user_id: String(userId),              // Ensure it's stored as a string
        category_id: String(categoryId),      // Ensure it's stored as a string
        type,
        amount: parseFloat(amount),           // Ensure stored as a number
        description,
        date,
        });
        
        res.json({ status: 'Success' });
    } catch (error) {
        console.error("❌ Error adding transaction:", error);
        res.status(500).json({ status: 'Error', error });
    }
}  