const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category').default;

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const categories = [
    { name: 'Salary & Wages', type: 'income' },
    { name: 'Freelance & Side Hustle Income', type: 'income' },
    { name: 'Business Income', type: 'income' },
    { name: 'Rental Income', type: 'income' },
    { name: 'Investment Income', type: 'income' },
    { name: 'Government Benefits', type: 'income' },
    { name: 'Child Support & Alimony', type: 'income' },
    { name: 'Gifts & Inheritance', type: 'income' },
    { name: 'Bonuses & Commissions', type: 'income' },
    { name: 'Refunds & Rebates', type: 'income' },
    { name: 'Other Income', type: 'income' },

    { name: 'Housing & Rent', type: 'expense' },
    { name: 'Utilities', type: 'expense' },
    { name: 'Groceries', type: 'expense' },
    { name: 'Transportation', type: 'expense' },
    { name: 'Insurance', type: 'expense' },
    { name: 'Debt Repayments', type: 'expense' },
    { name: 'Childcare & Education', type: 'expense' },
    { name: 'Dining Out & Takeaways', type: 'expense' },
    { name: 'Entertainment & Subscriptions', type: 'expense' },
    { name: 'Shopping & Clothing', type: 'expense' },
    { name: 'Fitness & Wellness', type: 'expense' },
    { name: 'Travel & Holidays', type: 'expense' },
    { name: 'Gifts & Donations', type: 'expense' },
    { name: 'Bank Fees & Charges', type: 'expense' },
    { name: 'Taxes', type: 'expense' },
    { name: 'Medical & Healthcare', type: 'expense' },
    { name: 'Home Maintenance & Repairs', type: 'expense' }
];

mongoose.connect(MONGO_URI)
    .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Category.deleteMany(); // Clear previous data
    await Category.insertMany(categories);
    console.log('🌱 Categories seeded successfully');
    mongoose.disconnect();
    })
    .catch((err) => {
    console.error('❌ Error seeding categories:', err);
    });
