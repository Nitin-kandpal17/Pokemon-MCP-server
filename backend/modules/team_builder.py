import nltk
from nltk.tokenize import word_tokenize
from pydantic import BaseModel

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

def build_team_from_description(description: str):
    tokens = word_tokenize(description.lower())
    team_names = []

    for token in tokens:
        if token in POKEMON_TYPES:
            team_names.extend(POKEMON_TYPES[token])

    team_names = list(dict.fromkeys(team_names))[:6]  # Deduplicate, limit to 6

    if not team_names:
        team_names.append("pikachu")  # fallback

    # Convert names to full Pokémon data
    team = [
        {
            "name": name,
            "img": POKEMON_DATA[name]["img"],
            "types": POKEMON_DATA[name]["types"]
        }
        for name in team_names
        if name in POKEMON_DATA
    ]

    return team
