import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import ComparisonPanel from './components/ComparisonPanel';

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
      .then(res => {
        setMessage(res.data.message || 'Success!');
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pokémon MCP Frontend</h1>
      <p>Backend Response: <strong>{message}</strong></p>

      <hr />

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
        rightPokemon={{ ...mockPokemon, name: 'Charizard', types: ['Fire', 'Flying'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' }}
      />
    </div>
  );
}

export default App;
