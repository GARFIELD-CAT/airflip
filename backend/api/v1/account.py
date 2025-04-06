import json
import logging
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from schemes.account import CreateAccount, ResponseAccount, UpdateAccount
from schemes.transaction import ResponseTransaction
from services.account import account_service
from storages.cache import cache_storage

ACCOUNT_CACHE_PREFIX_KEY = "account"

account_router = APIRouter()
logger = logging.getLogger(__name__)


@account_router.post(
    "/create/",
    status_code=HTTPStatus.CREATED,
    response_model=ResponseAccount,
)
async def create_account(input: CreateAccount):
    try:
        account = await account_service.create_account(
            wallet_key=input.wallet_key,
            bonus_amount=input.bonus_amount,
            bonus_level_id=input.bonus_level,
        )
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))

    return account


@account_router.get(
    "/get_by_id/{id}",
    status_code=HTTPStatus.OK,
    response_model=ResponseAccount,
)
async def get_account_by_id(id: int):
    account = await cache_storage.get(f"{ACCOUNT_CACHE_PREFIX_KEY}:{id}")

    if account:
        account_ = json.loads(account)
        logger.debug(f"Account {account_=} получен из кэша.")
        return account_
    else:
        account = await account_service.get_account(id)

        if account is None:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND,
                detail=f"Account c {id=} не найден.",
            )

        account = account.as_dict()
        await cache_storage.set(
            f"{ACCOUNT_CACHE_PREFIX_KEY}:{id}",
            json.dumps(account, ensure_ascii=False),
        )
        logger.debug(f"Account {account=} записан в кэш.")

    return account


@account_router.get(
    "/get_by_wallet_key/{wallet_key}",
    status_code=HTTPStatus.OK,
    response_model=ResponseAccount,
)
async def get_account_by_wallet_key(wallet_key: str):
    account = await cache_storage.get(
        f"{ACCOUNT_CACHE_PREFIX_KEY}:{wallet_key}"
    )

    if account:
        account_ = json.loads(account)
        logger.debug(f"Account {account_=} получен из кэша.")
        return account_
    else:
        account = await account_service.get_account(wallet_key=wallet_key)

        if account is None:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND,
                detail=f"Account c {wallet_key=} не найден.",
            )

        account = account.as_dict()
        await cache_storage.set(
            f"{ACCOUNT_CACHE_PREFIX_KEY}:{wallet_key}",
            json.dumps(account, ensure_ascii=False),
        )
        logger.debug(f"Account {account=} записан в кэш.")

    return account


@account_router.delete("/delete/{id}", status_code=HTTPStatus.NO_CONTENT)
async def delete_account(id: int):
    account = await account_service.get_account(id)

    if account is None:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail=f"Account c {id=} не найден.",
        )

    await account_service.delete_account(id)

    wallet_key = account.wallet_key
    await cache_storage.delete(f"{ACCOUNT_CACHE_PREFIX_KEY}:{wallet_key}")
    logger.debug(f"Account с {wallet_key=} удален из кэша.")

    await cache_storage.delete(f"{ACCOUNT_CACHE_PREFIX_KEY}:{id}")
    logger.debug(f"Account с {id=} удален из кэша.")


@account_router.patch(
    "/update/{id}",
    status_code=HTTPStatus.OK,
    response_model=ResponseAccount,
)
async def update_account(id: int, input: UpdateAccount):
    try:
        account = await account_service.update_account(
            id, **input.model_dump()
        )

        await cache_storage.delete(f"{ACCOUNT_CACHE_PREFIX_KEY}:{id}")
        logger.debug(f"Account с {id=} удален из кэша.")
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail=str(e))

    return account


@account_router.get(
    "/get_accounts/",
    status_code=HTTPStatus.OK,
    response_model=List[ResponseAccount],
)
async def get_accounts():
    return await account_service.get_accounts()


@account_router.get(
    "/get_transactions_by_wallet_key",
    status_code=HTTPStatus.OK,
    response_model=List[ResponseTransaction],
)
async def get_transactions_by_wallet_key(
    wallet_key: str, sort_desc: bool = True, skip: int = 0, limit: int = 25
):
    account = await account_service.get_account(wallet_key=wallet_key)

    if account is None:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail=f"Account c {wallet_key=} не найден.",
        )

    transactions = await account_service.get_transactions_by_account_id(
        account_id=account.id, sort_desc=sort_desc, skip=skip, limit=limit
    )

    return transactions
