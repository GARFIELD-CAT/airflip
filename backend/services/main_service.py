from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from backend.db.models.models import Base


class MainService:
    def __init__(self, db_url: str = "sqlite+aiosqlite:///db/student.db"):
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


main_service = MainService()
