TYPE_EFFECTIVENESS = {
    "fire": {
        "weak_against": ["water", "rock", "ground"],
        "strong_against": ["grass", "ice", "bug", "steel"]
    },
    "water": {
        "weak_against": ["electric", "grass"],
        "strong_against": ["fire", "ground", "rock"]
    },
    "grass": {
        "weak_against": ["fire", "ice", "poison", "flying", "bug"],
        "strong_against": ["water", "ground", "rock"]
    },
    "electric": {
        "weak_against": ["ground"],
        "strong_against": ["water", "flying"]
    },
    # Extend this for all 18 types...
}

def get_all_types():
    return TYPE_EFFECTIVENESS
