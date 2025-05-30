import React, { useState } from 'react';
import { buildTeam } from '../services/api';

function TeamBuilderPage() {
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState(null);
  const [error, setError] = useState('');

  const handleBuild = async () => {
    setError('');
    setTeam(null);
    if (!description.trim()) {
      setError('Please provide a description for the team.');
      return;
    }

    try {
      const data = await buildTeam(description);
      setTeam(data.team);
    } catch (err) {
      setError('Failed to build team. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Team Builder</h2>

      <div className="flex flex-col gap-4 mb-6">
        <textarea
          placeholder="Describe your strategy or team needs..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded text-black min-h-[100px]"
        />
        <button
          onClick={handleBuild}
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Build Team
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}
      {team && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {team.map((pokemon, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded shadow text-center"
            >
              <h3 className="text-xl font-bold mb-2">{pokemon.name}</h3>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto mb-2"
              />
              <p>{pokemon.types.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamBuilderPage;
