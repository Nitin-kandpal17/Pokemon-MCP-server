from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_pokemon():
    response = client.get("/pokemon/pikachu")
    assert response.status_code == 200
    assert response.json()["name"].lower() == "pikachu"

def test_compare_pokemon():
    response = client.get("/compare", params={"pokemon1": "pikachu", "pokemon2": "charizard"})
    assert response.status_code == 200
    assert "comparison" in response.json()

def test_team_builder():
    description = {"description": "a strong fire-type team with good defense"}
    response = client.post("/team-builder", json=description)
    assert response.status_code == 200
    assert "team" in response.json()
