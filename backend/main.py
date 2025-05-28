import asyncio
import logging

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.account import account_router
from api.v1.bonus_level import bonus_level_router
from api.v1.transaction import transaction_router
from core.settings import settings
from services.main_service import main_service

logging.basicConfig(level=settings.logger_level)
app = FastAPI(
    title=settings.project_name,
    docs_url="/api/openapi",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bonus_level_router, prefix="/api/v1/bonus_levels")
app.include_router(account_router, prefix="/api/v1/accounts")
app.include_router(transaction_router, prefix="/api/v1/transactions")


if __name__ == "__main__":
    asyncio.run(main_service.init_db())

    uvicorn.run(
        app="main:app",
        host=settings.project_host,
        port=settings.project_port,
        reload=True,
    )
