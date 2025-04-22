import User from "../models/User.js";

export const register = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });
    const user = await User.create({ name, email, password });
    res.json({ status: "Success", user });
    } catch (error) {
    res.status(500).json({ error: "Registration failed" });
    }
};

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ status: "Failed", error: "Invalid credentials" });
    res.json({
        status: "Success",
        user: {
        id: user._id,
        name: user.name,
        email: user.email
        }
    });
    } catch (error) {
    res.status(500).json({ status: "Error", error });
}
};

export async function updateUserSettings(req, res) {
    try {
        const { userId, monthStartDay } = req.body;
            if (!userId || !monthStartDay) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
            }
        await User.findByIdAndUpdate(userId, { monthStartDay });
        res.json({ success: true, message: 'Settings updated' });
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}