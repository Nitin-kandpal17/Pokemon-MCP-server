import nltk
from nltk.tokenize import word_tokenize

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

def build_team_from_description(description: str):
    tokens = word_tokenize(description.lower())
    team = []

    if "tank" in tokens:
        team.append("snorlax")
    if "fire" in tokens:
        team.append("charizard")
    if "attacker" in tokens and "fire" not in tokens:
        team.append("machamp")
    if "psychic" in tokens:
        team.append("alakazam")

    if not team:
        team.append("pikachu")  # default fallback

    return team
