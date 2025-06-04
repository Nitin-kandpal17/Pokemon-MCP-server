import React, { useState } from "react";
import axios from "axios";

function ComparePage() {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [comparison, setComparison] = useState(null);

  const handleCompare = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/compare?pokemon1=${pokemon1}&pokemon2=${pokemon2}`
      );
      setComparison(res.data.comparison);
    } catch (error) {
      console.error("Error comparing Pokémon:", error);
    }
  };

  const getStatWinner = (stat) => {
    const stat1 = comparison.pokemon_1.stats[stat];
    const stat2 = comparison.pokemon_2.stats[stat];
    if (stat1 > stat2) return "pokemon_1";
    if (stat2 > stat1) return "pokemon_2";
    return "tie";
  };

  const getOverallWinner = () => {
    let score1 = 0, score2 = 0;
    for (const stat in comparison.pokemon_1.stats) {
      const winner = getStatWinner(stat);
      if (winner === "pokemon_1") score1++;
      if (winner === "pokemon_2") score2++;
    }
    if (score1 > score2) return comparison.pokemon_1.name;
    if (score2 > score1) return comparison.pokemon_2.name;
    return "It's a tie!";
  };

  const cardStyle = {
    background: "#f0f0f0",
    borderRadius: "10px",
    padding: "1rem",
    width: "300px",
    margin: "1rem",
    textAlign: "center",
    color: "#000",
  };

  const statRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.25rem 0",
  };

  const highlightStyle = {
    fontWeight: "bold",
    color: "green",
  };

  return (
    <div style={{ textAlign: "center", color: "white", padding: "2rem" }}>
      <h2>Compare Pokémon</h2>
      <input
        type="text"
        placeholder="e.g. Pikachu"
        value={pokemon1}
        onChange={(e) => setPokemon1(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem", borderRadius: "5px" }}
      />
      <input
        type="text"
        placeholder="e.g. Mewtwo"
        value={pokemon2}
        onChange={(e) => setPokemon2(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem", borderRadius: "5px" }}
      />
      <button
        onClick={handleCompare}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Compare
      </button>

      {comparison && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Comparison Result</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            {[comparison.pokemon_1, comparison.pokemon_2].map((pokemon, idx) => (
              <div key={idx} style={cardStyle}>
                <h4>{pokemon.name} (#{pokemon.id})</h4>
                <img src={pokemon.sprite} alt={pokemon.name} />
                <p>Types: {pokemon.types.join(", ")}</p>
                <div>
                  {Object.entries(pokemon.stats).map(([stat, value]) => {
                    const winner = getStatWinner(stat);
                    const isWinner =
                      winner === (idx === 0 ? "pokemon_1" : "pokemon_2");
                    return (
                      <div key={stat} style={statRowStyle}>
                        <span>{stat.replace("-", " ")}</span>
                        <span style={isWinner ? highlightStyle : {}}>{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: "1rem" }}>
            🏆 Overall Winner:{" "}
            <span style={{ color: "#FFD700" }}>{getOverallWinner()}</span>
          </h3>
        </div>
      )}
    </div>
  );
}

export default ComparePage;
