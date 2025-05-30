import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const getWelcomeMessage = async () => {
  const res = await axios.get(`${API_BASE}/`);
  return res.data.message;
};

export const getPokemonInfo = async (nameOrId) => {
  const res = await axios.get(`${API_BASE}/pokemon/${nameOrId}`);
  return res.data;
};

export const comparePokemon = async (pokemon1, pokemon2) => {
  const res = await axios.get(`${API_BASE}/compare`, {
    params: { pokemon1, pokemon2 },
  });
  return res.data.comparison;
};

export const buildTeam = async (description) => {
  const res = await axios.post(`${API_BASE}/team/build`, null, {
    params: { description },
  });
  return res.data.team;
};
