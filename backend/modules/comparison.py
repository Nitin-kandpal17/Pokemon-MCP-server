import requests
from typing import Dict
from fastapi import HTTPException

def fetch_pokemon_full_data(name_or_id: str) -> Dict:
    url = f"https://pokeapi.co/api/v2/pokemon/{name_or_id.lower()}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail=f"Pokémon '{name_or_id}' not found.")
    return response.json()

def compare_pokemon(pokemon1: str, pokemon2: str) -> Dict:
    data1 = fetch_pokemon_full_data(pokemon1)
    data2 = fetch_pokemon_full_data(pokemon2)

    def extract_info(data):
        try:
            return {
                "id": data["id"],
                "name": data["name"],
                "types": [t["type"]["name"] for t in data["types"]],
                "stats": {
                    s["stat"]["name"]: s["base_stat"] for s in data["stats"]
                },
                "sprite": data["sprites"]["front_default"]
            }
        except KeyError as e:
            return {"error": f"Missing key in data: {e}"}

    return {
        "pokemon_1": extract_info(data1),
        "pokemon_2": extract_info(data2)
    }
