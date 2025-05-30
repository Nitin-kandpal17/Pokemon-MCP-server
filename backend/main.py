from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from utils.pokemon_api import fetch_pokemon_data
from modules.information_retrieval import (
    get_pokemon_basic_info,
    search_pokemon_by_type,
    search_pokemon_by_generation,
)
from modules.comparison import compare_pokemon
from modules.strategy import get_counters
from modules.team_builder import build_team_from_description
from modules.type_chart import get_all_types

import json

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (for development; restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["http://localhost:5173"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache known Pokémon names (e.g., from 1 to 151)
with open("data/pokemon_names.json") as f:
    KNOWN_POKEMON = json.load(f)


@app.get("/")
def root():
    return {"message": "Welcome to the Pokémon MCP Server!"}


@app.get("/pokemon/{name_or_id}")
def get_pokemon(name_or_id: str):
    try:
        data = fetch_pokemon_data(name_or_id)
        return {
            "name": data["name"].capitalize(),
            "image": data["sprites"]["front_default"],
            "types": [t["type"]["name"].capitalize() for t in data["types"]],
        }
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=500, detail=str(re))


@app.get("/pokemon/search/type/{type_name}")
def by_type(type_name: str):
    try:
        return {"results": search_pokemon_by_type(type_name)}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))


@app.get("/pokemon/search/generation/{generation_name}")
def by_generation(generation_name: str):
    try:
        return {"results": search_pokemon_by_generation(generation_name)}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))


@app.get("/compare")
def compare(pokemon1: str = Query(...), pokemon2: str = Query(...)):
    try:
        return {"comparison": compare_pokemon(pokemon1, pokemon2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/counters")
def get_counters(type_name: str = Query(...)):
    try:
        return {"counters": get_counters(type_name)}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))


@app.post("/team/build")
def team_builder(description: str = Query(...)):
    try:
        return {"team": build_team_from_description(description)}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))


@app.get("/types")
def get_types():
    return {"types": get_all_types()}
