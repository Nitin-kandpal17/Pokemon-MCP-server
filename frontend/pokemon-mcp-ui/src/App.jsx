import { useEffect, useState } from 'react';
import axios from 'axios';

// Import mock components
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import ComparisonPanel from './components/ComparisonPanel';

function App() {
  const [message, setMessage] = useState('Loading...');

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

  // Mock Pokémon data
  const mockPokemon = {
    name: 'Pikachu',
    type: ['Electric'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pokémon MCP Frontend</h1>
      <p>Backend Response: <strong>{message}</strong></p>

      {/* Mock usage for testing */}
      <h2>Mock UI Preview</h2>
      <SearchBar />
      <PokemonCard pokemon={mockPokemon} />
      <ComparisonPanel leftPokemon={mockPokemon} rightPokemon={mockPokemon} />
    </div>
  );
}

export default App;
