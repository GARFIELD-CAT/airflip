import json
import logging
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from schemes.bonus_level import (
    CreateBonusLevel,
    ResponseBonusLevel,
    UpdateBonusLevel,
)
from services.bonus_level import bonus_level_service
from storages.cache import cache_storage

BONUS_LEVEL_CACHE_PREFIX_KEY = "bonus_level"

bonus_level_router = APIRouter()
logger = logging.getLogger(__name__)


@bonus_level_router.post(
    "/create/",
    status_code=HTTPStatus.CREATED,
    response_model=ResponseBonusLevel,
)
async def create_bonus_level(input: CreateBonusLevel):
    try:
        bonus_level = await bonus_level_service.create_bonus_level(
            name=input.name,
            amount_required=input.amount_required,
        )
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))

    return bonus_level


@bonus_level_router.get(
    "/get/{id}", status_code=HTTPStatus.OK, response_model=ResponseBonusLevel
)
async def get_bonus_level(id: int):
    bonus_level = await cache_storage.get(
        f"{BONUS_LEVEL_CACHE_PREFIX_KEY}:{id}"
    )

    if bonus_level:
        bonus_level_ = json.loads(bonus_level)
        logger.debug(f"BonusLevel {bonus_level_=} получен из кэша.")
        return bonus_level_
    else:
        bonus_level = await bonus_level_service.get_bonus_level(id)

        if bonus_level is None:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND,
                detail=f"BonusLevel c {id=} не найден.",
            )

        bonus_level = bonus_level.as_dict()
        await cache_storage.set(
            f"{BONUS_LEVEL_CACHE_PREFIX_KEY}:{id}",
            json.dumps(bonus_level, ensure_ascii=False),
        )
        logger.debug(f"BonusLevel {bonus_level=} записан в кэш.")

    return bonus_level


@bonus_level_router.delete("/delete/{id}", status_code=HTTPStatus.NO_CONTENT)
async def delete_bonus_level(id: int):
    try:
        await bonus_level_service.delete_bonus_level(id)

        await cache_storage.delete(f"{BONUS_LEVEL_CACHE_PREFIX_KEY}:{id}")
        logger.debug(f"BonusLevel с {id=} удален из кэша.")
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail=str(e))


@bonus_level_router.patch(
    "/update/{id}",
    status_code=HTTPStatus.OK,
    response_model=ResponseBonusLevel,
)
async def update_bonus_level(id: int, input: UpdateBonusLevel):
    try:
        bonus_level = await bonus_level_service.update_bonus_level(
            id, **input.model_dump()
        )

        await cache_storage.delete(f"{BONUS_LEVEL_CACHE_PREFIX_KEY}:{id}")
        logger.debug(f"BonusLevel с {id=} удален из кэша.")
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail=str(e))

    return bonus_level


@bonus_level_router.get(
    "/get_bonus_levels/",
    status_code=HTTPStatus.OK,
    response_model=List[ResponseBonusLevel],
)
async def get_bonus_levels():
    return await bonus_level_service.get_bonus_levels()
