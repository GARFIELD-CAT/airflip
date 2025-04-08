import datetime as dt
import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator, model_validator


class CreateTransaction(BaseModel):
    hash: str = Field(description="Hash транзакции")
    token_from: str = Field(description="Отправитель транзакции")
    token_to: str = Field(description="Получатель транзакции")
    amount_from: int = Field(description="Сумма отправления")
    amount_to: int = Field(description="Сумма получения")
    chain_from: int = Field(description="Сеть оптравления")
    chain_to: int = Field(description="Сеть получения")
    transaction_date: Optional[datetime] = Field(
        description="Дата транзакции", default=datetime.now(dt.UTC)
    )
    account: int = Field(description="Кошелек транзакции")

    @field_validator(*["hash", "token_from", "token_to"], mode="before")
    def validate_str_value(cls, value):
        pattern = r"^[a-zA-Z0-9]+$"

        if not re.match(pattern, value):
            raise ValueError(
                "Поле должно содержать только латинские символы/цифры"
            )

        return value

    @field_validator(*["amount_from", "amount_to"], mode="after")
    def validate_int_value(cls, value):
        if value < 0:
            raise ValueError("Поле должно быть не меньше 0")

        return value

    @model_validator(mode="after")
    def validate_amounts(self):
        if not all((self.amount_from, self.amount_to)):
            return self

        if self.amount_from - self.amount_to < 0:
            raise ValueError(
                "Сумма отправления не может быть меньше суммы получения"
            )

        return self

    @model_validator(mode="after")
    def validate_tokens(self):
        if not all((self.token_from, self.token_to)):
            return self

        if self.token_from == self.token_to:
            raise ValueError(
                "Отправитель транзакции не может быть получателем транзакции"
            )

        return self


class ResponseTransaction(BaseModel):
    id: int = Field(description="Id транзакции")
    hash: str = Field(description="Hash транзакции")
    token_from: str = Field(description="Отправитель транзакции")
    token_to: str = Field(description="Получатель транзакции")
    amount_from: int = Field(description="Сумма отправления")
    amount_to: int = Field(description="Сумма получения")
    chain_from: int = Field(description="Сеть оптравления")
    chain_to: int = Field(description="Сеть получения")
    transaction_date: datetime = Field(description="Дата транзакции")
    account: int = Field(description="Кошелек транзакции")


class UpdateTransaction(CreateTransaction):
    hash: str = None
    token_from: str = None
    token_to: str = None
    amount_from: int = None
    amount_to: int = None
    chain_from: int = None
    chain_to: int = None
    transaction_date: datetime = None
    account: int = None
