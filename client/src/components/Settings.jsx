import React, { useState } from 'react';
import axios from 'axios';

function Settings() {
    const userId = localStorage.getItem('userId');
    const [monthStartDay, setMonthStartDay] = useState(1);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://spendy-baot.onrender.com/api/auth/update-settings', {
        userId,
        monthStartDay,
    });
        setSuccess('Settings saved!');
    }   catch (err) {
        console.error(err);
    }};

    return (
    <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Cycle Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
            Choose your payday (month start):
        <select
            className="block mt-1 p-2 rounded bg-gray-100"
            value={monthStartDay}
            onChange={(e) => setMonthStartDay(Number(e.target.value))}
        >
            {[...Array(28)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
                {i + 1}
            </option>
            ))}
        </select>
        </label>
        <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
            Save
        </button>
        {success && <p className="text-green-500">{success}</p>}
        </form>
    </div>
    );
}

export default Settings;
