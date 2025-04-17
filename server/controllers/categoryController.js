import Category from '../models/Category';

export async function getCategoriesByType(req, res) {
    try {
    const type = req.params.type;
    const categories = await Category.find({ type });
    res.json(categories);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
    }
}