from typing import List, Dict
from utils.pokemon_api import fetch_pokemon_data
import requests
from config import POKEAPI_BASE_URL

def get_pokemon_basic_info(name_or_id: str) -> Dict:
    raw_data = fetch_pokemon_data(name_or_id)

    return {
        "id": raw_data["id"],
        "name": raw_data["name"],
        "height": raw_data["height"],
        "weight": raw_data["weight"],
        "types": [t["type"]["name"] for t in raw_data["types"]],
        "stats": {stat["stat"]["name"]: stat["base_stat"] for stat in raw_data["stats"]},
        "sprites": raw_data["sprites"]["front_default"]
    }

def search_pokemon_by_type(type_name: str) -> List[str]:
    url = f"{POKEAPI_BASE_URL}type/{type_name.lower()}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Type '{type_name}' not found")

    data = response.json()
    return [entry["pokemon"]["name"] for entry in data["pokemon"]]

def search_pokemon_by_generation(generation_name: str) -> List[str]:
    url = f"{POKEAPI_BASE_URL}generation/{generation_name.lower()}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Generation '{generation_name}' not found")

    data = response.json()
    return [entry["name"] for entry in data["pokemon_species"]]
