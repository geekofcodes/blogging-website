import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchPosts } from './service/Service';
import Routes from './pages/routes/route';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
