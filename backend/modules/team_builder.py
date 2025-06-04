import nltk
from nltk.tokenize import word_tokenize
from pydantic import BaseModel
import random

# Ensure NLTK tokenizer is ready
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# All types mapped to sample Pokémon
POKEMON_TYPES = {
    "normal": ["snorlax", "blissey"],
    "fire": ["charizard", "arcanine"],
    "water": ["blastoise", "gyarados"],
    "electric": ["pikachu", "electivire"],
    "grass": ["venusaur", "leafeon"],
    "ice": ["glaceon", "weavile"],
    "fighting": ["machamp", "lucario"],
    "poison": ["muk", "nidoking"],
    "ground": ["garchomp", "excadrill"],
    "flying": ["pidgeot", "togekiss"],
    "psychic": ["alakazam", "espeon"],
    "bug": ["scizor", "heracross"],
    "rock": ["aerodactyl", "rhyperior"],
    "ghost": ["gengar", "mimikyu"],
    "dragon": ["dragonite", "salamence"],
    "dark": ["umbreon", "tyranitar"],
    "steel": ["metagross", "magnezone"],
    "fairy": ["clefable", "sylveon"],
}

class TeamBuildRequest(BaseModel):
    description: str

def build_team_from_description(description: str) -> list[str]:
    tokens = word_tokenize(description.lower())
    team_names = []

    # Step 1: Match types in description
    for token in tokens:
        if token in POKEMON_TYPES:
            team_names.extend(POKEMON_TYPES[token])

    # Step 2: Deduplicate
    team_names = list(dict.fromkeys(team_names))

    # Step 3: Fallback if no matches
    if not team_names:
        team_names.append("pikachu")

    # Step 4: Fill up to 6 with random unique Pokémon from all types
    all_pokemon = set(p for pokes in POKEMON_TYPES.values() for p in pokes)
    while len(team_names) < 6:
        candidate = random.choice(list(all_pokemon))
        if candidate not in team_names:
            team_names.append(candidate)

    # Step 5: Return exactly 6 Pokémon
    return team_names[:6]
