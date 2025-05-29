import styles from './ComparisonPanel.module.css';
import PokemonCard from './PokemonCard';

function ComparisonPanel({ pokemon1, pokemon2 }) {
  return (
    <div className={styles.panel}>
      <PokemonCard {...pokemon1} />
      <span className={styles.vs}>VS</span>
      <PokemonCard {...pokemon2} />
    </div>
  );
}

export default ComparisonPanel;
