import React, { useState } from 'react';
import { comparePokemon } from '../services/api';

const ComparePage = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    try {
      const data = await comparePokemon(pokemon1, pokemon2);
      setResult(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to compare Pokémon. Make sure the names/IDs are valid.');
    }
  };

  const statKeys = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Compare Pokémon</h2>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
        <input
          type="text"
          placeholder="First Pokémon"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Second Pokémon"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleCompare}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Compare
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && (
        <div className="grid grid-cols-3 gap-6 items-start text-center">
          {/* Pokémon 1 */}
          <div>
            <h3 className="text-xl font-bold capitalize">{result.pokemon_1.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.pokemon_1.id}.png`}
              alt={result.pokemon_1.name}
              className="mx-auto my-2"
            />
            <p className="font-semibold">Type(s):</p>
            <p>{result.pokemon_1.types.join(', ')}</p>
            <div className="mt-4 space-y-1">
              {statKeys.map((key) => (
                <div key={key}>{result.pokemon_1.stats[key]}</div>
              ))}
            </div>
          </div>

          {/* Stat Labels */}
          <div>
            <div className="h-[70px]"></div>
            <p className="font-semibold mb-2">Stats</p>
            <div className="mt-4 space-y-1 font-semibold capitalize">
              {statKeys.map((key) => (
                <div key={key}>{key.replace('-', ' ')}</div>
              ))}
            </div>
          </div>

          {/* Pokémon 2 */}
          <div>
            <h3 className="text-xl font-bold capitalize">{result.pokemon_2.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.pokemon_2.id}.png`}
              alt={result.pokemon_2.name}
              className="mx-auto my-2"
            />
            <p className="font-semibold">Type(s):</p>
            <p>{result.pokemon_2.types.join(', ')}</p>
            <div className="mt-4 space-y-1">
              {statKeys.map((key) => (
                <div key={key}>{result.pokemon_2.stats[key]}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
