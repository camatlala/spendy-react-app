import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import assets from '../assets/assets';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setValues(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post(
        'https://spendy-baot.onrender.com/api/auth/signup',
        values
        );

        if (response.data.success) {
        navigate('/login');
        } else {
        setError(response.data.message || 'Signup failed');
        }
    } catch (err) {
        setError('Something went wrong. Please try again.');
        console.error(err);
    }
    };

    return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <img
                src={assets.Spendy} 
                alt="Spendy" 
                className="mx-auto h-20" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign up for your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign in
            </Link>
            </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
                </label>
                <input
                id="name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
                </label>
                <input
                id="email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                id="password"
                name="password"
                type="password"
                required
                value={values.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            </div>

            <button
            type="submit"
            className="w-full mt-6 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
            Sign Up
            </button>
        </form>
        </div>
    </div>
    );
};

export default SignUpForm;
