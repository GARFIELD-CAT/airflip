from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import URL

from pathlib import Path


ENV_FILE_PATH = Path(__file__).parent.parent.parent / "config/backend/.env"


class ApiConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ENV_FILE_PATH, env_file_encoding="utf-8", extra="ignore"
    )

    project_name: str = "airflip"
    project_port: int = 8000
    project_host: str = "127.0.0.1"

    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    postgres_db: str = "postgres"
    postgres_port: int = 5432
    postgres_host: str = "localhost"

    pg_auth: Optional[URL] = None

    redis_host: str = "localhost"
    redis_port: int = 6379

    logger_level: str = "INFO"


settings = ApiConfig()


settings.pg_auth = URL.create(
    "postgresql+asyncpg",
    username=settings.postgres_user,
    password=settings.postgres_password,
    host=settings.postgres_host,
    port=settings.postgres_port,
    database=settings.postgres_db,
)


if __name__ == "__main__":
    print(settings.model_config)
    print(settings)