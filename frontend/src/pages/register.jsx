import React, { useState } from 'react';
import { Link } from 'wouter'; 

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (!username || !password) {
      setMessage('Username and password are required');
      return;
    }

    fetch('http://3.21.171.71:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data);
        setMessage(
          <p>
            <a href="/login">Registration successful, click me to go to login</a>.
          </p>
        );
        if (typeof onRegister === 'function') {
          onRegister(true);
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          console.error('Error during registration:', error);
          setMessage('Error during registration. Please try again.');
        } else {
          console.error('HTTP error during registration:', error);
          setMessage('Server error. Please try again later.');
        }
      });
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 w-full">
        <Link href="/" className="flex items-center">
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/image-removebg-preview%20(1).png?v=1712523257157" alt="Small Logo" className="h-14 w-14 mr-2" />
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/logo.jpg?v=1712521889673" alt="Main Logo" className="h-12 w-auto" />
        </Link>
        <div className="flex-grow text-center">
                    <Link href="/shop" className="header-nav-item">Shop</Link>
                    <Link href="/mypets" className="header-nav-item">My Pets</Link>
                </div>
        <div className="links flex gap-4">
        <Link href="/login" className="header-nav-item">Login</Link>
        <Link href="/register" className="a5-cta">Register</Link>
        </div>
      </header>
      <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <button
          onClick={handleRegister}
          style={{ backgroundColor: '#fd4d50', hoverBackgroundColor: '#ff6b6e' }}
          className="logregbtn"
        >
          Register
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </>
  );
}

export default Register;
