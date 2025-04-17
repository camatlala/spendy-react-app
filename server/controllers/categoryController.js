const Category = require('../models/Category');

exports.getCategoriesByType = async (req, res) => {
    try {
    const type = req.params.type;
    const categories = await Category.find({ type });
    res.json(categories);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
    }
};