import logging
from typing import Optional

from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError

from backend.db.models.models import BonusLevel
from backend.services.main_service import MainService

logger = logging.getLogger(__name__)


class BonusLevelService(MainService):
    async def create_bonus_level(
        self, name: str, amount_required: int
    ) -> BonusLevel:
        session = self._get_async_session()

        bonus_level = BonusLevel(name=name, amount_required=amount_required)

        try:
            async with session() as db:
                db.add(bonus_level)
                await db.commit()

            logger.info(
                f"BonusLevel c параметрами: {bonus_level=} успешно создан."
            )

            return bonus_level
        except IntegrityError:
            await db.rollback()

            logger.error(f"BonusLevel c {name=} уже создан.")
            raise ValueError(f"BonusLevel с {name=} уже создан.")

    async def get_bonus_level(
        self, bonus_level_id: int
    ) -> Optional[BonusLevel]:
        session = self._get_async_session()

        async with session() as db:
            faculty = await db.execute(
                select(BonusLevel).where(BonusLevel.id == bonus_level_id)
            )

            return faculty.scalars().one_or_none()

    async def delete_bonus_level(self, bonus_level_id: int) -> None:
        session = self._get_async_session()

        async with session() as db:
            result = await db.execute(
                delete(BonusLevel).where(BonusLevel.id == bonus_level_id)
            )

            await db.commit()

            if result.rowcount > 0:
                logger.info(f"BonusLevel c {bonus_level_id=} успешно удален.")
            else:
                logger.error(f"BonusLevel c {bonus_level_id=} не найден.")
                raise ValueError(f"BonusLevel c {bonus_level_id=} не найден.")

    async def update_bonus_level(
        self, bonus_level_id: int, **kwargs
    ) -> BonusLevel:
        session = self._get_async_session()

        async with session() as db:
            bonus_level = await db.execute(
                select(BonusLevel).where(BonusLevel.id == bonus_level_id)
            )
            bonus_level = bonus_level.scalars().one_or_none()

            if bonus_level is None:
                logger.error(f"BonusLevel c {bonus_level_id=} не найден.")
                raise ValueError(f"BonusLevel c {bonus_level_id=} не найден.")

            for key, value in kwargs.items():
                if value:
                    setattr(bonus_level, key, value)

            await db.commit()

            return bonus_level


bonus_level_service = BonusLevelService()
