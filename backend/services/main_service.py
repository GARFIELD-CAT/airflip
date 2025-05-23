from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from core.settings import settings
from db.models.models import Base

DB_URL = settings.pg_auth


class MainService:
    def __init__(self, db_url: str = DB_URL):
        self._db_url = db_url
        self._engine = create_async_engine(self._db_url)

    async def init_db(self):
        async with self._engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    async def drop_db(self):
        async with self._engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)

    def _get_async_session(self):
        return sessionmaker(
            self._engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )


main_service = MainService(db_url=settings.pg_auth)
