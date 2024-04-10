import React, { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../components/AuthContext'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const { login, isLoggedIn, username: loggedInUsername, logout } = useAuth(); 

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.text(); 
      console.log(data);
      login(username); 
      setMessage('Login successful');
      window.location.href = '/';
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setMessage('Incorrect username or password.');
    }
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
          {isLoggedIn ? (
            <>
                <span className="a5-cta"> Welcome, {username}!</span>
                <button onClick={logout} className="header-nav-item">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="header-nav-item">Login</Link>
              <Link href="/register" className="a5-cta">Register</Link>
            </>
          )}
        </div>
      </header>
      {!isLoggedIn && (
        <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded">
          <div className="mb-4">
            <label htmlFor="login-username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="login-username"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={handleLogin}
            className="logregbtn">
            Login
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      )}
    </>
  );
}

export default Login;
