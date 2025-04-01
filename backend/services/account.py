import logging
from typing import Optional

from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError

from backend.db.models.models import Account
from backend.services.bonus_level import bonus_level_service
from backend.services.main_service import MainService

logger = logging.getLogger(__name__)


class AccountService(MainService):
    async def create_account(
        self,
        wallet_key: str,
        bonus_amount: int = 0,
        bonus_level_id: Optional[int] = None,
    ) -> Account:
        session = self._get_async_session()

        try:
            async with session() as db:
                if bonus_level_id:
                    bonus_level = await bonus_level_service.get_bonus_level(
                        bonus_level_id
                    )

                    if bonus_level is None:
                        logger.error(
                            f"BonusLevel c {bonus_level_id=} не найден."
                        )
                        raise ValueError(
                            f"BonusLevel c {bonus_level_id=} не найден."
                        )
                    else:
                        bonus_level_id = bonus_level.id

                account = Account(
                    wallet_key=wallet_key,
                    bonus_amount=bonus_amount,
                    bonus_level=bonus_level_id,
                )

                db.add(account)
                await db.commit()

            logger.info(
                f"Account c {wallet_key=}, {bonus_amount=} и "
                f"{bonus_level_id=} успешно создан."
            )

            return account
        except IntegrityError:
            await db.rollback()

            logger.error(f"Account c {wallet_key=} уже создан.")
            raise ValueError(f"Account с {wallet_key=} уже создан.")

    async def get_account(
        self,
        account_id: Optional[int] = None,
        wallet_key: Optional[int] = None,
    ) -> Optional[Account]:
        session = self._get_async_session()

        async with session() as db:
            if account_id:
                account = await db.execute(
                    select(Account).where(Account.id == account_id)
                )
            elif wallet_key:
                account = await db.execute(
                    select(Account).where(Account.wallet_key == wallet_key)
                )
            else:
                return None

            return account.scalars().one_or_none()

    async def delete_account(self, account_id: int) -> None:
        session = self._get_async_session()

        async with session() as db:
            result = await db.execute(
                delete(Account).where(Account.id == account_id)
            )

            await db.commit()

            if result.rowcount > 0:
                logger.info(f"Account c {account_id=} успешно удален.")
            else:
                logger.error(f"Account c {account_id=} не найден.")
                raise ValueError(f"Account c {account_id=} не найден.")

    async def update_account(
        self,
        account_id: int,
        **kwargs,
    ) -> Account:
        session = self._get_async_session()

        async with session() as db:
            account = await db.execute(
                select(Account).where(Account.id == account_id)
            )

            account = account.scalars().one_or_none()

            if account is None:
                logger.error(f"Account c {account_id=} не найден.")
                raise ValueError(f"Account c {account_id=} не найден.")

            for key, value in kwargs.items():
                if value:
                    setattr(account, key, value)

            await db.commit()

            return account


account_service = AccountService()
