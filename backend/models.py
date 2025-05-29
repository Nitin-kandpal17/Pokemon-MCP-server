from pydantic import BaseModel
from typing import List

class PokemonRequest(BaseModel):
    name_or_id: str

class CompareRequest(BaseModel):
    pokemon_1: str
    pokemon_2: str

class TeamBuildRequest(BaseModel):
    description: str
