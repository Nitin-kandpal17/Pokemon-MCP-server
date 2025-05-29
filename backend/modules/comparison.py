from utils.pokemon_api import fetch_pokemon_data
from typing import Dict

def compare_pokemon(pokemon1: str, pokemon2: str) -> Dict:
    data1 = fetch_pokemon_data(pokemon1)
    data2 = fetch_pokemon_data(pokemon2)

    def extract_info(data):
        return {
            "id": data["id"],
            "name": data["name"],
            "types": [t["type"]["name"] for t in data["types"]],
            "stats": {s["stat"]["name"]: s["base_stat"] for s in data["stats"]},
            "sprite": data["sprites"]["front_default"]
        }

    return {
        "pokemon_1": extract_info(data1),
        "pokemon_2": extract_info(data2)
    }
