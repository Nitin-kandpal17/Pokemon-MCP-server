from typing import List, Dict
from utils.pokemon_api import fetch_pokemon_data
from config import POKEAPI_BASE_URL
import requests

def get_pokemon_data(name_or_id):
    response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{name_or_id}")
    if response.status_code == 200:
        return response.json() 
    return None



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
