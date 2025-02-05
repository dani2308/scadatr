import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;