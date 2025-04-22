import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    monthStartDay: {
        type: Number,
        default: 1  // Default to the 1st of the month if the user hasn't set it
    }
});

export default mongoose.model('User', userSchema);
