import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { register } from '../../service/Service';

const SignUpPage = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    register(userData)
      .then(() => {
        // Redirect to login page after successful registration
        history.push('/login');
      })
      .catch(error => console.error('Error handling sign up:', error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label className="block mb-2 font-bold" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
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
          value={userData.password}
          onChange={handleInputChange}
          className="w-full border p-2 mb-4"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
