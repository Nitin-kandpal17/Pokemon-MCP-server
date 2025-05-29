import requests
from config import POKEAPI_BASE_URL
from typing import List, Dict

def get_type_effectiveness(type_name: str) -> Dict:
    url = f"{POKEAPI_BASE_URL}type/{type_name.lower()}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Type '{type_name}' not found")

    data = response.json()
    return {
        "double_damage_from": [t["name"] for t in data["damage_relations"]["double_damage_from"]],
        "double_damage_to": [t["name"] for t in data["damage_relations"]["double_damage_to"]],
        "half_damage_from": [t["name"] for t in data["damage_relations"]["half_damage_from"]],
        "half_damage_to": [t["name"] for t in data["damage_relations"]["half_damage_to"]],
        "no_damage_from": [t["name"] for t in data["damage_relations"]["no_damage_from"]],
        "no_damage_to": [t["name"] for t in data["damage_relations"]["no_damage_to"]],
    }

def get_counters(type_name: str) -> List[str]:
    effectiveness = get_type_effectiveness(type_name)
    return effectiveness["double_damage_from"]
