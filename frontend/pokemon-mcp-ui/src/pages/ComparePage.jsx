import React, { useState } from 'react';
import { comparePokemon } from '../services/api';

function ComparePage() {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    setError('');
    setResult(null);
    if (!pokemon1 || !pokemon2) {
      setError('Please enter both Pokémon names.');
      return;
    }

    try {
      const data = await comparePokemon(pokemon1, pokemon2);
      setResult(data.comparison);
    } catch (err) {
      setError('Failed to compare Pokémon. Make sure both names are correct.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Compare Pokémon</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="First Pokémon"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <input
          type="text"
          placeholder="Second Pokémon"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <button
          onClick={handleCompare}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
        >
          Compare
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}
      {result && (
        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Comparison Result</h3>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default ComparePage;
