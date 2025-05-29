import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className={styles.searchBar} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
}

export default SearchBar;
