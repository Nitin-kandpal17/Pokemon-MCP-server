import React from 'react';

function PokemonCard({ name, image, types }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      textAlign: 'center',
      width: '150px'
    }}>
      <img src={image} alt={name} style={{ width: '100px' }} />
      <h3>{name}</h3>
      <p>{types.join(', ')}</p>
    </div>
  );
}

export default PokemonCard;
