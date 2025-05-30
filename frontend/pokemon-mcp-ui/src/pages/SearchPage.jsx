import React, { useState } from 'react';
import { getPokemon } from '../services/api';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setPokemon(null);
    if (!query.trim()) {
      setError('Please enter a Pokémon name or ID.');
      return;
    }

    try {
      const data = await getPokemon(query.toLowerCase());
      setPokemon(data);
    } catch (err) {
      setError('Pokémon not found. Please try another name or ID.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Search Pokémon</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="e.g. Pikachu or 25"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}
      {pokemon && (
        <div className="bg-gray-800 p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">{pokemon.name}</h3>
          <img src={pokemon.image} alt={pokemon.name} className="mx-auto mb-2" />
          <p className="mb-1"><strong>Types:</strong> {pokemon.types.join(', ')}</p>
          <p><strong>Stats:</strong></p>
          <ul className="list-disc list-inside">
            {Object.entries(pokemon.stats).map(([stat, value]) => (
              <li key={stat}>{stat}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
