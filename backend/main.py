import asyncio
import logging

import uvicorn
from fastapi import FastAPI

from backend.api.v1.account import account_router
from backend.api.v1.bonus_level import bonus_level_router
from backend.services.main_service import main_service

LOGGER_LEVEL = logging.INFO
logging.basicConfig(level=LOGGER_LEVEL)

app = FastAPI(title="my_api")

app.include_router(bonus_level_router, prefix="/api/v1/bonus_levels")
app.include_router(account_router, prefix="/api/v1/accounts")


if __name__ == "__main__":
    asyncio.run(main_service.init_db())

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
