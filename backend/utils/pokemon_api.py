import requests
import time
from functools import lru_cache
from config import POKEAPI_BASE_URL


@lru_cache(maxsize=100)
def fetch_pokemon_data(name_or_id: str) -> dict:
    url = f"{POKEAPI_BASE_URL}/pokemon/{name_or_id.lower()}"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        return {"error": f"HTTP error: {http_err}"}
    except requests.exceptions.RequestException as req_err:
        return {"error": f"Request error: {req_err}"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}"}
