import User from '../models/User.js';

export const updateUserSettings = async (req, res) => {
    try {
        const userId = req.params.id;
        const { monthStartDay } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 'settings.monthStartDay': monthStartDay },
            { new: true, upsert: false }
        );

    res.json({ success: true, user: updatedUser });
        } catch (err) {
            console.error('Error updating user settings:', err);
            res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
};
