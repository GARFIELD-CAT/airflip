import logging
from typing import List, Optional

from sqlalchemy import asc, delete, desc, select
from sqlalchemy.exc import IntegrityError

from db.models.models import Account, Transaction
from services.bonus_level import bonus_level_service
from services.main_service import MainService

logger = logging.getLogger(__name__)


class AccountService(MainService):
    async def create_account(
        self,
        wallet_key: str,
        bonus_amount: float = 0,
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

            account_ = account.as_dict()
            logger.info(f"Account c параметрами: {account_=} успешно создан.")

            return account
        except IntegrityError:
            await db.rollback()

            logger.error(f"Account c {wallet_key=} уже создан.")
            raise ValueError(f"Account с {wallet_key=} уже создан.")

    async def get_account(
        self,
        account_id: Optional[int] = None,
        wallet_key: Optional[str] = None,
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

            bonus_level_id = kwargs.get("bonus_level", None)

            if bonus_level_id:
                bonus_level = await bonus_level_service.get_bonus_level(
                    bonus_level_id=bonus_level_id
                )

                if bonus_level is None:
                    raise ValueError(
                        f"BonusLevel c {bonus_level_id=} не найден."
                    )

            for key, value in kwargs.items():
                if value:
                    setattr(account, key, value)

            await db.commit()

            return account

    async def get_transactions_by_account_id(
        self,
        account_id: int,
        sort_desc: bool = True,
        skip: int = 0,
        limit: int = 25,
    ) -> List[Transaction]:
        session = self._get_async_session()

        async with session() as db:
            account = await db.execute(
                select(Account).where(Account.id == account_id)
            )
            account = account.scalars().one_or_none()

            if not account:
                return []

            if sort_desc:
                transactions = await db.execute(
                    select(Transaction)
                    .where(Transaction.account == account_id)
                    .order_by(desc(Transaction.transaction_date))
                    .offset(skip)
                    .limit(limit)
                )
            else:
                transactions = await db.execute(
                    select(Transaction)
                    .where(Transaction.account == account_id)
                    .order_by(asc(Transaction.transaction_date))
                    .offset(skip)
                    .limit(limit)
                )

            return transactions.scalars().all()

    async def get_accounts(self) -> List[Account]:
        session = self._get_async_session()

        async with session() as db:
            accounts = await db.execute(select(Account))

            return accounts.scalars().all()


account_service = AccountService()
