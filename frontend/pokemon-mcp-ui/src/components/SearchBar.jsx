import React from 'react';

function SearchBar({ value, onChange, onSearch }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Search Pokémon..."
        onChange={onChange}
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
