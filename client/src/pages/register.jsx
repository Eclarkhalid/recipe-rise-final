import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(ev) {
    ev.preventDefault();
    const response = await fetch('https://recipe-rise-final-api-full.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      alert('Registration successful. Proceed to login to access the application.');
      window.location.href = '/login';
    } else {
      alert('Registration failed.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 max-sm:px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-blue-900 my-3">
            <span className="text-blue-400">Recipe</span>Rise
          </h1>
          <h1 className="text-xl text-gray-600">Register</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={handleRegister}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-xl font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-400 hover:bg-blue-500 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-gray-700 text-center">
          <p>Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
