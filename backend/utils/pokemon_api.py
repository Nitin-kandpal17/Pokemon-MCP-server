import requests
from cachetools import TTLCache
from config import POKEAPI_BASE_URL


# In-memory cache: max size 1000 items, 1-hour TTL
cache = TTLCache(maxsize=1000, ttl=3600)

def fetch_pokemon_data(name_or_id: str) -> dict:
    name_or_id = name_or_id.lower()

    if name_or_id in cache:
        return cache[name_or_id]

    url = f"{POKEAPI_BASE_URL}pokemon/{name_or_id}"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        cache[name_or_id] = data
        return data
    except requests.exceptions.HTTPError as e:
        if response.status_code == 404:
            raise ValueError(f"Pokémon '{name_or_id}' not found.")
        else:
            raise RuntimeError(f"PokeAPI HTTP error: {e}")
    except requests.exceptions.Timeout:
        raise RuntimeError("PokeAPI request timed out.")
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"PokeAPI request failed: {e}")
