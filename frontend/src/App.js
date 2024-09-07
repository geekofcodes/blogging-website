import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/route';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
