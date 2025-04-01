import re
from typing import Optional

from pydantic import BaseModel, Field, field_validator


class CreateAccount(BaseModel):
    wallet_key: str = Field(description="Ключ кошелька")
    bonus_amount: float = Field(description="Сумма бонусов у пользователя")
    bonus_level: Optional[int] = Field(
        description="Уровень пользователя в бонусной системе", default=None
    )

    @field_validator("wallet_key", mode="before")
    def validate_wallet_key(cls, value):
        pattern = r"[a-zA-Z0-9]+"

        if not re.match(pattern, value):
            raise ValueError(
                "Ключ кошелька должен содержать только латинские символы/цифры"
            )

        return value

    @field_validator("bonus_amount", mode="before")
    def validate_bonus_amount(cls, value):
        if value < 0:
            raise ValueError(
                "Сумма бонусов у пользователя должно быть больше 0"
            )

        return value


class ResponseAccount(BaseModel):
    id: int = Field(description="Id пользователя")
    wallet_key: str = Field(description="Ключ кошелька")
    bonus_amount: float = Field(description="Сумма бонусов у пользователя")
    bonus_level: Optional[int] = Field(
        description="Уровень пользователя в бонусной системе"
    )


class UpdateAccount(CreateAccount):
    wallet_key: Optional[str] = None
    bonus_amount: Optional[float] = None
    bonus_level: Optional[int] = None
