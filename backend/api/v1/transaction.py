import datetime
import json
import logging
from datetime import datetime as dt
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from api.v1.account import ACCOUNT_CACHE_PREFIX_KEY
from schemes.transaction import (
    CreateTransaction,
    ResponseTransaction,
    UpdateTransaction,
)
from services.transaction import transaction_service
from storages.cache import cache_storage

TRANSACTION_CACHE_PREFIX_KEY = "transaction"

transaction_router = APIRouter()
logger = logging.getLogger(__name__)


@transaction_router.post(
    "/create/",
    status_code=HTTPStatus.CREATED,
    response_model=ResponseTransaction,
)
async def create_transaction(input: CreateTransaction):
    try:
        transaction = await transaction_service.create_transaction(
            hash=input.hash,
            token_from=input.token_from,
            token_to=input.token_to,
            amount_from=input.amount_from,
            amount_to=input.amount_to,
            chain_from=input.chain_from,
            chain_to=input.chain_to,
            transaction_date=input.transaction_date,
            account_id=input.account,
        )

        # Удаляем запись из кеша,
        # так как при создании транзакции обновляется сущность Account.
        await cache_storage.delete(
            f"{ACCOUNT_CACHE_PREFIX_KEY}:{input.account}"
        )
        logger.debug(f"Account с {input.account=} удален из кэша.")
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))

    return transaction


@transaction_router.get(
    "/get_by_id/{id}",
    status_code=HTTPStatus.OK,
    response_model=ResponseTransaction,
)
async def get_transaction_by_id(id: int):
    transaction = await cache_storage.get(
        f"{TRANSACTION_CACHE_PREFIX_KEY}:{id}"
    )

    if transaction:
        transaction_ = json.loads(transaction)
        transaction_["transaction_date"] = dt.fromtimestamp(
            transaction_["transaction_date"], datetime.UTC
        )
        logger.debug(f"Transation {transaction_=} получен из кэша.")
        return transaction_
    else:
        transaction = await transaction_service.get_transaction(id)

        if transaction is None:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND,
                detail=f"Transation c {id=} не найден.",
            )

        transaction.transaction_date = transaction.transaction_date.timestamp()
        transaction = transaction.as_dict()
        await cache_storage.set(
            f"{TRANSACTION_CACHE_PREFIX_KEY}:{id}",
            json.dumps(transaction, ensure_ascii=False),
        )
        logger.debug(f"Transation {transaction=} записан в кэш.")

    return transaction


@transaction_router.get(
    "/get_by_hash/{hash}",
    status_code=HTTPStatus.OK,
    response_model=ResponseTransaction,
)
async def get_transaction_by_hash(hash: str):
    transaction = await cache_storage.get(
        f"{TRANSACTION_CACHE_PREFIX_KEY}:{hash}"
    )

    if transaction:
        transaction_ = json.loads(transaction)
        transaction_["transaction_date"] = dt.fromtimestamp(
            transaction_["transaction_date"], datetime.UTC
        )
        logger.debug(f"Transaction {transaction_=} получен из кэша.")
        return transaction_
    else:
        transaction = await transaction_service.get_transaction(hash=hash)

        if transaction is None:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND,
                detail=f"Transaction c {hash=} не найден.",
            )

        transaction.transaction_date = transaction.transaction_date.timestamp()
        transaction = transaction.as_dict()
        await cache_storage.set(
            f"{TRANSACTION_CACHE_PREFIX_KEY}:{hash}",
            json.dumps(transaction, ensure_ascii=False),
        )
        logger.debug(f"Transation {transaction=} записан в кэш.")

    return transaction


@transaction_router.delete("/delete/{id}", status_code=HTTPStatus.NO_CONTENT)
async def delete_transaction(id: int):
    transaction = await transaction_service.get_transaction(id)

    if transaction is None:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail=f"Transaction c {id=} не найден.",
        )

    await transaction_service.delete_transaction(id)

    hash = transaction.hash
    await cache_storage.delete(f"{TRANSACTION_CACHE_PREFIX_KEY}:{hash}")
    logger.debug(f"Transation с {hash=} удален из кэша.")

    await cache_storage.delete(f"{TRANSACTION_CACHE_PREFIX_KEY}:{id}")
    logger.debug(f"Transation с {id=} удален из кэша.")


@transaction_router.patch(
    "/update/{id}",
    status_code=HTTPStatus.OK,
    response_model=ResponseTransaction,
)
async def update_transaction(id: int, input: UpdateTransaction):
    try:
        transaction = await transaction_service.update_transaction(
            id, **input.model_dump()
        )

        await cache_storage.delete(f"{TRANSACTION_CACHE_PREFIX_KEY}:{id}")
        logger.debug(f"Transation с {id=} удален из кэша.")
    except ValueError as e:
        detail = str(e)
        if "не найден" in detail:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND, detail=str(e)
            )
        else:
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST, detail=str(e)
            )

    return transaction


@transaction_router.get(
    "/get_transactions/",
    status_code=HTTPStatus.OK,
    response_model=List[ResponseTransaction],
)
async def get_transactions():
    return await transaction_service.get_transactions()
