import Category from "../models/Category.js";

export const getCategoriesByType = async (req, res) => {
    try {
    const { type } = req.params;
    const categories = await Category.find({ type });
    res.json(categories);
    } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
    }
};
