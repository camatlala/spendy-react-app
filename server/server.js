const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT;

const cors = require('cors');
app.use(cors({
  origin: 'https://spendy-react.netlify.app', // or use "*" during dev
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use('/api/categories', categoryRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    });
});
