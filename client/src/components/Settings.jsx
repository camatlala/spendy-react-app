import React, { useState, useEffect } from 'react';
import NavBar from './UI Elements/NavBar';
import axios from 'axios';

export default function Settings() {
    const [monthStartDay, setMonthStartDay] = useState('');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

  // 🟨 Load current settings (optional)
    useEffect(() => {
        axios.get(`https://spendy-baot.onrender.com/api/user/${userId}`)
        .then(res => {
            setMonthStartDay(res.data.settings?.monthStartDay || '');
        })
        .catch(err => console.error('Error loading user settings:', err));
    }, [userId]);

    const handleSave = async () => {
        try {
            await axios.put(`https://spendy-baot.onrender.com/api/user/${userId}/settings`, {
            monthStartDay
        });
        alert('Settings saved successfully!');
    } catch (err) {
        console.error('Failed to save settings:', err);
        alert('Failed to save settings.');
    }
};

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <NavBar />
        <div className="px-6 py-10 lg:px-20">
        <h1 className="text-3xl font-semibold mb-10 text-white">
            Settings for {userName}
        </h1>

        <div className="grid gap-6 lg:grid-cols-2 auto-rows-min">
          {/* 🔧 Month Start Setting */}
            <div className="bg-gray-800 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">Monthly Cycle Start</h2>
                <label htmlFor="monthStartDay" className="block mb-2">
                Choose the day of the month you get paid:
                </label>
            <select
                id="monthStartDay"
                className="w-full p-3 rounded bg-gray-900 text-white"
                value={monthStartDay}
                onChange={(e) => setMonthStartDay(Number(e.target.value))}
            >
                <option value="">Select day</option>
                {[...Array(28)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                    {i + 1}
                </option>
                ))}
            </select>
            <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
            >
                Save Settings
            </button>
            </div>
        </div>
    </div>
    </div>
    );
}