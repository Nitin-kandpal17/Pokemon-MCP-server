import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ComparePage from './pages/ComparePage';
import TeamBuilderPage from './pages/TeamBuilderPage';
import './App.css';
import { getWelcomeMessage } from './services/api';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getWelcomeMessage().then((res) => setMessage(res.message));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
        <h1 className="text-5xl font-extrabold mb-2">Pokémon MCP Frontend</h1>
        <p className="mb-4 text-lg">Backend Response: {message}</p>

        <nav className="mb-8 flex justify-center gap-6 text-lg font-semibold">
          <Link to="/" className="hover:text-yellow-300">Search</Link>
          <Link to="/compare" className="hover:text-yellow-300">Compare</Link>
          <Link to="/team-builder" className="hover:text-yellow-300">Team Builder</Link>
        </nav>


        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
