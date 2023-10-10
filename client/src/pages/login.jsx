import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(ev) {
    ev.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-blue-900">
            <span className="text-blue-400">Recipe</span>Rise
          </h1>
          <h1 className="text-xl text-gray-600">Login</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-xl font-medium text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="block text-xl font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-gray-700 text-center">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
