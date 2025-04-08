import datetime
import logging
from datetime import datetime as dt
from typing import List, Optional

from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError

from db.models.models import Transaction
from services.account import account_service
from services.bonus_level import bonus_level_service
from services.main_service import MainService

BONUS_COEFFICIENT = 0.03

logger = logging.getLogger(__name__)


class TransactionService(MainService):
    async def create_transaction(
        self,
        hash: str,
        account_id: int,
        token_from: str,
        token_to: str,
        amount_from: int,
        amount_to: int,
        chain_from: int,
        chain_to: int,
        transaction_date: datetime = dt.now(datetime.UTC),
    ) -> Transaction:
        session = self._get_async_session()

        try:
            async with session() as db:
                account = await account_service.get_account(account_id)

                if account is None:
                    logger.error(f"Аccount c {account_id=} не найден.")
                    raise ValueError(f"Аccount c {account_id=} не найден.")

                transaction = Transaction(
                    hash=hash,
                    account=account.id,
                    token_from=token_from,
                    token_to=token_to,
                    amount_from=amount_from,
                    amount_to=amount_to,
                    chain_from=chain_from,
                    chain_to=chain_to,
                    transaction_date=transaction_date,
                )
                current_bonus_amount = (
                    account.bonus_amount
                    + self._calculate_bonus_amount(amount_to)
                )
                account.bonus_amount = current_bonus_amount

                bonus_level = await bonus_level_service.get_bonus_levels_for_bonus_amount(  # noqa: 501
                    current_bonus_amount
                )

                if bonus_level:
                    account.bonus_level = bonus_level.id

                db.add(transaction)
                db.add(account)
                await db.commit()

            transaction_ = transaction.as_dict()

            logger.info(
                f"Аккаунту с {account.id=} обновлено значение "
                f"{current_bonus_amount=}"
            )
            logger.info(
                f"Transaction c параметрами: {transaction_=} успешно создана."
            )

            return transaction
        except IntegrityError:
            await db.rollback()

            logger.error(f"Transaction c {hash=} уже создана.")
            raise ValueError(f"Transaction с {hash=} уже создана.")

    async def get_transaction(
        self,
        transaction_id: Optional[int] = None,
        hash: Optional[str] = None,
    ) -> Optional[Transaction]:
        session = self._get_async_session()

        async with session() as db:
            if transaction_id:
                transaction = await db.execute(
                    select(Transaction).where(Transaction.id == transaction_id)
                )
            elif hash:
                transaction = await db.execute(
                    select(Transaction).where(Transaction.hash == hash)
                )
            else:
                return None

            return transaction.scalars().one_or_none()

    async def delete_transaction(self, transaction_id: int) -> None:
        session = self._get_async_session()

        async with session() as db:
            result = await db.execute(
                delete(Transaction).where(Transaction.id == transaction_id)
            )

            await db.commit()

            if result.rowcount > 0:
                logger.info(f"Transaction c {transaction_id=} успешно удален.")
            else:
                logger.error(f"Transaction c {transaction_id=} не найден.")
                raise ValueError(f"Transaction c {transaction_id=} не найден.")

    async def update_transaction(
        self,
        transaction_id: int,
        **kwargs,
    ) -> Transaction:
        session = self._get_async_session()

        async with session() as db:
            transaction = await db.execute(
                select(Transaction).where(Transaction.id == transaction_id)
            )

            transaction = transaction.scalars().one_or_none()

            if transaction is None:
                logger.error(f"Transaction c {transaction_id=} не найден.")
                raise ValueError(f"Transaction c {transaction_id=} не найден.")

            account_id = kwargs.get("account", None)

            if account_id:
                account = await account_service.get_account(
                    account_id=account_id
                )

                if account is None:
                    raise ValueError(f"Account c {account_id=} не найден.")

            # Нужно при частичном обновлении, чтобы проверить,
            # что поля не нарушают валидацию.
            if amount_to := kwargs["amount_to"]:
                if transaction.amount_from < amount_to:
                    raise ValueError(
                        "Сумма отправления не может быть меньше суммы получения"  # noqa: 501
                    )

                transaction_account = transaction.accounts
                clear_bonus_amount = (
                    transaction_account.bonus_amount
                    - self._calculate_bonus_amount(transaction.amount_to)
                )

                current_bonus_amount = (
                    clear_bonus_amount
                    + self._calculate_bonus_amount(amount_to)
                )
                transaction_account.bonus_amount = current_bonus_amount

                bonus_level = await bonus_level_service.get_bonus_levels_for_bonus_amount(  # noqa: 501
                    current_bonus_amount
                )

                if bonus_level:
                    transaction_account.bonus_level = bonus_level.id

            if token_to := kwargs["token_to"]:
                if transaction.token_from == token_to:
                    raise ValueError(
                        "Отправитель транзакции не может быть получателем транзакции"  # noqa: 501
                    )

            if token_from := kwargs["token_from"]:
                if transaction.token_to == token_from:
                    raise ValueError(
                        "Отправитель транзакции не может быть получателем транзакции"  # noqa: 501
                    )

            for key, value in kwargs.items():
                if value:
                    setattr(transaction, key, value)

            await db.commit()

            return transaction

    async def get_transactions(self) -> List[Transaction]:
        session = self._get_async_session()

        async with session() as db:
            transactions = await db.execute(select(Transaction))

            return transactions.scalars().all()

    @staticmethod
    def _calculate_bonus_amount(amount_to: int):
        return amount_to * 0.03


transaction_service = TransactionService()
