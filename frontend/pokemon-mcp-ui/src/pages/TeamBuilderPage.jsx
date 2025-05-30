import { useState } from 'react';
import axios from 'axios';

const TeamBuilderPage = () => {
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState([]);
  const [error, setError] = useState('');

  const handleBuildTeam = async () => {
    try {
      const res = await axios.post('http://localhost:8000/team-builder', {
        description
      });
      setTeam(res.data.team);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to build team. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Builder</h1>

      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the type of team you want..."
      />

      <button
        onClick={handleBuildTeam}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Build Team
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {team.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Suggested Team</h2>
          <ul className="list-disc list-inside">
            {team.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamBuilderPage;
