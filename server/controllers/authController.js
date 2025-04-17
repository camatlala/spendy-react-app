const User = require("../models/user");

exports.signup = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ name, email, password });
    res.json({ status: "Success", user: newUser });
    } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) return res.json({ status: "Failed", message: "Invalid credentials" });

    res.json({
        status: "Success",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
    } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
    }
};
