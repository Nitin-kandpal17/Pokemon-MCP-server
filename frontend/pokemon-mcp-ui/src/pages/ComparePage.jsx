import React, { useState } from 'react';
import { comparePokemon } from '../services/api';

const ComparePage = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCompare = async () => {
    try {
      const data = await comparePokemon(pokemon1, pokemon2);
      setResult(data);
      setError('');
    } catch {
      setError('Comparison failed. Make sure Pokémon names are valid.');
      setResult('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Compare Pokémon</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="First Pokémon"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Second Pokémon"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleCompare}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Compare
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Comparison Result:</h3>
          <pre className="bg-gray-800 p-4 rounded whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
