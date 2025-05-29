from fastapi import FastAPI, HTTPException, Query
from utils.pokemon_api import fetch_pokemon_data
from modules.information_retrieval import (
    get_pokemon_basic_info,
    search_pokemon_by_type,
    search_pokemon_by_generation
)
from modules.comparison import compare_pokemon
from modules.strategy import get_counters
from modules.team_builder import extract_pokemon_names, build_team
from modules.type_chart import get_all_types

app = FastAPI()

# Cache known Pokémon names (e.g., for Gen 1: 1 to 151)
KNOWN_POKEMON = [fetch_pokemon_data(str(i))["name"].lower() for i in range(1, 152)]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Pokémon MCP Server"}

@app.get("/pokemon/{name_or_id}")
def get_pokemon(name_or_id: str):
    try:
        return get_pokemon_basic_info(name_or_id)
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=500, detail=str(re))

@app.get("/pokemon/search/type/{type_name}")
def search_by_type(type_name: str):
    try:
        return {"results": search_pokemon_by_type(type_name)}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))

@app.get("/pokemon/search/generation/{generation_name}")
def search_by_generation(generation_name: str):
    try:
        return {"results": search_pokemon_by_generation(generation_name)}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))

@app.get("/compare")
def compare(pokemon1: str = Query(...), pokemon2: str = Query(...)):
    try:
        return compare_pokemon(pokemon1, pokemon2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/counter")
def get_counter(type_name: str = Query(...)):
    try:
        return {"counters": get_counters(type_name)}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))

@app.get("/team_builder")
def team_builder(query: str = Query(...)):
    try:
        names = extract_pokemon_names(query, KNOWN_POKEMON)
        if not names:
            raise HTTPException(status_code=400, detail="No valid Pokémon names found in your query.")
        return {"team": build_team(names)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/types")
def get_types():
    return {"types": get_all_types()}
