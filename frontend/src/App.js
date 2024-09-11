import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRoutes from './routes/route';
import AuthRoutes from './routes/authRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes*/}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Main App routes */}
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
