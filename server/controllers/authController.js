const User = require('../models/User');

exports.register = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const user = await User.create({ name, email, password });

    res.json({ status: 'Success', user });
    } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ status: 'Failed', error: 'Invalid credentials' });

    res.json({
        status: 'Success',
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        },
    });
    } catch (error) {
    res.status(500).json({ status: 'Error', error });
    }
};