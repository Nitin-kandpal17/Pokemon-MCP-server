import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ComparePage from './pages/ComparePage';
import TeamBuilderPage from './pages/TeamBuilderPage';
import { getWelcomeMessage } from './services/api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const msg = await getWelcomeMessage();
        setMessage(msg);
      } catch (err) {
        setMessage('Failed to fetch welcome message.');
      }
    };

    fetchWelcome();
  }, []);

  return (
    <Router>
      <div className="p-6 text-white bg-black min-h-screen">
        <h1 className="text-5xl font-bold mb-4">Pokémon MCP Frontend</h1>
        <p className="mb-6 font-semibold">Backend Response: {message}</p>
        <nav className="flex space-x-6 mb-6">
          <Link to="/" className="text-blue-400 hover:underline">Search</Link>
          <Link to="/compare" className="text-blue-400 hover:underline">Compare</Link>
          <Link to="/team-builder" className="text-blue-400 hover:underline">Team Builder</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
