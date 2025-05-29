from fastapi.testclient import TestClient
from main import app


client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_get_pokemon():
    response = client.get("/pokemon/pikachu")
    assert response.status_code == 200
    assert response.json()["name"] == "pikachu"

def test_search_by_type():
    response = client.get("/pokemon/search/type/electric")
    assert response.status_code == 200
    assert isinstance(response.json()["results"], list)

def test_search_by_generation():
    response = client.get("/pokemon/search/generation/generation-i")
    assert response.status_code == 200
    assert isinstance(response.json()["results"], list)

def test_compare_pokemon():
    response = client.get("/compare", params={"pokemon1": "pikachu", "pokemon2": "bulbasaur"})
    assert response.status_code == 200
    assert "comparison" in response.json()

def test_counter():
    response = client.get("/counter", params={"type_name": "psychic"})
    assert response.status_code == 200
    assert "counters" in response.json()

def test_team_builder():
    response = client.get("/team/build", params={"description": "balanced team with a tank and fire attacker"})
    assert response.status_code == 200
    assert isinstance(response.json()["team"], list)
