import styles from './PokemonCard.module.css';

function PokemonCard({ name, type, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>Type: {type}</p>
    </div>
  );
}

export default PokemonCard;
