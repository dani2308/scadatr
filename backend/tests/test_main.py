# tests/test_main.py

import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_root():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Backend ativo! Vai a /docs para ver a API."}

