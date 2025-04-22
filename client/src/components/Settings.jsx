import React, { useState, useEffect } from 'react';
import NavBar from './UI Elements/NavBar';
import axios from 'axios';

export default function Settings() {
    const [monthStartDay, setMonthStartDay] = useState('');
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

useEffect(() => {
    axios
        .get(`https://spendy-baot.onrender.com/api/user/${userId}`)
        .then((res) => {
        const storedDay = res.data.settings?.monthStartDay;
        if (storedDay) setMonthStartDay(storedDay);
    })
    .catch((err) => console.error('Error loading user settings:', err))
    .finally(() => setLoading(false));
}, [userId]);

const handleSave = async () => {
    try {
        await axios.put(`https://spendy-baot.onrender.com/api/user/${userId}/settings`, {
            monthStartDay: Number(monthStartDay),
        });
        showToast('✅ Settings saved successfully!');
    } catch (err) {
        console.error('❌ Failed to save settings:', err);
        showToast('❌ Failed to save settings.');
    }
};

const handleReset = async () => {
    try {
        await axios.put(`https://spendy-baot.onrender.com/api/user/${userId}/settings`, {
        monthStartDay: '',
    });
        setMonthStartDay('');
        showToast('Settings reset to default.');
    } catch (err) {
        console.error('Failed to reset settings:', err);
        showToast('Failed to reset settings.');
    }
};

const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
    };

    const calculateNextPayDate = () => {
    if (!monthStartDay) return null;

    const today = new Date();
    const currentDay = today.getDate();
    const baseDate = new Date(today.getFullYear(), today.getMonth(), Number(monthStartDay));

    if (currentDay < monthStartDay) {
        return baseDate.toDateString();
    } else {
      // next month
        return new Date(today.getFullYear(), today.getMonth() + 1, Number(monthStartDay)).toDateString();
    }
    };

return (
    <div className="bg-gray-900 min-h-screen text-white">
        <NavBar />
        <br />
    <div className="px-6 py-10 lg:px-20 relative">
        <h1 className="text-3xl font-semibold mb-10 text-white">
            Settings for {userName}
        </h1>

        {loading ? (
            <p className="text-gray-400">Loading settings...</p>
        ) : (
        <div className="grid gap-6 lg:grid-cols-2 auto-rows-min">
            <div className="bg-gray-800 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">🗓 Monthly Cycle Start</h2>

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

            {monthStartDay && (
                <p className="text-sm text-green-400 mt-2">
                📆 Next pay date: <strong>{calculateNextPayDate()}</strong>
                </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-medium"
                >
                    Save Settings
                </button>

                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium"
                >
                    Reset to Default
                </button>
                </div>
                </div>
            </div>
        )}

        {toastMessage && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 px-6 py-2 rounded-lg shadow-lg text-white z-50">
            {toastMessage}
            </div>
        )}
        </div>
    </div>
    );
}