import nltk
from nltk.tokenize import word_tokenize
from utils.pokemon_api import fetch_pokemon_data

def extract_pokemon_names(query: str, known_pokemon: list) -> list:
    tokens = word_tokenize(query.lower())
    return [token for token in tokens if token in known_pokemon]

def build_team(pokemon_names: list) -> list:
    team = []
    for name in pokemon_names:
        try:
            data = fetch_pokemon_data(name)
            team.append({
                "name": name,
                "types": data["types"],
                "stats": data["stats"]
            })
        except Exception:
            continue
    return team
