import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/Service';

const LoginPage = ({ setAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login(credentials)
      .then(() => {
        setAuthenticated(true);
        navigate('/'); // Redirect to the homepage after login
      })
      .catch(error => console.error('Error handling login:', error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <label className="block mb-2 font-bold" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="w-full border p-2 mb-4"
          required
        />

        <label className="block mb-2 font-bold" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full border p-2 mb-4"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
