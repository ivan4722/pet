import React, { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Added for feedback

  const handleRegister = () => {
    // Simple validation
    if (!username || !password) {
      setMessage('Username and password are required');
      return;
    }

    fetch('http://104.162.234.229:3000/register', { // Use your backend's actual IP address and port
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
      console.log(data); // Log or handle the response from the server
      setMessage('Registration successful');
      onRegister(true); // Assuming you want to do something on successful registration
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      setMessage('Registration failed');
    });
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} 
               className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} 
               className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
      </div>
      <button onClick={handleRegister} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Register
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>} {/* Display feedback */}
    </div>
  );
}

export default Register;
