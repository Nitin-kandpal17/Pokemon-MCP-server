import React, { useState } from 'react';
import { buildTeam } from '../services/api';

function TeamBuilderPage() {
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState(null);
  const [error, setError] = useState('');

  const handleBuild = async () => {
    setTeam(null);
    setError(null);

    if (!description.trim()) {
      setError('Please provide a description for the team.');
      return;
    }

    try {
      const data = await buildTeam(description); // backend returns a list
      setTeam(data); // use list directly
    } catch (err) {
      setError('Failed to build team. Please try again.');
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-4">Team Builder</h3>

      <div className="flex flex-col gap-4 mb-5">
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
          {team.map((name, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded shadow text-center"
            >
              <h3 className="text-xl font-bold text-white">{name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamBuilderPage;
