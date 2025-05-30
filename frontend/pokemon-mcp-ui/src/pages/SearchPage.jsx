// src/pages/SearchPage.jsx
import { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/pokemon/${searchTerm.toLowerCase()}`);
      setPokemon(res.data);
      setError('');
    } catch (err) {
      setPokemon(null);
      setError('Pokémon not found!');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Pokémon</h2>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {pokemon && (
        <div className="mt-4">
          <PokemonCard
            name={pokemon.name}
            types={pokemon.types}
            image={pokemon.image}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
