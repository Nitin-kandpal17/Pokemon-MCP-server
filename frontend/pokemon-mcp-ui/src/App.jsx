import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import ComparisonPanel from './components/ComparisonPanel';

import SearchPage from './pages/SearchPage';
import ComparePage from './pages/ComparePage';
import TeamBuilderPage from './pages/TeamBuilderPage';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [search, setSearch] = useState('');
  const [mockPokemon] = useState({
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['Electric']
  });

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then((res) => {
        setMessage(res.data.message || 'Success!');
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>Pokémon MCP Frontend</h1>
        <p>Backend Response: <strong>{message}</strong></p>

        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/search" style={{ marginRight: '1rem' }}>Search</Link>
          <Link to="/compare" style={{ marginRight: '1rem' }}>Compare</Link>
          <Link to="/team-builder">Team Builder</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h2>Mock UI Components</h2>

              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={() => alert(`Search for: ${search}`)}
              />

              <br />

              <PokemonCard {...mockPokemon} />

              <br />

              <ComparisonPanel
                leftPokemon={mockPokemon}
                rightPokemon={{
                  ...mockPokemon,
                  name: 'Charizard',
                  types: ['Fire', 'Flying'],
                  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
                }}
              />
            </>
          } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
