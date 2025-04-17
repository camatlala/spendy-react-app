import { find } from '../models/Category';

export async function getCategoriesByType(req, res) {
    try {
    const type = req.params.type;
    const categories = await find({ type });
    res.json(categories);
    } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
    }
}