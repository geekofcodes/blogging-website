import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/authentication/login';
import SignUpPage from '../pages/authentication/signup';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
    </Routes>
  );
};

export default AuthRoutes;
