import requests
import json
import os

# Create the data directory if it doesn't exist
os.makedirs("data", exist_ok=True)

all_pokemon = []
for i in range(1, 152):  # Gen 1 Pokémon
    try:
        response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{i}", timeout=10)
        response.raise_for_status()
        data = response.json()
        all_pokemon.append(data["name"].lower())
        print(f"Fetched: {data['name'].lower()}")
    except Exception as e:
        print(f"Failed to fetch Pokémon {i}: {e}")

# Save to JSON file
with open("data/pokemon_names.json", "w") as f:
    json.dump(all_pokemon, f, indent=2)

print("\n✅ Saved all Pokémon names to: data/pokemon_names.json")
