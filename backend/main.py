from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

# Import from existing modules
from modules.information_retrieval import get_pokemon_data, search_pokemon_by_type, search_pokemon_by_generation
from modules.comparison import compare_pokemon
from modules.team_builder import build_team_from_description, TeamBuildRequest
from modules.type_chart import get_all_types

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to the Pokémon MCP Server!"}

@app.get("/pokemon/{name_or_id}")
def get_pokemon(name_or_id: str):
    data = get_pokemon_data(name_or_id)
    if data is None:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return data


@app.get("/pokemon/search/type/{type_name}")
def by_type(type_name: str):
    results = search_pokemon_by_type(type_name)
    return {"results": results}

@app.get("/pokemon/search/generation/{generation_name}")
def by_generation(generation_name: str):
    results = search_pokemon_by_generation(generation_name)
    return {"results": results}

@app.get("/compare")
def compare(pokemon1: str = Query(...), pokemon2: str = Query(...)):
    result = compare_pokemon(pokemon1, pokemon2)
    return {"comparison": result}

@app.get("/counters")
def get_counters(type: str = Query(...)):
    result = get_counter(type)
    return {"counters": result}

@app.post("/team-builder")
def team_builder(request: TeamBuildRequest):
    team = build_team_from_description(request.description)
    return {"team": team}


@app.get("/types")
def get_types():
    return {"types": get_all_types()}
#