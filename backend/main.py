from fastapi import FastAPI, HTTPException
from utils.pokemon_api import fetch_pokemon_data

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Pokémon MCP Server"}

@app.get("/pokemon/{name_or_id}")
def get_pokemon(name_or_id: str):
    try:
        data = fetch_pokemon_data(name_or_id)
        return data
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=500, detail=str(re))
