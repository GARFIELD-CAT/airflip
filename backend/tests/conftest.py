import pytest_asyncio
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import create_async_engine

from db.models.models import Base
from main import app
from storages.cache import CacheStorage

# По хорошему нужна тестовая база
PG_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/postgres"


@pytest_asyncio.fixture(scope="function")
async def setup_database():
    # BASE_URL = "sqlite+aiosqlite:///./student.db"
    engine = create_async_engine(PG_URL)
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.drop_all)
    # Нужно чтобы после тестов и очистки базы таблицы создавались вновь
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)


@pytest_asyncio.fixture(scope="function")
async def cache_storage():
    redis = CacheStorage("localhost", 6379)
    yield redis


@pytest_asyncio.fixture(scope="session")
def app_client():
    with TestClient(app) as client:
        yield client
