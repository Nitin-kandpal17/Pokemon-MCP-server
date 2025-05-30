import axios from 'axios';
import { useState } from 'react';

const ComparePage = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    try {
      const res = await axios.get('http://localhost:8000/compare', {
        params: {
          pokemon1,
          pokemon2
        }
      });
      setResult(res.data.comparison);
      setError('');
    } catch (err) {
      setError('Comparison failed. Make sure Pokémon names are valid.');
      setResult(null);
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
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Second Pokémon"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleCompare}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Comparison Result:</h3>
          <p><strong>{result.name_1}</strong> vs <strong>{result.name_2}</strong></p>
          <p>{result.result}</p>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
