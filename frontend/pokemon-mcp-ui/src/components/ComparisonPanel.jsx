import React from 'react';
import PokemonCard from './PokemonCard';

function ComparisonPanel({ leftPokemon, rightPokemon }) {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <PokemonCard {...leftPokemon} />
      <PokemonCard {...rightPokemon} />
    </div>
  );
}

export default ComparisonPanel;
